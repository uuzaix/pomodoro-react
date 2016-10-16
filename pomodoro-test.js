const expect = require('expect');

const { pomodoro } = require('./pomodoro.js');

const testDisplayClick = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 10, status: 'on', defaultTime: { workTime: 10, relaxTime: 5}};
  let action = {type: 'PAUSE'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 10, status: 'on', defaultTime: { workTime: 10, relaxTime: 5}};
  stateAfter = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}
testDisplayClick();
console.log('tests pass');
