import { ButtonPad } from './ButtonPad'
import { Display } from './Display'

export const Calculator = () => {
  return (
    <div className='rounded-md border-[1px] border-alpha px-4 pb-4 pt-9'>
      <Display status={'sum'} value={'123.23'} />
      <ButtonPad />
    </div>
  )
}
