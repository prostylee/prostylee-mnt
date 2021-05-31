import React from 'react';

export const AppFooter = () => {

    return (
        <div className="layout-footer">
            <img src="/images/logo-full.png" alt="Logo" height="28" />
          <span className="footer-text" style={{ 'marginLeft': '5px' }}>Prostylee Management System. </span>
            <span className="footer-text" style={{ 'marginLeft': '5px' }}>Copyright &copy;{new Date().getFullYear()}</span>
        </div>
    );
}
