import React from 'react';

function Header() {
    const headerStyle = {
        backgroundColor: '#282c34',
        padding: '5px 0',
        color: 'white',
        textAlign: 'center',
    };

    return (
        <header style={headerStyle}>
            <h1>Disease Assessment Portal</h1>
        </header>
    );
}

export default Header;
