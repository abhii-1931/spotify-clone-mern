import React, { useContext } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import { albumsData, songsData } from '../assets/assets'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {

  const {songsData,albumsData} = useContext(PlayerContext)

  return (
    <>
      <Navbar />
      <div className='mg-4'>
        <h1 className='font-bold my-5 text-2xl'>Feature Charts</h1>
        <div className='flex overflow-auto'>
            {albumsData.map((item, index)=>(
                <AlbumItem key={index} image={item.image} name={item.name} desc={item.desc} id={item._id} />
            ))}
        </div>
      </div>
      <div className='mg-4'>
        <h1 className='font-bold my-5 text-2xl'>Today's biggest hits</h1>
        <div className='flex overflow-auto'>
            { songsData.map((item, index)=>(
                <SongItem key={index} image={item.image} name={item.name} desc={item.desc} id={item._id} />
            ))}
        </div>
      </div>
    </>
  )
}

export default DisplayHome
