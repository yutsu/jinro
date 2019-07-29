class Player {
  constructor(name, alive){
    this.name = name;
    this.alive = true
  }
}

class Villager extends Player{
  constructor(name, alive, role, side, killable){
    super(name, alive);
    this.role = 'villager';
    this.side = 0;
    this.killable = true;
    this.action_sentence = 'もっとも疑わしい人を一人選んでください｡';
  }
}

class Werewolf extends Player{
  constructor(name, alive, role, side, killable){
    super(name, alive);
    this.role = 'werewolf';
    this.side = 1;
    this.killable = true;
    this.action_sentence = '今晩襲う人を決めてください｡';
  }
}

class Seer extends Villager{
  constructor(name, alive, role, side, killable){
    super(name, alive, side);
    this.role = 'seer';
    this.killable = true
  }
}

export {Villager, Werewolf, Seer};
