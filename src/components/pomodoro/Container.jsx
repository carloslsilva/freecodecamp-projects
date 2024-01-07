import { action } from '@/lib/pomodoroStore'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Display } from './Display'
import { LengthControl } from './LengthControl'
import { RunControl } from './RunControl'

export const Container = () => {
  const audioParameters = {
    url: 'https://goo.gl/65cBl1',
    type: 'audio/wav',
    id: 'beep'
  }

  const length = useSelector(state => state.length)
  const timer = useSelector(state => state.timer)

  const dispatch = useDispatch()

  const incrementSession = () => {
    if (timer.run === false) dispatch(action.sessionLengthIncrement())
  }

  const decrementSession = () => {
    if (timer.run === false) dispatch(action.sessionLengthDecrement())
  }

  const incrementBreak = () => {
    if (timer.run === false) dispatch(action.breakLengthIncrement())
  }

  const decrementBreak = () => {
    if (timer.run === false) dispatch(action.breakLengthDecrement())
  }

  const alarmPlay = useCallback(() => {
    const alarm = document.getElementById(audioParameters.id)
    alarm.play()
  }, [audioParameters.id])

  const alarmStop = useCallback(() => {
    const alarm = document.getElementById(audioParameters.id)
    alarm.pause()
    alarm.currentTime = 0
  }, [audioParameters.id])

  useEffect(() => {
    const interval = setTimeout(() => dispatch(action.tick()), 1000)
    return () => clearInterval(interval)
  }, [dispatch, timer])

  useEffect(() => {
    if (timer.ticks.session === 0 || timer.ticks.break === 0) {
      alarmPlay()
    }
  }, [timer.ticks, alarmPlay])

  return (
    <div className='grid h-[350px] w-[350px] grid-cols-4 grid-rows-6 gap-2 rounded border-2 border-alpha px-4 py-6'>
      <Display />
      <LengthControl
        label='Session Length'
        value={length.session}
        increment={incrementSession}
        decrement={decrementSession}
        right
      />
      <LengthControl
        label='Break Length'
        value={length.break}
        increment={incrementBreak}
        decrement={decrementBreak}
        left
      />
      <RunControl
        containerClassName='col-start-1 col-end-5 row-start-6'
        onPlayPause={() => dispatch(action.toggleRun())}
        onReset={() => {
          dispatch(action.reset())
          alarmStop()
        }}
      />
      <audio
        src={audioParameters.url}
        type={audioParameters.type}
        id={audioParameters.id}
      />
    </div>
  )
}
