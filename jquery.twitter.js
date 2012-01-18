/*
 * Twitter Search Plugin jquery.twitter.js
 * http://code.bocoup.com/jquery-twitter-plugin/
 *
 * Copyright (c) 2010 Bocoup, LLC
 * Authors: Boaz Sender, Rick Waldron, Nick Cammarata
 * Dual licensed under the MIT and GPL licenses.
 * http://code.bocoup.com/license/
 *
 */
;(function ($) {
  /*
   * JavaScript Linkify - v0.3 - 6/27/2009
   * http://benalman.com/projects/javascript-linkify/
   * 
   * Copyright (c) 2009 "Cowboy" Ben Alman
   * Dual licensed under the MIT and GPL licenses.
   * http://benalman.com/about/license/
   * 
   * Some regexps adapted from http://userscripts.org/scripts/review/7122
   */
  linkify=(function(){var k="[a-z\\d.-]+://",h="(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])",c="(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+",n="(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)",f="(?:"+c+n+"|"+h+")",o="(?:[;/][^#?<>\\s]*)?",e="(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?",d="\\b"+k+"[^<>\\s]+",a="\\b"+f+o+e+"(?!\\w)",m="mailto:",j="(?:"+m+")?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"+f+e+"(?!\\w)",l=new RegExp("(?:"+d+"|"+a+"|"+j+")","ig"),g=new RegExp("^"+k,"i"),b={"'":"`",">":"<",")":"(","]":"[","}":"{","B;":"B+","b:":"b9"},i={callback:function(q,p){return p?'<a href="'+p+'" title="'+p+'">'+q+"</a>":q},punct_regexp:/(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/};return function(u,z){z=z||{};var w,v,A,p,x="",t=[],s,E,C,y,q,D,B,r;for(v in i){if(z[v]===undefined){z[v]=i[v]}}while(w=l.exec(u)){A=w[0];E=l.lastIndex;C=E-A.length;if(/[\/:]/.test(u.charAt(C-1))){continue}do{y=A;r=A.substr(-1);B=b[r];if(B){q=A.match(new RegExp("\\"+B+"(?!$)","g"));D=A.match(new RegExp("\\"+r,"g"));if((q?q.length:0)<(D?D.length:0)){A=A.substr(0,A.length-1);E--}}if(z.punct_regexp){A=A.replace(z.punct_regexp,function(F){E-=F.length;return""})}}while(A.length&&A!==y);p=A;if(!g.test(p)){p=(p.indexOf("@")!==-1?(!p.indexOf(m)?"":m):!p.indexOf("irc.")?"irc://":!p.indexOf("ftp.")?"ftp://":"http://")+p}if(s!=C){t.push([u.slice(s,C)]);s=E}t.push([A,p])}t.push([u.substr(s)]);for(v=0;v<t.length;v++){x+=z.callback.apply(window,t[v])}return x||u}})();

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
    $.getJSON('http://search.twitter.com/search.json?callback=?', query, function(tweets){ 
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
            var $tweet = $('<li/>', {
              className : 'tweet'
            });
						
						// Make the avatar, and append it to the $tweet
            if (query.avatar == true) {
	            $tweet.append($('<a/>', {
	              href: 'http://twitter.com/' + tweet.from_user,
	              html: '<img src="' + tweet.profile_image_url + '"/>'
	            }))
            }
            
            // Make the tweet text, and append it to the $tweet, then to the parent
            $tweet.append($('<span>', {
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

          // Inject the $tweets into the DOM
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
        limit        : 7,     // Number of tweets to get                                         <-- not in twitter search api, maps to and supersedes rpp (results per page)
        exclusions   : '',    // Space delimited list of strings to exclude  (eg: '_ s gr @b')   <-- not in twitter search api, done in plugin
        notFoundText : 'No results found on twitter', // Text to display if no results are found <-- not in twitter search api, done in plugin
        replies      : true,  // Include replies?                                                <-- not in twitter search api, done in plugin
        retweets     : true,  // Include replies?                                                <-- not in twitter search api, done in plugin
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
        q       : '',  // Default query
        avatar  : true // Add an avatar image of the user
      }
})(jQuery);