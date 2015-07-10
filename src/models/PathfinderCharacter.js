function PathfinderCharacter (id, __char) {
    this.id = id;
    this.name = __char.name;
    this.stats = __char.stats;
    this.json = __char;
}

module.exports = PathfinderCharacter;