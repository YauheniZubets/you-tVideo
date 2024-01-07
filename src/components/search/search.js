import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import search from './img/search.svg';
import './search.css';

export const Search = (props) => {

    const {toSearch} = props;
    const [inpVal, setInpVal] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const cbChangeInpVal = (e) => {
        const targVal = e.target.value;
        setInpVal(targVal);
    };

    const cbSubm = (e) => {
        e.preventDefault();
        const value = inpVal.trim();
        if (inpVal) {
            toSearch(value);
            navigate(`/search?q=${value}`);
        }
    }

    useEffect(() => {
        if (location.pathname !== '/search') setInpVal('');
    }, [location]);

    return (
        <section className="search">
            <div className="container">
                <form className="search__form">
                    <input className="search__input" type="search" placeholder='Найти видео...' 
                        onChange={cbChangeInpVal} value={inpVal}
                    />
                    <button className="search_btn" type="submit" onClick={cbSubm}>
                        <span>поиск</span>
                        <img className="search__icon" src={search} alt='search'/>
                    </button>
                </form>
            </div>
        </section>
    )
} 