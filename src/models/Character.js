function Character(id, json) {
  this.id = id;
  this.JSON = json;
}

Character.prototype.getId = function() {
  return this.id;
};

Character.prototype.get = function(key) {
  if(this.JSON[key] === undefined) {
    throw new Error('Key not found');
  }
  return this.JSON[key];
};

Character.prototype.getJSON = function() {
  return this.JSON;
};

Character.prototype.set = function(key, data) {
  if(this.JSON[key] === undefined) {
    throw new Error('Key not found');
  }
  this.JSON[key] = data;
};

module.exports = Character;