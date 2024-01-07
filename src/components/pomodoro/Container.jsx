import { action } from '@/lib/pomodoroStore'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Display } from './Display'
import { LengthControl } from './LengthControl'
import { RunControl } from './RunControl'
import './style.css'

export const Container = () => {
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
      <Display
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
