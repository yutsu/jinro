
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
    this.perceived = '村人' // 霊能結果
    this.killable = true; // 人狼に殺される可能性
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
    this.perceived = '人狼'
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
    this.description = '人狼側。 しかし占いの結果と霊媒結果には村人側と出る。夜には村人と同様に投票を行う。人狼は誰が裏切り者か知らず, 裏切り者も誰が人狼かわからない。';
  }
}

class WerewolfBeliever extends Villager{
  constructor(name){
    super(name);
    this.role = 'werewolf_believer';
    this.role_jp = '狼信者';
    this.winning_side = 1;
    this.description = '人狼側。しかし占いの結果と霊媒結果には村人側と出る。夜には村人と同様に投票を行う。 狼信者は誰が人狼か知っている。 ただし人狼は誰が狼信者なのかわからない。';
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
    this.description = '村人側。 毎晩その日の朝に処刑された人が村人か人狼か知ることができる。ただし役職はわからない。そして村人同様に投票を行う。';
  }
}

class Haunted extends Villager{
  constructor(name){
    super(name);
    this.role = 'haunted';
    this.role_jp = '狼憑き';
    this.saw = 1;
    this.perceived = '人狼'
    this.description = '村人側。 狼にとりつかれた村人。 占い結果と霊媒結果に人狼と出てしまう。 そして村人同様に投票を行う。';
  }
}

class WerewolfGod extends Werewolf {
  constructor(name){
    super(name);
    this.role = 'werewolf_god';
    this.role_jp = '神狼';
    this.saw = 0;
    this.perceived = '神狼';
    this.description = '人狼側。 ただし占い結果に村人と出る。 霊媒結果は神狼となる。夜には通常の人狼同様に殺害する人を一人選ぶ。人狼と狼信者には人狼として知られている。'
  }
}

class Sage extends Seer {
  constructor(name) {
    super(name);
    this.role = 'sage';
    this.role_jp = '賢者';
    this.night_action ='see_role';
    this.description = '村人側。毎晩役職まで知ることができる占いを行う。'
  }
}

class Ninjya extends Villager {
  constructor(name) {
    super(name);
    this.role = 'ninjya';
    this.role_jp = '忍者';
    this.night_action = 'hide';
    this.protected = true;
    this.action_sentence = '隠れ身の術!!';
    this.description = '村人側。 隠れ身の術で狼の襲撃から逃れることができる。その代わり夜の投票に参加できない。'
  }
}

class WeakWerewolf extends Werewolf {
  constructor(name){
    super(name);
    this.role = 'weak_werewolf';
    this.role_jp = '弱人狼';
    this.night_action = 'weak_kill'
    this.description = '人狼側。 夜の襲撃に50%の確率で失敗する以外は通常の人狼'
  }
}

class LoneWerewolf extends Werewolf {
  constructor(name){
    super(name);
    this.role = 'lone_werewolf';
    this.role_jp = '一匹狼';
    this.killable = true;
    this.description = '人狼側。 他の人狼や狼信者にも正体を知られていない人狼。また他の人狼が誰なのかわからない。仲間の人狼を殺す可能性と殺される可能性がある。'
  }
}

class Pizzeria extends Villager {
  constructor(name) {
    super(name);
    this.role = 'pizzeria';
    this.role_jp = 'ピザ屋さん';
    this.night_action = 'deliver_pizza';
    this.action_sentence = 'ピザをお届けする人を選んでください。';
    this.description = '村人側。毎晩ピザを届ける人を選ぶ。ピザは次の日の夜に届く。届けた相手にはピザ屋だとバレる。'
  }
}

class ImpatientPizzeria extends Pizzeria {
  constructor(name) {
    super(name);
    this.role = 'impatient_pizzeria';
    this.role_jp = 'せっかちピザ屋さん';
    this.night_action = 'fast_deliver_pizza';
    this.description = '村人側。毎晩ピザを届ける人を選ぶ。ピザは次の日の夜に届く。届けた相手にはピザ屋だとバレる。せっかちなので最初の夜からピザの送り先を指定する。'
  }
}

class WerewolfLinguist extends Villager{
  constructor(name){
    super(name);
    this.role = 'werewolf_linguist';
    this.role_jp = '狼言語学者';
    this.winning_side = 1;
    this.description = '人狼側。 しかし占いの結果と霊媒結果には村人側と出る。夜には村人と同様に投票を行う。人狼は誰が狼言語学者か知らず, 狼言語学者も誰が人狼かわからない。狼の言語がわかり狼に襲撃されると, 命を助ける代わりに狼にされる。変身後は狼と同様。騎士に守られた場合には変身しない。';
  }
}

class Wolfman extends Villager{
  constructor(name){
    super(name);
    this.role = 'wolfman';
    this.role_jp = '狼男';
    this.night_action = 'kill';
    this.action_sentence = '狼に変身しました。 今晩襲う人を決めてください｡';
    this.description = '村人側。しかし夜には狼に変身してしまう。人狼や狼信者に正体はバレない。';
  }
}

class Tolkative extends Villager{
  constructor(name){
    super(name);
    this.role = 'tolkative';
    this.role_jp = 'おしゃべり';
    this.description = '村人側。死んでも追放会議に参加できる。';
  }
}

class Samurai extends Villager{
  constructor(name){
    super(name);
    this.role = 'samurai';
    this.role_jp = '侍';
    this.night_action = 'samurai_kill';
    this.you_can_kill = 1;
    this.can_skip_action = true;
    this.action_sentence = '斬り殺す人を一人選べます。';
    this.description = '村人側。ゲーム中に一回のみ選んだ人を斬り殺す。騎士に守られた人や忍者でも容赦しない。';
  }
}

class BadSamurai extends Samurai{
  constructor(name){
    super(name);
    this.role = 'bad_samurai';
    this.role_jp = '人斬り侍';
    this.action_sentence = '斬り殺す人を選んでください。'
    this.you_can_kill = 10000;
    this.can_skip_action = false;
    this.description = '村人側。最凶の侍。毎ターン必ず一人を選んで斬殺する。騎士に守られた人や忍者でも容赦しない。';
  }
}

export {Villager, Werewolf, Seer, Knight, Traitor, WerewolfBeliever, Baker, Psychic, Haunted, WerewolfGod, Sage, Ninjya, WeakWerewolf, LoneWerewolf, Pizzeria, ImpatientPizzeria, WerewolfLinguist, Wolfman, Tolkative, Samurai, BadSamurai};
