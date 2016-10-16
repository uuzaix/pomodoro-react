const React = require("react");
const ReactDOM = require("react-dom");

const {createStore} = require('redux');

//let defaultTime = {workTime: 10, relaxTime: 5};

const pomodoro = (state = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 5}}, action) => {
  switch (action.type) {
    case 'PAUSE':
      if (state.status === 'off') {
        return Object.assign({}, state, {status: 'on'});
      }
      return Object.assign({}, state, {status: 'off'});
  }
}

module.exports = {
    pomodoro
};
const store = createStore(pomodoro);

// store.subscribe(() => console.log(store.getState()));

// store.dispatch({type: 'PAUSE'});
// store.dispatch({type: 'PAUSE'});
// store.dispatch({type: 'PAUSE'});


const TimerSettings = React.createClass({
  render: function() {
    return (
      <div>
        <button> + </button>
        <span>Work Time {this.props.defaultTime.workTime}</span>
        <button> - </button>
        <p></p>
        <button> + </button>
        <span>Relax Time {this.props.defaultTime.relaxTime}</span>
        <button> - </button>
      </div>
    );
  }
});

const TimerDisplay = React.createClass({
  render: function() {
    return (
      <div
      onClick={()=>{
        store.dispatch({type:'PAUSE'})
      }}>
        { this.props.timeLeft }
      </div>
    );
  }
});

const Pomodoro = React.createClass({
  getInitialState: function() {
    return {
      activity: 'work',
      timeLeft: 10,
      status: 'off',
      defaultTime: {
        workTime: 10,
        relaxTime: 5
      }
    }
  },
  render: function() {
    return (
      <div>
        <TimerSettings defaultTime={this.state.defaultTime} />
        <TimerDisplay timeLeft={this.state.timeLeft} />
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