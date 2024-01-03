import { Footer } from "../footer/footer"
import { Header } from "../header/header"
import { Main } from "../main/main"

export const Video = () => {

    return (
        <>
            <Header orange={true}  />
            <Main iFrame={true} hero={false} pageName='Похожие видео'/>
            <Footer />
        </>
    )
}