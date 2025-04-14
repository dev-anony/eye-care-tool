import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from './logo.png';

function Header({button3}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const headerStyle = {
        backgroundColor: '#282c34',
        padding: '5px 0',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const logoStyle = {
        width: '50px',
        height: 'auto',
    };

    const hamburgerStyle = {
        cursor: 'pointer',
        marginRight: '20px', // Adjust the spacing as needed
    };

    const menuStyle = {
        position: 'fixed',
        top: '90px',
        right: menuOpen ? '0' : '-100%',
        height: '100%',
        width: '250px',
        backgroundColor: '#282c34',
        color: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'right 0.3s ease-in-out',
        zIndex: '1000',
        alignItems: 'bottom'
    };

    const menuItemStyle = {
        padding: '15px',
        cursor: 'pointer',
        borderBottom: '0.02rem solid grey',
    };

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuItemClick = (item) => {
        console.log(`You clicked ${item}`);
        setMenuOpen(false); // Close menu after clicking
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.hamburger')) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header style={headerStyle}>
            <div>
                <img src={logo} alt="Logo" style={logoStyle} />
            </div>
            <h1>Disease Assessment Portal</h1>
            <div className="hamburger" style={hamburgerStyle} onClick={handleMenuClick}>
                <GiHamburgerMenu size={24} />
            </div>
            <div ref={menuRef} style={menuStyle}>
                <div style={menuItemStyle} onClick={() => handleMenuItemClick('About')}>Results</div>
                <div style={menuItemStyle} onClick={() => handleMenuItemClick('Logout')}>About</div>
                <div style={menuItemStyle} onClick={() => button3('Logout')}>Logout</div>
            </div>
        </header>
    );
}

export default Header;
