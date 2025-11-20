import mongoose from "mongoose";
const roomSchema = new  mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
      
    },
    promt :{
        type: String,
        required: true,
    },
    players: [
        {
        username: {
            type: String,
            required: true,
        },
        wpm: {
            type: Number,
            default: 0,
        },
        progress :{
            type: Number,
            default: 0,
        },
        accuracy: {
            type: Number,
            default: 100,
        },
        isFinished: {
            type: Boolean,
            default: false,
        },
        },
    ],
    maxPlayerCount : {
        type: Number,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, 
    },

});

const MultiplayerRoom = mongoose.model("MultiplayerRoom", roomSchema);
export default MultiplayerRoom;