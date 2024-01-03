import { Link } from "react-router-dom";
import { Favourite } from "../Favourite/favourite";
import logoW from '../main/img/logo_w.svg';

import './footer.css';

export const Footer = () => {

    return (
        <footer className="footer">
            <div className="container footer__container">
                <Link to='/' className='footer__link footer__link_logo'>
                    <img src={logoW} alt='white-logo'/>
                </Link>
                <ul className="footer__developers">
                    <li className="footer__link footer__link_developers">Designer: Anastasia Ilina </li>
                    <li className="footer__link footer__link_developers">Developer: Yauheni Zubets </li>
                </ul>
                <p className="footer__copyright">© You-Tvideo, 2023 </p>
                </div>
        </footer>
    )
}