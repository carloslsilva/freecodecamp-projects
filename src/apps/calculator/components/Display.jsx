export const Display = ({ operator, value }) => (
  <div className='text-right font-display'>
    <div className='h-5 text-[1rem] opacity-60'>{operator}</div>
    <div className='pb-5 pt-2 text-[2rem]' id='display'>
      {value}
    </div>
  </div>
)
