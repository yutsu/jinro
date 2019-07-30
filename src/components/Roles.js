
class Player {
  constructor(name){
    this.name = name;
    this.alive = true
    this.protected = false
  }
}

class Villager extends Player{
  constructor(name){
    super(name);
    this.role = 'villager';
    this.role_jp = '村人';
    this.side = 0;
    this.killable = true;
    this.action_sentence = 'もっとも疑わしい人を一人選んでください｡';
  }
}

class Werewolf extends Player{
  constructor(name){
    super(name);
    this.role = 'werewolf';
    this.role_jp = '人狼';
    this.side = 1;
    this.killable = false;
    this.action_sentence = '今晩襲う人を決めてください｡';
  }
}

class Seer extends Villager{
  constructor(name){
    super(name);
    this.role = 'seer';
    this.role_jp = '占い師';
    this.action_sentence = '今晩占う人を決めてください｡'
  }
}

class Knight extends Villager{
  constructor(name){
    super(name);
    this.role = 'knight';
    this.role_jp = '騎士';
    this.action_sentence = '今晩守る人を決めてください｡'
  }
}

export {Villager, Werewolf, Seer, Knight};
