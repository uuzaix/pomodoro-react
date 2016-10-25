const React = require("react");
const ReactDOM = require("react-dom");

const { createStore } = require('redux');

const defaultState = {activity: 'Work', timeLeft: 600, isOn: false, defaultTime: { workTime: 10, breakTime: 5}};
const pomodoro = (state = defaultState, action) => {
  switch (action.type) {
    case 'PAUSE':
      if (!state.isOn) {
        return Object.assign({}, state, {isOn: true});
      }
      return Object.assign({}, state, {isOn: false});

    case 'TICK':
      if (state.timeLeft === 0 && state.activity === "Work") {
        return Object.assign({}, state, {activity: "Break", timeLeft: state.defaultTime.breakTime*60});
      }
      else if (state.timeLeft === 0 && state.activity === "Break"){
        return Object.assign({}, state, {activity: "Work", timeLeft: state.defaultTime.workTime*60});
      }
      return Object.assign({}, state, {timeLeft: state.timeLeft - 1});

    case 'INCREASE_WORK':
      if (!state.isOn) {
        if (state.activity === 'Work') {
          return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime + 1, breakTime: state.defaultTime.breakTime}}, {timeLeft: (state.defaultTime.workTime + 1)*60});
        }
        return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime + 1, breakTime: state.defaultTime.breakTime}});
      }
      return state;
    case 'DECREASE_WORK':
      if (state.defaultTime.workTime > 0 && !state.isOn) {
        if (state.activity === 'Work') {
          return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime - 1, breakTime: state.defaultTime.breakTime}}, {timeLeft: (state.defaultTime.workTime - 1)*60});
        }
        return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime - 1, breakTime: state.defaultTime.breakTime}});
      }
      return state;
    case 'INCREASE_BREAK':
      if (!state.isOn) {
        if (state.activity === 'Break') {
          return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime, breakTime: state.defaultTime.breakTime + 1}}, {timeLeft: (state.defaultTime.breakTime + 1)*60});
        }
        return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime, breakTime: state.defaultTime.breakTime + 1}});
      }
      return state;
    case 'DECREASE_BREAK':
      if (state.defaultTime.breakTime > 0 && !state.isOn) {
        if (state.activity === 'Break') {
          return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime, breakTime: state.defaultTime.breakTime - 1}}, {timeLeft: (state.defaultTime.breakTime - 1)*60});
        }
        return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime, breakTime: state.defaultTime.breakTime - 1}});
      }
      return state;
    case 'RESET':
      return Object.assign({}, state, {isOn: false, activity: "Work", timeLeft: state.defaultTime.workTime*60});

    default:
      return state;
  }
}

module.exports = {
    pomodoro
};

const store = createStore(pomodoro, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// store.subscribe(() => console.log(store.getState()));

// store.dispatch({type: 'PAUSE'});
// store.dispatch({type: 'PAUSE'});
// store.dispatch({type: 'PAUSE'});

const Button = ({
  type,
  value,
  className
}) => (
  <button className={className}
    onClick={()=> {
      store.dispatch({
        type:type,
      })
    }}>
    {value}
  </button>
  )

const TimerSettings = ({workTime, breakTime}) => (
  <div className='settings'>
    <div className='settings-work'>
      <p>Work</p>
      <Button className='settings-btn' type='DECREASE_WORK' value='-' />
      <span className='text'>{workTime} min</span>
      <Button className='settings-btn' type='INCREASE_WORK' value='+' />
    </div>
    <div className='settings-break'>
      <p>Break</p>
      <Button className='settings-btn' type='DECREASE_BREAK' value='-' />
      <span className='text'>{breakTime} min</span>
      <Button className='settings-btn' type='INCREASE_BREAK' value='+' />
    </div>
  </div>
  );

const TimerDisplay = ({timeLeft, activity, style}) => {
  // const initialTime = (activity === "Work") ? workTime*60 : breakTime*60;
  // const readyFraction = (Math.round(time/initialTime))*100;
  // const style = {
  //   background: 'linear-gradient(#FF3A3A ' + readyFraction + '%,#f98200 0%)'
  // };

  return (
    <div className='timerDisplay' style={ style }>
    <p
      onClick={()=>{
        store.dispatch({type:'PAUSE'})
      }}>
      { activity } <br /> { timeLeft }
      </p>
    </div>
  );
};


const Pomodoro = React.createClass({
  format(time) {
    const pad = (time) => {
      while(time.length<2) {
        time = "0" + time;
      }
      return time
    }
    let m = pad((Math.floor(time/60)).toString());
    let s = pad((time % 60).toString());
    return m + ' : ' + s;
  },

  createStyle(timeLeft, activity, workTime, breakTime) {
    const initialTime = (activity === "Work") ? workTime*60 : breakTime*60;
    const readyFraction = (Math.round(timeLeft/initialTime))*100;
    const style = {
      background: 'linear-gradient(#FF3A3A ' + readyFraction + '%,#f98200 0%)'
    };
    return style;
  },

  render: function() {
    return (
      <div>
        <p className='title'>POMODORO Timer</p>
        <TimerSettings workTime={this.props.defaultTime.workTime} breakTime={this.props.defaultTime.breakTime} />
        <TimerDisplay timeLeft={this.format(this.props.timeLeft)} activity={this.props.activity} 
          style={this.createStyle(this.props.timeLeft, this.props.activity, this.props.defaultTime.workTime, this.props.defaultTime.breakTime)} />
        <Button className='reset-btn' type='RESET' value='RESET' />
      </div>
    );
  }
});

const render = () => {
  ReactDOM.render(
    <Pomodoro {...store.getState()} />,
    document.getElementById('root')
  );
};

var interval = null;
store.subscribe(render);
store.subscribe(() => {
  if (store.getState().isOn && store.getState().timeLeft >= 0 && interval === null) {
    interval = setInterval(() => {
      store.dispatch({
        type: 'TICK',
      });
    }, 1000);
  }
  if (!store.getState().isOn && interval !== null) {
    clearInterval(interval);
    interval = null;
  }
  if (store.getState().isOn && store.getState().activity === 'Work' && store.getState().timeLeft === 0) {
    var audio = new Audio('http://www.mp3item.com/soundeffects/clock04.wav');
    audio.play();
  }
});

render();