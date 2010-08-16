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
          rpp     : 4                // Results per page
        });


  $('#testlist5').twitter({
          from    : 'rwaldron',              // From this person  
          replies:  false,
          retweets: false,
          rpp     : 4                // Results per page
        });
  
  module("Basic Tests");
  test("Test the signatures", function() {
    
    ok($.isFunction($.fn.twitter), "$.fn.twitter exists and is a function" );
    
    //console.log(typeof $.fn.twitter());
    equals( 'object', (typeof $.fn.twitter({})), "$.fn.twitter({}) returns and object" );
    equals( 'string', (typeof $.fn.twitter({}).selector), "$.fn.twitter({}) returns and object" );

    equals( 'object', (typeof $.fn.twitter('foo')), "$.fn.twitter('foo') returns and object" );
    equals( 'string', (typeof $.fn.twitter('foo').selector), "$.fn.twitter('foo') returns and object" );

    equals( 'object', (typeof $.fn.twitter()), "$.fn.twitter() returns and object" );
    equals( 'string', (typeof $.fn.twitter().selector), "$.fn.twitter() returns and object" );

    equals( 'object', (typeof $.fn.twitter(null)), "$.fn.twitter(null) returns and object" );
    equals( 'string', (typeof $.fn.twitter(null).selector), "$.fn.twitter(null) returns and object" );    

    equals( 'object', (typeof $.fn.twitter(undefined)), "$.fn.twitter(null) returns and object" );
    equals( 'string', (typeof $.fn.twitter(undefined).selector), "$.fn.twitter(null) returns and object" );    

    
  });
  test("Test twitter list that is built", function() {
  
  
    equals( 1, $('#testlist1').children().length, "Any element with $.fn.twitter() should have exactly one child" );
    equals( 1, $('#testlist2').children().length, "Any element with $.fn.twitter() should have exactly one child" );
    equals( 1, $('#testlist3').children().length, "Any element with $.fn.twitter() should have exactly one child" );    
    equals( 1, $('#testlist4').children().length, "Any element with $.fn.twitter() should have exactly one child" );    
    
    
    equals( 2, $('#testlist1').children().children().length, "The twitter list should have 2 children" );
    equals( 4, $('#testlist4').children().children().length, "The twitter list should have 4 children" );    
    
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

  test("Test no replies, no retweets", function() {
    
    var $li = $('#testlist5 ul li'), 
        _li = [],
        _rp = [],
        _rt = [];
    
    
    for ( var i = 0; i < $li.length; i++ ) {
      _li.push( $.trim($( $li[i] ).text().split(':')[1]) );
      
      if ( _li[i].indexOf('RT') === 0 ) {
        _rt.push(true);
      }

      if ( _li[i].indexOf('@') === 0 ) {
        _rp.push(true);
      }
    }
    
    equals( 4, _li.length, 'There are four tweets' );
    equals( 0, _rt.length, 'There are no Retweets' );
    equals( 0, _rp.length, 'There are no Replies' );
    
    
    
    
  });

});