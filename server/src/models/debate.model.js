import mongoose from 'mongoose'

//schema for argument
const argumentSchema= new mongoose.Schema({
    id: String,
    speaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    speakerName: String,
    content: String,
    type: {
        type: String,
        enum: ['claim', 'evidence', 'rebuttal', 'counter'],
        default: 'claim'
    },
    parentId: {
        type: String,
        default: null
    },
    position: {
        x: Number,
        y: Number
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    supportingArguments: [String],
    opposingArguments: [String]
})


//schema for speaker time
const speakerTimeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: String,
    totalTime: {
        type: Number,
        default: 0
    },
    segments: [{
        start: Date,
        end: Date,
        duration: Number
    }]
})

//schema for debate
const debateSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    topic: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: String,
    side: {
      type: String,
      enum: ['pro', 'con', 'neutral']
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
    status: {
        type: String,
        enum: ['waiting', 'active', 'paused', 'completed'],
        default: 'waiting'
    },
    timeLimit: {
        type: Number,
        default: 300
    },
    speakerTimes: [speakerTimeSchema],
    currentSpeaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    arguments: [argumentSchema],
    rules: {
        timePerSpeaker: Number,
        allowInterruptions: {
            type: Boolean,
            default: false
        },
        maxArgumentLength: {
            type: Number,
            default: 500
        }
    },
    startedAt: Date,
    endedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Debate', debateSchema);