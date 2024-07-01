// models/tutor.js
const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        originalName: String,
        mimeType: String,
        filename: String,
        size: Number
    }
});

const dbConnection = getDbConnection('Users');
const Users = dbConnection.model('Users', usersSchema, 'registered');

module.exports = Users;