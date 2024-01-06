import { contacts } from '@/lib/contacts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

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
