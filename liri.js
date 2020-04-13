require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");

var fs = require("fs");

var command = process.argv[2];

if (command === "concert-this") {

    var artist = process.argv[3];
    if (artist === undefined) {
        artist = "Diplo"
    }

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log(response);
            // console.log(response.data[1].venue);
            console.log("-------------------------------------");
            console.log("Event: " + response.data[1].title);
            console.log("Venue: " + response.data[1].venue.name);
            console.log("Location: " + response.data[1].venue.city + " " + response.data[0].venue.region);
            console.log("Date: " + moment(response.data[1].datetime).format("MM/DD/YYYY"));
            console.log("-------------------------------------");

        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        });

} else if (command === "spotify-this-song") {

    var song = process.argv[3];

    if (song === undefined) {
        song = "The Sign by Ace of Base"
    }
    spotify.search({ type: 'track', query: song })
        .then(function (response) {
            var songCounter = 1;
            for (var i = 0; i < response.tracks.items.length; i++) {

                var songData = [
                    ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                    ("-----------------------------------------------"),
                    ("Song Number: " + songCounter),
                    ("Artist: " + response.tracks.items[i].artists[0].name),
                    ("The song name is: " + response.tracks.items[i].name),
                    ("Here is a song preview from Spotify: " + response.tracks.items[i].preview_url),
                    ("The album containing this song is: " + response.tracks.items[i].album.name),
                    ("-----------------------------------------------"),
                    ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                    ("\n")

                ].join("\n\n");
                fs.appendFile("log.txt", songData, function (err) {
                    if (err) throw err;
                });
                console.log(songData);
                songCounter++
            }
        }).catch(function (error) {
            (error);
        });

} else if (command === "movie-this") {

    var movie = process.argv[3];

    if (movie === undefined) {
        movie = "Mr. Nobody";
    }

    axios
        .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            // Information about Movie
            console.log("-------------------------------------");
            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("-------------------------------------");

        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        });

} else if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);

        command = dataArr[0];
        whatToCommand = dataArr[1];

        if (command === "concert-this") {

            var artist = whatToCommand;

            axios
                .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
                .then(function (response) {
                    // console.log(response);
                    // console.log(response.data[1].venue);
                    console.log("-------------------------------------");
                    console.log("Venue: " + response.data[0].venue.name);
                    console.log("Location: " + response.data[0].venue.city + " " + response.data[0].venue.region);
                    console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
                    console.log("-------------------------------------");

                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {

                        console.log(error.request);
                    } else {

                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                });


            // IF WILDCARD want to know about a SONG
        } else if (command === "spotify-this-song") {
            var song = whatToCommand;

            if (song === undefined) {
                song = "The Sign by Ace of Base"
            }
            spotify.search({ type: 'track', query: song })
                .then(function (response) {
                    var songCounter = 1;
                    for (var i = 0; i < response.tracks.items.length; i++) {

                        var songData = [
                            ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                            ("-----------------------------------------------"),
                            ("Song Number: " + songCounter),
                            ("Artist: " + response.tracks.items[i].artists[0].name),
                            ("The song name is: " + response.tracks.items[i].name),
                            ("Here is a song preview from Spotify: " + response.tracks.items[i].preview_url),
                            ("The album containing this song is: " + response.tracks.items[i].album.name),
                            ("-----------------------------------------------"),
                            ("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
                            ("\n")

                        ].join("\n\n");
                        fs.appendFile("log.txt", songData, function (err) {
                            if (err) throw err;
                        });
                        console.log(songData);
                        songCounter++
                    }
                }).catch(function (error) {
                    (error);
                });


        } else if (command === "movie-this") {

            var movie = whatToCommand;

            if (movie === undefined) {
                movie = "Mr. Nobody";
            }

            axios
                .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
                .then(function (response) {
                    // Information about Movie
                    console.log("-------------------------------------");
                    console.log("Title: " + response.data.Title);
                    console.log("Year Released: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                    console.log("Country Produced: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("-------------------------------------");

                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {

                        console.log(error.request);
                    } else {

                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                });
            // IF Command not entered or incorrectly entered
        } else {
            console.log("Command Error");
        }

        console.log("-------------------------------------");
        console.log("Command: ", command);
        console.log("-------------------------------------");
    });


    // IF Command not entered or incorrectly entered
} else {
    console.log("Command Error");
}


