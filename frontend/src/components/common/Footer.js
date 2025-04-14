import React from 'react';

function Footer() {
    const footerStyle = {
        backgroundColor: '#282c34',
        padding: '10px 0',
        color: 'white',
        textAlign: 'center',
        marginTop: '20px',
    };

    return (
        <footer style={footerStyle}>
            <h3>&copy; 2024 Disease Assessment Portal. All rights reserved.</h3>
        </footer>
    );
}

export default Footer;
