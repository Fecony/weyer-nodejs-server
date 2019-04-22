let request = require('request');
let express = require('express');
let axios = require('axios');

var access_token = null;

let app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization:
      'Basic ' +
      Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64')
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

app.get('/', function(req, res) {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.send('Hello World!');
});

app.get('/tracks', getTracks);
app.get('/tracks/:id', getTrackById);
app.get('/refreshToken', refreshToken);

// Get Tracks by search query
async function getTracks(req, res, next) {
  let type = req.query.type;
  let query = req.query.query;
  let result = null;

  await axios
    .get(
      `https://api.spotify.com/v1/search?query=${query}&type=${type}&limit=18`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    .then(response => {
      result = response.data[`${type}s`].items;
      console.log('result: ', response.data[`${type}s`].items);
    })
    .catch(e => {
      result = e.response.data.error;
      console.log('error: ', result);
      if (e.response.data.error.status == 401) {
        refreshToken();
      }
    });

  res.send(result);
}

async function getTrackById(req, res) {
  let id = req.params.id;
  let result = null;

  await axios
    .get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    .then(response => {
      result = response.data;
      console.log(response.data);
    })
    .catch(e => {
      result = e.response.data.error;
      console.log(e.response.data);
      if (e.response.data.error.status == 401) {
        refreshToken();
      }
    });
  res.send(result);
}

// Refresh token
async function refreshToken(req, res, next) {
  await request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
    } else {
      res.status(500).send('Something broke!');
    }
  });
  console.log('token refreshed');
}

// Initial get token
request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    access_token = body.access_token;
  } else {
    console.log(error);
  }
});

let port = process.env.PORT || 8888;
console.log(`Listening on port ${port}`);
app.listen(port);
