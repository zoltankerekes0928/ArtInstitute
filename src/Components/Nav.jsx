import React from 'react'
import {Link} from "react-router-dom";
import '../Components_Style/nav.scss'
import Logo from "../Assets/am_artinstituteofchicago_01.png"
import { ArtContext } from './ContextProvider.jsx'
import { useContext} from 'react'

const Nav = () => {
  const stateList = useContext(ArtContext)
  
  return (
    <>
     <nav className='nav-container'>
       <div className="logo-container">
         <img src={Logo} alt="" />
         </div>
        <ul>
          <li>
            <Link to="/" className='link'>Artwork List</Link>
          </li>
          <li>
            <Link to="/FavoriteArtworks" className='link'>Favorite Artworks<div className="counter-container">
              <span className='counter'>{stateList.favoriteList.length}</span>
            </div></Link>
            
          </li>
         
        </ul>
      </nav>

    </>
  )
}

export default Nav
