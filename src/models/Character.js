function Character(id, json) {
  this.id = id;
  this.JSON = json;
}

Character.prototype.getId = function() {
  return this.id;
};

Character.prototype.get = function(key) {
  return this.JSON[key];
};

Character.prototype.getJson = function() {
  return this.JSON;
};

Character.prototype.set = function(key, data) {
  this.JSON[key] = data;
};

module.exports = Character;