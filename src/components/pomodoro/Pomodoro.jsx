// Imports ? xD
import { configureStore } from '@reduxjs/toolkit'
import { useCallback, useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import './style.css'

// S T O R E

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
const action = {
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

// P O M O D O R O
const RunControl = props => {
  const { startStop, reset } = props.parameters
  const dispatch = useDispatch()
  return (
    <div className={props.containerClassName}>
      <div className='pomodoro-button-group'>
        <button
          type='button'
          onClick={() => dispatch(action.toggleRun())}
          className='pomodoro-button pomodoro-background-color-purple'
          id={startStop.id}
        >
          <i className='fas fa-play' /> <i className='fas fa-pause' />
        </button>
        <button
          type='button'
          onClick={() => {
            dispatch(action.reset())
            props.onReset()
          }}
          className='pomodoro-button pomodoro-background-color-red'
          id={reset.id}
        >
          <i className='fas fa-sync' />
        </button>
      </div>
    </div>
  )
}

const LengthControl = props => {
  const { label, display, button } = props.parameters
  return (
    <div className={props.containerClassName}>
      <div className='pomodoro-length-control-display pomodoro-background-color-yellow'>
        <div id={label.id}>{label.text}</div>
        <div id={display.id}>{props.length}</div>
      </div>
      <div className='pomodoro-button-group'>
        <button
          type='button'
          onClick={props.increment}
          className='pomodoro-button pomodoro-background-color-yellow'
          id={button.increment.id}
        >
          <i className='fas fa-chevron-up' />
        </button>
        <button
          type='button'
          onClick={props.decrement}
          className='pomodoro-button pomodoro-background-color-yellow'
          id={button.decrement.id}
        >
          <i className='fas fa-chevron-down' />
        </button>
      </div>
    </div>
  )
}

const Timer = props => {
  const { label, left } = props.parameters
  const timer = useSelector(state => state.timer)

  const ticksToMinutesSeconds = ticks => {
    const strPadLeft = (string, pad, length) => {
      return (new Array(length + 1).join(pad) + string).slice(-length)
    }
    const minutes = ~~(ticks / 60)
    const seconds = ticks - minutes * 60
    return `${strPadLeft(minutes, '0', 2)}:${strPadLeft(seconds, '0', 2)}`
  }

  const containerClass =
    props.containerClassName + ' pomodoro-background-color-dark'
  return (
    <div className={containerClass}>
      <h1 className='pomodoro-timer-title'>Pomodoro Clock</h1>
      <h2 className='pomodoro-timer-label' id={label.id}>
        {timer.current === 'session' ? 'Session' : 'Break'}
      </h2>
      <h3 className='pomodoro-timer-left' id={left.id}>
        {ticksToMinutesSeconds(
          timer.current === 'session' ? timer.ticks.session : timer.ticks.break
        )}
      </h3>
    </div>
  )
}

const Container = () => {
  const parameters = {
    control: {
      run: {
        startStop: { id: 'start_stop', text: '' },
        reset: { id: 'reset', text: '' }
      },
      length: {
        session: {
          label: { id: 'session-label', text: 'Session Length' },
          display: { id: 'session-length', text: '' },
          button: {
            increment: { id: 'session-increment', text: '' },
            decrement: { id: 'session-decrement', text: '' }
          }
        },
        break: {
          label: { id: 'break-label', text: 'Break Length' },
          display: { id: 'break-length', text: '' },
          button: {
            increment: { id: 'break-increment', text: '' },
            decrement: { id: 'break-decrement', text: '' }
          }
        }
      }
    },
    timer: {
      label: { id: 'timer-label', text: '' },
      left: { id: 'time-left', text: '' }
    },
    audio: {
      url: 'https://goo.gl/65cBl1',
      type: 'audio/wav',
      id: 'beep'
    }
  }

  const length = useSelector(state => state.length)
  const timer = useSelector(state => state.timer)
  const dispatch = useDispatch()

  const alarmPlay = useCallback(() => {
    const alarm = document.getElementById(parameters.audio.id)
    alarm.play()
  }, [parameters.audio.id])
  const alarmStop = useCallback(() => {
    const alarm = document.getElementById(parameters.audio.id)
    alarm.pause()
    alarm.currentTime = 0
  }, [parameters.audio.id])

  useEffect(() => {
    const interval = setTimeout(() => dispatch(action.tick()), 1000)
    return () => clearInterval(interval)
  }, [dispatch, timer])
  useEffect(() => {
    if (timer.ticks.session === 0 || timer.ticks.break === 0) {
      alarmPlay()
    }
  }, [timer.ticks, alarmPlay])

  const incrementSession = useCallback(() => {
    if (timer.run === false) {
      dispatch(action.sessionLengthIncrement())
    } else {
      return
    }
  }, [dispatch, timer.run])
  const decrementSession = useCallback(() => {
    if (timer.run === false) {
      dispatch(action.sessionLengthDecrement())
    } else {
      return
    }
  }, [dispatch, timer.run])
  const incrementBreak = useCallback(() => {
    if (timer.run === false) {
      dispatch(action.breakLengthIncrement())
    } else {
      return
    }
  }, [dispatch, timer.run])
  const decrementBreak = useCallback(() => {
    if (timer.run === false) {
      dispatch(action.breakLengthDecrement())
    } else {
      return
    }
  }, [dispatch, timer.run])

  return (
    <div className='pomodoro-container'>
      <Timer
        parameters={parameters.timer}
        containerClassName='pomodoro-timer-container'
      />
      <LengthControl
        parameters={parameters.control.length.session}
        length={length.session}
        increment={incrementSession}
        decrement={decrementSession}
        containerClassName='pomodoro-session-length-container'
      />
      <LengthControl
        parameters={parameters.control.length.break}
        length={length.break}
        increment={incrementBreak}
        decrement={decrementBreak}
        containerClassName='pomodoro-break-length-container'
      />
      <RunControl
        parameters={parameters.control.run}
        onReset={() => alarmStop()}
        containerClassName='pomodoro-run-control-container'
      />
      <audio
        src={parameters.audio.url}
        type={parameters.audio.type}
        id={parameters.audio.id}
      />
    </div>
  )
}

// A P P
const store = configureStore(reducer)

export const Pomodoro = () => (
  <Provider store={store}>
    <Container />
  </Provider>
)
