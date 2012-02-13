# jQuery Twitter Plugin

A jQuery plugin for working with the Twitter Search API to put twitter searches on websites with a simple syntax that follows the Twitter Search API URL parameters.

In addition to supporting the default Twitter Search API URL parameters, $.twitter() and $.fn.twitter() also support five options for filtering out mentions and retweets and for handling no results cases client side.

The jQuery fn twitter plugin fills each element in the collection it operates on with an unordered list of twitter statuses based on the options passed in.


## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/cowboy/jquery.twitter/master/dist/jquery.twitter.min.js
[max]: https://raw.github.com/cowboy/jquery.twitter/master/dist/jquery.twitter.js

In the browser:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.twitter.min.js"></script>
<script>
$('.myUL').twitter({from: 'boazsender', replies: false})
</script>
```

Make sure to checkout the examples in the index file.

## Documentation
Documentation available at http://code.bocoup.com/jquery-twitter-plugin/

## Examples
See documentation at http://code.bocoup.com/jquery-twitter-plugin/

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Boaz Sender  
Authors: Boaz Sender, Rick Waldron, Nick Cammarata
Licensed under the MIT, GPL licenses.
http://code.bocoup.com/license/

#### JavaScript Linkify - v0.3 - 6/27/2009
http://benalman.com/projects/javascript-linkify/

Copyright (c) 2009 "Cowboy" Ben Alman
Dual licensed under the MIT and GPL licenses.
http://benalman.com/about/license/

Some regexps adapted from http://userscripts.org/scripts/review/7122

This project is built with Ben Alman's Grunt