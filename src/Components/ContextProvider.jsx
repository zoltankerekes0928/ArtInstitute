import React from 'react'
import { useState, useEffect, createContext } from 'react'

export const  ArtContext = createContext()

export function ContextProvider({children}){

  const [dataList, setDataList] = useState([])
  const [pagePerLimit, setPagePerLimit] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [favorite, setFavorite] = useState([])
  

  const getData =()=>{
      setLoading(true)
      fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${pagePerLimit}`)
      .then(data=>data.json()) 
      .then(data=>setDataList(data))
      .then(()=>setLoading(false))
    }
   
  useEffect(()=>{
   getData()
  },[currentPage, pagePerLimit])

  const stateObj = {data:dataList, 
      loadingState:loading,
      pageLimit:pagePerLimit, 
      current:currentPage, 
      setPage:function(dir){
        if(dir === "next"){
          
          setCurrentPage(currentPage+1)
          }else if(dir === "prev"){
          if(currentPage>1){
          setCurrentPage(currentPage-1)
          }else{
          setCurrentPage(currentPage) }}},
      setPerPage:function(e, perPageNum){
          e.preventDefault()
          setPagePerLimit(perPageNum)},
      favorite:function(item){
          setFavorite([...favorite, item])},
      favoriteList:favorite, 
      delFavorite:function(id){
         const newFavorite = favorite.filter(item=>item.id !== id)
         setFavorite(newFavorite)},
      search:function(data){
          setDataList(data)},
      reset:function(){
      getData()
      setCurrentPage(1)},
      gotoPage:function(num){
        num = parseInt(num)
        setCurrentPage(num)
      }
    }

    return (
    <ArtContext.Provider value={stateObj}>
      {children}
    </ArtContext.Provider>
  )
}

