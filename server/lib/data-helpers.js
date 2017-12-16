  "use strict";
const ObjectID = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    saveLikes: function(tweetId, newLikes, callback){
      db.collection("tweets").update({"_id": ObjectID(tweetId)},{$set: {"likes": newLikes}}, callback);
    }

  };
}
