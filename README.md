# Weyer server to request token from Spotify API
>###### MAYBE THAT IS NOT RIGH WAY TO GET TOKEN

Client Credentials Flow - server-to-server authentication.

This service is used to get Spotify token and return it.

## Development

In order to start developing, register a Spotify Application here:
https://developer.spotify.com/my-applications


Write the below commands in your terminal (replacing XXXX AND YYYY with your acutal client id and secret from the page where you registered your application)

```
npm install
export SPOTIFY_CLIENT_ID=XXXX
export SPOTIFY_CLIENT_SECRET=YYYY
npm start
```

Then go to http://localhost:8888/ in your browser. This will return valid access token that you can use to do operations in the Spotify API.

## Production

This template is intended to be deployed on Heroku. After installing the Heroku CLI tools you can run the below commands in the same directory as server.js.

>Heroku will create a random name for application. You can rename it adding `name` after `heroku create` command 

```
heroku create [name]
heroku config:set SPOTIFY_CLIENT_ID=XXXX
heroku config:set SPOTIFY_CLIENT_SECRET=YYYY
git push heroku master
```

You should now be able to go to or call http://`name`.herokuapp.com/ and it will return valid token. Or error...?