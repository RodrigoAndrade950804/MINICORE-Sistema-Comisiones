import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>🎯 Funcionalidad CORE</h3>
                        <p>Filtrado y cálculo de comisiones por rango de fechas</p>
                    </div>

                    <div className="footer-section">
                        <h3>🏗️ Arquitectura MVC</h3>
                        <p>Model-View-Controller con React + Node.js</p>
                    </div>

                    <div className="footer-section">
                        <h3>🛠️ Tecnologías</h3>
                        <p>React + TypeScript + Node.js + Express</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-info">
                        <p>© {currentYear} MINICORE - Carlos Ochoa | UDLA</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;