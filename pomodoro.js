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
  value
}) => (
  <button 
    onClick={()=> {
      store.dispatch({
        type:type,
      })
    }}>
    {value}
  </button>
  )

const TimerSettings = ({workTime, breakTime}) => (
  <div>
    <Button type='DECREASE_WORK' value='-' />
    <span>Work Time {workTime}</span>
    <Button type='INCREASE_WORK' value='+' />
    <p></p>
    <Button type='DECREASE_BREAK' value='-' />
    <span>Break Time {breakTime}</span>
    <Button type='INCREASE_BREAK' value='+' />
  </div>
  );

const TimerDisplay = ({timeLeft, activity}) => (
  <div
    onClick={()=>{
      store.dispatch({type:'PAUSE'})
    }}>
    {activity} { timeLeft }
  </div>
);


const Pomodoro = React.createClass({
  format(time){
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

  render: function() {
    return (
      <div>
        <TimerSettings workTime={this.props.defaultTime.workTime} breakTime={this.props.defaultTime.breakTime} />
        <TimerDisplay timeLeft={this.format(this.props.timeLeft)} activity={this.props.activity} />
        <Button type='RESET' value='Reset' />
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
});

render();