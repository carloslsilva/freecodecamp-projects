export const Display = ({ status, value }) => {
  return (
    <div className='px-1 text-right font-display'>
      <div className='min-h-5 text-[1rem] opacity-60'>{status}</div>
      <div className='pb-5 pt-2 text-[2rem]' id='display'>
        {value}
      </div>
    </div>
  )
}
