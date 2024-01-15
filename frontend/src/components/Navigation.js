import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Button} from './Button';
import './Navigation.css';


function Navigation() {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);


    const handleClick = () => setClick(!click) ;
    const closeMobileMenu = () => setClick(false);

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
        closeMobileMenu();
    }

    // 화면 크기에 따라서 버튼이 보이고 안보이도록 설정한다. 
    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false)
        }
        else {
            setButton(true);
        }
    };

    // SIGNUP버튼이 사이즈가 줄어들면 없어지도록 한다. 
    useEffect(() => {
        showButton();
    }, []);


    window.addEventListener('resize', showButton);

    return (
        <>
        <nav className = 'navbar'>
            <div className = 'navbar-container'>
                
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    Ditto
                    <i className='fab fa-typo3' />
                </Link>
                
                <div className='menu-icon' onClick={handleClick}>
                    <i className = {click ? 'fas fa-times' : 'fas fa-bars' } />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/login' className='nav-links' onClick = {goToLogin}>
                            LOGIN
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/signup' className='nav-links-mobile' onClick = {closeMobileMenu}>
                            SIGN UP
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn_outline'>SIGN UP</Button>}
            </div>
        </nav>
        </>
    );
}

export default Navigation