import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import Header from './components/Header';
import Action from './components/Action';
import AddOption from './components/AddOption';
import Options from './components/Options';
import ResultOfMorning from './components/ResultOfMorning';
import ResultOfNight from './components/ResultOfNight';
import RoleOptions from './components/RoleOptions';
import ListToBeExiled from './components/ListToBeExiled';
import ConfirmIdentity from './components/ConfirmIdentity';
import SelectRoles from './components/SelectRoles';
import ShowRole from './components/ShowRole';
import {Villager, Werewolf, Seer, Knight} from './components/Roles';




class WerewolfGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handleSelectRoles = this.handleSelectRoles.bind(this);
    this.updateNumberOfRoles = this.updateNumberOfRoles.bind(this);
    this.determineRoles = this.determineRoles.bind(this);
    this.nightActionRecord = this.nightActionRecord.bind(this);
    this.handleKilledAtNight = this.handleKilledAtNight.bind(this);
    this.handleWinningSide = this.handleWinningSide.bind(this);
    this.mostSuspiciousPlayer = this.mostSuspiciousPlayer.bind(this);
    this.morningPhase = this.morningPhase.bind(this);
    this.nightPhase = this.nightPhase.bind(this);
    this.nightConfirmPhase = this.nightConfirmPhase.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
    this.exile = this.exile.bind(this);
    this.removeProtection = this.removeProtection.bind(this);
    this.restart = this.restart.bind(this);
    this.state = {
      players: [],
      players_selected: false,
      players_with_roles: [],
      role_determined: false,
      phase: 'night_confirm',
      possible_roles: ['villager', 'werewolf', 'seer', 'knight'],
      n_each_role: {'villager':0, 'werewolf':0, 'seer':0, 'knight':0},
      suspected_players: [],
      current_player_id: 0,
      night_action_to_be_killed: [],
      to_be_exiled: [],
      outcome_of_seer: []
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
      return 'Enter valid value to add item';
    } else if (this.state.players.indexOf(option) > -1) {
      return 'この名前はすでに使われています｡';
    }

    this.setState((prevState) => ({
      players: prevState.players.concat(option)
    }));
  }

  handleSelectRoles(){
    console.log('select roles');
    this.setState(() => ({ players_selected: true }));
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

      for (let i=0; i < roles.length; i++) {
        if (roles[i] === 'villager') {
          let player = new Villager(this.state.players[i], true, 'villager', 0, true)
          this.setState((prevState) => ({
            players_with_roles: prevState.players_with_roles.concat(player)
          }));
        }
        if (roles[i] === 'werewolf') {
          let player = new Werewolf(this.state.players[i], true, 'werewolf', 1, true)
          this.setState((prevState) => ({
            players_with_roles: prevState.players_with_roles.concat(player)
          }));
        }
        if (roles[i] === 'seer') {
          let player = new Seer(this.state.players[i], true, 'seer', 0, true)
          this.setState((prevState) => ({
            players_with_roles: prevState.players_with_roles.concat(player)
          }));
        }
        if (roles[i] === 'knight') {
          let player = new Knight(this.state.players[i], true, 'knight', 0, true)
          this.setState((prevState) => ({
            players_with_roles: prevState.players_with_roles.concat(player)
          }));
        }
      }

    } else{
      console.log('n_roles != n_players')
    }
  }

  nightActionRecord(current_player_id, current_role, target_player, n_players) {
    if (current_role === 'villager') {
      this.setState((prevState) => ({
              suspected_players: prevState.suspected_players.concat(target_player.name)
            }));
    } else if (current_role === 'werewolf') {
      this.setState((prevState) => ({
              night_action_to_be_killed: [target_player]
            }));

    } else if (current_role === 'seer') {
      this.setState({ outcome_of_seer: [target_player]})
    } else if (current_role === 'knight') {
      target_player.protected = true
    } else {
      console.log('unknown role')
    }



    // this.nextPlayer(current_player_id, current_role, n_players)
}

  nextPlayer(currentPlayerId, current_role, n_players) {
    this.setState({ outcome_of_seer: []})

    currentPlayerId ++;
    if (currentPlayerId < n_players){
     this.setState(() => ({ current_player_id: currentPlayerId }));

     this.setState(() => ({
     phase: 'night_confirm'
     }))

    } else {
      this.setState(() => ({ current_player_id: 0 }));
      this.setState(() => ({ phase: 'night_action_completed' }));
    }
  }

  handleKilledAtNight(){

    let killed_player = this.state.night_action_to_be_killed[0];
    if (killed_player.protected) {
      return 'いませんでした｡'
    }
    killed_player.alive = false;
    return killed_player.name + 'さんでした｡'
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
    player.alive = false;
    this.exile2(player.name);
    this.morningActionCompletedPhase();
  }
  exile2(player) {
    this.setState((prevState) => ({to_be_exiled: [player] }));
  }

  morningActionCompletedPhase() {
    this.setState((prevState) => ({
    phase: (prevState.phase = 'morning_action_completed')
    }));
  }

  removeProtection () {
    this.state.players_with_roles.map((player) => player.protected = false)
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
    this.setState(() => ({ outcome_of_seer: []}))
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
    if (this.numberOfAliveVillagers() === this.numberOfAliveWerewolves()) {
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

  render() {
    const subtitle = 'プレイヤーを登録してください';
    let register = (<div>
        <Header subtitle={subtitle} />
        <Action
          players_selected={this.state.players_selected}
          hasOptions={this.state.players.length > 0}
          handlePick={this.handlePick}
        />
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
        <SelectRoles
          hasOptions={this.state.players.length > 0}
          handleSelectRoles={this.handleSelectRoles}
        />
        {this.state.players_selected && <p>どの役割を使いますか?</p>}
        <RoleOptions
        players_selected={this.state.players_selected}
        updateNumberOfRoles={this.updateNumberOfRoles}
        determineRoles={this.determineRoles}
        />
      </div>);

    let night_confirm = (
      <div>
      <p>プレイヤーを確認します｡</p>
        <ConfirmIdentity
          current_player_id={this.state.current_player_id}
          players_with_roles={this.state.players_with_roles}
          nightPhase={this.nightPhase}
        />
      </div>)

    let night = (
      <div>
      <ShowRole
        current_player_id={this.state.current_player_id}
        players_with_roles={this.state.players_with_roles}
        nightActionRecord={this.nightActionRecord}
        nextPlayer={this.nextPlayer}
        outcome_of_seer={this.state.outcome_of_seer}
      />
      </div>
      );

    let night_result = (
      <div>
        <p>朝になりました｡</p>
        <ResultOfNight
          suspected_players={this.suspected_players}
          night_action_to_be_killed={this.night_action_to_be_killed}
          handleKilledAtNight={this.handleKilledAtNight}
          handleWinningSide={this.handleWinningSide}
          mostSuspiciousPlayer={this.mostSuspiciousPlayer}
          morningPhase={this.morningPhase}
          removeProtection={this.removeProtection}
          restart={this.restart}
        />
      </div>);

    let morning_exile = (
      <div>
        <p>追放する人を決めてください｡</p>
        <ListToBeExiled
          players_with_roles={this.state.players_with_roles}
          exile={this.exile}
        />
      </div>);

    let morning_result = (
      <div>
        <ResultOfMorning
          handleWinningSide={this.handleWinningSide}
          to_be_exiled={this.state.to_be_exiled}
          nightPhase={this.nightPhase}
          restart={this.restart}
        />
      </div>);

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
    } else if (this.state.phase === 'night_action_completed'){
      return (
        night_result
        );
    } else if (this.state.phase === 'morning'){
      return (
        morning_exile
        );
    } else if (this.state.phase === 'morning_action_completed'){
      return (
        morning_result
        );
    } else {
      return(<div>else</div>);
    }
  }
};

export default WerewolfGame;
