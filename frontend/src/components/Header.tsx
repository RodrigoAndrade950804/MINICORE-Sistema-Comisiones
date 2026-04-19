import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo-section">
                        <h1 className="logo">
                            <span className="logo-icon">🚀</span>
                            MINICORE
                        </h1>
                        <p className="tagline">Sistema de Comisiones</p>
                    </div>
                    
                    <div className="header-info">
                        <div className="tecnologias">
                            <span className="tech-tag">React</span>
                            <span className="tech-tag">TypeScript</span>
                            <span className="tech-tag">Node.js</span>
                            <span className="tech-tag">Express</span>
                        </div>
                        
                        <div className="estado-servidor">
                            <span className="estado conectado">🟢 API Conectada</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;