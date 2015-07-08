function PathfinderCharacter (id, __char) {
    this.id = id;
    this.name = __char.name;
    this.stats = __char.stats;
    this.json = __char;
}

// Return char name
PathfinderCharacter.prototype.getName = function () {
    return this.name;
};

// Returns all the stats for a character as JSON
PathfinderCharacter.prototype.getStats = function () {
    return this.stats;
};

// Returns only the specified stat
PathfinderCharacter.prototype.getStat = function (statName) {
    return this.stats[statName];
};

PathfinderCharacter.prototype.getJson = function () {
    return this.json;
};

PathfinderCharacter.prototype.updateStats = function (stats) {
    if(stats === undefined || stats == null || stats === '') { 
        throw 'stats is undefined'; 
    }
    for(var stat in stats) {
        console.log(stat + ' >> ' + stats[stat]);
        this.stats[stat] = stats[stat];
    }
    this.json['stats'] = JSON.stringify(stats);
};

// Update character name
/*PathfinderCharacter.prototype.updateName (name) {

};

// Update character with json
PathfinderCharacter.prototype.updateCharacter (character) {

};

// Update stats with json
PathfinderCharacter.prototype.updateStats (stats) {

};*/

// Update specific stat with value
PathfinderCharacter.prototype.updateStat = function (statName, statVal) {
    if(statVal === undefined || statVal == null || statVal === '') { 
      throw 'statVal is undefined'; 
    } if(statName === undefined || statName == null || statName === '') { 
      throw 'statName is undefined'; 
    }

    this.stats[statName] = statVal;
    this.json['stats'][statName] = statVal;
};

module.exports = PathfinderCharacter;