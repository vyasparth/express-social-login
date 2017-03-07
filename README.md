Node Passport Authentication for google, facebook, twitter & github.

1) Do an npm install to install all the dependencies

2) Get the App Id & secret for facebook & google

3) For facebook -->
	- Set the app url as http://localhost:3000/ & get the appId & secret key.
	- Add a product "Facebook Login" and set the Valid OAuth as http://localhost:3000/auth/facebook/callback.

4) For Google -->
	- Follow this https://developers.google.com/identity/sign-in/web/devconsole-project?authuser=2 & get the AppId & secret key
	- Set the javascript origin url as - http://localhost:3000 & Authorized redirect URI as http://localhost:3000/auth/google/callback
	- Enable the google plus API from the APIs library

5) For Github -->
	- Open https://github.com/settings/developers & register an app.
	- Set the test params & the "Authorization callback URL" as http://localhost:3000/auth/github/callback & the "Homepage URL" as http://localhost:3000/

6) For Twitter -->
	- Move to https://apps.twitter.com/ & create an app
	- set the website as http://www.example.com & "callback url" as http://localhost:3000/auth/twitter/callback 