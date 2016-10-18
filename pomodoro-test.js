const expect = require('expect');

const { pomodoro } = require('./pomodoro.js');

const testDisplayClick = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  let action = {type: 'PAUSE'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  stateAfter = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}

const testIncreaseTime = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 11, isOn: false, defaultTime: { workTime: 11, breakTime: 5}};
  let action = {type: 'INCREASE_WORK'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  stateAfter = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}

const testDecreaseTime = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 9, isOn: false, defaultTime: { workTime: 9, breakTime: 5}};
  let action = {type: 'DECREASE_WORK'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 0, breakTime: 5}};
  stateAfter = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 0, breakTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  stateAfter = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}

const testIncreaseBreak = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 6}};
  let action = {type: 'INCREASE_BREAK'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  stateAfter = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}

const testDecreaseBreak = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 4}};
  let action = {type: 'DECREASE_BREAK'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 0}};
  stateAfter = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 0}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  stateAfter = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}

const testTick = () => {
  let stateBefore = {activity: 'work', timeLeft: 10, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  let stateAfter = {activity: 'work', timeLeft: 9, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  let action = {type: 'TICK'}
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'work', timeLeft: 0, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  stateAfter = {activity: 'break', timeLeft: 5, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'break', timeLeft: 4, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  stateAfter = {activity: 'break', timeLeft: 3, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
  stateBefore = {activity: 'break', timeLeft: 0, isOn: true, defaultTime: { workTime: 10, breakTime: 5}};
  stateAfter = {activity: 'work', timeLeft: 10, isOn: false, defaultTime: { workTime: 10, breakTime: 5}};
  expect(pomodoro(stateBefore, action)).toEqual(stateAfter);
}

testDisplayClick();
testIncreaseTime();
testDecreaseTime();
testIncreaseBreak();
testDecreaseBreak();
console.log('tests pass');
