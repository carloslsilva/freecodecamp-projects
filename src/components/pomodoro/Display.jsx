import { useSelector } from 'react-redux'

export const Display = props => {
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
