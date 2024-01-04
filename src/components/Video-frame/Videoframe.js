import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Favourite } from "../Favourite/favourite";
import { Preloader } from "../preloader/preloader";

export const Videoframe = () => {

    const [data, setVideo] = useState(null);

    const VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos';
    const API_KEY = 'AIzaSyA5iGedkw50YnvDS4DBB9ZXOTp5T_XEXN8';

    const {id} = useParams();

    const fetchVideoData = useCallback( async (id) => {
        if (data) setVideo(null);
        const toServerId = id.substr(1, id.length-1);
        try {
            const url = new URL(VIDEOS_URL);
            url.searchParams.append('part', 'snippet, statistics');
            url.searchParams.append('id', toServerId);
            url.searchParams.append('regionCode', 'BY');
            url.searchParams.append('key', API_KEY);
            const response = await axios.get(url);
            if(!response.status === 200) {
                throw new Error(`HTTP error ${response.status}`)
            }
            return response;
            
        } catch (error) {console.log('error: ', error);}
    }, [data]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const formatter = new Intl.DateTimeFormat('ru-RU' ,{
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        return formatter.format(date);
    }

    const displayVideo = ({data}) => setVideo(data);

    useEffect(() => {
        fetchVideoData(id).then(video => displayVideo(video));
    }, [id]);

    return (
        <section className="video">
            {
                data ?
                <div className="container">
                    <div className="video__player">
                        <iframe className="video__iframe" allowFullScreen 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                            gyroscope; picture-in-picture; web-share" 
                        src={`https://www.youtube.com/embed/${data.items[0].id}`} title="видео"></iframe>
                    </div>
                    <div className="video__container">
                        <div className="video__content">
                            <h2 className="video__title">{data.items[0].snippet.title}</h2>
                            <p className="video__channel">{data.items[0].snippet.channelTitle}</p>
                            <p className="video__info">
                                <span className="video__views">{parseInt(data.items[0].statistics.viewCount).toLocaleString()} </span>
                                <span className="video__date">Дата премьеры: {formatDate(data.items[0].snippet.publishedAt)}</span> 
                            </p>
                            <p className="video__description">{data.items[0].snippet.description}</p>
                        </div>
                        <div className="video__link">
                            <Favourite active={true} id={data.items[0].id}  />
                        </div>
                    </div>
                </div>
                : <Preloader />
            }
        </section>
    )
}