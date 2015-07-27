function Character(id, json) {
  this.id = id;
  this.JSON = json;
}

// TODO: should my code here use extend on type Object?

Character.prototype.getId = function() {
  return this.id;
};

Character.prototype.get = function(key) {
  return this.JSON[key];
};

Character.prototype.getJSON = function() {
  return this.JSON;
};

Character.prototype.set = function(key, data) {
  this.JSON[key] = data;
};

module.exports = Character;