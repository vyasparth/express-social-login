Node Passport Authentication

1) Do an npm install to install all the dependencies

2) Get the App Id & secret for facebook & google

3) For facebook -->
	- Set the app url as http://localhost:3000/ & get the appId & secret key.
	- Add a product "Facebook Login" and set the Valid OAuth as http://localhost:3000/auth/facebook/callback.

4) For Google -->
	- Follow this https://developers.google.com/identity/sign-in/web/devconsole-project?authuser=2 & get the AppId & secret key
	- Set the javascript origin url as - http://localhost:3000 & Authorized redirect URI as http://localhost:3000/auth/google/callback
	- Enable the google plus API from the APIs library