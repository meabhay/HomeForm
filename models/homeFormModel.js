const mongoose = require("mongoose");
const {Schema} = mongoose;

const homeFormSchema = new Schema({
    userName: {
        type: String,
        require: true,
    },
    userEmail: {
        type: String,
        require: true,
    },
    referralCode: {
        type: String,
        require: true,
    },
    userPhone: {
        type: String,
        require: true,
    },
}, {timestamps: true},)

module.exports = mongoose.model("HomeSchema",homeFormSchema);