import React from 'react'

const FavoriteBook = ({stats, func}) => (
    <div className="favebook">
        <div>
        <p className="title">{stats.title}</p>
        <img className='SmallBookImg' src = {stats.img} ></img>
        </div>

        <button className="removeFav"  onClick= {() => {
            func(stats)
        }}>Remove from Favorites</button>
    </div>
)

export default FavoriteBook