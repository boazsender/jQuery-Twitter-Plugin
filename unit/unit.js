$(function(){
  $('#testlist1').twitter('mediatemple', 2)
  $('#testlist2').twitter('whatever', 0, 'Whoops, no results');
  $('#testlist3').twitter('whatever', 0);
  $('#testlist4').twitter({
          ands    : 'I',           // All of these words  
          phrase  : '',            // This exact phrase 
          ors     : 'lol rotfl',   // Any of these words  
          nots    : 'dirty',       // None of these words 
          tag     : 'omg',         // This hashtag  
          lang    : '',              // Written in language
          from    : '',              // From this person  
          to      : '',              // To this person  
          ref     : '',              // Referencing this person 
          near    : '',              // Near this place 
          within  : '',              // Within this distance
          units   : '',              // Distance unit (miles or kilometers)
          since   : '',              // Since this date  
          until   : '',              // Until this date  
          tude    : '',              // Attitude: '?' or ':)' or ':)'
          filter  : '',              // Containing: 'links'
          include : '',              // Include retweet?: 'retweets'
          rpp     : 3                // Results per page
        });

  
  module("Basic Tests");
  test("Test the signatures", function() {
    ok($.isFunction($.fn.twitter), "$.fn.twitter exists and is a function" );
    
    //console.log(typeof $.fn.twitter());
    equals( 'object', (typeof $.fn.twitter({})), "$.fn.twitter() returns and object" );
    
    equals( 'undefined', (typeof $.fn.twitter()), "$.fn.twitter() returns and object" );
    
  });
  test("Test twitter list that is built", function() {
    equals( 1, $('#testlist1').children().length, "The element with .twitter() called on it should have one child" );
    equals( 2, $('#testlist1').children().children.length, "The twitter list should have two children" );
    equals( '@', $('#testlist1').text().match(/@/), "The twitter lis should have at least one @ symbol in it" );
    equals( 'Whoops, no results', $('#testlist2').text(), "The failed search should say 'Whoops, no results'" );
    equals( 'No results found on twitter', $('#testlist3').text(), "The failed search should default to 'No results found on twitter'" );
    ok($('#testlist1').children().find('a').find('img').length, "Make sure the user avatar is present and inside of an anchor" );
    ok($('#testlist1').children().find('span').length, "Make sure the tweet is there" );
  });
  test("Test a few of the cases for the object style signature", function() {
    equals( null, $('#testlist4').text().match(/dirty/), "dirty should not show up" );
    equals( 'I', $('#testlist4').text().match(/I/), "dirty should not show up" );
    equals( 'omg', $('#testlist4').text().match(/omg/), "dirty should not show up" );
  });

});