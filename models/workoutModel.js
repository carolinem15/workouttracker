let mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

const UserSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
            type: {
                type: String,
                // how do I insert list from drop down type situation?
            }
        },
        {
            name: {
                type: String,
                trim: true,
                required: true
            }
        },
        {
            duration: {
                type: Number,
                // do i need to set unique to false or does it default to that?
                unique: false,
                required: true
            }
        },
        {
            weight: {
                type: Number,
                // do i need to set unique to false or does it default to that?
                unique: false,
                required: true
            }
        },
        {
            reps: {
                type: Number,
                // do i need to set unique to false or does it default to that?
                unique: false,
                required: true
            }
        },
        {
            sets: {
                type: Number,
                // do i need to set unique to false or does it default to that?
                unique: false,
                required: true
            }
        },
    ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;