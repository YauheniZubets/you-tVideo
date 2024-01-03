import { useState } from 'react';
import favourite_w from '../Favourite/img/fav-w.svg';
import favourite_or from '../Favourite/img/favourite-or.svg';

export const FavOnVideo = (props) => {
    const {orange, videoId} = props;

    const [orangeColor, setOrange] = useState(orange);

    const cbAddFavour = (ev) => {  
        ev.preventDefault();
        const target = ev.target;
        const but = target.closest('.favourite');
        const currentId = but.dataset.videoId;
        const favouriteIds = JSON.parse(localStorage.getItem('favouriteYT') || "[]");
        if (favouriteIds.includes(currentId)) {
            const indexToDel = favouriteIds.indexOf(currentId);
            favouriteIds.splice(indexToDel, 1);
            localStorage.setItem('favouriteYT', JSON.stringify(favouriteIds));
            setOrange(false);
        } else {
            favouriteIds.push(currentId);
            localStorage.setItem('favouriteYT', JSON.stringify(favouriteIds));
            setOrange(true);
        }
    }
    
    return (
        <button className="video-card__favourite favourite" type="button" aria-label="Добавить в избранное Философия Идущего к реке"
        data-video-id={videoId} onClick={cbAddFavour}>
            <div className='header__icon fav-on-video'>
                {
                    orangeColor 
                    ? <img src={favourite_or} alt='fav_o'/>
                    : <img src={favourite_w} alt='fav_o'/>
                }
            </div>
        </button>
        
    )
}