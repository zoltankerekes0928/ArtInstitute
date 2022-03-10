import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { ArtContext } from './ContextProvider.jsx';
import { useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Components_Style/artwork.scss";

const Artwork = () => {
  const stateList = useContext(ArtContext)

  const {id} = useParams()
  const [artwork, setArtwork] = useState([])
 


 const getData =()=>{
       fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
      .then(data=>data.json()) 
      .then(data=>setArtwork(data))
       
    }

  useEffect(()=>{
  getData()
  },[])



if(artwork.data !== undefined){
  return (
    <div className='art-container'>
      <h1>Artwork</h1>
      <h2>Title: {artwork.data.title}</h2>
      <h3>Author: {artwork.data.artist_display}</h3>
      <h3>Department Title: {artwork.data.department_title}</h3>
      <div className="img-container">
        <img src={`https://www.artic.edu/iiif/2/${artwork.data.image_id}/full/400,/0/default.jpg`} alt=""  />
      </div>
       <Button variant="primary" onClick={()=>stateList.favorite(artwork.data)} className="btn">Favorite</Button>

    </div>
  )
}
return(<></>)
}

export default Artwork