import { faPause, faPlay, faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const RunControl = ({ onPlayPause, onReset }) => (
  <div className='col-start-1 col-end-5 row-start-6'>
    <div className='flex h-full flex-row gap-2'>
      <button
        className='w-full rounded bg-alpha text-light hover:opacity-80'
        onClick={onPlayPause}
        type='button'
      >
        <FontAwesomeIcon icon={faPlay} />
        <FontAwesomeIcon icon={faPause} />
      </button>
      <button
        className='w-full rounded bg-gamma text-light hover:opacity-80'
        onClick={onReset}
        type='button'
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
  </div>
)
