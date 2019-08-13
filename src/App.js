import React from 'react';
// import logo from './logo.svg';
import './styles/App.scss';

import AddOption from './components/AddOption';
import BGMOnOff from './components/BGMOnOff';
import CheckNumberOfPlayersAndRoles from './components/CheckNumberOfPlayersAndRoles';
import ConfirmIdentity from './components/ConfirmIdentity';
import ConfirmChoice from './components/ConfirmChoice';
import ConfirmChoiceAtExile from './components/ConfirmChoiceAtExile';
import GameResult from './components/GameResult';
import Header from './components/Header';
import ListToBeExiled from './components/ListToBeExiled';
import Options from './components/Options';
import OutcomeOfSeer from './components/OutcomeOfSeer';
import RandomRoles from './components/RandomRoles';
import ResultOfMorning from './components/ResultOfMorning';
import ResultOfNight from './components/ResultOfNight';
import RoleDescription from './components/RoleDescription';
import RoleOptions from './components/RoleOptions';
import ShowRole from './components/ShowRole';
import Timer from './components/Timer';
import {Villager, Werewolf, Seer, Knight, Traitor, WerewolfBeliever, Baker, Psychic, Haunted, WerewolfGod, Sage, Ninjya, WeakWerewolf, LoneWerewolf, Pizzeria, ImpatientPizzeria, WerewolfLinguist, Wolfman, Tolkative, Samurai, BadSamurai, YoungSeer} from './components/Roles';




class WerewolfGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleBGM = this.handleBGM.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.updateNumberOfRoles = this.updateNumberOfRoles.bind(this);
    this.determineRoles = this.determineRoles.bind(this);
    this.nightActionRecord = this.nightActionRecord.bind(this);
    this.handle_random_level = this.handle_random_level.bind(this);
    this.handleKilledAtNight = this.handleKilledAtNight.bind(this);
    this.handleSamuraiKilledAtNight = this.handleSamuraiKilledAtNight.bind(this);
    this.handlePizzaOrder = this.handlePizzaOrder.bind(this);
    this.handleWinningSide = this.handleWinningSide.bind(this);
    this.mostSuspiciousPlayer = this.mostSuspiciousPlayer.bind(this);
    this.morningPhase = this.morningPhase.bind(this);
    this.nightPhase = this.nightPhase.bind(this);
    this.nightConfirmPhase = this.nightConfirmPhase.bind(this);
    this.choiceConfirmPhase = this.choiceConfirmPhase.bind(this);
    this.gameResultPhase = this.gameResultPhase.bind(this);
    this.isBakerAlive = this.isBakerAlive.bind(this);
    this.choiceConfirmAtExilePhase = this.choiceConfirmAtExilePhase.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
    this.exile = this.exile.bind(this);
    this.exile2 = this.exile2.bind(this);
    this.removeProtection = this.removeProtection.bind(this);
    this.resetSuspectedPlayers = this.resetSuspectedPlayers.bind(this);
    this.resetToBeKilledPlayer = this.resetToBeKilledPlayer.bind(this);
    this.resetToBeSamuraiKilledPlayer = this.resetToBeSamuraiKilledPlayer.bind(this);
    this.restart = this.restart.bind(this);
    this.setTimerSeconds = this.setTimerSeconds.bind(this);
    this.toggleRandomSwitchRoles = this.toggleRandomSwitchRoles.bind(this);
    this.prop = {
       ROLES: {
        'villager': Villager,
        'werewolf': Werewolf,
        'seer': Seer,
        'knight': Knight,
        'traitor': Traitor,
        'werewolf_believer': WerewolfBeliever,
        'baker': Baker,
        'psychic': Psychic,
        'haunted': Haunted,
        'werewolf_god': WerewolfGod,
        'sage': Sage,
        'ninjya': Ninjya,
        'weak_werewolf': WeakWerewolf,
        'lone_werewolf': LoneWerewolf,
        'pizzeria': Pizzeria,
        'impatient_pizzeria': ImpatientPizzeria,
        'werewolf_linguist': WerewolfLinguist,
        'wolfman': Wolfman,
        'tolkative': Tolkative,
        'samurai': Samurai,
        'bad_samurai': BadSamurai,
        'young_seer': YoungSeer
      }
    };

    let n_each_role = {};
    Object.keys(this.prop.ROLES).map((role) => n_each_role[role] = 0);

    this.state = {
      bgm: true,
      players: [],
      players_with_roles: [],
      role_determined: false,
      phase: 'night_confirm',
      n_each_role: n_each_role,
      suspected_players: [],
      current_player_id: 0,
      night_action_to_be_killed: [],
      night_action_to_be_samurai_killed: [],
      to_be_exiled: [],
      outcome_of_seer: [],
      pizza_order: [],
      pizza_delivery: [],
      random_level: 0,
      to_be_confirmed: [],
      hide_options: false,
      random_switch_roles: false,
      turn: 1
    };
  }


  componentDidMount() {
    try {
      const json = localStorage.getItem('players');
      const players = JSON.parse(json);

      if (players) {
        this.setState(() => ({ players }));
      }
    } catch (e) {
      // Do nothing at all
    }

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.players.length !== this.state.players.length) {
      const json = JSON.stringify(this.state.players);
      localStorage.setItem('players', json);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  handleDeleteOptions() {
    this.setState(() => ({ players: [] }));
  }
  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      players: prevState.players.filter((option) => optionToRemove !== option)
    }));
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.players.length);
    const option = this.state.players[randomNum];
    alert(option);
  }
  handleAddOption(option) {
    if (!option) {
      return '名前を入力してください。';
    } else if (this.state.players.indexOf(option) > -1) {
      return 'この名前はすでに使われています｡';
    }

    this.setState((prevState) => ({
      players: prevState.players.concat(option)
    }));
  }

  handleBGM() {
    this.setState((prevState) => ({
      bgm: !prevState.bgm
    }))
  }



  updateNumberOfRoles(num, role){
    this.setState((prevState) => (prevState.n_each_role[role] = num + (num) * (num) *prevState.n_each_role[role]));
  }

  determineRoles(){
    if (this.numberOfPlayers() === this.numberOfSelectedRoles()){
      this.setState(() => ({ role_determined: true }));

      let level = this.state.random_level;
      let roles = [];
      let n_each_role = this.state.n_each_role;
      let role;
      for (role in n_each_role) {
        while (n_each_role[role] > 0) {
          let random_role = role;
          if (this.state.random_switch_roles) {
            random_role = this.randomlySwitchRoles(role, level);
          }
          roles.push(random_role);
          n_each_role[role] --;
        }
      }

      // shuffle roles
      for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
      }

      // shuffle roles again
      for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
      }

      // Assign roles to players
      for (let i=0; i < roles.length; i++) {
        let player = new this.prop.ROLES[roles[i]](this.state.players[i])
        this.setState((prevState) => ({
          players_with_roles: prevState.players_with_roles.concat(player)
        }));

        }

    } else{
      console.log('n_roles != n_players');
      console.log(this.numberOfPlayers());
      console.log(this.numberOfSelectedRoles());
    }
  }

  randomlySwitchRoles(role, level=0) {
    let role_list = Object.keys(this.prop.ROLES);
    let CurRole = new this.prop.ROLES[role]('anonymous');
    let side = CurRole.side;

    const j = Math.floor(Math.random() * role_list.length)
    let new_role = role_list[j];
    let NewRole = new this.prop.ROLES[new_role]('anonymous');

    if (level === 2) {
      if (NewRole.side === side) {
        return new_role
      } else {
        return role
      }
    } else if (level === 0){
      if (NewRole.side === side && NewRole.random_level === 0) {
        return new_role
      } else {
        return role
      }
    } else {
      if (NewRole.side === side && NewRole.random_level <= 1) {
              return new_role
            } else {
              return role
            }
     }
  }

  toggleRandomSwitchRoles() {
    this.setState((prevState) => ({
      random_switch_roles: !prevState.random_switch_roles
    }))
  }

  handle_random_level(value) {
    this.setState( { random_level: value })
  }



  nightActionRecord(current_player_id, player, target_player, n_players) {
    // turn 1 special action
    if (player.night_action === 'fast_deliver_pizza') {
      this.setState((prevState) => ({
          pizza_order: [...this.state.pizza_order, ...[[player, target_player]]]})
        )
    //  turn 1 normal action
    } else if (this.state.turn === 1 || ['suspect', 'perceive'].includes(player.night_action)) {
      this.setState((prevState) => ({
              suspected_players: prevState.suspected_players.concat(target_player.name)
            }));
    } else if (player.night_action === 'kill') {
      this.setState((prevState) => ({
              night_action_to_be_killed: [target_player]
            }));
    } else if (player.night_action === 'weak_kill') {
      let prob = Math.random();
      if (prob > 0.5) {
        this.setState((prevState) => ({
                night_action_to_be_killed: [target_player]
              }));
      }
    } else if (player.night_action === 'samurai_kill') {
      this.setState((prevState) => ({
              night_action_to_be_samurai_killed: [...this.state.night_action_to_be_samurai_killed,target_player]
            }));
      player.you_can_kill -= 1;
      if (player.you_can_kill === 0) {
        player.night_action = 'suspect';
        player.action_sentence = 'もっとも疑わしい人を一人選んでください｡ (刀が錆びている。。。)'
      }
    } else if (['see', 'see_role', 'young_see'].includes(player.night_action)) {
      this.setState({ outcome_of_seer: [target_player]})
    } else if (player.night_action === 'protect') {
      target_player.protected = true
    } else if (player.night_action === 'deliver_pizza') {
      this.setState((prevState) => ({
          pizza_order: [...this.state.pizza_order, ...[[player, target_player]]]})
        )
    } else if (player.night_action === 'hide') {
      // just hiding
    } else {
      console.log('unknown night action');
      console.log(current_player_id, player, target_player, n_players);
    }

    this.setState({hide_options: true});
}


  nextPlayer(currentPlayerId, current_role, n_players) {
    this.setState({ outcome_of_seer: []})

    currentPlayerId ++;
    if (currentPlayerId < n_players){
     this.setState(() => ({ current_player_id: currentPlayerId }));

     this.setState(() => ({
     phase: 'night_confirm'
     }))

    } else if (currentPlayerId === n_players){
      this.setState(() => ({ current_player_id: 0 }));
      this.setState(() => ({ phase: 'night_action_completed' }));
    } else {
      console.log('something wrong with nextPlayer')
      console.log('next player')
      console.log(currentPlayerId)
      console.log(n_players)
    }

    this.setState({hide_options: false});
  }

  handleKilledAtNight(turn){
    // This case is for development purpose
    if (this.state.night_action_to_be_killed.length === 0) {
      return -1
    }

    let killed_player = this.state.night_action_to_be_killed[0];
    if (turn === 1 || killed_player.protected) {
      return -1
    }

    if (killed_player.role === 'werewolf_linguist') {
      killed_player.role = 'werewolf';
      killed_player.role = 'werewolf';
      killed_player.role_jp = '人狼';
      killed_player.side = 1;
      killed_player.winning_side = 1
      killed_player.saw = 1;
      killed_player.perceived = '人狼'
      killed_player.killable = false;
      killed_player.action_sentence = '今晩襲う人を決めてください｡';
      killed_player.night_action = 'kill'
      killed_player.description = '夜に殺害する人を一人選ぶ。 最後の人狼に最終決定権がある。人狼同士は誰が人狼かわかっている。 人狼同士は殺し合えない。'
      return -1
    }

    if (turn !== 1) {
      killed_player.alive = false;
    }
    return killed_player.name
  }

  handleSamuraiKilledAtNight(turn){
    let samurai_killed_players = this.state.night_action_to_be_samurai_killed;

    if (turn === 1 || samurai_killed_players.length === 0) {
      return -1
    } else {
      let player;
      for (player of samurai_killed_players) {
        player.alive = false;
      }

      return samurai_killed_players.map((player) => (player.name))
    }
  }


  mostSuspiciousPlayer(dead, dead_list){
    let memo = {}
    let x;
    for (x of this.state.suspected_players) {
      if (x === dead){ continue;}
      if (dead_list !== -1 && dead_list.includes(x)){ continue;}

      if (memo[x]) {
        memo[x] ++;
      } else {
        memo[x] = 1;
      }
    }

    let max = 0
    let i;
    for (i of Object.values(memo)){
      if (i > max){
        max = i
      }
    }

    let result = []
    for (let key of Object.keys(memo)) {
      if (memo[key] === max) {
        result.push(key)
      }
    }

    return result
  }

  exile(player) {
    if (player !== undefined){
      player.alive = false;
      this.exile2(player.name, player.perceived); // Can't do exile2(player)
    } else {
      this.setState({ to_be_exiled: []})
    }
    this.morningActionCompletedPhase();
    this.resetSuspectedPlayers();
    this.resetToBeKilledPlayer();
    this.resetToBeSamuraiKilledPlayer();
  }
  exile2(player, perceived) {
    this.setState((prevState) => ({to_be_exiled: [player, perceived] }));
  }

  morningActionCompletedPhase() {
    this.setState((prevState) => ({
    phase: (prevState.phase = 'morning_action_completed')
    }));
  }

  removeProtection () {
    this.state.players_with_roles
    .filter((player) => (player.role !== 'ninjya'))
    .forEach((player) => {player.protected = false})
  }

  handlePizzaOrder () {
    this.setState((prevState) => ({
      pizza_delivery: prevState.pizza_order
      }));
    this.setState({pizza_order: []});
    }


  setTimerSeconds() {
    let n_alive_players = this.numberOfAliveVillagers() + this.numberOfAliveWerewolves;

    if (n_alive_players < 4) {
      return 180
    } else if (n_alive_players === 4) {
      return 240
    } else if (n_alive_players === 5) {
      return 300
    } else {
      return 360
    }
  }

  resetSuspectedPlayers () {
    this.setState(() => ({ suspected_players: []}))
  }

  resetToBeKilledPlayer () {
    this.setState(() => ({ night_action_to_be_killed: []}))
  }

  resetToBeSamuraiKilledPlayer () {
    this.setState(() => ({ night_action_to_be_samurai_killed: []}))
  }

  restart() {
    console.log('restart')
    this.setState(() => ({ players_with_roles: [] }));
    this.setState(() => ({ role_determined: false }));
    this.setState(() => ({ phase: 'night_confirm' }));
    this.setState(() => ({ suspected_players: [] }));
    this.setState(() => ({ current_player_id: 0 }));
    this.setState(() => ({ night_action_to_be_killed: [] }));
    this.setState(() => ({ night_action_to_be_samurai_killed: [] }));
    this.setState(() => ({ to_be_exiled: []}));
    this.setState(() => ({ to_be_confirmed: []}));
    this.setState(() => ({ outcome_of_seer: []}));
    this.setState(() => ({ pizza_order: []}));
    this.setState(() => ({ pizza_delivery: []}));
    this.setState(() => ({ random_switch_roles: false }));
    this.setState(() => ({ turn: 1}));
  }

  isBakerAlive() {
    let alive = false;
    let x;
    for (x of this.state.players_with_roles) {
      if (x.role === 'baker' && x.alive) {
        alive = true
      }
    }
    return alive
  }

  numberOfPlayers(){
    return(this.state.players.length)
  }

  numberOfSelectedRoles(){
    return(Object.values(this.state.n_each_role).reduce((a,b) => a+b, 0))
  }

  numberOfAliveVillagers() {
    let count = 0
    let x;
    for (x of this.state.players_with_roles) {
      if (x.side === 0 && x.alive) {
        count ++;
      }
    }
    return count
  }

  numberOfAliveWerewolves() {
    let count = 0
    let x;
    for (x of this.state.players_with_roles) {
      if (x.side === 1 && x.alive) {
        count ++;
      }
    }
    return count
  }

  handleWinningSide() {
    if (this.numberOfAliveVillagers() <= this.numberOfAliveWerewolves()) {
      return 1
    } else if (this.numberOfAliveWerewolves() === 0) {
      return 0
    } else {
      return -1
    }
  }



  morningPhase() {
    this.setState(() => ({
    phase: 'morning'
    }))
    this.nextTurn()
  }

  nightPhase() {
    this.setState(() => ({
    phase: 'night'
    }))
  }

  nightConfirmPhase() {
    this.setState(() => ({
    phase: 'night_confirm'
    }))
  }

  choiceConfirmPhase(info) {
    this.setState({ to_be_confirmed:[info]});
    this.setState(() => ({
    phase: 'choice_confirm'
    }))
  }

  choiceConfirmAtExilePhase(info) {
    this.setState({ to_be_confirmed:info});
    this.setState(() => ({
    phase: 'choice_confirm_at_exile'
    }))
  }

  gameResultPhase(){
    this.setState({ phase: 'game_result'})
  }

  nextTurn() {
    this.setState((prevState) => ({
      turn: prevState.turn + 1
    }))
  }

  render() {
    const subtitle = '村人 vs 人狼';
    let register = (<div>
        <Header
          subtitle={subtitle}
          bgm={this.state.bgm}
          />
        <div className="container">

          <div className="widget">
            <Options
              players={this.state.players}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>

          <RoleDescription
            roleClasses={Object.values(this.prop.ROLES)}
          />

          <RoleOptions
            updateNumberOfRoles={this.updateNumberOfRoles}
            roleClasses={Object.values(this.prop.ROLES)}
          />

          <CheckNumberOfPlayersAndRoles
            players={this.state.players}
            n_each_role={this.state.n_each_role}
            determineRoles={this.determineRoles}
          />

          <BGMOnOff
            handleBGM={this.handleBGM}
          />
          <RandomRoles
            toggleRandomSwitchRoles={this.toggleRandomSwitchRoles}
            random_level={this.random_level}
            handle_random_level={this.handle_random_level}
            roleClasses={Object.values(this.prop.ROLES)}
          />
        </div>

      </div>);

    let night_confirm = (
      <div>
        <ConfirmIdentity
          current_player_id={this.state.current_player_id}
          players_with_roles={this.state.players_with_roles}
          nightPhase={this.nightPhase}
        />
      </div>)

    let choice_confirm = (
      <div>
        <ConfirmChoice
          to_be_confirmed={this.state.to_be_confirmed}
          nightPhase={this.nightPhase}
          nightActionRecord={this.nightActionRecord}
          hide_options={this.state.hide_options}
        />
        <OutcomeOfSeer
          current_player_id={this.state.current_player_id}
          players_with_roles={this.state.players_with_roles}
          outcome_of_seer={this.state.outcome_of_seer}
          nextPlayer={this.nextPlayer}
          turn={this.state.turn}
          hide_options={this.state.hide_options}
        />
      </div>)

    let choice_confirm_at_exile = (
      <div>
        <ConfirmChoiceAtExile
          players_with_roles={this.state.players_with_roles}
          to_be_confirmed={this.state.to_be_confirmed}
          morningPhase={this.morningPhase}
          exile={this.exile}
        />
      </div>)

    let night = (
      <div>
      <ShowRole
        bgm={this.state.bgm}
        current_player_id={this.state.current_player_id}
        players_with_roles={this.state.players_with_roles}
        turn={this.state.turn}
        nextPlayer={this.nextPlayer}
        outcome_of_seer={this.state.outcome_of_seer}
        choiceConfirmPhase={this.choiceConfirmPhase}
        to_be_exiled={this.state.to_be_exiled}
        night_action_to_be_killed={this.state.night_action_to_be_killed}
        pizza_order={this.state.pizza_order}
        pizza_delivery={this.state.pizza_delivery}
        roleClasses={Object.values(this.prop.ROLES)}
      />
      </div>
      );

    let night_result = (
      <div>
        <ResultOfNight
          bgm={this.state.bgm}
          suspected_players={this.suspected_players}
          night_action_to_be_killed={this.night_action_to_be_killed}
          night_action_to_be_samurai_killed={this.night_action_to_be_samurai_killed}
          handleKilledAtNight={this.handleKilledAtNight}
          handleSamuraiKilledAtNight={this.handleSamuraiKilledAtNight}
          handleWinningSide={this.handleWinningSide}
          mostSuspiciousPlayer={this.mostSuspiciousPlayer}
          morningPhase={this.morningPhase}
          removeProtection={this.removeProtection}
          players_with_roles={this.state.players_with_roles}
          turn={this.state.turn}
          gameResultPhase={this.gameResultPhase}
          isBakerAlive={this.isBakerAlive}
          handlePizzaOrder={this.handlePizzaOrder}
        />
      </div>);

    let morning_exile = (
      <div>
        <Timer
          setTimerSeconds={this.setTimerSeconds}
          bgm={this.state.bgm}
        />
        <ListToBeExiled
          players_with_roles={this.state.players_with_roles}
          exile={this.exile}
          choiceConfirmAtExilePhase={this.choiceConfirmAtExilePhase}
        />
      </div>);

    let morning_result = (
      <div>
        <ResultOfMorning
          bgm={this.state.bgm}
          handleWinningSide={this.handleWinningSide}
          to_be_exiled={this.state.to_be_exiled}
          nightConfirmPhase={this.nightConfirmPhase}
          players_with_roles={this.state.players_with_roles}
          gameResultPhase={this.gameResultPhase}
          handlePizzaOrder={this.handlePizzaOrder}
        />
      </div>);

    let game_result = (
      <div>
        <GameResult
          bgm={this.state.bgm}
          handleWinningSide={this.handleWinningSide}
          players_with_roles={this.state.players_with_roles}
          restart={this.restart}
        />
      </div>)

    if (!this.state.role_determined){
      return (
        register
      );
    } else if (this.state.phase === 'night_confirm') {
      return (
        night_confirm
        );
    } else if (this.state.phase === 'night'){
      return (
        night
        );
    } else if (this.state.phase === 'choice_confirm'){
      return (
        choice_confirm
        );
    } else if (this.state.phase === 'night_action_completed'){
      return (
        night_result
        );
    } else if (this.state.phase === 'morning'){
      return (
        morning_exile
        );
    } else if (this.state.phase === 'choice_confirm_at_exile'){
      return (
        choice_confirm_at_exile
        );
    } else if (this.state.phase === 'morning_action_completed'){
      return (
        morning_result
        );
    } else if (this.state.phase === 'game_result'){
      return (
        game_result
        );
    } else {
      return(<div>else</div>);
    }
  }
};

export default WerewolfGame;
