import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

export const LengthControl = props => (
  <div
    className={clsx(
      props.right && 'col-start-1 col-end-3 row-start-4 row-end-6',
      props.left && 'col-start-3 col-end-5 row-start-4 row-end-6',
      'flex flex-col gap-2'
    )}
  >
    <div className='flex h-full flex-row items-center justify-around rounded bg-beta font-title text-[0.9rem] font-bold text-dark'>
      <div>{props.label}</div>
      <div>{props.value}</div>
    </div>
    <div className='flex h-full flex-row gap-2'>
      <button
        className='w-full rounded bg-beta text-dark hover:opacity-80'
        onClick={props.increment}
        type='button'
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <button
        className='w-full rounded bg-beta text-dark hover:opacity-80'
        onClick={props.decrement}
        type='button'
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  </div>
)
