import React from 'react';
import './RatingStars.scss';

const RatingStars = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;
    const decimal = rating - filledStars;

    const renderStars = () => {
        const stars = [];

        // Render filled stars
        for (let i = 0; i < filledStars; i++) {
            stars.push(<span key={i} className="star filled">&#9733;</span>);
        }

        // Render quarter stars if applicable
        if (decimal >= 0.25) {
            stars.push(<span key="quarter" className="star quarter">&#9734;&#9733;</span>);
        } else if (decimal >= 0.75) {
            stars.push(<span key="three-quarters" className="star three-quarters">&#9733;&#9734;</span>);
        }

        // Render remaining empty stars
        for (let i = 0; i < remainingStars - (decimal >= 0.75 ? 1 : 0); i++) {
            stars.push(<span key={i + filledStars} className="star">&#9734;</span>);
        }

        return stars;
    };

    return (
        <div className="rating-stars">
            {renderStars()}
        </div>
    );
};

export default RatingStars;