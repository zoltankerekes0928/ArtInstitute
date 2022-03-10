import React, { useState } from 'react';
import { useContext} from 'react';
import { Link } from 'react-router-dom';
import { ArtContext } from './ContextProvider.jsx';
import { Card, Button } from 'react-bootstrap';
import Footer from './Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Components_Style/artworkList.scss";

const ArtworkList = () => {
  const stateList = useContext(ArtContext)
  const [perPageNum, setPerPageNum] = useState()
  const [search, setSearch]=useState("")
  const [gotoPage, setGotoPage]=useState(1)
 
  

    
  if(stateList.data.data!== undefined  && stateList.loadingState === false ){
   
     const allPages = stateList.data.pagination.total_pages

      const handleClick =(e)=>{
      e.preventDefault()
       fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}[is_public_domain]=true&limit=100&fields=id,title,image_id`)
      .then(data=>data.json())
      .then(data=>stateList.search(data))
       setSearch("")
    }

    const gohandleClick=(e)=>{
      e.preventDefault()
      stateList.gotoPage(gotoPage)
          
    }

    const prevClick=()=>{
      const num = parseInt(gotoPage)
      setGotoPage(num-1)
      stateList.setPage('prev')
    }

    const nextClick=()=>{
      const num = parseInt(gotoPage)
      setGotoPage(num+1)
      stateList.setPage('next')
    }

    const resetClick=()=>{
      stateList.reset()
       setGotoPage(1)
    }
    
return (
  <div className="center">
   <div className="form-container">
      <h3>Current Page: {stateList.current}</h3>
    <div className="btn-container">
      <button onClick={prevClick}>Prev</button>
      <button  onClick={nextClick}>Next</button>
    </div>
  
    <form >
      <label htmlFor="number">Items per Page:</label>
       <select name='number' onChange={(e)=>setPerPageNum(e.target.value)} className="input-field">
          <option>25</option>
          <option>50</option>
          <option>75</option>
          <option>100</option>
       </select>
      <button onClick={(e)=>stateList.setPerPage(e, perPageNum)} className='submit'>Select</button>
      <br></br>
      <label htmlFor="search">Search:</label>
      <input type="search" name="search" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault()}}  placeholder='title or author...' value={search} onChange={(e)=>setSearch(e.target.value)} className="input-field"/>
      <button onClick={handleClick} className='submit'>Search</button>
      <button onClick={resetClick} className='submit'>Reset</button>
      <br></br>
      <label htmlFor="gotonumber">Go To:<span>(1-{allPages})</span></label>
      <input type="number" name="gottonumber" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault()}}  min="1" max={allPages} value={gotoPage} onChange={(e)=>setGotoPage(e.target.value)} className="input-field"/>
      <button onClick={gohandleClick} className='submit'>Go</button>
    </form>
  </div>
    <div className="card-container">
        {stateList.data.data.map(item=>{
        return(
        <Card style={{ width: '16rem' }} key={item.id}>
           <Link to={`/artwork/${item.id}`}><Card.Img variant="top" src={`https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg`} className="image"/></Link>
            <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Button variant="primary" onClick={()=>stateList.favorite(item)}>Favorite</Button>
          </Card.Body>
        </Card>
        )
      })}
    </div>
    <Footer/>
   </div>
   
)
  }
  return(
    <></>
  )
  
}

export default ArtworkList

