export const Quote = ({ quote }) => (
  <div className='prose h-[100px]'>
    <blockquote>
      <p>{quote.text}</p>
      <footer>
        <cite>{quote.author}</cite>
      </footer>
    </blockquote>
  </div>
)
