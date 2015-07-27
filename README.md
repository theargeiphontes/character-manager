character-manager
=================

## In-progress

This is a personal project to cut my teeth on JS fundamentals.

## Manager your RPG characters

* System agnostic 
* Store and update characters as they level up
* Several templates for popular games
  * Pathfinder
  * New World of Darkness
  * Mage the Ascension

## Getting started
1. Run `npm install` 
1. Run `grunt` to start server
1. Go to `localhost:3000/pathfinder` to see initial page
  
## Running tests
1. Run `grunt test` to execute unit tests

## Tech Stack

* [NodeJS](nodejs.org) - server
* [GruntJS](gruntjs.com) - task runner
* [Jade](http://jade-lang.com/) - html templates
  * [Jade syntax examples](http://naltatis.github.io/jade-syntax-docs/)
* [Bluebird](https://github.com/petkaantonov/bluebird) - promises
* Unit tests
  * [ChaiJS](http://chaijs.com/) - expect syntax
  * [grunt-mocha](https://github.com/kmiyashiro/grunt-mocha) - unit tests

### Dev enhancements
* ~~Add linter~~
* Add [JSDoc](http://usejsdoc.org/about-getting-started.html)?
* Add storage solution
* ~~Swap over to [sublime text 3](http://www.sublimetext.com/3)~~
  * ~~[convert over terminal command `subl`](https://www.sublimetext.com/docs/3/osx_command_line.html)~~
  * ~~[jade highlighting](https://sublime.wbond.net/packages/Jade)~~
* Move to [ember](http://emberjs.com/)
* Possible [OAuth](http://dailyjs.com/2014/11/14/grant/) solution
* Swap over to [trello board](https://trello.com/) for user features

### User features
* I want to be able to go to a url on the server, find a character.
  * if i cannot find a character, the system will 404
  * ~~if i find a character, it will populate the stats for that character~~
* I want to be able to go to any url and find a character
  * if i can't find a character, 404
* I want to be able to edit a character
  * ~~enable edit button with alert~~
  * convert stats into edit boxes with ajax
* I want to be able to save a character's edits

