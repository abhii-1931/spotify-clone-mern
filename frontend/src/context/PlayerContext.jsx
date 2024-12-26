import { createContext, useEffect, useRef, useState} from "react";
import { songsData } from "../assets/assets";
import axios from 'axios'
import {toast} from 'react-toastify'
export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const url = 'https://spotify-clone-o653.onrender.com'
    
    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()

    const [songsData, setSongsData] = useState([])
    const [albumsData, setAlbumsData] = useState([])
    const [track, setTrack] = useState()
    const [playStatus, setPlayStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })

    const getSongsData = async () => {
      try {
        
        const response = await axios.get(`${url}/api/song/list`)
        if(response.data.success){
          setSongsData(response.data.data)
          setTrack(response.data.data[0])
        } else {
          toast.error(response.data.message)
        }
        
      } catch (error) {
        toast.error(response.data.message)
      }
    }
    

    const getAlbumsData = async () => {
      try {
        
        const response = await axios.get(`${url}/api/album/list`)
        if(response.data.success){
          setAlbumsData(response.data.albums)
        } else {
          toast.error(response.data.message)
        }
        
      } catch (error) {
        toast.error(response.data.message)
      }
    }
    

    const play = () => {
      audioRef.current.play()
      setPlayStatus(true)
    }
    
    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }
    
    const playWithId = async (id) => {
      await songsData.map((item)=>{
        if(id == item._id){
          setTrack(item)
        }
      })
      await audioRef.current.play()
      setPlayStatus(true)
    }

    const previous = async () => {
      songsData.map(async (item, index)=>{
        if(track._id === item._id && index>0){
          await setTrack(songsData[index-1])
          await audioRef.current.play()
          setPlayStatus(true)
        }
      })
    }
    
    const next = async () => {
      songsData.map(async (item, index)=>{
        if(track._id === item._id && index<songsData.length-1){
          await setTrack(songsData[index+1])
          await audioRef.current.play()
          setPlayStatus(true)
        }
      })
    }
    
    const seekSong = async (e) => {
      audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    
    useEffect(()=>{
      getSongsData()
      getAlbumsData()
    }, [])
    
    
    useEffect(() => {
      setTimeout(() => {
        console.log((Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+'%');
        audioRef.current.ontimeupdate = ()=>{
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+'%'
                setTime({
                    currentTime:{
                        second:Math.floor(audioRef.current.currentTime%60),
                        minute:Math.floor(audioRef.current.currentTime/60)
                    },
                    totalTime:{
                        second:Math.floor(audioRef.current.duration%60),
                        minute:Math.floor(audioRef.current.duration/60)
                    }
                })
            }
        }, 1000);
    }, [audioRef])



    const contextValue = {
      songsData, albumsData,
        audioRef, seekBar, seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId, previous, next,
        seekSong
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider
