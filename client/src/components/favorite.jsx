import React from 'react'

const FavoriteBook = ({stats, func}) => (
    <div>
        <div>
        <img className='SmallBookImg' src = {stats.img} ></img>
        Title: {stats.title}
        </div>

        <button className="removeFav"  onClick= {() => {
            func(stats)
        }}>Remove from Favorites</button>
    </div>
)

export default FavoriteBook