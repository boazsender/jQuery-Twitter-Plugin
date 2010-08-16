;(function ($) {
  /*
   * Twitter Search Plugin jquery.twitter.js
   * http://code.bocoup.com/jquery-twitter-plugin/
   *
   * Copyright (c) 2010 Bocoup, LLC
   * Authors: Boaz Sender, Rick Waldron, Nick Cammarata
   * Dual licensed under the MIT and GPL licenses.
   * http://code.bocoup.com/license/
   *
   * Some regexps adapted from http://userscripts.org/scripts/review/7122
   */
  $.getScript('http://github.com/cowboy/javascript-linkify/raw/master/ba-linkify.min.js');
   
  var mention   = function(str) {
        return str.replace(/[@]+[A-Za-z0-9-_]+/ig, function(username) {
          return username.link('http://twitter.com/'+ username.replace('@','') );
        });
      },
      hashtags  = function(str) {
        return str.replace(/[#]+[A-Za-z0-9-_]+/ig, function(tag) {
          return tag.link('http://search.twitter.com/search?q='+tag.replace('#','%23'));
        });
      };

  //  This allows the plugin to have the base styles without including a sep file. 
  $('<style/>', {
    text: '.twitter-posts li{margin-bottom:10px;font-size:12px;clear:both;list-style-type:none;}.twitter-posts li img{float:left;border:1px solid #c2c2c2;-moz-box-shadow:0 0 4px #c2c2c2;-webkit-box-shadow:0 0 4px #c2c2c2;box-shadow:0 0 4px #c2c2c2;margin:0 10px 10px 0;}.twitter-posts li a{text-decoration:none;color:#009;}'
  }).prepend('head');


  $.twitter = function (options, callback) {
    // Fail if the options arg is not set
    if ( !options ) {
      return false;
    }
    
    // Set a temporary default query object
    var query,
        // Set up a regex to be used later in the case that exclusions have been set
        exclusionsExp = new RegExp(false);
    
    // If options is a string use it as standalone query
    if(typeof options == 'string'){
      query = $.extend({}, $.twitter.opts, {
        q: options
      });
    // Else prepare the options object to be serialized
    } else {
      // If a limit is set, add it to the query object
      options.rpp = options.limit ? options.limit : options.rpp;

      // If no limit is set, make the limit the rpp
      options.limit = options.limit ? options.limit : options.rpp;

      // If there are exlusions, turn them into a regex string
      exclusionsStr = options.exclusions ? options.exclusions.replace(' ', '|') : false;

      // If there are exlusions, turn the regex string we just made into a RegExp
      exclusionsExp = exclusionsStr ? new RegExp(exclusionsStr) : false;

      // Make a new object that is a merger of the options passed in with the default $.twitter.opts object
      // and assign it to the query variable
      query = $.extend({}, $.twitter.opts, options);

      // If there are exclusions, or replies or retweets are set to false, multiply the results to ask for from twitter by ten
      // We need to do this so that we have some meat to work with if the exclusions are common
      query.rpp = query.exclusions || !query.replies || !query.retweets  ? (query.rpp * 10) : query.rpp;      

    }
    

    // Call Twitter JSONP
    $.getJSON('http://search.twitter.com/search.json?'+$.param(query)+'&callback=?', function(tweets){ 
      callback(tweets, query, exclusionsExp)
    });
  };
  
  $.fn.twitter = function (options) {
    // Fail gracefully if the options arg is not set
    // return the jQuery obj so that chaining does not break
    if ( !options ) {
      return this;
    }
  
    // Begin to iterate over the jQuery collection that the method was called on
    return this.each(function () {
      // Cache `this`
      var $this = $(this);
      
      $.twitter(options, function(tweets, query, exclusionsExp){
        //Create and cache a new UL
        var $tweets   = $('<ul>'), 
            // Create a counter variable to count up how many tweets we have rendered
            // unfortunately we have to do this, because exclusions, retweet booleans and replies booleans
            // are not supported by the Twitter Search API
            limitInt  = 0;

        // If there are results to work with 
        if (tweets.results && tweets.results.length) {

          //  Iterate over returned tweets
          for(var i in tweets.results){

            // Cache tweet content
            var tweet         = tweets.results[i],
                // Set a variable to determine weather replies are set to false, and if so, weather the tweet starts with a reply
                allowReply    = !query.replies && tweet.to_user_id ? false : true,
                // Set a variable to determine weather retweets are set to false, and if so, weather the tweet starts with a retweet
                allowRetweet  = !query.retweets && tweet.text.slice(0,2) == 'RT' ? false : true;

            // Only proceed if allow reply is false
            if (!allowReply) {
              continue;
            }

            // Only proceed if allow retweet is false
            if (!allowRetweet) {
              continue;
            }

            // If exlusions set and none of the exlusions is found in the tweet then add it to the DOM
            if ( exclusionsExp && exclusionsExp.test(tweet.text) ) {
              continue;
            }  

            // Create and cache new LI
            $('<li/>', {
              className : 'tweet'
            })
            // Make the avatar, and append it to the $tweet
            .append($('<a/>', {
              href: 'http://twitter.com/' + tweet.from_user,
              html: '<img src="' + tweet.profile_image_url + '"/>'
            }))
            // Make the tweet text, and append it to the $tweet, then to the parent
            .append($('<span>', {
              className: 'content',
              html: '<a href="http://twitter.com/' + tweet.from_user + '">@' + tweet.from_user + '</a>: ' + mention(hashtags(linkify(tweet.text)))
            }))
            // Append tweet to the $tweets ul
            .appendTo($tweets);

            // Count up our counter variable
            limitInt++;            

            // If the counter is equal to the limit, stop rendering tweets
            if ( limitInt === query.limit ) {
              break;
            }
          }

          // Append the $tweets to the DOM
          $this.html($tweets);

        // Else there are no results to work with  
        } else {
          // Update the DOM to reflect that no results were found
          $this.html($('<h3/>', {
            className: 'twitter-notFound',
            text: query.notFoundText
          }));
        }
      });
    });
  };

  $.twitter.opts = {
        limit        : 7,     // Number of tweets to get                                         <-- not in twitter api, maps to and supersedes rpp (results per page)
        exclusions   : '',    // Space delimited list of strings to exclude  (eg: '_ s gr @b')   <-- not in twitter api, done in plugin
        notFoundText : 'No results found on twitter', // Text to display if no results are found <-- not in twitter api, done in plugin
        replies      : true,  // Include replies?                                                <-- not in twitter api, done in plugin
        retweets     : true,  // Include replies?                                                <-- not in twitter api, done in plugin
        ands    : '', // All of these words  
        phrase  : '', // This exact phrase 
        ors     : '', // Any of these words  
        nots    : '', // None of these words 
        tag     : '', // This hashtag  
        lang    : '', // Written in language
        from    : '', // From this person  
        to      : '', // To this person  
        ref     : '', // Referencing this person 
        near    : '', // Near this place 
        within  : '', // Within this distance
        units   : '', // Distance unit (miles or kilometers)
        since   : '', // Since this date  
        until   : '', // Until this date  
        tude    : '', // Attitude: '?' or ':)' or ':)'
        filter  : '', // Containing: 'links'
        include : '', // Include retweet?: 'retweets'
        rpp     : 5,  // Results per page
        q       : ''  // Default query
      }
})(jQuery);