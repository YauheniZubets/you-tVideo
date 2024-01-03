import { Link } from 'react-router-dom';
import { Favourite } from '../Favourite/favourite';

import logo_w from './img/logo_w.svg';

export const Hero = (props) => {    
    return (
        <section className="hero">
            <div className="container ">
                <div className="hero__container">
                    <Link to='/' className='hero__link'>
                        <img src={logo_w} alt='white-logo'/>
                    </Link>
                    <Favourite favWord={true} white={true} />
                    <h1 className="hero__title">Смотри. Загружай. Создавай</h1>   
                    <p className="hero__tagline">Удобный видеохостинг для тебя</p>
                </div>
            </div>
        </section>
    )
}