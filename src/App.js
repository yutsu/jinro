import React from 'react';
// import logo from './logo.svg';
import './styles/App.scss';

import AddOption from './components/AddOption';
import CheckNumberOfPlayersAndRoles from './components/CheckNumberOfPlayersAndRoles';
import ConfirmIdentity from './components/ConfirmIdentity';
import ConfirmChoice from './components/ConfirmChoice';
import ConfirmChoiceAtExile from './components/ConfirmChoiceAtExile';
import GameResult from './components/GameResult';
import Header from './components/Header';
import ListToBeExiled from './components/ListToBeExiled';
import Options from './components/Options';
import OutcomeOfSeer from './components/OutcomeOfSeer';
import ResultOfMorning from './components/ResultOfMorning';
import ResultOfNight from './components/ResultOfNight';
import RoleDescription from './components/RoleDescription';
import RoleOptions from './components/RoleOptions';
import ShowRole from './components/ShowRole';
import Timer from './components/Timer';
import {Villager, Werewolf, Seer, Knight, Traitor, WerewolfBeliever, Baker, Psychic, Haunted, WerewolfGod, Sage, Ninjya, WeakWerewolf, LoneWerewolf, Pizzeria, WerewolfLinguist} from './components/Roles';




class WerewolfGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.updateNumberOfRoles = this.updateNumberOfRoles.bind(this);
    this.determineRoles = this.determineRoles.bind(this);
    this.nightActionRecord = this.nightActionRecord.bind(this);
    this.handleKilledAtNight = this.handleKilledAtNight.bind(this);
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
    this.restart = this.restart.bind(this);
    this.setTimerSeconds = this.setTimerSeconds.bind(this);
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
        'werewolf_linguist': WerewolfLinguist
      },

      ROLE_classes: [
        Villager,
        Werewolf,
        Seer,
        Knight,
        Traitor,
        WerewolfBeliever,
        Baker,
        Psychic,
        Haunted,
        WerewolfGod,
        Sage,
        Ninjya,
        WeakWerewolf,
        LoneWerewolf,
        Pizzeria,
        WerewolfLinguist
      ]
    }
    this.state = {
      players: [],
      players_selected: false,
      players_with_roles: [],
      role_determined: false,
      phase: 'night_confirm',
      n_each_role: {
        'villager':0,
        'werewolf':0,
        'seer':0,
        'knight':0,
        'traitor':0,
        'werewolf_believer': 0,
        'baker': 0,
        'psychic': 0,
        'haunted': 0,
        'werewolf_god': 0,
        'sage': 0,
        'ninjya': 0,
        'weak_werewolf': 0,
        'lone_werewolf': 0,
        'pizzeria': 0,
        'werewolf_linguist': 0
      },
      suspected_players: [],
      current_player_id: 0,
      night_action_to_be_killed: [],
      to_be_exiled: [],
      outcome_of_seer: [],
      pizza_order: [],
      pizza_delivery: [],
      to_be_confirmed: [],
      hide_options: false,
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



  updateNumberOfRoles(num, role){
    this.setState((prevState) => (prevState.n_each_role[role] = num + (num) * (num) *prevState.n_each_role[role]));
  }

  determineRoles(){
    if (this.numberOfPlayers() === this.numberOfSelectedRoles()){
      this.setState(() => ({ role_determined: true }));

      let roles = [];
      let n_each_role = this.state.n_each_role;
      let role;
      for (role in n_each_role) {
        while (n_each_role[role] > 0) {
          roles.push(role);
          n_each_role[role] --;
        }
      }

      // shuffle roles
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

  nightActionRecord(current_player_id, player, target_player, n_players) {
    if (this.state.turn === 1 || ['suspect', 'perceive'].includes(player.night_action)) {
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
    } else if (['see', 'see_role'].includes(player.night_action)) {
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

  mostSuspiciousPlayer(dead){
    let memo = {}
    let x;
    for (x of this.state.suspected_players) {
      if (x === dead){ continue;}
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

  restart() {
    console.log('restart')
    this.setState(() => ({ players_with_roles: [] }));
    this.setState(() => ({ role_determined: false }));
    this.setState(() => ({ phase: 'night' }));
    this.setState(() => ({ suspected_players: [] }));
    this.setState(() => ({ current_player_id: 0 }));
    this.setState(() => ({ night_action_to_be_killed: [] }));
    this.setState(() => ({ to_be_exiled: []}));
    this.setState(() => ({ outcome_of_seer: []}));
    this.setState(() => ({ pizza_order: []}));
    this.setState(() => ({ pizza_delivery: []}));
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
        <Header subtitle={subtitle} />
        <div className="container">

          <div className="widget">
            <Options
              players={this.state.players}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
              players_selected={this.state.players_selected}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
              players_selected={this.state.players_selected}
            />
          </div>

          <RoleDescription
            roleClasses={this.prop.ROLE_classes}
          />

          <RoleOptions
            players_selected={this.state.players_selected}
            updateNumberOfRoles={this.updateNumberOfRoles}
            roleClasses={this.prop.ROLE_classes}
          />

          <CheckNumberOfPlayersAndRoles
            players={this.state.players}
            n_each_role={this.state.n_each_role}
            determineRoles={this.determineRoles}
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
      />
      </div>
      );

    let night_result = (
      <div>
        <ResultOfNight
          suspected_players={this.suspected_players}
          night_action_to_be_killed={this.night_action_to_be_killed}
          handleKilledAtNight={this.handleKilledAtNight}
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
