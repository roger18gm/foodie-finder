import React, { useState } from 'react'
import Hero from './Hero'
import SearchSection from './SearchSection'
import Features from './Features'
import About from './About'

const Home = () => {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearch = async (filters) => {
        setLoading(true)
        setError(null)

        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
            const queryParams = new URLSearchParams()

            // Build query parameters from filters
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value.trim() !== '') {
                    queryParams.append(key, value)
                }
            })

            const response = await fetch(`${apiBaseUrl}/search?${queryParams}`)

            if (!response.ok) {
                throw new Error(`Failed to fetch restaurants: ${response.status}`)
            }

            const data = await response.json()
            // Handle both array response and wrapped response
            setRestaurants(Array.isArray(data) ? data : (data.restaurants || []))
        } catch (err) {
            console.error('Search error:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Hero />
            <SearchSection
                onSearch={handleSearch}
                loading={loading}
                error={error}
                restaurants={restaurants}
            />
            <Features />
            <About />
        </>
    )
}

export default Home
