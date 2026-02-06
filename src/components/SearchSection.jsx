import React, { useState } from 'react'
import RestaurantResults from './RestaurantResults'

const SearchSection = ({ onSearch, loading, error, restaurants }) => {
    const [filters, setFilters] = useState({
        keyword: '',
        cuisine: '',
        price: '',
        diet: '',
        distance: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(filters)
    }

    return (
        <section id="search" className="search-section">
            <h3>Filter Your Search</h3>

            <form className="filter-form" onSubmit={handleSubmit}>
                {/* Keyword */}
                <div className="filter-group">
                    <label htmlFor="keyword">Keyword</label>
                    <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        placeholder="Pizza, sushi, burgers..."
                        value={filters.keyword}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Cuisine */}
                <div className="filter-group">
                    <label htmlFor="cuisine">Cuisine</label>
                    <select
                        id="cuisine"
                        name="cuisine"
                        value={filters.cuisine}
                        onChange={handleInputChange}
                    >
                        <option value="">Any</option>
                        <option value="Italian">Italian</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Asian">Asian</option>
                        <option value="American">American</option>
                        <option value="Indian">Indian</option>
                    </select>
                </div>

                {/* Price */}
                <div className="filter-group">
                    <label htmlFor="price">Price Range</label>
                    <select
                        id="price"
                        name="price"
                        value={filters.price}
                        onChange={handleInputChange}
                    >
                        <option value="">Any</option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                    </select>
                </div>

                {/* Dietary */}
                <div className="filter-group">
                    <label htmlFor="diet">Dietary Preferences</label>
                    <select
                        id="diet"
                        name="diet"
                        value={filters.diet}
                        onChange={handleInputChange}
                    >
                        <option value="">None</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="gluten-free">Gluten-Free</option>
                        <option value="halal">Halal</option>
                    </select>
                </div>

                {/* Distance */}
                <div className="filter-group">
                    <label htmlFor="distance">Distance</label>
                    <select
                        id="distance"
                        name="distance"
                        value={filters.distance}
                        onChange={handleInputChange}
                    >
                        <option value="">Any</option>
                        <option value="1">1 mile</option>
                        <option value="5">5 miles</option>
                        <option value="10">10 miles</option>
                    </select>
                </div>

                {/* Button */}
                <button type="submit" className="search-btn" disabled={loading}>
                    {loading ? 'Searching...' : 'Find Restaurants'}
                </button>
            </form>

            {/* Error Display */}
            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            )}

            {/* Restaurant Results */}
            <RestaurantResults restaurants={restaurants} loading={loading} />
        </section>
    )
}

export default SearchSection