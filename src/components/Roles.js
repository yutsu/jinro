
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
    this.side = 0; // 陣営
    this.winning_side = 0;
    this.saw = 0 // 占い結果
    this.killable = true;
    this.action_sentence = 'もっとも疑わしい人を一人選んでください｡';
    this.night_action = 'suspect'
    this.description = '人に化けた狼が暮らす村に住む。夜には人狼だと疑う人にこっそり投票する。'
  }
}

class Werewolf extends Player{
  constructor(name){
    super(name);
    this.role = 'werewolf';
    this.role_jp = '人狼';
    this.side = 1;
    this.winning_side = 1
    this.saw = 1;
    this.killable = false;
    this.action_sentence = '今晩襲う人を決めてください｡';
    this.night_action = 'kill'
    this.description = '夜に殺害する人を一人選ぶ。 最後の人狼に最終決定権がある。人狼同士は誰が人狼かわかっている。 人狼同士は殺し合えない。'
  }
}

class Seer extends Villager{
  constructor(name){
    super(name);
    this.role = 'seer';
    this.role_jp = '占い師';
    this.action_sentence = '今晩占う人を決めてください｡';
    this.night_action = 'see';
    this.description = '村人側。 毎晩誰か生きている一人を占い, その人が村人側か人狼側かを知ることができる。 ただし役職は知ることができない。'
  }
}

class Knight extends Villager{
  constructor(name){
    super(name);
    this.role = 'knight';
    this.role_jp = '騎士';
    this.action_sentence = '今晩守る人を決めてください｡';
    this.night_action = 'protect'
    this.description = '村人側。 毎晩指定した一人を人狼の襲撃から守る。自分は守ることはできない。';
  }
}

class Traitor extends Villager{
  constructor(name){
    super(name);
    this.role = 'traitor';
    this.role_jp = '裏切り者';
    this.winning_side = 1;
    this.description = '人狼側。 占いの結果には村人側と出る。夜には村人と同様に投票を行う。人狼は誰が裏切り者か知らず, 裏切り者も誰が人狼かわからない。';
  }
}

class WerewolfBeliever extends Villager{
  constructor(name){
    super(name);
    this.role = 'werewolf_believer';
    this.role_jp = '狼信者';
    this.winning_side = 1;
    this.description = '人狼側。しかし占いの結果には村人側と出る。夜には村人と同様に投票を行う。 狼信者は誰が人狼か知っている。 ただし人狼は誰が狼信者なのかわからない。';
  }
}

class Baker extends Villager{
  constructor(name){
    super(name);
    this.role = 'baker';
    this.role_jp = 'パン屋さん';
    this.description = '村人側。パン屋さんが生きていると毎朝焼きたてのパンの香りが漂ってくる。夜には村人同様に投票を行う。'
  }
}

class Psychic extends Villager{
  constructor(name){
    super(name);
    this.role = 'psychic';
    this.role_jp = '霊媒師';
    this.night_action = 'perceive';
    this.description = '村人側。 毎晩その日の朝に処刑された人が村人側か人狼側か知ることができる。ただし役職はわからない。そして村人同様に投票を行う。';
  }
}

class Haunted extends Villager{
  constructor(name){
    super(name);
    this.role = 'haunted';
    this.role_jp = '狼憑き';
    this.saw = 1;
    this.description = '村人側。 狼にとりつかれた村人。 占い結果に狼と出てしまう。 霊媒の結果は村人。 そして村人同様に投票を行う。';
  }
}


export {Villager, Werewolf, Seer, Knight, Traitor, WerewolfBeliever, Baker, Psychic, Haunted};
