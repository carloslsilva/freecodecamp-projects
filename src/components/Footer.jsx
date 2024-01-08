import {
  faFreeCodeCamp,
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

const contacts = [
  {
    href: 'https://www.linkedin.com/in/carloslsilva/',
    label: 'LinkedIn',
    className: 'text-brand-linkedin',
    icon: faLinkedin
  },
  {
    href: 'https://github.com/carloslsilva/',
    label: 'GitHub',
    className: 'text-brand-github',
    icon: faGithub
  },
  {
    href: 'https://www.freecodecamp.org/carloslsilva',
    label: 'freeCodeCamp',
    className: 'text-brand-freecodecamp',
    icon: faFreeCodeCamp
  },
  {
    href: 'https://twitter.com/carloslsilva',
    label: 'Twitter',
    className: 'text-brand-twitter',
    icon: faTwitter
  },
  {
    href: 'https://www.youtube.com/channel/UCD0Spg-lYsdrP_nE7Qfca3w',
    label: 'YouTube',
    className: 'text-brand-youtube',
    icon: faYoutube
  }
]

export const Footer = () => {
  const contact = contacts.map(contact => (
    <a
      className={clsx(
        'opacity-70 duration-300 ease-out hover:-translate-y-1 hover:opacity-100 active:animate-ping',
        contact.className
      )}
      key={contact.label}
      href={contact.href}
      rel='noreferrer'
      target='_blank'
    >
      <FontAwesomeIcon icon={contact.icon} />
    </a>
  ))

  return (
    <footer className='flex h-[75px] flex-row items-center justify-center gap-4'>
      <div className='opacity-40'>by Carlos Silva</div>
      <div className='flex flex-row gap-2'>{contact}</div>
    </footer>
  )
}
