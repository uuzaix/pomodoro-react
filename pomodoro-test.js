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

const testIncreaseTime = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 11, relaxTime: 5}};
  let action = {type: 'INCREASE_WORK'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}

const testDecreaseTime = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 9, relaxTime: 5}};
  let action = {type: 'DECREASE_WORK'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 0, relaxTime: 5}};
  stateAfter = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 0, relaxTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}

const testIncreaseRelax = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 6}};
  let action = {type: 'INCREASE_RELAX'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}

const testDecreaseRelax = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 4}};
  let action = {type: 'DECREASE_RELAX'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 0}};
  stateAfter = {activity: 'work', timeLeft: 10, status: 'off', defaultTime: { workTime: 10, relaxTime: 0}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}

testDisplayClick();
testIncreaseTime();
testDecreaseTime();
testIncreaseRelax();
testDecreaseRelax();
console.log('tests pass');
