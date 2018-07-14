import React from 'react'

const FavoriteBook = ({stats}) => (
    <div>
        <img className='SmallBookImg' src = {stats.img} ></img>
        Title: {stats.title}
    </div>
)

export default FavoriteBook