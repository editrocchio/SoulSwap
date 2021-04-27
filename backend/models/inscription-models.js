const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Inscription = new Schema(
    {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String },
        birthDate: { type: Date, required: true },
        deathDate: { type: Date, required: true },
        obituary: { type: String },
        image: { type: String }
    },
    { timestamps: true },
)

module.exports = mongoose.model('inscriptions', Inscription)