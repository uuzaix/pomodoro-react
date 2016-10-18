const React = require("react");
const ReactDOM = require("react-dom");

const { createStore } = require('redux');

//let defaultTime = {workTime: 10, breakTime: 5};

const pomodoro = (state = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 5}}, action) => {
  switch (action.type) {
    case 'PAUSE':
      if (!state.isOn) {
        return Object.assign({}, state, {isOn: true});
      }
      return Object.assign({}, state, {isOn: false});

    case 'TICK':
      if (state.timeLeft === 0 && state.activity === "work") {
        return Object.assign({}, state, {activity: "break", timeLeft: state.defaultTime.breakTime});
      }
      else if (state.timeLeft === 0 && state.activity === "break"){
        return Object.assign({}, state, {activity: "work", isOn: false, timeLeft: state.defaultTime.workTime});
      }
      return Object.assign({}, state, {timeLeft: state.timeLeft - 1});

    case 'INCREASE_WORK':
      if (!state.isOn) {
        return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime + 1, breakTime: state.defaultTime.breakTime}}, {timeLeft: state.defaultTime.workTime + 1});
      }
      return state;
    case 'DECREASE_WORK':
      if (state.defaultTime.workTime > 0 && !state.isOn) {
        return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime - 1, breakTime: state.defaultTime.breakTime}}, {timeLeft: state.defaultTime.workTime - 1});
        // return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime - 1, breakTime: state.defaultTime.breakTime}});
      }
      return state;
    case 'INCREASE_BREAK':
      if (!state.isOn) {
        return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime, breakTime: state.defaultTime.breakTime + 1}});
      }
      return state;
    case 'DECREASE_BREAK':
      if (state.defaultTime.breakTime > 0 && !state.isOn) {
        return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime, breakTime: state.defaultTime.breakTime - 1}});
      }
      return state;

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

const TimerSettings = ({defaultTime}) => (
  <div>
    <Button type='DECREASE_WORK' value='-' />
    <span>Work Time {defaultTime.workTime}</span>
    <Button type='INCREASE_WORK' value='+' />
    <p></p>
    <Button type='DECREASE_BREAK' value='-' />
    <span>Break Time {defaultTime.breakTime}</span>
    <Button type='INCREASE_BREAK' value='+' />
  </div>
  );

const TimerDisplay = ({timeLeft}) => (
  <div
    onClick={()=>{
      store.dispatch({type:'PAUSE'})
    }}>
    { timeLeft }
  </div>
);


const Pomodoro = React.createClass({
  render: function() {
    return (
      <div>
        <TimerSettings defaultTime={this.props.defaultTime} />
        <TimerDisplay timeLeft={this.props.timeLeft} />
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
  if ((!store.getState().isOn) && interval !== null) {
    clearInterval(interval);
    interval = null;
  }
});

render();