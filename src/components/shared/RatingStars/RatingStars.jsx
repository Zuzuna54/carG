import React from 'react';
import './RatingStars.scss';

const RatingStars = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;
    const decimal = Math.round((rating - filledStars) * 10) / 10; // Round to the nearest tenth

    const renderStars = () => {
        const stars = [];

        // Render filled stars
        for (let i = 0; i < filledStars; i++) {
            stars.push(<span key={i} className="star filled">&#9733;</span>);
        }

        // Render filled tenth stars
        if (decimal < 0.5) {
            console.log('decimal', decimal);
            stars.push(<span key="tenth" className={`star filled-tenth below-half`}>&#9733;</span>);
        } else {
            stars.push(<span key="tenth" className={`star filled-tenth above-half`}>&#9733;</span>);
        }

        // Render remaining empty stars
        for (let i = 0; i < remainingStars - (decimal > 0 ? 1 : 0); i++) {
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
