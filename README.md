character-manager
=================

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
  
## Tech Stack

* [NodeJS](nodejs.org) - server
* [GruntJS](gruntjs.com) - task runner
* [Jade](http://jade-lang.com/) - html templates
  * [Jade syntax examples](http://naltatis.github.io/jade-syntax-docs/)

## To do

### Dev enhancements
* ~~Add linter~~
* Add [JSDoc](http://usejsdoc.org/about-getting-started.html)?
* Add storage solution
* Swap over to [sublime text 3](http://www.sublimetext.com/3)
  * ~~convert over terminal command `subl`~~
  * cucumberjs highlighting 
  * jade highlighting
* Swap over to [trello board](https://trello.com/) for user features

### User features
* I want to be able to go to a url on the server, find a character.
  * ~~if i cannot find a character, the system will 404~~
  * if i find a character, it will populate the stats for that character
* I want to be able to edit a character
* I want to be able to save a character's edits

