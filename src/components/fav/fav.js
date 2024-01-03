import { Footer } from "../footer/footer"
import { Header } from "../header/header"
import { Main } from "../main/main"

export const Fav = () => {
    return (
        <>
            <Header orange={true} />
            <Main hero={false} pageName='Избранное'/>
            <Footer />
        </>
        
    )
}