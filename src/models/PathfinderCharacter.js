var _ = require('underscore');
var Character = require('./Character.js');

var LEVEL_CAP = 20;

function PathfinderCharacter (id, __char) {
    this.id = id;
    this.JSON = __char;
}

PathfinderCharacter.prototype = _.extend({}, Character.prototype, {

// TODO: should I wrap my errior checking into functions or as is?
// TODO: JSON saves as strings, should I parse all my ints to int at a class level then when 
// I save everything, convert it back to strings?

  'getStats': function() {
    return this.JSON['stats'];
  },

  'getStat': function(stat) {
    return this.JSON['stats'][stat];
  },

  'getClassList': function() {
    return this.JSON['class'];
  },

  'getClassLevel': function(className) {
    return this.JSON['class'][className];
  },

  'setStat': function(stat, statValue) {
    this.JSON['stats'][stat] = statValue;
  },

  // TODO: Break out checking level cap into its own private function
  // TODO: too much parse int?
  // TODO: validate function, return true or return 'feild': [errors...]
  'addClass': function(className, level) {
    this.level = parseInt(level);

    // Checking level cap
    var charLevel = 0;
    for(var charClass in this.JSON['class']) {
      charLevel += parseInt(this.JSON['class'][charClass]);
    }
    if(charLevel + this.level > LEVEL_CAP) {
      throw new Error('Adding' + className + ' exceeds level cap >> ' + LEVEL_CAP);
    }
    this.JSON['class'][className] = this.level.toString();
  },

  'updateClass': function(className, level) {
    this.level = parseInt(level);

    // Checking level cap
    var charLevel = 0;
    for(var charClass in this.JSON['class']) {
      charLevel += parseInt(this.JSON['class'][charClass]);
    }
    if(charLevel + this.level > LEVEL_CAP) {
      throw new Error('Adding ' + className + ' exceeds level cap >> ' + LEVEL_CAP);
    }
    this.JSON['class'][className] = this.level.toString();
  }, 

  'validate': function() {
    var status = [];
    var charLevel = 0;

    if(this.JSON['class'] === undefined) {
      status.push('Character does not possess any class levels');
    }
    for (var charClass in this.JSON['class']) {
      // Checking for undefined character classes
      if(charClass === undefined) {
        status.push('Class ' + charClass + ' is undefined');
      }

      // Checking that class level is an int
      if(isNaN(parseInt(this.JSON['class'][charClass]), 10)) {
        status.push('Class ' + charClass + ' level is not an int');
      } else {
        // Checking total character level
        charLevel += parseInt(this.JSON['class'][charClass]);  
      }
    }
    if(charLevel > 20) {
      status.push('Total character level greater than 20, ' + charLevel);
    }

    for (var stat in this.JSON['stats']) {
      if(stat === undefined) {
        status.push(stat + ' is undefined');
      } 
      if(isNaN(parseInt(this.JSON['stats'][stat]), 10)) {
        status.push('Stat ' + stat + ' is not an int');
      } else if (parseInt(this.JSON['stats'][stat], 10) > 200) {
        status.push('Stat ' + stat + ' out of bounds');
      }
    }
    return status;
  }
});

module.exports = PathfinderCharacter;