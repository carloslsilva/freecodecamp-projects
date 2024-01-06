import clsx from 'clsx'
import { CALCULATOR_BUTTONS } from '../../lib/calculator-buttons'

export const ButtonPad = () => (
  <div className='grid h-[250px] w-[300px] grid-cols-5 grid-rows-4 gap-2'>
    {CALCULATOR_BUTTONS.map(button => (
      <button
        className={clsx(
          'flex items-center justify-center rounded-md font-title text-[1.5rem] text-light duration-300 ease-out hover:opacity-70',
          button.className
        )}
        onClick={e => console.log(e.currentTarget.id)}
        type='button'
        key={button.id}
        id={button.id}
      >
        {button.text}
      </button>
    ))}
  </div>
)
