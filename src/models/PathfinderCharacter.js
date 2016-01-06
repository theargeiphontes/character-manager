var _ = require('underscore');

var Character = require('./Character.js');

var LEVEL_CAP = 20;
var STAT_MAX = 200;

var spellSlots = {};

function PathfinderCharacter (id, __char) {
    this.id = id;
    this.JSON = __char;
}

PathfinderCharacter.prototype = _.extend({}, Character.prototype, {
// TODO: character.save();
// TODO: bonus spells formula http://www.enworld.org/forum/showthread.php?45626-Bonus-Spells
// TODO: adding spellcasting classs means adding place holders for spells known, spells prepared
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

   'calculateBonusSpells': function(casterAbilityScore) {
     var bonusSpells;
     var abilityScore = casterAbilityScore;
     for(var className in spellSlots) {
       for(var i = 1; i < spellSlots[className].length; i++) {
         bonusSpells = Math.floor((abilityScore - (i + 1) * 2) / 8);
         if(bonusSpells > 0) {
           spellSlots[className][i] = spellSlots[className][i] + bonusSpells;
        }
      }
    }
  }, 

  'loadSpellSlots': function(spellsPerDay) {
    for(var className in this.JSON['class']) {
      spellSlots[className] = spellsPerDay[className][this.JSON['class'][className]];
    }
    return spellSlots;
  },

  'setSpellsKnown': function(className, spellList) {
    this.JSON['spellsKnown'][className] = spellList;
  },

  'getSpellsKnown': function() {
    return this.JSON['spellsKnown'];
  },

  'prepareSpell': function(className, spellLevel, spellName) {
    if(this.JSON['spellsPrepared'][className][spellLevel] === undefined) {
      this.JSON['spellsPrepared'][className][spellLevel] = [spellName];
    } else if(this.JSON['spellsPrepared'][className][spellLevel].length < spellSlots[className][spellLevel]) {
      this.JSON['spellsPrepared'][className][spellLevel].push(spellName);
    }
  },

  'getSpellsPrepared': function() {
    return this.JSON['spellsPrepared'];
  },

  'castSpell': function(className, spellLevel, spellName) {
    if(spellName === null) {
      spellSlots[className][spellLevel]--;
    } else{
      spellSlots[className][spellLevel]--;
      this.JSON['spellsPrepared'][className][spellLevel].splice(spellName);
    }
  },

  'validate': function() {
    var errs = {};
    var err;

    err = null;
    err = this.validateClass();
    if(err !== null) {
      errs['class'] = err;
    }

    err = null;
    err = this.validateStats();
    if(err !== null) {
      errs['stats'] = err;
    }

    if(_.isEmpty(errs)) {
      errs = null;
    }

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

    if(_.isEmpty(errs)) {
      errs = null;
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
      } else if (parseInt(this.JSON['stats'][stat], 10) > STAT_MAX) {
        errs.push('Stat ' + stat + ' out of bounds');
      }
    }

    if(_.isEmpty(errs)) {
      errs = null;
    }

    return errs;
  }

  //TODO: 'validateSpells': function() { }

});

module.exports = PathfinderCharacter;