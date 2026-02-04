import React from 'react'

const RestaurantResults = ({ restaurants, loading }) => {
    if (loading) {
        return (
            <div className="loading">
                <p>Searching for restaurants...</p>
            </div>
        )
    }

    if (!restaurants || restaurants.length === 0) {
        return null
    }

    return (
        <div className="results-section">
            <h4>Found {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''}</h4>
            <div className="restaurant-grid">
                {restaurants.map((restaurant, index) => (
                    <div key={restaurant.id || index} className="restaurant-card">
                        <h5>{restaurant.name}</h5>
                        <p className="cuisine-type">{restaurant.cuisine}</p>
                        <p className="price-range">{restaurant.price}</p>
                        {restaurant.dietary && (
                            <p className="dietary-info">{restaurant.dietary}</p>
                        )}
                        {restaurant.distance && (
                            <p className="distance">{restaurant.distance} miles away</p>
                        )}
                        {restaurant.rating && (
                            <p className="rating">Rating: {restaurant.rating}/5</p>
                        )}
                        {restaurant.address && (
                            <p className="address">{restaurant.address}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RestaurantResults