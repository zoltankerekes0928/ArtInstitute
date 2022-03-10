import React from 'react'
import { useContext } from 'react'
import { ArtContext } from './ContextProvider.jsx'
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Components_Style/artworkList.scss"

 const FavoriteArtworks = () => {

  const stateList = useContext(ArtContext)

   return (<div>
  <div className="center">
    <h3>Favorite Artworks</h3>
     <div className="card-container">
        {stateList.favoriteList.map(item=>{
        return(
        <Card style={{ width: '16rem' }} key={item.id}>
            <Card.Img variant="top" src={`https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg`} className="image"/>
            <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Button variant="primary" onClick={()=>stateList.delFavorite(item.id)}>Delete</Button>
          </Card.Body>
        </Card>
        )
      })}
    </div>
   </div>
  </div>
  )
}


export default FavoriteArtworks