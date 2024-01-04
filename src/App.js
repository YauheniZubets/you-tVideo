import './App.css';
import { Footer } from './components/footer/footer';
import { Main } from './components/main/main';

export const App = () => {
    return (
      <>
        {/* <Header white={true} /> */}
        <Main hero={true} pageName='В тренде' />
        <Footer />
      </>
    )
}