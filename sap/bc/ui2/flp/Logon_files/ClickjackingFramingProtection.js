(function() {
  "use strict"
  
	var sParentOrigin = '';
	var sCheckService = '';
	var sApplyProtectionCallback = '';
	var bUnlocked = false;
	var bRunnable = false;
	var bParentUnlocked = false;
	var bMessageFromParentReceived = false;
	var bParentSecure = false;
	var bAnswerReceived = false;
	var bJSONAvailable = true;
	var sParentNotSecure;
	var sNoAnswerMessage;
	var sTimeoutMessage;
	var iTimeoutValue = 10000;
	var sDeniedMessage;
	var sWhiteListServiceNotReachedMessage = '';
	var aWhiteList;
	var bAllowSameOrigin = true;
	
	var aFPChilds = new Array();

	try {
		var obj=JSON.parse('{ "Test" : "X" }');
	}
	catch (e) {
		bJSONAvailable = false;
	}

	var oAntiClickjackScript = document.getElementById('SAP-antiClickjackScript');
	if (oAntiClickjackScript) {
		if( oAntiClickjackScript.getAttribute('data-checkService')) 
			sCheckService = oAntiClickjackScript.getAttribute('data-checkService');
		if (oAntiClickjackScript.getAttribute('data-applyProtectionCallback')) 
			sApplyProtectionCallback = oAntiClickjackScript.getAttribute('data-applyProtectionCallback');
		if (oAntiClickjackScript.getAttribute('data-parentNotSecure')) 
			sParentNotSecure = oAntiClickjackScript.getAttribute('data-parentNotSecure');
		if (oAntiClickjackScript.getAttribute('data-noAnswerFromParent')) 
			sNoAnswerMessage = oAntiClickjackScript.getAttribute('data-noAnswerFromParent');
		if (oAntiClickjackScript.getAttribute('data-releaseTimeoutMessage')) 
			sTimeoutMessage = oAntiClickjackScript.getAttribute('data-releaseTimeoutMessage');
		if (oAntiClickjackScript.getAttribute('data-releaseTimeoutValue'))
			iTimeoutValue = parseInt(oAntiClickjackScript.getAttribute('data-releaseTimeoutValue'));
		if (oAntiClickjackScript.getAttribute('data-deniedMessage')) 
			sDeniedMessage = oAntiClickjackScript.getAttribute('data-deniedMessage');
		if (oAntiClickjackScript.getAttribute('data-whiteListServiceNotReachedMessage')) 
			sWhiteListServiceNotReachedMessage = oAntiClickjackScript.getAttribute('data-whiteListServiceNotReachedMessage');
		if (oAntiClickjackScript.getAttribute('data-whiteList'))
			aWhiteList = oAntiClickjackScript.getAttribute('data-whiteList').split(',');
		if (oAntiClickjackScript.getAttribute('data-allowSameOrigin') == 'false')
			bAllowSameOrigin = false;
	}
	
	function match(sProbe,sPattern) {
		if (!(/\*/i.test(sPattern))) {
			if (sProbe==sPattern) return true; 
			return false;      
		} else {      
			sPattern = sPattern.replace(/\//gi,     "\\/");                              // replace /   with \/
			sPattern = sPattern.replace(/\./gi,     "\\.");                              // replace .   with \.
			sPattern = sPattern.replace(/\*/gi,     ".*");                               // replace *   with .*
			sPattern = sPattern.replace(/:\.\*$/gi, ":\\d*");                            // replace :.* with :\d* (only at the end)
			if (sPattern.substr(sPattern.length-1,1)!=='$') sPattern = sPattern + '$';   // if not already there add $ at the end
			if (sPattern.substr(0,1)!=='^')                 sPattern = '^' + sPattern;   // if not already there add ^ at the beginning
																// sPattern looks like: ^.*:\/\/.*\.company\.corp:\d*$ or ^.*\.company\.corp$     
			var r = new RegExp(sPattern,'i');
			if (r.test(sProbe)) return true; 
			return false;
		}
	}
  
	function addRuleToBuffer(sOrigin, oRuleSet) {
		/*
		buffer = {
		active : true,                              // true/false
		rules : [
		{
		origin     : "*.company.com",
		framing : false,                    //generally DENY, but allow some special applications (app1+app2)
		complete   : true,
		appls      : [
		{
		appl       : "app1",
		framing : true
		}, 
		{
		appl       : "app2",
		framing : true
		} 
		]      
		},
		{
		origin     : "*.company.corp",        
		framing : true,                   //generally ALLOW
		complete   : true
		}
		]
		}
		*/
		if (!bJSONAvailable) 
			return;
		var sOrig, rOrig;
		var oOldRule, oNewRule;
		var oBuffer = JSON.parse(sessionStorage.getItem('SAPClickjackProtection')) || {};

		if (oRuleSet.active===false) { //protection switched off
			oBuffer = {};
			oBuffer.active = false;
			sessionStorage.setItem('SAPClickjackProtection', JSON.stringify(oBuffer)); 
			return;
		}

		if (oBuffer.rules == null) {
			oBuffer.rules = new Array();
			oBuffer.rules.append(  oRuleSet );
		}
		
		for (var i=0; i<oRuleSet.rules.length; i++) { // determine relevant rule for sOrigin from ruleset retrieved from backend
			if (match(sOrigin,oRuleSet.rules[i].origin)) { // rule applies
			oNewRule = oRuleSet.rules[i];
			oNewRule.origin = sOrigin;  // put real origin to buffer (no pattern)
			break;
			}
		}
		if (!oNewRule) return;
		oBuffer.active = true;
		oBuffer.rules = oBuffer.rules || [];
		for (var j=0; j<oBuffer.rules.length; j++) { // determine existing rule for sOrigin in oBuffer
			if (oBuffer.rules[j].origin==sOrigin) {
				oOldRule = oBuffer.rules[j];
				if (oNewRule.complete) { // new rule is 'complete' -> replace existing rule
					oBuffer.rules.slice(j,1);
					oBuffer.rules.push(oNewRule);
					sessionStorage.setItem('SAPClickjackProtection', JSON.stringify(oBuffer)); 
					return;
				}
			}
		}

		if (!oOldRule) { // no old rule exists for sOrigin -> add new rule
			oBuffer.rules.push(oNewRule);
			sessionStorage.setItem('SAPClickjackProtection', JSON.stringify(oBuffer)); 
			return;
		}

		oOldRule.appls = oOldRule.appls || {};
		if (oNewRule.appls)
		for (var k=0; k<oNewRule.appls.length; k++) { // add rules for appls to old rule
			oOldRule.appls.push(oNewRule.appls[k]);
		}    
		sessionStorage.setItem('SAPClickjackProtection', JSON.stringify(oBuffer));    
	}

	function getProtection( sOrigin, sAppl, oRuleSet) { 
		var oBuffer = sessionStorage.getItem('SAPClickjackProtection');
//		if (!bJSONAvailable) 
			oBuffer = oRuleSet;
//		if (!oBuffer) return null;
//		if (bJSONAvailable)     
//			oBuffer = JSON.parse(oBuffer);

		if (oBuffer.active===false) return true;

		// active === true
		try {
			for (var i=0; i<oBuffer.rules.length; i++) {
				if (match( sOrigin, oBuffer.rules[i].origin)) {
					var oRule = oBuffer.rules[i];
					if (oRule.appls) {
						for (var j=0; j<oRule.appls.length; j++) {
							if (match(sAppl,oRule.appls[j].appl)) 
								return oRule.appls[j].framing;           
						}
					}
					else  
						if (oRule.complete && oRule.complete != 'false')
							return oRule.framing;
				}
			}
		}
		catch(e){}
		return null;
	}

	function check() {
		if (bRunnable) return;
		var bProtection = false;
		if (parent===self || parent==null) 
			bProtection = true;              // page is NOT framed
		else if (bAllowSameOrigin && window.document.URL.indexOf(sParentOrigin) == 0)
			bProtection = true;
// 		Check the static white list 
		else if (sParentOrigin && sParentOrigin.indexOf('//') != -1 && aWhiteList && aWhiteList.length != 0) {
			var sHostName = sParentOrigin.split('//')[1];
			sHostName = sHostName.split(':')[0];
			for (var i = 0; i < aWhiteList.length; i++) {
				var match = sHostName.indexOf(aWhiteList[i]);
				if (match != -1 && sHostName.substring(match) == aWhiteList[i]) {
					bProtection = true;
					break;
				}
			}
		}
		if (bProtection) {
			applyProtection(bProtection);
		} else {
			var xmlhttp = new XMLHttpRequest();
			if (sCheckService) {
				var url;
				if (sCheckService.indexOf("?") != -1)
					url = sCheckService + '&parentOrigin=' + encodeURIComponent(sParentOrigin)
						+ '&appl=' + encodeURIComponent(location.pathname);
				else
					url = sCheckService + '?parentOrigin=' + encodeURIComponent(sParentOrigin)
						+ '&appl=' + encodeURIComponent(location.pathname);
				if (window.addEventListener) 					
					xmlhttp.addEventListener('loadend', function (evt) {
						handleXmlHttpResponse( evt.target );
						}, true);
				else  
					xmlhttp.onreadystatechange = function() {
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
							handleXmlHttpResponse( xmlhttp );
						}
					};
				xmlhttp.open('GET', url, true);
				xmlhttp.setRequestHeader('Accept', 'application/json');
				xmlhttp.send();
			}
		}
	}
  
  
  	function handleXmlHttpResponse( xmlhttp ){
		var oRuleSet = {active : false};
		var bProtection = false;
		if (xmlhttp.status===200) {
			var sResponseText	= xmlhttp.responseText;
			if (bJSONAvailable)	{
				try {
					oRuleSet = JSON.parse(sResponseText);
				} catch(e) { 
				}
			}
			else {
				sResponseText = 
					sResponseText.replace(/\{/g,'').replace(/\}/g,'').replace(/\s/g,'').replace(/\"/g,'').replace(/\\u([0-9A-Za-z]{4,4})/gm,function(all,chars) { return String.fromCharCode(parseInt(chars,16)); } );
				var aAttributes = sResponseText.split(',');
				for (var i = 0; i < aAttributes.length; i++) {
					var aNameValue = aAttributes[i].split(':');
					switch (aNameValue[0]) {
						case 'version': 
							oRuleSet.version = aNameValue[1];
							break;
						case 'active': 
							if (aNameValue[1] == 'true')
								oRuleSet.active = true;
							else
								oRuleSet.active = false;
							break;
						case 'origin': aNameValue.splice(0,1);
							oRuleSet.origin = aNameValue.join(':');
							break;
						case 'framing': 
							if (aNameValue[1] == 'true')
								oRuleSet.framing = true;
							else
								oRuleSet.framing = false;
							break;
					}
				}
			}
//			addRuleToBuffer(sParentOrigin, oRuleSet);
			if (oRuleSet.active == false)
				bProtection = true;
			else if (match( sParentOrigin, oRuleSet.origin))
				bProtection = oRuleSet.framing;
			if (!bProtection && sDeniedMessage != null ) 
				alert( sDeniedMessage + ' Parent: ' +  sParentOrigin );
			sTimeoutMessage = null;
			//			bProtection = getProtection(sParentOrigin,location.pathname,oRuleSet);
			applyProtection(bProtection);
		}
		else {
			sTimeoutMessage = null;
			if (sWhiteListServiceNotReachedMessage != '')
				alert (sWhiteListServiceNotReachedMessage + ' Status: ' + xmlhttp.status);
			else
				alert('The white list service ' + sCheckService + ' cannot be reached. Status: ' + xmlhttp.status);
		}
	};

	function applyState( bIsRunnable, bIsParentUnlocked)
	{
		if (bIsRunnable)
			bRunnable = true;
		if (bIsParentUnlocked)
			bParentUnlocked = true;
		if (!bRunnable || !bParentUnlocked)
			return;
		try {
			var oAntiClickjackStyle;
			if (oAntiClickjackScript && oAntiClickjackScript.getAttribute('data-styleId')) {
				var sStyleId;
				if (oAntiClickjackScript.dataset && oAntiClickjackScript.dataset.styleid) 
					sStyleId = oAntiClickjackScript.dataset.styleid;
				else
					sStyleId = oAntiClickjackScript.getAttribute('data-styleId');
				oAntiClickjackStyle = document.getElementById(sStyleId);
				if (oAntiClickjackStyle) 
					oAntiClickjackStyle.parentNode.removeChild(oAntiClickjackStyle);
			}
			if (sApplyProtectionCallback != ''){
				try {
					var asFunctionSeparated = sApplyProtectionCallback.split(".");
					switch (asFunctionSeparated.length) {
						case 1:
							window[sApplyProtectionCallback](true);
							break;
						case 2:
							window[sApplyProtectionCallback.split(".")[0]][sApplyProtectionCallback.split(".")[1]](true);
							break;
						case 3:
							window[sApplyProtectionCallback.split(".")[0]][sApplyProtectionCallback.split(".")[1]]
								[sApplyProtectionCallback.split(".")[2]](true);
							break;
						case 4:
							window[sApplyProtectionCallback.split(".")[0]][sApplyProtectionCallback.split(".")[1]]
								[sApplyProtectionCallback.split(".")[2]][sApplyProtectionCallback.split(".")[3]](true);
							break;
						}
					} catch(e) {}
				}
			notifyChildFrames();
			bUnlocked = true;
			sTimeoutMessage = null;
		} catch(e) { }
	}
	
	
	function applyProtection(bProtection) {
		if (bProtection === true) 
			applyState( true, false);
	}

	function notifyChildFrames(){
		for (var i = 0; i < aFPChilds.length; i++)
			aFPChilds[i].postMessage('SAPFrameProtection*parent-unlocked','*');
	}
  
	function noResponseAlert () {
		if (!bAnswerReceived) {
			if (sNoAnswerMessage != null)
				window.alert( sNoAnswerMessage );
			else 
				window.alert( "The parent window did not answer when requesting the origin." );
			}
		else if (!bParentSecure) {
			if (sParentNotSecure != null)
				window.alert( sParentNotSecure );
			else 
				window.alert( "The parent window does not run in a secure environment." );
			}	
		else 
			if ((!bRunnable || !bParentUnlocked) && sTimeoutMessage != null) 
				window.alert( sTimeoutMessage + " Whitelistservice: " + sCheckService );
	}
  
	function handlePostMessage(oEvent) {
		try {
			if (oEvent.source===self || oEvent.source == null) return;
			if (oEvent.source===parent) {
				if (oEvent.data == 'SAPFrameProtection*parent-origin') {
					bAnswerReceived = true;
					sParentOrigin = oEvent.origin;
					check();
				}
				if (oEvent.data == 'SAPFrameProtection*parent-unlocked') {
					bParentSecure = true;
					bAnswerReceived = true;
					sParentOrigin = oEvent.origin;
					check();
					applyState( false, true);
				}
			} else {
				if (oEvent.source.parent===self)
				{
					if (oEvent.data == 'SAPFrameProtection*require-origin')
					{
						if (bUnlocked)
							oEvent.source.postMessage('SAPFrameProtection*parent-unlocked', '*');
						else {
							oEvent.source.postMessage('SAPFrameProtection*parent-origin', '*');
							aFPChilds.push( oEvent.source );
						}
					}
				}
			}
		}
		catch( e ) {}
	}

	if (window.addEventListener)
		window.addEventListener('message', handlePostMessage);
	else
		window.attachEvent('onmessage', handlePostMessage);
	if (parent===self || parent==null) {// unframed page
		applyState( true, true);
	} else { // framed page
		try { 			
			var test = parent.window;
			var bOk = false;        
			do {
				var test1 = test.document.domain;
				if (test == top){
					if (test1 != undefined)
					bOk = true;
					break;
				}
				test = test.parent.window;         
			}
			while ( true );
			if (bOk)
				applyState( true, true);
		} 
		catch(e) {	// access to the top window is not possible
			parent.postMessage('SAPFrameProtection*require-origin', '*');
			window.setTimeout(noResponseAlert, iTimeoutValue);
		}
	}
})();
