import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
export const LengthControl = props => {
  const { label } = props.parameters

  return (
    <div className={clsx('flex flex-col gap-2', props.containerClassName)}>
      <div className='flex h-full flex-row items-center justify-around rounded bg-beta font-title text-[0.9rem] font-bold text-dark'>
        <div>{label.text}</div>
        <div>{props.length}</div>
      </div>
      <div className='flex h-full flex-row gap-2'>
        <button
          className='w-full rounded bg-beta text-dark'
          onClick={props.increment}
          type='button'
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <button
          className='w-full rounded bg-beta text-dark'
          onClick={props.decrement}
          type='button'
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </div>
  )
}
