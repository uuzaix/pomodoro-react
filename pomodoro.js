const React = require("react");
const ReactDOM = require("react-dom");

const { createStore } = require('redux');

//let defaultTime = {workTime: 10, relaxTime: 5};

const pomodoro = (state = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 5}}, action) => {
  switch (action.type) {
    case 'PAUSE':
      if (state.status === 'off') {
        return Object.assign({}, state, {status: 'on'});
      }
      return Object.assign({}, state, {status: 'off'});
    case 'INCREASE_WORK':
      return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime +1, relaxTime: state.defaultTime.relaxTime}})
    case 'DECREASE_WORK':
      if (state.defaultTime.workTime > 0) {
        return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime - 1, relaxTime: state.defaultTime.relaxTime}})
      }
      return state;
    case 'INCREASE_RELAX':
      return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime, relaxTime: state.defaultTime.relaxTime + 1}})
    case 'DECREASE_RELAX':
      if (state.defaultTime.relaxTime > 0) {
        return Object.assign({}, state, {defaultTime: {workTime: state.defaultTime.workTime, relaxTime: state.defaultTime.relaxTime - 1}})
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
    <Button type='INCREASE_WORK' value='+' />
    <span>Work Time {defaultTime.workTime}</span>
    <Button type='DECREASE_WORK' value='-' />
    <p></p>
    <Button type='INCREASE_RELAX' value='+' />
    <span>Relax Time {defaultTime.relaxTime}</span>
    <Button type='DECREASE_RELAX' value='-' />
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

store.subscribe(render);
render();