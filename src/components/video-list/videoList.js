import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from "react-router-dom";

import { FavOnVideo } from '../favouriteOnVideo/favOnVideo';
import { Preloader } from '../preloader/preloader';
import arrLeft from './img/arrow-left.svg';
import arrRight from './img/arrow-right.svg';

import './videoList.css';

export const VideoList = (props) => {

    const {toSearch} = props;

    const [list, setList] = useState('');
    const [nextPage, setNextPage] = useState(null);
    const [prewPage, setPrewPage] = useState(null);
    
    const location = useLocation();
    const {id} = useParams();

    const favouriteIds = JSON.parse(localStorage.getItem('favouriteYT') || "[]");

    const API_KEY = 'AIzaSyA5iGedkw50YnvDS4DBB9ZXOTp5T_XEXN8';
    const VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos';
    const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

    const fetchTrendingVideos = async () => {
        if (list.length) setList([]);
        try {
            const url = new URL(VIDEOS_URL);
            url.searchParams.append('part', 'contentDetails, id,snippet');
            url.searchParams.append('chart', 'mostPopular');
            url.searchParams.append('regionCode', 'BY');
            url.searchParams.append('maxResults', 12);
            url.searchParams.append('key', API_KEY);
            const response = await axios.get(url);
            if(!response.status === 200) {
                throw new Error(`HTTP error ${response.status}`)
            }
            return response;
        } catch (error) {console.log('error: ', error);}
    };

    const fetchFavouriteVideos = async () => {
        if (list.length) setList([]);
        try {
            if (favouriteIds.length === 0) {
                return [];
            }
            const url = new URL(VIDEOS_URL);
            url.searchParams.append('part', 'contentDetails, id,snippet');
            url.searchParams.append('maxResults', 12);
            url.searchParams.append('id', favouriteIds.join(','));
            url.searchParams.append('key', API_KEY);
            const response = await axios.get(url);
            if(!response.status === 200) {
                throw new Error(`HTTP error ${response.status}`)
            }
            return response;
            
        } catch (error) {console.log('error: ', error);}
    };

    const fetchSearchVideos = async (searchQuery, page) => {
        if (list.length) setList([]);
        try {
            if (!searchQuery) return;

            const url = new URL(SEARCH_URL);
            url.searchParams.append('part', 'snippet');
            url.searchParams.append('maxResults', 6);
            url.searchParams.append('q', searchQuery);
            url.searchParams.append('type', 'video');
            url.searchParams.append('key', API_KEY);

            if (page) {
                url.searchParams.append('pageToken', page);
            }
            const response = await axios.get(url);
            if(!response.status === 200) {
                throw new Error(`HTTP error ${response.status}`)
            }
            return response;
        } catch (error) {console.log('error: ', error);}
    };

    const displayListVideo = (videos) => {
        if (videos?.data?.items) {
            const listVideos = videos.data.items.map(video => {
                const colorStatus = favouriteIds.includes(video.id.videoId || video.id);
                return (
                    <li className='video-list__item' key={video.id.videoId || video.id}>
                        <article className="video-card">
                            <Link to={`/video/:${video.id.videoId || video.id}`}>
                                <img className="video-card__thumbnail" src={
                                    video.snippet.thumbnails.standart?.url || video.snippet.thumbnails.high?.url
                                    } alt={`${video.snippet.title}`}/>
                                <h3 className="video-card__title">{video.snippet.title}</h3>
                                <p className="video-card__channel">{video.snippet.channelTitle}</p>
                                <p className="video-card__duration">{video.contentDetails && convertTime(video.contentDetails.duration)}</p>
                                <FavOnVideo videoId = {video.id.videoId || video.id} orange = {colorStatus}/>
                            </Link>
                        </article>
                    </li>
                )
            });
            setList(listVideos);
        } else {
            setList('Список пуст');
        }
    };

    const fetchToSearch = async (toSearch) => {
        let resp = await fetchSearchVideos(toSearch, nextPage);
        if (toSearch) {
            displayListVideo(resp);
            setNextPage(resp.data.nextPageToken);
            setPrewPage(resp.data.prewPageToken);
        }
        return resp;
    };

    useEffect(() => {
        switch (location.pathname) {
            case '/favourite':
                fetchFavouriteVideos().then(videos => displayListVideo(videos));
                break;
            case '/search':
                fetchToSearch(toSearch);
                break;
            default: 
                fetchTrendingVideos().then(videos => displayListVideo(videos));
                break;
        }
    }, [location]);

    useEffect(() => {
        if (location.search) fetchToSearch(toSearch);
    }, [toSearch]);

    const convertTime = (ISOTime) => {
        const hoursMatch = ISOTime.match(/(\d+)H/);
        const minutesMatch = ISOTime.match(/(\d+)M/);
        const secondsMatch = ISOTime.match(/(\d+)S/);
        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0; 
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
        const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0;

        let result = '';

        if (hours > 0) {
            result += `${hours} ч `;
        }
        if (minutes > 0) {
            result += `${minutes} мин `;
        }
        if (seconds > 0) {
            result += `${seconds} с`;
        }
        return result.trim(); 
    };

    const cbNext = () => {
        fetchToSearch(toSearch, nextPage);
    };

    const cbPrew = () => {
        fetchToSearch(toSearch, prewPage);
    };

    return (
        <section className="video-list">
            <div className="container">
                <h2 className="video-list__title">
                    <span>
                    {
                        location.pathname === '/favourite' 
                        ? 'Избранное'
                        : id 
                        ? 'Похожие видео'
                        : 'В тренде'
                    }
                    </span>
                </h2>
                <ul className="video-list__items" >
                   {
                        list.length 
                        ? list
                        : <Preloader/>
                   }   
                </ul>
                <div className='video-list__arrows'>
                    { location.search && <img src={arrLeft} alt='arr-left' onClick={cbPrew} />}
                    { location.search && <img src={arrRight} alt='arr-right' onClick={cbNext} />}
                </div>
            </div>
        </section>
    )
}