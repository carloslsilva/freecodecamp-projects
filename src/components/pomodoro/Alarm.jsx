import { useCallback, useEffect, useId } from 'react'
import { useSelector } from 'react-redux'

export const Alarm = () => {
  const audioId = useId()
  const timer = useSelector(state => state.timer)

  const alarmPlay = useCallback(() => {
    const alarm = document.getElementById(audioId)
    alarm.play()
  }, [audioId])

  const alarmStop = useCallback(() => {
    const alarm = document.getElementById(audioId)
    alarm.pause()
    alarm.currentTime = 0
  }, [audioId])

  useEffect(() => {
    if (timer.ticks.session === 0 || timer.ticks.break === 0) {
      alarmPlay()
    }
    if (!timer.run) {
      alarmStop()
    }
  }, [timer.ticks, timer.run, alarmPlay, alarmStop])

  return <audio src='alarm.mp3' type='audio/mp3' id={audioId} />
}
