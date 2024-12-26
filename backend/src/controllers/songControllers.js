import { v2 as cloudinary } from "cloudinary"
import songModel from '../models/songModel.js'

const addSong = async (req, res) => {
  
    try {
    
        const name = req.body.name
        const desc = req.body.desc
        const artist = req.body.artist
        const album = req.body.album
        const audioFile = req.files.audio[0]
        const imageFile = req.files.image[0]

        
        const audioUploder = await cloudinary.uploader.upload(audioFile.path, {resource_type:"video"})
        const imageUploder = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const duration =  `${Math.floor(audioUploder.duration/60)}:${Math.floor(audioUploder.duration%60)}`
        
        const songData = {
            name, desc, album, artist, image:imageUploder.secure_url, file:audioUploder.secure_url, duration
        }
        
        const song = songModel(songData)
        await song.save()

        res.json({success:true, message:'Song Added successfully'})

  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}


const listSong = async (req, res) => {
  
    try {
        
        const allSongs = await songModel.find({})
        res.json({success:true, data:allSongs})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}


const remvoeSong = async (req, res) => {
  
    try {

        const songId = req.body.id 
        await songModel.findByIdAndDelete(songId)
        res.json({success:true, message:'song deleted successfully'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}


export {addSong, listSong, remvoeSong}