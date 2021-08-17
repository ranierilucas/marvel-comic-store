import React from 'react';
import { Link } from "react-router-dom";

function ResultCard({ comic }) {
    return (
        <div className="result-card">

            <div className="poster-wrapper">
                <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension}
                    alt={`${comic.title} Poster`} />
            </div>
            <div className="info">
                <div className="header">
                    <h3 className="title">{comic.title}</h3>
                    <h4 className="description">{comic.description}</h4>
                </div>
                <div className='controls'>
                    <Link to={`details/${comic.id}`} className="btn" >Details</Link>
                </div>
            </div>


        </div>
    );
}

export default ResultCard;
