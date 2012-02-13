/*global QUnit:true, module:true, test:true, asyncTest:true, expect:true*/
/*global start:true, stop:true ok:true, equal:true, notEqual:true, deepEqual:true*/
/*global notDeepEqual:true, strictEqual:true, notStrictEqual:true, raises:true*/
(function($) {

  $(function(){
    var flags = [];

    $('#testlist1').twitter({
      from:'mediatemple',
      rpp: 2
    });
  
    $('#testlist2').twitter({
      from:'whatever', 
      limit:0, 
      notFoundText: 'Whoops, no results'
    });
  
    $('#testlist3').twitter('ikjn gt oidfbgjldkfobnidfjoh;bikdjfkbhjfldldfj');
  
    $('#testlist4').twitter({
      ands    : '',           // All of these words  
      phrase  : '',            // This exact phrase 
      ors     : 'lol rotfl',   // Any of these words  
      nots    : 'dirty',       // None of these words 
      tag     : 'omg',         // This hashtag  
      rpp     : 4                // Results per page
    });

    $('#testlist5').twitter({
      from    : 'rwaldron',     // From this person  
      replies:  false,
      retweets: false,
      rpp     : 4,         // Results per page
      avatar  : false
    });
  
    module("$.twitter()");
    test("Test the async", function() {
    
      stop();
  
      $.twitter('foo', function(tweets){
        equal( 'object', (typeof tweets), "$.twitter('foo') returns and object" );
  
      });

      $.twitter({from : 'mediatemple'}, function(tweets){
        equal( 'mediatemple', tweets.results[0].from_user, "$.twitter({from : 'mediatemple'}) returns tweets from @mediatemple" );
  
      });
    
      $.twitter({from : 'mediatemple', replies: false}, function(tweets){
        equal( 'mediatemple', tweets.results[0].from_user, "$.twitter({from : 'mediatemple'}) returns tweets from @mediatemple with replies set to false" );
  
      });
    
      $.twitter({from : 'mediatemple', retweets: false}, function(tweets){
        equal( 'mediatemple', tweets.results[0].from_user, "$.twitter({from : 'mediatemple'}) returns tweets from @mediatemple with retweets set to false" );
  
      });
    
      setTimeout(function(){
        start();
      }, 2000);    
    
    });


    test("Test the signatures", function() {
    
      ok($.isFunction($.twitter), "$.twitter exists and is a function" );
    
      equal( false, $.twitter(), "$.twitter() returns false if you pass it nothing" );

    });

    module("$.fn.twitter()");
    test("Test the signatures", function() {
    
      ok($.isFunction($.fn.twitter), "$.fn.twitter exists and is a function" );
    
      equal( 'object', (typeof $.fn.twitter({})), "$.fn.twitter({}) returns and object" );
      equal( 'string', (typeof $.fn.twitter({}).selector), "$.fn.twitter({}) returns and object" );

      equal( 'object', (typeof $.fn.twitter('foo')), "$.fn.twitter('foo') returns and object" );
      equal( 'string', (typeof $.fn.twitter('foo').selector), "$.fn.twitter('foo') returns and object" );

      equal( 'object', (typeof $.fn.twitter()), "$.fn.twitter() returns and object" );
      equal( 'string', (typeof $.fn.twitter().selector), "$.fn.twitter() returns and object" );

      equal( 'object', (typeof $.fn.twitter(null)), "$.fn.twitter(null) returns and object" );
      equal( 'string', (typeof $.fn.twitter(null).selector), "$.fn.twitter(null) returns and object" );    

      equal( 'object', (typeof $.fn.twitter(undefined)), "$.fn.twitter(null) returns and object" );
      equal( 'string', (typeof $.fn.twitter(undefined).selector), "$.fn.twitter(null) returns and object" );    

    });
    test("Test twitter list that is built", function() {
  
  
      equal( 1, $('#testlist1').children().length, "Any element with $.fn.twitter() should have exactly one child" );
      equal( 1, $('#testlist2').children().length, "Any element with $.fn.twitter() should have exactly one child" );
      equal( 1, $('#testlist3').children().length, "Any element with $.fn.twitter() should have exactly one child" );    
      equal( 1, $('#testlist4').children().length, "Any element with $.fn.twitter() should have exactly one child" );    
    
    
      equal( 2, $('#testlist1').children().children().length, "The twitter list should have 2 children" );
      equal( 4, $('#testlist4').children().children().length, "The twitter list should have 4 children" );    
    
      equal( '@', $('#testlist1').text().match(/@/), "The twitter lis should have at least one @ symbol in it" );
    
      equal( 'Whoops, no results', $('#testlist2').text(), "The failed search should say 'Whoops, no results'" );
    
      equal( 'No results found on twitter', $('#testlist3').text(), "The failed search should default to 'No results found on twitter'" );
    
      ok($('#testlist1').children().find('a').find('img').length, "Make sure the user avatar is present and inside of an anchor" );
		
      equal(0, $('#testlist5').children().find('a').find('img').length, "Make sure the user avatar is not present inside of an anchor when avatar option is set to false");
    
      ok($('#testlist1').children().find('span').length, "Make sure the tweet is there" );
    
    });
    test("Test a few of the cases for the object style signature", function() {
    
      equal( null, $('#testlist4').text().match(/dirty/), "'dirty' should not show up" );
    
      equal( 'o', $('#testlist4').text().match(/o/), "'I' should show up in testlist 4" );
    
      equal( 'omg', $('#testlist4').text().toLowerCase().match(/omg/), "'omg' should show up in testlist 4" );
    });

    test("Test no replies, no retweets", function() {
    
      var $li = $('#testlist5 ul li'), 
          tweets    = [],
          replies   = [],
          retweets  = [];
    
      for ( var i = 0; i < $li.length; i++ ) {
        tweets.push( $.trim($( $li[i] ).text().split(':')[1]) );
      
        if ( tweets[i].indexOf('RT') === 0 ) {
          retweets.push(true);
        }

        if ( tweets[i].indexOf('@') === 0 ) {
          replies.push(true);
        }
      }
    
      equal( 4, tweets.length, 'There are four tweets' );
      equal( 0, retweets.length, 'There are no Retweets' );
      equal( 0, replies.length, 'There are no Replies' );
    
    });

  });

}(jQuery));
