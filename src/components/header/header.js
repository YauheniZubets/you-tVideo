import {Link} from 'react-router-dom';
import logoOr from './img/logo.svg';
import logoWh from '../main/img/logo_w.svg';

import { Favourite } from '../Favourite/favourite';

import './header.css';

export const Header = (props) => {

    const {white, orange} = props;

    return (
        <header className='header'>
            <div className='container header__container'>
                <Link to='/you-tVideo' className='header__logo'>
                    {orange && <img src={logoOr} alt='orange-logo' className='header__logo'/> }
                    {white && <img src={logoWh} alt='white-logo' className='header__logo'/>}
                </Link>
                <Favourite favWord={true} noColor={true} />
            </div>
        </header>
    )
}