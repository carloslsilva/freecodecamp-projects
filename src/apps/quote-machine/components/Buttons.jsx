import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

export const Buttons = ({ quote, onClick }) => (
  <div className='flex flex-row items-center justify-center py-9'>
    <div className='inline-flex rounded'>
      <Tweet quote={quote} />
      <NewQuote onClick={onClick} />
    </div>
  </div>
)

const Tweet = ({ quote }) => {
  const textURL = `"${quote.text}" ${quote.author}&hashtags=quotes`
  const url = `https://twitter.com/intent/tweet?text=${encodeURI(textURL)}`
  return (
    <a
      className={clsx(
        'rounded-s-lg',
        'bg-slate-100 px-4 py-2 duration-300 ease-in-out hover:bg-slate-200 hover:shadow-md'
      )}
      href={url}
      target='_blank'
      rel='noopener noreferrer'
    >
      <FontAwesomeIcon icon={faTwitter} />
    </a>
  )
}

const NewQuote = ({ onClick }) => (
  <button
    className={clsx(
      'text-sm font-bold',
      'rounded-e-lg',
      'bg-slate-100 px-5 py-2 duration-300 ease-in-out hover:bg-slate-200 hover:shadow-md'
    )}
    onClick={onClick}
  >
    New Quote
  </button>
)
