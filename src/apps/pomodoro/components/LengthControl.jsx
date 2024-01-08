import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { action } from '../lib/state/actions'

export const LengthControl = ({ session }) => {
  const length = useSelector(state => state.length)
  const dispatch = useDispatch()

  const incrementSession = () => dispatch(action.sessionLengthIncrement())
  const decrementSession = () => dispatch(action.sessionLengthDecrement())
  const incrementBreak = () => dispatch(action.breakLengthIncrement())
  const decrementBreak = () => dispatch(action.breakLengthDecrement())

  return (
    <div
      className={clsx(
        session && 'col-start-1 col-end-3 row-start-4 row-end-6',
        !session && 'col-start-3 col-end-5 row-start-4 row-end-6',
        'flex flex-col gap-2'
      )}
    >
      <div className='flex h-full flex-row items-center justify-around rounded bg-beta font-title text-[0.9rem] font-bold text-dark'>
        <div>{`${session ? 'Session' : 'Break'}  Length`}</div>
        <div>{session ? length.session : length.break}</div>
      </div>
      <div className='flex h-full flex-row gap-2'>
        <button
          className='w-full rounded bg-beta text-dark hover:opacity-80'
          onClick={session ? incrementSession : incrementBreak}
          type='button'
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <button
          className='w-full rounded bg-beta text-dark hover:opacity-80'
          onClick={session ? decrementSession : decrementBreak}
          type='button'
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </div>
  )
}
