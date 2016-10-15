const React = require("react");
const ReactDOM = require("react-dom");


let defaultTime = {timerTime: 10, pauseTime: 5};

const TimerSettings = React.createClass({
  render: function() {
    return (
      <div>
        <button> + </button>
        <span>Work Time {this.props.defaultTime.timerTime}</span>
        <button> - </button>
        <p></p>
        <button> + </button>
        <span>Pause Time {this.props.defaultTime.pauseTime}</span>
        <button> - </button>
      </div>
    );
  }
});

const TimerDisplay = React.createClass({
  render: function() {
    return (
      <div>{ this.props.defaultTime.timerTime }</div>
    );
  }
});

const Pomodoro = React.createClass({
  render: function() {
    return (
      <div>
        <TimerSettings defaultTime={this.props.defaultTime} />
        <TimerDisplay defaultTime={this.props.defaultTime} />
      </div>
    );
  }
});

ReactDOM.render(
  <Pomodoro defaultTime={defaultTime} />,
  document.getElementById('root')
);
