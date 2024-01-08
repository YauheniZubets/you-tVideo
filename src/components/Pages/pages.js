import { Routes, Route } from "react-router-dom";
import { App } from "../../App";
import { Fav } from "../fav/fav";
import { Video } from "../video/video";

export const Pages = () => {

    return (
        <Routes>
            <Route path="/you-tVideo" exact element={<App />}/>
            <Route path="/you-tVideo/search?" exact  element={<App />}/>
            <Route path="/you-tVideo/favourite" exact element={<Fav />}/>
            <Route path="/you-tVideo/video/:id" exact element={<Video />}/>
        </Routes>
    )
}