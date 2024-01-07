import { createStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

// Types
const type = {
  breakLengthIncrement: 'break length increment',
  breakLengthDecrement: 'break length decrement',
  sessionLengthIncrement: 'session length increment',
  sessionLengthDecrement: 'session length decrement',
  reset: 'reset',
  toggleRun: 'toggle run',
  tick: 'tick'
}

// Actions
export const action = {
  sessionLengthIncrement() {
    return {
      type: type.sessionLengthIncrement
    }
  },
  sessionLengthDecrement() {
    return {
      type: type.sessionLengthDecrement
    }
  },
  breakLengthIncrement() {
    return {
      type: type.breakLengthIncrement
    }
  },
  breakLengthDecrement() {
    return {
      type: type.breakLengthDecrement
    }
  },
  reset() {
    return {
      type: type.reset
    }
  },
  toggleRun() {
    return {
      type: type.toggleRun
    }
  },
  tick() {
    return {
      type: type.tick
    }
  }
}

// Reducer
const limits = {
  session: {
    maximum: 60,
    minimum: 1,
    default: 25
  },
  break: {
    maximum: 60,
    minimum: 1,
    default: 5
  }
}

const current = {
  session: 'session',
  break: 'break'
}

const minutesToTicks = minutes => minutes * 60
const clone = obj => JSON.parse(JSON.stringify(obj))

const initialState = {
  length: {
    session: limits.session.default,
    break: limits.break.default
  },
  timer: {
    ticks: {
      session: minutesToTicks(limits.session.default),
      break: minutesToTicks(limits.break.default)
    },
    current: current.session,
    run: false
  }
}

const setSessionLength = (state, minutes) => {
  if (state.timer.run === false) {
    const nextState = clone(state)
    nextState.length.session = minutes
    nextState.timer.ticks.session = minutesToTicks(minutes)
    return nextState
  } else {
    return state
  }
}

const setBreakLength = (state, minutes) => {
  if (state.timer.run === false) {
    const nextState = clone(state)
    nextState.length.break = minutes
    nextState.timer.ticks.break = minutesToTicks(minutes)
    return nextState
  } else {
    return state
  }
}

const toggleRun = state => {
  const nextState = clone(state)
  nextState.timer.run = !nextState.timer.run
  return nextState
}

const tick = state => {
  if (state.timer.run === true) {
    switch (state.timer.current) {
      case current.session: {
        const nextState = clone(state)
        const tick = state.timer.ticks.session - 1
        nextState.timer.ticks.session =
          tick >= 0 ? tick : minutesToTicks(nextState.length.session)
        nextState.timer.current = tick >= 0 ? current.session : current.break
        return nextState
      }
      case current.break: {
        const nextState = clone(state)
        const tick = state.timer.ticks.break - 1
        nextState.timer.ticks.break =
          tick >= 0 ? tick : minutesToTicks(nextState.length.break)
        nextState.timer.current = tick >= 0 ? current.break : current.session
        return nextState
      }
      default: {
        return state
      }
    }
  } else {
    return state
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.sessionLengthIncrement: {
      const minutes =
        state.length.session < limits.session.maximum
          ? state.length.session + 1
          : state.length.session
      return setSessionLength(state, minutes)
    }
    case type.sessionLengthDecrement: {
      const minutes =
        state.length.session > limits.session.minimum
          ? state.length.session - 1
          : state.length.session
      return setSessionLength(state, minutes)
    }
    case type.breakLengthIncrement: {
      const minutes =
        state.length.break < limits.break.maximum
          ? state.length.break + 1
          : state.length.break
      return setBreakLength(state, minutes)
    }
    case type.breakLengthDecrement: {
      const minutes =
        state.length.break > limits.break.minimum
          ? state.length.break - 1
          : state.length.break
      return setBreakLength(state, minutes)
    }
    case type.reset: {
      return clone(initialState)
    }
    case type.toggleRun: {
      return toggleRun(state)
    }
    case type.tick: {
      return tick(state)
    }
    default: {
      return state
    }
  }
}

const store = createStore(reducer)

export const PomodoroProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)
