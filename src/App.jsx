import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'

const cardImages = [
  { src: '/images/bear.jpg', matched: false },
  { src: '/images/tiger.jpg', matched: false },
  { src: '/images/alligator.jpg', matched: false },
  { src: '/images/o\'possum.jpg', matched: false },
  { src: '/images/panda.jpg', matched: false },
  { src: '/images/gorilla.jpg', matched: false },
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  //  below state limits click events to two at a time  //
  const [disabled, setDisabled] = useState(false)

  //  shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    //  ensure clearing out of choice state upon game reset  //
    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shuffledCards)
    setTurns(0)
  }

  //  start game board with useEffect running once on DOM load
  useEffect(() => {
    shuffleCards()
  }, [])

  //  handle click choices
  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //  reset choices and increment turn count
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => ++prevTurn)
    setDisabled(false)
  }

  //  check to see if users two choices match - using useEffect
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true }
          } else {
            return card
          }
        }))

        resetTurn()

      } else {
        setTimeout(() => {
          resetTurn()
        }, 600)

      }
    }
  }, [choiceOne, choiceTwo])


  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>Restart</button>
      <div className="card-grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p> Turns taken: {turns}</p>
    </div >
  )
}

export default App
