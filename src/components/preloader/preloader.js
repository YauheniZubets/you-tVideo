import preloader from './img/tube-spinner.svg';
import './preloader.css';

export const Preloader = () => {
    return (
        <div className='preloader-container'>
            <div className="preloader">
                <img src={preloader} alt='Загурзка...'/>
            </div>
        </div>
        
    )
}