import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name:{type:String, required:true},
    desc:{type:String, required:true},
    artist:{type:String, required:true, default:'Unknown'},
    album:{type:String, required:true},
    image:{type:String, required:true},
    file:{type:String, required:true},
    duration:{type:String, required:true}
})


const songModel = mongoose.models.song || new mongoose.model('song', songSchema)

export default songModel