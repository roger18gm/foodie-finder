import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SearchSection from './components/SearchSection'
import Features from './components/Features'
import About from './components/About'
import Footer from './components/Footer'
import leftAd from './images/Gemini_Generated_Image_30hp6530hp6530hp.png'
import rightAd from './images/Gemini_Generated_Image_9bnvjj9bnvjj9bnv.png'
import './App.css'

function App() {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearch = async (filters) => {
        setLoading(true)
        setError(null)

        try {
            // TODO: Replace with actual API Gateway endpoint
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
        <div className="App">
            <div className="ad-banner ad-banner-left">
                <img src={leftAd} alt="Advertisement" />
            </div>
            <div className="main-content">
                <Header />
                <Hero />
                <SearchSection
                    onSearch={handleSearch}
                    loading={loading}
                    error={error}
                    restaurants={restaurants}
                />
                <Features />
                <About />
                <Footer />
            </div>
            <div className="ad-banner ad-banner-right">
                <img src={rightAd} alt="Advertisement" />
            </div>
        </div>
    )
}

export default App