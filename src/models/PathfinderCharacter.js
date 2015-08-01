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

// TODO: character.save();
/* 
  sinon
  spies - wraps a function, and asserts that its been called
  stub - replace a fucntion with a fake 
*/
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

  'addClass': function(className, level) {
    this.JSON['class'][className] = level;
  },

  'updateClass': function(className, level) {
    this.JSON['class'][className] = level;
  }, 

  // TODO: check for truthiness?
  /* 
  validateStats() {
    return [];
  }

  validate() {
    var errs = {};
    errs['stats'] = validateStats();
    return errs;
  }
  */
  'validate': function() {
    var errs = {};
    
    errs['class'] = this.validateClass();
    errs['stats'] = this.validateStats();
    
    return errs;
  },

  'validateClass': function() {
    var errs = [];
    var charLevel = 0;
    var level;
   
    if(this.JSON['class'] === undefined || this.JSON['class'] === null) {
      errs.push('Character does not possess any class levels');
    }
    for (var charClass in this.JSON['class']) {
      // Checking for undefined character classes
      if(charClass === undefined) {
        errs.push('Class ' + charClass + ' is undefined');
      }
      if(charClass === null) {
        errs.push('Class ' + charClass + ' is null');
      }

      // Checking that class level is an int
      level = parseInt(this.JSON['class'][charClass], 10);
      if(isNaN(level)) {
        errs.push('Class ' + charClass + ' level ' + this.JSON['class'][charClass] + ' is not an int');
      } else {
        // Checking total character level
        charLevel += level;  
      }
    }
    if(charLevel > LEVEL_CAP) {
      errs.push('Total character level greater than ' + LEVEL_CAP + ', ' + charLevel);
    }
    return errs;
  },

  'validateStats': function() {
    var errs = [];
    if(this.JSON['stats'] === undefined) {
      errs.push('Stats data is undefined');
    }
    if(this.JSON['stats'] === null) {
      errs.push('Stats data is null');
    } 
    for (var stat in this.JSON['stats']) {
      if(stat === undefined) {
        errs.push(stat + ' is undefined');
      }
      if(stat === null) {
        errs.push(stat + ' is null');
      } 
      if(isNaN(parseInt(this.JSON['stats'][stat]), 10)) {
        errs.push('Stat ' + stat + ' is not an integer');
      } else if (parseInt(this.JSON['stats'][stat], 10) > 200) {
        errs.push('Stat ' + stat + ' out of bounds');
      }
    }
    return errs;
  }

});

module.exports = PathfinderCharacter;