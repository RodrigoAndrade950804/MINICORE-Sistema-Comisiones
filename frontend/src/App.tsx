
import React, { useState } from 'react';
import './App.css';
import ComisionCalculator from './components/ComisionCalculator';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <h1>🚀 MINICORE</h1>
            <p className="subtitle">Sistema de Comisiones de Ventas</p>
            <p className="description">
              Filtra y calcula comisiones de vendedores por rango de fechas
            </p>
          </div>
          
          <ComisionCalculator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;