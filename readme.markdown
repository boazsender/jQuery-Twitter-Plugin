jQuery Twitter Plugin: jquery.twitter.js
A jQuery plugin that uses the Twitter Search API to put twitter searches on websites using a simple syntax that follows the Twitter Search API URL parameters, which can be found here: http://search.twitter.com/operators

You can call $.fn.twitter() in the following ways:

$('selector').twitter('search term'); // This will search twitter for tweets containing both "search" and "term".

$('selector').twitter(options); // Where options is an object containing properties to configure your search.

In addition to supporting all the Twitter Search API url parameters, $.fn.twitter() also supports the following options for filtering and handling no results cases client side:

limit
Number of tweets to get. Maps to and supersedes rpp (results per page).

exclusions 
Space delimited list of strings (eg: '_ s gr @b'). Use this to exclude tweets containing strings that are part of a word

notFoundText
Text to display if no results are found

replies
Include replies? (Boolean)

retweets
Include retweets (Boolean)


You can pass the default  Twitter Search API Parameters to $.fn.twitter():
q
Default query

ands    
All of these words  

phrase  
This exact phrase 

ors
Any of these words  

nots
None of these words 

tag
This hashtag  

lang
Written in language

from
From this person  

to
To this person  

ref
Referencing this person 

near
Near this place 

within
Within this distance

units
Distance unit (miles or kilometers)

since
Since this date  

until
Until this date  

tude
Attitude: '?' or ':)' or ':)'

filter
Containing: 'links'

include 
Include retweet?: 'retweets'

rpp
Results per page


================================

http://code.bocoup.com/jquery-twitter-plugin/

Copyright (c) 2010 Bocoup, LLC
Authors: Boaz Sender, Rick Waldron, Nick Cammarata
Dual licensed under the MIT and GPL licenses.
http://code.bocoup.com/license/

JavaScript Linkify - v0.3 - 6/27/2009
http://benalman.com/projects/javascript-linkify/

Copyright (c) 2009 "Cowboy" Ben Alman
Dual licensed under the MIT and GPL licenses.
http://benalman.com/about/license/

Some regexps adapted from http://userscripts.org/scripts/review/7122

