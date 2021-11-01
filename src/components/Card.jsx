import './card-component.css'

const Card = ({ src, handleChoice }) => {

    const handleClick = () => {
        handleChoice(src)
    }

    return (
        <div className='card'>
            <div>
                <img src={src} alt="random_animal" className='card-front' onClick={handleClick} />
                <img src='/images/pattern.jpg' alt="card_cover" className='card-back' onClick={handleClick} />
            </div>
        </div>
    )
}

export default Card