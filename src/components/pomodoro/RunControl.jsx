import { action } from '@/lib/pomodoroStore'
import { useDispatch } from 'react-redux'

export const RunControl = props => {
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
