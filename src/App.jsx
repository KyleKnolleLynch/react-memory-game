import { useState } from 'react'
import './App.css'
import Card from './components/Card'

const cardImages = [
  { src: '/images/bear.jpg' },
  { src: '/images/tiger.jpg' },
  { src: '/images/alligator.jpg' },
  { src: '/images/o\'possum.jpg' },
  { src: '/images/panda.jpg' },
  { src: '/images/gorilla.jpg' },
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  //  shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>
        {turns === 0 ? 'Start' : 'Restart'}
      </button>
      <div className="card-grid">
        {cards.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      <p> Turns left: {turns}</p>
    </div >
  )
}

export default App
