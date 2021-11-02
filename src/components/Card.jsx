import './card-component.css'

const Card = ({ card, flipped, handleChoice }) => {

    const handleClick = () => {
        handleChoice(card)
    }

    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
                <img src={card.src} alt="random_animal" className='card-front' />
                <img src='/images/pattern.jpg' alt="card_cover" className='card-back' onClick={handleClick} />
            </div>
        </div>
    )
}

export default Card