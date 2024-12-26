import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { url } from '../App'
import {toast} from 'react-toastify'

const AddSong = () => {

  const [image, setImage] = useState(false)
  const [song, setSong] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('none')
  const [loading, setLoading] = useState(false)
  const [albumData, setAlbumData] = useState([])

  const loadAlbumData = async () => {
    try {
      
      const response = await axios.get(`${url}/api/album/list`)
      if (response.data.success) {
        setAlbumData(response.data.albums)
      } else {
        toast.error(response.data.message)      
      }

    } catch (error) {
      toast.error(response.data.message)      
    }
  }
  

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      
      const formData = new FormData()
      formData.append('name', name)
      formData.append('desc', desc)
      formData.append('artist', artist)
      formData.append('album', album)
      formData.append('image', image)
      formData.append('audio', song)

      const response = await axios.post(`${url}/api/song/add`, formData)
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDesc('')
        setArtist('')
        setImage(false)
        setSong(false)
        setAlbum('none')
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error('error! ' + response.data.message)
    }
    setLoading(false)
  }

  useEffect(()=>{
    loadAlbumData()
  }, [])

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div>
  ) :(
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <p>Upload Song</p>
          <input onChange={(e)=>setSong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden/>
          <label htmlFor="song">
            <img src={song?assets.upload_added:assets.upload_song} className='w-24 cursor-pointer' alt="" />
          </label>
        </div>
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden/>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} className='w-24 cursor-pointer' alt="" />
          </label>
        </div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='bg-transparent outline-green-600  border-2 border-gray-400 p-2.5  w-[max(40vw,250px)]' placeholder='Type here' required/>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Artist name</p>
        <input onChange={(e)=>setArtist(e.target.value)} value={artist} type="text" className='bg-transparent outline-green-600  border-2 border-gray-400 p-2.5  w-[max(40vw,250px)]' placeholder='Unknown'/>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song Description</p>
        <input onChange={(e)=>setDesc(e.target.value)} value={desc} type="text" className='bg-transparent outline-green-600  border-2 border-gray-400 p-2.5  w-[max(40vw,250px)]' placeholder='Type here' required/>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select onChange={(e)=>setAlbum(e.target.value)} value={album} className='outline-green-600 bg-transparent border-2 border-gray-400 p-2.5 w-[150px]'>
          <option value="none">None</option>
          {
            albumData.map((item, index)=>(<option key={index} value={item.name}>{item.name}</option>))

          }
        </select>
      </div>
      <button type='submin' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  )
}

export default AddSong
