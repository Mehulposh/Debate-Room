import User from '../models/user.model.js'
import Debate from '../models/debate.model.js'

//Create new debate
export const NewDebate = async (req,res) => {
    try {
        //extract debate details 
        const {topic, title, timeLimit, rules} = req.body

        //create new debate object
        const newDebate = {
            title,
            topic,
            creator: req.user._id,
            timeLimit: timeLimit || 300,
            rules: rules || {},
            participants: [{
                user: req.user._id,
                username: req.user.username,
                side: 'pro'
            }]
        }

        //create new debate in db
        const debate = await Debate.create(newDebate)

        const id = req.user._id

        //find and update the user 
        await User.findByIdAndUpdate(id, {
            $push: { debatesParticipated: debate._id }
        });

        //return the debate 
        res.status(201).json(debate)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


//Get all Debates
export const GetAllDebates = async (req,res) => {
    try {
        //fetch all debates from the db
        const debates = await Debate.find()
        .populate('creator','username avatar')
        .populate('participants.user' , 'username avatar')
        .sort({createdAt: -1})

        const total_debates = debates.length
        res.json({
            "Total Dbates":total_debates,
            debates
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


//Get One Debate
export const GetDebateById = async(req,res) => {
    try {
        //extract debate id
        const id = req.params.id

        //fetch the debate matching the id
        const debate = await Debate.findById(id)
        .populate('creator', 'username avatar')
        .populate('participants.user', 'username avatar')
        .populate('arguments.speaker', 'username avatar');

        //in case the debate is not availabe
        if (!debate) {
            return res.status(404).json({ message: 'Debate not found' });
        }

        //send the debate to frontend
        res.json(debate)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


//Join a debate
export const JoinDebate = async(req,res)=> {
    try {
        //extract debate id
        const id = req.params.id

        //get the debate matching the id
        const debate = await Debate.findById(id)

        //return error message in case debate is not found
        if (!debate) {  
            return res.status(404).json({ message: 'Debate not found' });
        }

        //check to see if the user is already in debate
        const alreadyJoined = debate.participants.some(
            p => p.user.toString() === req.user._id.toString()
        );

        //return message if the user is already in the debate
        if (alreadyJoined) {
            return res.status(400).json({ message: 'Already joined this debate' });
        }

        //if the user is not in the debate then push the user id , name and side in the debate details
        debate.participants.push({
            user: req.user._id,
            username: req.user.username,
            side: req.body.side || 'neutral'
        });

        //save the debate in the db
        await debate.save()

        //update the user details 
        await User.findByIdAndUpdate(req.user._id, {
            $push: { debatesParticipated: debate._id }
        });

        //send the debate to the frontend
        res.json(debate)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//Add new argument
export const NewArgument = async (req,res)=> {
    try {
        //extract debate id from params
        const id = req.params.id

        //get the debate with the matching id from the db
        const debate = await Debate.findById(id)

        //return error if the debate not found
        if (!debate) {
            return res.status(404).json({ message: 'Debate not found' });
        }
        
        //extract the argument content from the req body
        const {content , type , parentId , position} = req.body

        //create a new argument object 
        const argument = {
            id: `arg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            speaker: req.user._id,
            speakerName: req.user.username,
            content,
            type: type || 'claim',
            parentId: parentId || null,
            position: position || { x: 0, y: 0 },
            timestamp: new Date()
        };

        //push the argument in the arguments array
        debate.arguments.push(argument)

        //save the debate 
        await debate.save()

        
        const populatedDebate = await Debate.findById(debate._id)
        .populate('arguments.speaker', 'username avatar');

        //send the populated data to the frontend
        res.status(201).json(populatedDebate)
    } catch (error) {
        res.status(500).json({message: error.message})
    }   
}


//Update debate status
export const UpdateDebate = async(req,res) =>{
    try {
        //extract debate id from params
        const id = req.params.id

        //get the debate from the db
        const debate = await Debate.findById(id)

        //error gandling in case debate is not found
        if (!debate) {
            return res.status(404).json({ message: 'Debate not found' });
        }

        //checking if debate creator is the same user or not
        if (debate.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        
        //extract status from req body
        const {status} = req.body

        //updating the status in debate json
        debate.status = status

        //checking the status of the debate 
        if (status === 'active' && !debate.startedAt) {
            debate.startedAt = new Date();
        }

        if (status === 'completed' && !debate.endedAt) {
            debate.endedAt = new Date();
        }

        //saving the debate 
        await debate.save();

        // sending the debate to the frontend
        res.json(debate);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


//Update speaker time
export const UpdateTime = async (req,res) => {
    try {
        //extract debate id 
        const id = req.params.id

        //get the debate from db
        const debate = await Debate.findById(id)

        //error handling in case debte not found
        if (!debate) {
            return res.status(404).json({ message: 'Debate not found' });
        }

        //extract userid and time
        const {userId, timeSegment} = req.body

        //search for speaker's time recond in db
        let speakerTime = debate.speakerTimes.find(
            st => st.userId.toString() === userId
        );

        //if there is no record then create new record
        if (!speakerTime) { 
            const user = await User.findById(userId);
            speakerTime = {
                userId,
                username: user.username,
                totalTime: 0,
                segments: []
            };
            debate.speakerTimes.push(speakerTime);
        }

        //push the timesegment in db 
        if (timeSegment) {
            speakerTime.segments.push(timeSegment);
            speakerTime.totalTime += timeSegment.duration;
        }   

        //save the db
        await debate.save();

        //sned the db to frontend
        res.json(debate);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Delete Debate
export const DeleteDebate = async (req,res)=> {
    try {
        //extract debate id 
        const id = req.params.id

        //get the debate from db
        const debate = await Debate.findById(id)

        //error handling in case debte not found
        if (!debate) {
            return res.status(404).json({ message: 'Debate not found' });
        }

        //only the debate creator can delete the debate
        if (debate.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        //delete the db
        await debate.deleteOne();

        //sned the delete message to frontend
        res.json({ message: 'Debate removed' });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}