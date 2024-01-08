import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
  const location = useLocation()
  return (
    <header className='flex w-full max-w-5xl flex-row items-center justify-end px-4 py-8'>
      {location.pathname !== '/' && (
        <Link
          className={clsx(
            'flex flex-row gap-2 rounded border border-dark bg-beta px-5 py-2',
            'animate-bounce duration-300 ease-in-out hover:opacity-70'
          )}
          to='/'
        >
          <span>
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
          <span className='font-semibold'>BACK</span>
        </Link>
      )}
    </header>
  )
}
