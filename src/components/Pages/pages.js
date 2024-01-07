import { Routes, Route } from "react-router-dom";
import { App } from "../../App";
import { Fav } from "../fav/fav";
import { Video } from "../video/video";
// import { useEffect } from "react";

export const Pages = () => {
    // const location = useLocation();
    // const navigate = useNavigate();

    // useEffect(()=> {
    //     if (location.pathname === '/you-tVideo') navigate('/');
    // }, [location.pathname, navigate]);

    return (
        <Routes>
            <Route path="/you-tVideo" exact element={<App />}/>
            <Route path="/search?"  element={<App />}/>
            <Route path="/favourite" element={<Fav />}/>
            <Route path="/video/:id" element={<Video />}/>
        </Routes>
    )
}