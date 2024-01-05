import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

const ROUTES = [
  {
    to: '/',
    label: 'Home'
  },
  {
    to: '/calculator',
    label: 'Calculator'
  },
  {
    to: '/pomodoro',
    label: 'Pomodoro'
  },
  {
    to: '/quote-machine',
    label: 'Quote Machine'
  }
]

export const Header = () => {
  const navLinks = ROUTES.map(route => (
    <li key={route.label}>
      <NavLink
        className={({ isActive }) =>
          clsx(
            !isActive && 'opacity-50 duration-300 ease-in-out hover:opacity-30',
            isActive && 'opacity-100'
          )
        }
        to={route.to}
      >
        {route.label}
      </NavLink>
    </li>
  ))

  return (
    <header className='px-2 py-4'>
      <nav>
        <ul className='flex flex-row gap-8'>{navLinks}</ul>
      </nav>
    </header>
  )
}
