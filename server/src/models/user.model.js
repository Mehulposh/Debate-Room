import mongoose from "mongoose";
import bcrypt from 'bcryptjs'



const userSchema = new mongoose.Schema( {
    userName: {
        type: String,
        required :[true, 'Please add a UserName'],
        unique:true,
        trim:true,
        minLength:8,
        maxLength:50
    },
    email:{
        type: String,
        required :[true, 'Please add an Email'],
        unique:true,
        lowercase: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
        ]
    },
    password:{
        type:String,
        required:[true,'Please add a Password'],
        minLength:8,
        select:false
    },
    avatar:{
        type:String,
        default: 'https://via.placeholder.com/150'
    },
    debatesParticipated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debate'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);