var Character = require('./Character.js');

var LEVEL_CAP = 20;

function PathfinderCharacter (id, __char) {
    this.id = id;
    this.JSON = __char;
}
PathfinderCharacter.prototype = new Character(this.id, this.JSON);

// TODO: should I wrap my errior checking into functions or as is?
// TODO: JSON saves as strings, should I parse all my ints to int at a class level then when 
// I save everything, convert it back to strings?

Character.prototype.getStats = function() {
  if(this.JSON['stats'] === undefined) {
    throw new Error('Stat not found');
  }
  return this.JSON['stats'];
};

Character.prototype.getStat = function(stat) {
  if(this.JSON['stats'][stat] === undefined) {
    throw new Error('Stat not found');
  }
  return this.JSON['stats'][stat];
};

Character.prototype.getClassList = function() {
  if(this.JSON['class'] === undefined) {
    throw new Error('No character classes found');
  }
  return this.JSON['class'];
};

// TODO: Do I need this?
Character.prototype.getClassLevel = function(className) {
  if(this.JSON['class'] === undefined || this.JSON['class'][className] === undefined ) {
    throw new Error(className + ' not found');
  }
  return this.JSON['class'][className];
};

Character.prototype.setStat = function(stat, statValue) {
  if(this.JSON['stats'][stat] === undefined) {
    throw new Error('Stat key not found');
  } 
  if(isNaN(parseInt(statValue, 10))) {
    throw new Error('statValue is not an int');
  }
  if(parseInt(statValue, 10) > 200) {
    throw new Error('statValue out of bounds');
  }
  this.JSON['stats'][stat] = statValue;
};

// TODO: Break out checking level cap into its own private function
// TODO: too much parse int?

Character.prototype.addClass = function(className, level) {
  this.level = parseInt(level);
  if(this.JSON['class'] === undefined) {
    throw new Error('No character classes found');
  } 
  if(isNaN(this.level, 10)) {
    throw new Error('Level is not an int');
  }

  // Checking level cap
  var charLevel = 0;
  for(var charClass in this.JSON['class']) {
    charLevel += parseInt(this.JSON['class'][charClass]);
  }
  if(charLevel + this.level > LEVEL_CAP) {
    throw new Error('Adding' + className + ' exceeds level cap >> ' + LEVEL_CAP);
  }
  this.JSON['class'][className] = this.level.toString();
};


Character.prototype.updateClass = function(className, level) {
  this.level = parseInt(level);
  if(this.JSON['class'][className] === undefined) {
    throw new Error(className + ' not found in list of classes');
  } 
  if(isNaN(this.level, 10)) {
    throw new Error('Level is not an int');
  }

  // Checking level cap
  var charLevel = 0;
  for(var charClass in this.JSON['class']) {
    charLevel += parseInt(this.JSON['class'][charClass]);
  }
  if(charLevel + this.level > LEVEL_CAP) {
    throw new Error('Adding ' + className + ' exceeds level cap >> ' + LEVEL_CAP);
  }
  this.JSON['class'][className] = this.level.toString();
};

module.exports = PathfinderCharacter;