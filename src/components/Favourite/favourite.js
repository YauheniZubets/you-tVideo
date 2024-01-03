import { useState } from 'react';
import {Link} from 'react-router-dom';
import favourite_normal from './img/fav-o.svg';
import favourite_w from './img/fav-w.svg';
import favourite_or from './img/favourite-or.svg';

import './favourite.css';

export const Favourite = (props) => {
    const {active, favWord, orange, white, noColor, id} = props;

    const favouriteIds = JSON.parse(localStorage.getItem('favouriteYT') || "[]");
    const colorStatus = favouriteIds.includes(id);
    
    const [orangeColor, setOrange] = useState(colorStatus);

    const cbAddFavour = (ev) => {  
        ev.preventDefault();
        const favouriteIds = JSON.parse(localStorage.getItem('favouriteYT') || "[]");
        if (favouriteIds.includes(id)) {
            const indexToDel = favouriteIds.indexOf(id);
            favouriteIds.splice(indexToDel, 1);
            localStorage.setItem('favouriteYT', JSON.stringify(favouriteIds));
            setOrange(false);
        } else {
            favouriteIds.push(id);
            localStorage.setItem('favouriteYT', JSON.stringify(favouriteIds));
            setOrange(true);
        }
    }
    
    return (
        <>  
            {
                active ?  
                <button className='video__link video__link_active' onClick={cbAddFavour}>
                    {   
                        orangeColor ?
                        <span className='video__favourite'>В избранном</span>
                        :
                        <span className='video__no-favourite'>Добавить в избранное</span>
                    }
                    <div className='header__icon'>
                        {orangeColor ? 
                            <img src={favourite_or} alt='fav_o'/>
                            :
                            <img src={favourite_normal} alt='fav_o'/> 
                        }
                    </div>
                </button>
                : 
                <Link to='/favourite' className='header__link header__link_favourite'>
                    {favWord && <span className='hero__link-text'>Избранное</span>}
                    <div className='header__icon'>
                        {noColor && <img src={favourite_normal} alt='fav_o'/>}
                        {orange && <img src={favourite_or} alt='fav_o'/>}
                        {white && <img src={favourite_w} alt='fav_o'/>}
                    </div>
                </Link>
            }
        </>
        
    )
}