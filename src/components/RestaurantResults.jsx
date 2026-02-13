import React from 'react'
import { Link } from 'react-router-dom'
import americanImage from '../images/American.avif'
import american2Image from '../images/American2.avif'
import asianImage from '../images/Asian.avif'
import asian2Image from '../images/Asian2.avif'
import italianImage from '../images/Italian.avif'
import mexicanImage from '../images/Mexican.avif'
import pizzaImage from '../images/Pizza.avif'

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

    // Helper function to get image path based on cuisine type and keywords
    const getRestaurantImage = (restaurant) => {
        const cuisineType = restaurant.cuisineType?.toLowerCase() || ''
        const keywords = restaurant.keywords?.map(k => k.toLowerCase()) || []

        // Check for pizza keyword first
        if (keywords.includes('pizza') || cuisineType.includes('pizza')) {
            return pizzaImage
        }

        // Map cuisine types to images
        const imageMap = {
            'italian': italianImage,
            'mexican': mexicanImage,
            'asian': asianImage,
            'chinese': asianImage,
            'japanese': asianImage,
            'thai': asianImage,
            'korean': asianImage,
            'american': americanImage,
            'indian': asianImage, // Fallback to Asian for Indian
        }

        // Try exact match first
        if (imageMap[cuisineType]) {
            return imageMap[cuisineType]
        }

        // Try partial match
        for (const [key, value] of Object.entries(imageMap)) {
            if (cuisineType.includes(key)) {
                return value
            }
        }

        // Default fallback
        return americanImage
    }

    return (
        <div className="results-section">
            <h4>Found {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''}</h4>
            <div className="restaurant-grid">
                {restaurants.map((restaurant, index) => (
                    <div key={restaurant.restaurantId || index} className="restaurant-card">
                        <div className="restaurant-card-content">
                            <div className="restaurant-info">
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
                                <Link
                                    to={`/restaurants/${restaurant.restaurantId}?cuisine=${encodeURIComponent(restaurant.cuisineType || '')}`}
                                    className="view-details-btn"
                                >
                                    View Details
                                </Link>
                            </div>
                            <div className="restaurant-image">
                                <img
                                    src={getRestaurantImage(restaurant)}
                                    alt={restaurant.restaurantName}
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        e.target.style.display = 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RestaurantResults