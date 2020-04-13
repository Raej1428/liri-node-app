const SpotifyWebApi = require("spotify-web-api-node");

var clientId = "63fd0448bff747c9b9221cd5c7c74ce9",
  clientSecret = "8df824a144c24fb5afd82619ad6324ca";

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);

exports.authorization = {
    authorizationCode: data.body['access_token']
}