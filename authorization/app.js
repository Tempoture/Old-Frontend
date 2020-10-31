/**
Running the Spotify WEB API code with new id, secret and uri
 */

/**
 */
var SpotifyWebApi = require('spotify-web-api-node');
var querystring = require('querystring');

var client_id = '';
var client_secret = '';
var redirect_uri = '';
var stateKey = 'spotify_auth_state';


//Spotify Login
module.exports.spotifyLogin = function (res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    var scope = 'user-read-email user-read-recently-played';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
};

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

//For connecting to BackEnd

var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
});