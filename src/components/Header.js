import React from 'react';
import Sound from 'react-sound';

const Header = (props) => {
  return (
    <div className='header'>
        {props.bgm && <Sound
                          url="sounds/honobono-wonderland.mp3"
                          playStatus={Sound.status.PLAYING}
                          autoLoad={true}
                          loop={true}
                          volume={30}
                        />}
        <div className='container'>
            <h1 className='header__title'>{props.title}</h1>
            {props.subtitle && <h2 className='header__subtitle'>{props.subtitle}</h2>}
        </div>
    </div>
  );
};

Header.defaultProps = {
  title: '人狼ゲーム'
};

export default Header;
