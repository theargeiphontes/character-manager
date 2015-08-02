var Character = require('../models/Character.js');

var __charList = {}

function Characters(characters) {
  for (var id in characters) {
    __charList.put(new Character(id, characters[id]));
  }
}

Characters.prototype.getCharactersList = function() {
  return __charList;
}

// TODO: do i need this function?
Characters.prototype.setChararactersList = function(characters) {
  __charList = characters;
}