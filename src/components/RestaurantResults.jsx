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

    // Helper function to convert price number to $ signs
    const formatPrice = (priceLevel) => {
        if (!priceLevel) return 'N/A'
        return '$'.repeat(priceLevel)
    }

    return (
        <div className="results-section">
            <h4>Found {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''}</h4>
            <div className="restaurant-grid">
                {restaurants.map((restaurant, index) => (
                    <div key={restaurant.restaurantId || index} className="restaurant-card">
                        <h5>{restaurant.restaurantName}</h5>
                        <p className="cuisine-type">{restaurant.cuisineType}</p>
                        <p className="price-range">{formatPrice(restaurant.price)}</p>
                        {restaurant.dietaryPreference && (
                            <p className="dietary-info">{restaurant.dietaryPreference}</p>
                        )}
                        {restaurant.distance && (
                            <p className="distance">{restaurant.distance} miles away</p>
                        )}
                        {restaurant.keywords && restaurant.keywords.length > 0 && (
                            <p className="keywords">🏷️ {restaurant.keywords.join(', ')}</p>
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