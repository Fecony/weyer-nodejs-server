let request = require('request')
let express = require('express')

var access_token;

let app = express();

app.get('/', function(req, res) {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.send(access_token);
})

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        access_token = body.access_token
    } else {
        console.log(error)
    }
});

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}`)
app.listen(port)