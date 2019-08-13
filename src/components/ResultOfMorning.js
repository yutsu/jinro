import React from 'react';
import Sound from 'react-sound';


export default class ResultOfMorning extends React.Component {
  constructor(props) {
    super(props);
    this.afterWillPhase = this.afterWillPhase.bind(this);
    this.continueGamePhase = this.continueGamePhase.bind(this);
    this.state = {
      phase: 'will'
    };
  }

  afterWillPhase () {
    this.props.handlePizzaOrder();
    this.setState({ phase: 'after_will'})
  }

  continueGamePhase () {
    this.setState({ phase: 'continue_game'})
  }


  render () {
    if (this.state.phase === 'will') {
      return (
        <div className='widget'>
        {this.props.to_be_exiled.length !== 0 &&
          <p className='widget widget__message'>{this.props.to_be_exiled[0]}さん, 最後に遺言をどうぞ｡</p>}
          <div className="button-wrapper">
            <button
              className='button-single'
              onClick={this.afterWillPhase}
            >
              次へ
            </button>
          </div>
        </div>
        )

    } else if (this.state.phase === 'after_will') {
      return (
        <div>
          <div className="widget">
            {this.props.to_be_exiled.length !== 0 ?
              <div>
                {this.props.bgm && <Sound
                      url="sounds/katana-gesture1.mp3"
                      autoLoad={true}
                      volume={30}
                      playStatus={Sound.status.PLAYING}
                    />}
                <div className='widget__message'>人狼だと疑われた{this.props.to_be_exiled[0]}さんは追放されました。</div>
              </div>
              : <div>
                  <div className='widget__message'>今朝は誰も追放されませんでした。</div>
                  {this.props.bgm && <Sound
                        url="sounds/kira1.mp3"
                        autoLoad={true}
                        volume={30}
                        playStatus={Sound.status.PLAYING}
                      />}
              </div>
            }
          </div>

          <div className="button-wrapper">
            <button
              className='button-single'
              onClick={ this.props.handleWinningSide() < 0 ? this.continueGamePhase: this.props.gameResultPhase}
            >
              次へ
            </button>
          </div>
        </div>
        )
    } else if (this.state.phase === 'continue_game') {
      return (
        <div>
          {this.props.bgm && <Sound
                      url="sounds/clock-tower-bell1.mp3"
                      autoLoad={true}
                      volume={30}
                      playStatus={Sound.status.PLAYING}
                    />}
          <div className="widget">
            <div className="widget__message">
              夜が来ました。。。
            </div>
          </div>
          <div className="button-wrapper">
            <button
              className='button-single'
              onClick={ this.props.nightConfirmPhase}
            >
              次へ
            </button>
          </div>
        </div>
        )
    } else {
      return (<div></div>)
    }
  }
}

