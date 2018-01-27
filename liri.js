require("dotenv").config();

var command = process.argv[2];
var input = process.argv[3];
var keys = require('./keys.js');


function switchCase() {
    switch (command) {
        case 'my-tweets':
            myTweets();
            break;

        case 'spotify-this-song':
            spotifySong();
            break;

        case 'movie-this':
            movieThis();
            break;

        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            {
                console.log('invalid input!!!')
            }
    }
}

switchCase();

function myTweets() {
    console.log("MY TWEETS: ");
    console.log("-------------------------------------------------------------------");
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: 'r1K5TYY1ARP3LpE46LJr2yDXJ',
        consumer_secret: 'BOc2ZPmIIaP7m8cTDeTO5KqLZKdfRAcTyeyTMZESmBKyjoeL5P',
        access_token_key: '540168392-co95mieP1FthvzXvgiuq5YhbNgAg1WtkSVSFGOov',
        access_token_secret: 'W6iipMO14adAL8jlY50tet6COIzQiShFjZxcjoa5FJ2iV'
    });

    var params = { screen_name: 'kingjames' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(error);
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);

        }
    });
};

function spotifySong() {

    console.log("SPOTIFY SONG: ");
    console.log("-------------------------------------------------------------------");
    if (input == null) {
        input = 'The Sign';
    };

    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

    spotify
        .search({ type: 'track', query: input, limit: 1 })
        .then(function(response) {
            // console.log(JSON.stringify(response, null, 2));
            console.log('Artist: ' + response.tracks.items[0].artists[0].name);
            console.log('Song Name: ' + response.tracks.items[0].name);
            console.log('Album: ' + response.tracks.items[0].album.name);
            console.log('Preview Link: ' + response.tracks.items[0].preview_url);
            console.log("-------------------------------------------------------------------");


        })
        .catch(function(err) {
            console.log(err);
        });

    // node liri spotify-this-song tweezer

};

function movieThis() {
    if (input == null) {
        input = 'Mr.Nobody';
    };
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=de2ecd";


    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);


    // Then create a request to the queryUrl

    // ...
    var request = require("request");

    // Then run a request to the OMDB API with the movie specified
    request(queryUrl, function(error, response, data) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            // console.log(JSON.parse(data));
            console.log("Title: " + JSON.parse(data).Title);
            console.log("Release Year: " + JSON.parse(data).Year);
            console.log("IMBD Rating: " + JSON.parse(data).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(data).tomatoRating);
            console.log("Country: " + JSON.parse(data).Country);
            console.log("Language: " + JSON.parse(data).Language);
            console.log("Plot: " + JSON.parse(data).Plot);
            console.log("Actors: " + JSON.parse(data).Actors);

        }

    });
}

function doWhatItSays() {
    const fs = require('fs');
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) { throw err }
        const randomText = data.split(', ');
        console.log(randomText);
        command = randomText[0]
        input = randomText[1]
        spotifySong();

    })
};