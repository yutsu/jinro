
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
    this.winning_side = 0
    this.killable = true;
    this.action_sentence = 'もっとも疑わしい人を一人選んでください｡';
    this.night_action = 'suspect'
  }
}

class Werewolf extends Player{
  constructor(name){
    super(name);
    this.role = 'werewolf';
    this.role_jp = '人狼';
    this.side = 1;
    this.winning_side = 1
    this.killable = false;
    this.action_sentence = '今晩襲う人を決めてください｡';
    this.night_action = 'kill'
  }
}

class Seer extends Villager{
  constructor(name){
    super(name);
    this.role = 'seer';
    this.role_jp = '占い師';
    this.action_sentence = '今晩占う人を決めてください｡';
    this.night_action = 'see'
  }
}

class Knight extends Villager{
  constructor(name){
    super(name);
    this.role = 'knight';
    this.role_jp = '騎士';
    this.action_sentence = '今晩守る人を決めてください｡';
    this.night_action = 'protect';
  }
}

class Traitor extends Villager{
  constructor(name){
    super(name);
    this.role = 'traitor';
    this.role_jp = '裏切り者';
    this.winning_side = 1;
  }
}

class WerewolfBeliever extends Villager{
  constructor(name){
    super(name);
    this.role = 'werewolf_believer';
    this.role_jp = '狼信者';
    this.winning_side = 1
  }
}

class Baker extends Villager{
  constructor(name){
    super(name);
    this.role = 'baker';
    this.role_jp = 'パン屋さん';
    this.action_sentence = 'もっとも疑わしい人を一人選んでください｡';
    this.morning_sentence = 'パンの香ばしい香りが漂っています。'
  }
}

export {Villager, Werewolf, Seer, Knight, Traitor, WerewolfBeliever, Baker};
