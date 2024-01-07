import { ticksToMinutesSeconds } from '@/lib/utils'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

export const Display = ({ containerClassName }) => {
  const timer = useSelector(state => state.timer)

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center rounded bg-dark text-light',
        containerClassName
      )}
    >
      <div className='mt-3 font-title text-[1.2rem] font-bold'>
        Pomodoro Clock
      </div>
      <div className='font-title text-[1rem] font-bold'>
        {timer.current === 'session' ? 'Session' : 'Break'}
      </div>
      <div className='font-display text-[3.8rem]'>
        {ticksToMinutesSeconds(
          timer.current === 'session' ? timer.ticks.session : timer.ticks.break
        )}
      </div>
    </div>
  )
}
