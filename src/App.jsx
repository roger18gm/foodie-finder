import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import RestaurantDetail from './components/RestaurantDetail'
import leftAd from './images/Gemini_Generated_Image_30hp6530hp6530hp.png'
import rightAd from './images/Gemini_Generated_Image_9bnvjj9bnvjj9bnv.png'
import './App.css'

function App() {
    return (
        <Router>
            <div className="App">
                <div className="ad-banner ad-banner-left">
                    <img src={leftAd} alt="Advertisement" />
                </div>
                <div className="main-content">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                    </Routes>
                    <Footer />
                </div>
                <div className="ad-banner ad-banner-right">
                    <img src={rightAd} alt="Advertisement" />
                </div>
            </div>
        </Router>
    )
}

export default App