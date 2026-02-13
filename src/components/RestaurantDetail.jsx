import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

const RestaurantDetail = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Reviews state
    const [reviews, setReviews] = useState([])
    const [reviewsLoading, setReviewsLoading] = useState(false)
    const [reviewsError, setReviewsError] = useState(null)

    // Review form state
    const [reviewForm, setReviewForm] = useState({
        username: '',
        rating: 5,
        comment: ''
    })
    const [submitting, setSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

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

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            setReviewsLoading(true)
            setReviewsError(null)

            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
                const response = await fetch(`${apiBaseUrl}/reviews?restaurantId=${id}`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch reviews: ${response.status}`)
                }

                const data = await response.json()
                // Sort reviews by createdAt (newest first)
                const sortedReviews = (Array.isArray(data) ? data : []).sort((a, b) => b.createdAt - a.createdAt)
                setReviews(sortedReviews)
            } catch (err) {
                console.error('Reviews fetch error:', err)
                setReviewsError(err.message)
            } finally {
                setReviewsLoading(false)
            }
        }

        if (id) {
            fetchReviews()
        }
    }, [id])

    // Handle review form submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setSubmitSuccess(false)

        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
            const response = await fetch(`${apiBaseUrl}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurantId: id,
                    username: reviewForm.username || 'anonymous',
                    rating: reviewForm.rating,
                    comment: reviewForm.comment
                })
            })

            if (!response.ok) {
                throw new Error(`Failed to submit review: ${response.status}`)
            }

            // Reset form and show success
            setReviewForm({ username: '', rating: 5, comment: '' })
            setSubmitSuccess(true)

            // Refresh reviews list
            const reviewsResponse = await fetch(`${apiBaseUrl}/reviews?restaurantId=${id}`)
            if (reviewsResponse.ok) {
                const data = await reviewsResponse.json()
                const sortedReviews = (Array.isArray(data) ? data : []).sort((a, b) => b.createdAt - a.createdAt)
                setReviews(sortedReviews)
            }

            // Hide success message after 3 seconds
            setTimeout(() => setSubmitSuccess(false), 3000)
        } catch (err) {
            console.error('Review submission error:', err)
            alert('Failed to submit review. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    // Format date for reviews
    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

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

                {/* Reviews Section */}
                <div className="detail-section reviews-section">
                    <h3>Reviews ({reviews.length})</h3>

                    {/* Add Review Form */}
                    <div className="add-review-form">
                        <h4>Write a Review</h4>
                        {submitSuccess && (
                            <div className="success-message">
                                Review submitted successfully! ✓
                            </div>
                        )}
                        <form onSubmit={handleReviewSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Name (optional)</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Anonymous"
                                    value={reviewForm.username}
                                    onChange={(e) => setReviewForm({ ...reviewForm, username: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <select
                                    id="rating"
                                    value={reviewForm.rating}
                                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                                    required
                                >
                                    <option value={5}>5 - Excellent</option>
                                    <option value={4}>4 - Very Good</option>
                                    <option value={3}>3 - Good</option>
                                    <option value={2}>2 - Fair</option>
                                    <option value={1}>1 - Poor</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="comment">Comment</label>
                                <textarea
                                    id="comment"
                                    rows="4"
                                    placeholder="Share your experience..."
                                    value={reviewForm.comment}
                                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-review-btn" disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    </div>

                    {/* Reviews List */}
                    <div className="reviews-list">
                        {reviewsLoading && <p className="loading-text">Loading reviews...</p>}
                        {reviewsError && <p className="error-text">Error loading reviews: {reviewsError}</p>}
                        {!reviewsLoading && !reviewsError && reviews.length === 0 && (
                            <p className="no-reviews">No reviews yet. Be the first to review!</p>
                        )}
                        {!reviewsLoading && reviews.map((review) => (
                            <div key={review.reviewId} className="review-card">
                                <div className="review-header">
                                    <span className="review-username">{review.username}</span>
                                    <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                                <span className="review-date">{formatDate(review.createdAt)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantDetail
