import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

const RestaurantDetail = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Helper function to convert price number to $ signs
    const formatPrice = (priceLevel) => {
        if (!priceLevel) return 'N/A'
        return '$'.repeat(priceLevel)
    }

    useEffect(() => {
        const fetchRestaurant = async () => {
            setLoading(true)
            setError(null)

            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
                const cuisineType = searchParams.get('cuisine')
                const url = cuisineType
                    ? `${apiBaseUrl}/restaurants/${id}?cuisineType=${encodeURIComponent(cuisineType)}`
                    : `${apiBaseUrl}/restaurants/${id}`
                const response = await fetch(url)

                if (!response.ok) {
                    const body = await response.text()
                    throw new Error(`Failed to fetch restaurant: ${response.status}${body ? ` — ${body.slice(0, 100)}` : ''}`)
                }

                const data = await response.json()
                setRestaurant(data)
            } catch (err) {
                console.error('Fetch error:', err)
                // Network errors (CORS, timeout, unreachable) often have message "Failed to fetch"
                setError(err.message || 'Failed to fetch restaurant')
            } finally {
                setLoading(false)
            }
        }

        fetchRestaurant()
    }, [id, searchParams])

    if (loading) {
        return (
            <div className="restaurant-detail-container">
                <div className="loading">
                    <p>Loading restaurant details...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="restaurant-detail-container">
                <div className="error-message">
                    <p>Error: {error}</p>
                    <button onClick={() => navigate('/')} className="back-btn">
                        ← Back to Search
                    </button>
                </div>
            </div>
        )
    }

    if (!restaurant) {
        return (
            <div className="restaurant-detail-container">
                <p>Restaurant not found</p>
                <button onClick={() => navigate('/')} className="back-btn">
                    ← Back to Search
                </button>
            </div>
        )
    }

    return (
        <div className="restaurant-detail-container">
            <button onClick={() => navigate('/')} className="back-btn">
                ← Back to Search
            </button>

            <div className="restaurant-detail-card">
                <h2>{restaurant.restaurantName}</h2>

                <div className="detail-section">
                    <h3>Details</h3>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <span className="detail-label">Cuisine:</span>
                            <span className="detail-value">{restaurant.cuisineType}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Price Range:</span>
                            <span className="detail-value">{formatPrice(restaurant.price)}</span>
                        </div>
                        {restaurant.dietaryPreference && (
                            <div className="detail-item">
                                <span className="detail-label">Dietary:</span>
                                <span className="detail-value">{restaurant.dietaryPreference}</span>
                            </div>
                        )}
                        {restaurant.distance && (
                            <div className="detail-item">
                                <span className="detail-label">Distance:</span>
                                <span className="detail-value">{restaurant.distance} miles away</span>
                            </div>
                        )}
                        {restaurant.rating && (
                            <div className="detail-item">
                                <span className="detail-label">Rating:</span>
                                <span className="detail-value">{restaurant.rating}/5 ⭐</span>
                            </div>
                        )}
                        {restaurant.address && (
                            <div className="detail-item">
                                <span className="detail-label">Address:</span>
                                <span className="detail-value">{restaurant.address}</span>
                            </div>
                        )}
                    </div>
                </div>

                {restaurant.keywords && restaurant.keywords.length > 0 && (
                    <div className="detail-section">
                        <h3>Keywords</h3>
                        <div className="keywords-tags">
                            {restaurant.keywords.map((keyword, index) => (
                                <span key={index} className="keyword-tag">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {restaurant.description && (
                    <div className="detail-section">
                        <h3>About</h3>
                        <p>{restaurant.description}</p>
                    </div>
                )}

                {restaurant.hours && (
                    <div className="detail-section">
                        <h3>Hours</h3>
                        <p>{restaurant.hours}</p>
                    </div>
                )}

                {restaurant.phone && (
                    <div className="detail-section">
                        <h3>Contact</h3>
                        <p>📞 {restaurant.phone}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RestaurantDetail
