require("dotenv").config();

var command = process.argv[2];
var input = process.argv[3];
var keys = require('./keys.js');


function switchCase() {
    switch (command) {
        // case 'my-tweets':
        //     myTweets();
        //     break;

        case 'spotify-this-song':
            spotifySong();
            break;

            // case 'movie-this': 
            // movieThis();
            // break;

            // case 'do-what-it-says': 
            // doWhatItSays();
            // break;
            // default:
            //       {
            //           console.log('invalid input!!!')
            //       }
    }
}

switchCase();
// function myTweets() {
//     const Twitter = require('twitter');
//     const client = new Twitter(keys.twitter);
//     var params = { screen_name: 'tomkhughes' };
//     client.get('statuses/user_timeline', params, function(error, tweets, response) {
//         if (!error) {
//             for (var i = 0; i < Math.min(tweets.length, 20); i++) {
//                 var tweet = tweets[i];

//                 console.log(tweet.text);
//                 console.log("Created on: " + tweet.created_at);
//                 console.log("-----------------------------");
//             }
//         } 
//         else {
//             console.log(error);
//         }
//     });
// };
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