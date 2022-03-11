import './index.scss';
import Nav from './Components/Nav';
import Loading from './Components/Loading';
import ArtworkList from './Components/ArtworkList';
import FavoriteArtworks  from './Components/FavoriteArtworks';
import Artwork from './Components/Artwork';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ArtContext } from './Components/ContextProvider.jsx'
import { useContext} from 'react'

function App() {
  const stateList = useContext(ArtContext)
  return (
    <div className="App">
      <Router>
        <Nav/>
        {stateList.loadingState && <Loading/>}
        <Routes>
          <Route path='/' exact element={<ArtworkList/>} />
          <Route path='/artwork/:id' element={<Artwork/>}/>
          <Route path='/FavoriteArtworks' element={<FavoriteArtworks/>} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
