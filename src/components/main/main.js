import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Search } from "../search/search";
import { Hero } from "../hero/hero";
import { VideoList } from "../video-list/videoList";
import { Videoframe } from "../Video-frame/Videoframe";

import './main.css';

export const Main = (props) => {
    const {hero, iFrame} = props;

    const [toSearch, setToSearch] = useState('');

    const location = useLocation();

    const fToSearch = (data) => {
        if (data !== toSearch) setToSearch(data);
    }

    return (
        <main>
            { hero && <Hero /> }
            { location.pathname !== '/favourite' && <Search toSearch = {fToSearch} />}
            {
                iFrame && <Videoframe />
            }
            <VideoList toSearch = {toSearch} />
        </main>
    )
}