import React from 'react'
import News from './components/News'
import Info from './components/Info'
import Features from './components/Features'
import Price from './components/Price'
import "./App.css";

function App() {
  return (
    <>
      <h1 className="app-title">App Auto</h1>
      <News />
      <Info />
      <Features />
      <Price />
    </>
  )
}

export default App
