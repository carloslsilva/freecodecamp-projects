import { useState } from 'react'
import { Buttons } from './components/Buttons'
import { Quote } from './components/Quote'
import { getRandomQuote } from './lib/quotes'

export const App = () => {
  const [quote, setQuote] = useState(getRandomQuote())
  return (
    <div>
      <Quote quote={quote} />
      <Buttons quote={quote} onClick={() => setQuote(getRandomQuote())} />
    </div>
  )
}
