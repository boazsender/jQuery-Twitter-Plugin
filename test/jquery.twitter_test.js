/*global QUnit:true, module:true, test:true, asyncTest:true, expect:true*/
/*global start:true, stop:true ok:true, equal:true, notEqual:true, deepEqual:true*/
/*global notDeepEqual:true, strictEqual:true, notStrictEqual:true, raises:true*/
(function($) {

  $(function(){
    var flags = [];

    $("#testlist1").twitter({
      from:"mediatemple",
      rpp: 2
    });

    $("#testlist2").twitter({
      from:"whatever",
      limit:0,
      notFoundText: "Whoops, no results"
    });

    $("#testlist3").twitter("ikjn gt oidfbgjldkfobnidfjoh;bikdjfkbhjfldldfj");

    $("#testlist4").twitter({
      ands    : "",           // All of these words
      phrase  : "",            // This exact phrase
      ors     : "lol rotfl",   // Any of these words
      nots    : "dirty",       // None of these words
      tag     : "omg",         // This hashtag
      rpp     : 4                // Results per page
    });

    $("#testlist5").twitter({
      from    : "rwaldron",     // From this person
      replies:  false,
      retweets: false,
      rpp     : 4,         // Results per page
      avatar  : false
    });

    // Temporarily replace $.twitter with a mock version that returns a pre-defined result
    $.oTwitter = $.twitter;
    $.twitter = function( options, callback ) {
      var tweets = {
        "results" : [{
          "from_user": "mediatemple",
          "text": "This text contains a @mention and a #hashtag"
        }]
      };
      callback( tweets, {}, null );
    };

    $("#testlist6").twitter({ from: "mediatemple" });

    // Replace original $.twitter function
    $.twitter = $.oTwitter;
    delete $.oTwitter;

    module("$.twitter()");
    test("Test the async", function() {

      stop();

      $.twitter("foo", function(tweets){
        equal( (typeof tweets), "object", "$.twitter('foo') returns an object" );

      });

      $.twitter({from : "mediatemple"}, function(tweets){
        equal( tweets.results[0].from_user, "mediatemple", "$.twitter({from : 'mediatemple'}) returns tweets from @mediatemple" );

      });

      $.twitter({from : "mediatemple", replies: false}, function(tweets){
        equal( tweets.results[0].from_user, "mediatemple", "$.twitter({from : 'mediatemple'}) returns tweets from @mediatemple with replies set to false" );

      });

      $.twitter({from : "mediatemple", retweets: false}, function(tweets){
        equal( tweets.results[0].from_user, "mediatemple", "$.twitter({from : 'mediatemple'}) returns tweets from @mediatemple with retweets set to false" );

      });

      setTimeout(function(){
        start();
      }, 2000);

    });


    test("Test the signatures", function() {

      ok($.isFunction($.twitter), "$.twitter exists and is a function" );

      equal( $.twitter(), false, "$.twitter() returns false if you pass it nothing" );

    });

    module("$.fn.twitter()");
    test("Test the signatures", function() {

      ok($.isFunction($.fn.twitter), "$.fn.twitter exists and is a function" );

      equal( (typeof $.fn.twitter({})), "object", "$.fn.twitter({}) returns an object" );
      equal( (typeof $.fn.twitter({}).selector), "string", "$.fn.twitter({}) returns an object" );

      equal( (typeof $.fn.twitter("foo")), "object", "$.fn.twitter('foo') returns an object" );
      equal( (typeof $.fn.twitter("foo").selector), "string", "$.fn.twitter('foo') returns an object" );

      equal( (typeof $.fn.twitter()), "object", "$.fn.twitter() returns an object" );
      equal( (typeof $.fn.twitter().selector), "string", "$.fn.twitter() returns an object" );

      equal( (typeof $.fn.twitter(null)), "object", "$.fn.twitter(null) returns an object" );
      equal( (typeof $.fn.twitter(null).selector), "string", "$.fn.twitter(null) returns an object" );

      equal( (typeof $.fn.twitter(undefined)), "object", "$.fn.twitter(null) returns an object" );
      equal( (typeof $.fn.twitter(undefined).selector), "string", "$.fn.twitter(null) returns an object" );

    });
    test("Test twitter list that is built", function() {


      equal( $("#testlist1").children().length, 1, "Any element with $.fn.twitter() should have exactly one child" );
      equal( $("#testlist2").children().length, 1, "Any element with $.fn.twitter() should have exactly one child" );
      equal( $("#testlist3").children().length, 1, "Any element with $.fn.twitter() should have exactly one child" );
      equal( $("#testlist4").children().length, 1, "Any element with $.fn.twitter() should have exactly one child" );


      equal( $("#testlist1").children().children().length, 2, "The twitter list should have 2 children" );
      equal( $("#testlist4").children().children().length, 4, "The twitter list should have 4 children" );

      equal( $("#testlist1").text().match(/@/), "@", "The twitter list should have at least one @ symbol in it" );

      equal( $("#testlist2").text(), "Whoops, no results", "The failed search should say 'Whoops, no results'" );

      equal( $("#testlist3").text(), "No results found on twitter", "The failed search should default to 'No results found on twitter'" );

      ok($("#testlist1").children().find("a").find("img").length, "Make sure the user avatar is present and inside of an anchor" );

      equal( $("#testlist5").children().find("a").find("img").length, 0, "Make sure the user avatar is not present inside of an anchor when avatar option is set to false");

      ok($("#testlist1").children().find("span").length, "Make sure the tweet is there" );

      ok( $("#testlist6").children().find('a[href="http://twitter.com/mention"]').length, "Make sure @mentions are linked" );

      ok( $("#testlist6").children().find('a[href="http://search.twitter.com/search?q=%23hashtag"]').length, "Make sure #hashtags are linked" );

    });
    test("Test a few of the cases for the object style signature", function() {

      equal( $("#testlist4").text().match(/dirty/), null, "'dirty' should not show up" );

      equal( $("#testlist4").text().match(/o/), "o", "'I' should show up in testlist 4" );

      equal( $("#testlist4").text().toLowerCase().match(/omg/), "omg", "'omg' should show up in testlist 4" );
    });

    test("Test no replies, no retweets", function() {

      var $li = $("#testlist5 ul li"),
          tweets    = [],
          replies   = [],
          retweets  = [];

      for ( var i = 0; i < $li.length; i++ ) {
        tweets.push( $.trim($( $li[i] ).text().split(":")[1]) );

        if ( tweets[i].indexOf("RT") === 0 ) {
          retweets.push(true);
        }

        if ( tweets[i].indexOf("@") === 0 ) {
          replies.push(true);
        }
      }

      equal( tweets.length, 4, "There are four tweets" );
      equal( retweets.length, 0, "There are no Retweets" );
      equal( replies.length, 0, "There are no Replies" );

    });

  });

}(jQuery));
