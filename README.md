# Weyer server to request token from Spotify API

> ###### MAYBE THAT IS NOT RIGH WAY TO WORK WITH API

Client Credentials Flow - server-to-server authentication.

This service is used to:

- Get Spotify Token
- Refresh Token
- Fetch tracks/albums by search query
- Get track by ID.

---

## Development

In order to start developing, register a Spotify Application here:
https://developer.spotify.com/my-applications

Write the below commands in your terminal (replacing XXXX AND YYYY with your acutal `client id` and `secret` from the page where you registered your application)

```
npm install
export SPOTIFY_CLIENT_ID=XXXX
export SPOTIFY_CLIENT_SECRET=YYYY
npm start
```

Then go to http://localhost:8888/ in your browser. This will return valid access token that you can use to do operations in the Spotify API.

---

## Production

This template is intended to be deployed on Heroku. After installing the Heroku CLI tools you can run the below commands in the same directory as server.js.

> Heroku will create a random name for application. You can rename it adding `name` after `heroku create` command

```
heroku create [name]
heroku config:set SPOTIFY_CLIENT_ID=XXXX
heroku config:set SPOTIFY_CLIENT_SECRET=YYYY
git push heroku master
```

Calling _http://`name`.herokuapp.com/tracks`?query=[search_text]&type=[track_type/album_type]`_ to get 18 tracks found by search query.

Calling _http://`name`.herokuapp.com/tracks/`[track_id]`_ will return track by it's ID
