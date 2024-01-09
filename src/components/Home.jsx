import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export const Home = () => (
  <section>
    <div className='mx-auto flex max-w-4xl flex-wrap items-center px-5 py-24'>
      <div className='mb-10 border-b border-gray-200 pb-10 md:mb-0 md:w-1/2 md:border-b-0 md:border-r md:py-8 md:pr-12'>
        <h1 className='title-font mb-2 text-2xl font-medium text-gray-900 sm:text-3xl'>
          FreeCodeCamp Front End Projects
        </h1>
        <p className='text-base leading-relaxed'>
          This app incorporates three projects from the freeCodeCamp Front-End
          Development Libraries Curriculum, originally developed and showcased
          on CodePen.
        </p>
        <p>
          I have recently amalgamated and updated these projects into a Vite
          project, developed using React, React Hooks, Redux, React Router, and
          Tailwind CSS.
        </p>
        <a
          className='mt-4 inline-flex items-center gap-2 text-brand-linkedin duration-300 ease-in-out hover:opacity-30'
          href='https://www.freecodecamp.org/certification/carloslsilva/front-end-development-libraries'
          rel='noreferrer'
          target='_blank'
        >
          <span>Certificate</span>
          <span>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </a>
      </div>
      <div className='flex flex-col md:w-1/2 md:pl-12'>
        <h2 className='title-font mb-3 text-sm font-semibold tracking-wide'>
          Projects
        </h2>
        <nav className='-mb-1 flex list-none flex-wrap'>
          <Project to='calculator'>Calculator</Project>
          <Project to='pomodoro'>Pomodoro</Project>
          <Project to='quote-machine'>Quote Machine</Project>
        </nav>
      </div>
    </div>
  </section>
)

const Project = ({ to, children }) => (
  <li className='mb-1 w-1/2 lg:w-1/3'>
    <Link
      className='duration-300 ease-in-out hover:opacity-30 active:animate-ping'
      to={to}
    >
      {children}
    </Link>
  </li>
)
