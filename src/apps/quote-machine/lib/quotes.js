const quotes = [
  {
    text: 'It always seems impossible until it’s done.',
    author: 'Nelson Mandela'
  },
  {
    text: 'The unexamined life is not worth living.',
    author: 'Socrates'
  },
  {
    text: 'Try not to become a man of success but rather to become a man of value.',
    author: 'Albert Einstein'
  },
  {
    text: 'No matter who you are or what you look like, how you started off, or how and who you love, America is a place where you can write your own destiny.',
    author: 'Barack Obama'
  },
  {
    text: 'Turn your wounds into wisdom.',
    author: 'Oprah Winfrey'
  },
  {
    text: 'I don’t think of all the misery but of the beauty that still remains.',
    author: 'Anne Frank'
  },
  {
    text: 'Whatever you are, be a good one.',
    author: 'Abraham Lincoln'
  },
  {
    text: 'Do what you can, with what you have, where you are.',
    author: 'Theodore Roosevelt'
  },
  {
    text: 'Little by little, one travels far.',
    author: 'J.R.R. Tolkien'
  },
  {
    text: 'It’s not how much you have that makes people look up to you, it’s who you are.',
    author: 'Elvis Presley'
  },
  {
    text: 'I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.',
    author: 'Bruce Lee'
  },
  {
    text: 'A man who stands for nothing will fall for anything.',
    author: 'Malcolm X'
  },
  {
    text: 'In order to be irreplaceable one must always be different.',
    author: 'Coco Chanel'
  },
  {
    text: 'You have power over your mind – not outside events. Realize this, and you will find strength.',
    author: 'Marcus Aurelius'
  },
  {
    text: 'Love all, trust a few, do wrong to none.',
    author: 'William Shakespeare'
  },
  {
    text: 'I have a dream that one day little black boys and girls will be holding hands with little white boys and girls.',
    author: 'Martin Luther King Jr'
  },
  {
    text: 'Imperfection is beauty, madness is genius and it’s better to be absolutely ridiculous than absolutely boring.',
    author: 'Marilyn Monroe'
  },
  {
    text: 'The path to success is to take massive, determined action.',
    author: 'Tony Robbins'
  },
  {
    text: 'Be kind whenever possible. It is always possible.',
    author: 'Dalai Lama'
  },
  {
    text: 'Life is a flower of which love is the honey.',
    author: 'Victor Hugo'
  },
  {
    text: 'Love the life you live. Live the life you love.',
    author: 'Bob Marley'
  },
  {
    text: 'God helps those that help themselves.',
    author: 'Benjamin Franklin'
  },
  {
    text: 'By failing to prepare, you are preparing to fail.',
    author: 'Benjamin Franklin '
  },
  {
    text: 'I think, therefore I am.',
    author: 'René Descartes'
  },
  {
    text: 'That’s one small step for a man, one giant leap for mankind.',
    author: 'Neil Armstrong'
  },
  {
    text: 'The only thing that interferes with my learning is my education.',
    author: 'Albert Einstein'
  },
  {
    text: 'Ask not what your country can do for you, but what you can do for your country.',
    author: 'John F. Kennedy'
  },
  {
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt'
  },
  {
    text: 'Family is the most important thing in the world.',
    author: 'Diana, Princess of Wales'
  },
  {
    text: 'The journey of a thousand miles begins with one step.',
    author: 'Lao Tzu'
  },
  {
    text: 'I’ve failed over and over and over again in my life and that is why I succeed.',
    author: 'Michael Jordan'
  },
  {
    text: 'It does not matter how slowly you go so long as you do not stop.',
    author: 'Confucius'
  },
  {
    text: 'You miss 100 percent of the shots you never take.',
    author: 'Wayne Gretzky'
  },
  {
    text: 'Peace begins with a smile.',
    author: 'Mother Teresa'
  },
  {
    text: 'You only live once, but if you do it right, once is enough.',
    author: 'Mae West'
  },
  {
    text: 'Go confidently in the direction of your dreams. Live the life you have imagined.',
    author: 'Henry David Thoreau'
  },
  {
    text: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela'
  },
  {
    text: 'Good artists copy, great artists steal.',
    author: 'Pablo Picasso'
  },
  {
    text: 'That which does not kill us makes us stronger.',
    author: 'Friedrich Nietzsche'
  },
  {
    text: 'Keep calm and carry on.',
    author: 'Winston Churchill'
  },
  {
    text: 'Be the hero of your own story.',
    author: 'Joe Rogan'
  },
  {
    text: 'Don’t count the days, make the days count.',
    author: 'Muhammad Ali'
  },
  {
    text: 'Winners never quit, and quitters never win.',
    author: 'Vince Lombardi'
  },
  {
    text: 'Simplicity is the ultimate sophistication.',
    author: 'Leonardo da Vinci'
  },
  {
    text: 'It’s fun to do the impossible.',
    author: 'Walt Disney'
  },
  {
    text: 'Have no fear of perfection, you’ll never reach it.',
    author: 'Salvador Dali'
  },
  {
    text: 'What worries you, masters you.',
    author: 'John Locke'
  },
  {
    text: 'Whatever you do, do with all your might.',
    author: 'Cicero'
  },
  {
    text: 'The future starts today, not tomorrow.',
    author: 'Pope John Paul II'
  },
  {
    text: 'Your time is limited, so don’t waste it living someone else’s life.',
    author: 'Steve Jobs'
  },
  {
    text: 'Change your thoughts and you change your world.',
    author: 'Norman Vincent Peale'
  },
  {
    text: 'Nothing is impossible, the word itself says, “I’m possible!”',
    author: 'Audrey Hepburn'
  },
  {
    text: 'Everything has beauty, but not everyone can see.',
    author: 'Confucius'
  },
  {
    text: 'A truly rich man is one whose children run into his arms when his hands are empty.',
    author: 'Unknown'
  },
  {
    text: 'Dreaming, after all, is a form of planning.',
    author: 'Gloria Steinem'
  }
]

export const getRandomQuote = () => {
  const r = Math.floor(Math.random() * quotes.length)
  return quotes[r]
}
