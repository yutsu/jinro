import React from 'react';

export default class CheckNumberOfPlayersAndRoles extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            valid: false
        }

    }


    numberOfPlayers () {
        return this.props.players.length
    }
    numberOfRoles () {
        let count = 0;
        for (let x of Object.values(this.props.n_each_role)) {
            count += x
        }
        return count
    }



    render () {
        let diff = this.numberOfPlayers() - this.numberOfRoles()

        return (
            <div>
                <div className='widget'>
                    { diff > 0 && <div className='widget__message'>
                        プレイヤーは全部で{this.numberOfPlayers()}人。 役職を後{this.numberOfPlayers() - this.numberOfRoles()}つ選んでください。
                    </div>}
                    { diff < 0 && <div className='widget__message'>
                        プレイヤーは全部で{this.numberOfPlayers()}人。 役職を後{this.numberOfRoles() - this.numberOfPlayers()}つ減らしてください。
                    </div>}
                    { this.numberOfPlayers() === 0 && <div className='widget__message'>
                        プレイヤーを登録してください。

                    </div>}
                    { diff === 0 && <div className='widget__message'>
                        プレイヤーは全部で{this.numberOfPlayers()}人。 ゲームを開始できます。
                    </div>}
                </div>

                 <button
                    disabled={this.numberOfPlayers() - this.numberOfRoles() !== 0}
                    className='big-button' onClick={this.props.determineRoles}>
                  開始する!
                </button>
            </div>
            )
    }
}
