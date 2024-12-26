import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { url } from '../App'
import { toast } from 'react-toastify'


const ListAlbum = () => {
  const [data, setData] = useState([])

  const fetchAlbums = async () => {

    try {

      const response = await axios.get(`${url}/api/album/list`)
      if (response.data.success) {
        setData(response.data.albums)
        console.log(response.data.albums);

      } else {
        toast.error(response.data.message)
      }


    } catch (error) {
      toast.error(response.data.message)
    }
  }

  const removeAlbum = async (id) => {
    try {

      const response = await axios.post(`${url}/api/album/remove`, {id})
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchAlbums()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(response.data.message)
    }
  }


  useEffect(() => {
    fetchAlbums()
  }, [])

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Desctiption</b>
          <b>Bg Color</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div key={index} className='grid sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] grid-cols-[1fr_1fr_1fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type='color' value={item.bgColor}/>
              <p onClick={()=>removeAlbum(item._id)} className='cursor-pointer'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListAlbum
