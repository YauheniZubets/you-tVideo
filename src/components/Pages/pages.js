import { Routes, Route } from "react-router-dom"
import { App } from "../../App"
import { Fav } from "../fav/fav"
import { Video } from "../video/video"

export const Pages = () => {
    return (
        <Routes>
            <Route path="/" exact element={<App />}/>
            <Route path="/search?"  element={<App />}/>
            <Route path="/favourite" element={<Fav />}/>
            <Route path="/video/:id" element={<Video />}/>
        </Routes>
    )
}