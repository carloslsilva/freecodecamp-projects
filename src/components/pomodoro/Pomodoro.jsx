import { action, PomodoroProvider } from '@/lib/pomodoroProvider'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'

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

export const Pomodoro = () => (
  <PomodoroProvider>
    <Container />
  </PomodoroProvider>
)
