// // config/database.js
// const mongoose = require('mongoose');

// const getDbConnection = (dbName) => {
//     const uri = `mongodb+srv://dev326patil:devrajcapstone326@capstone.riouq2l.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Capstone`;
//     return mongoose.createConnection(uri)
// };


// module.exports = getDbConnection;

// config/database.js
const mongoose = require('mongoose');

const getDbConnection = (dbName) => {
    const uri = `mongodb+srv://dev326patil:devrajcapstone326@capstone.riouq2l.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Capstone`;
    return mongoose.createConnection(uri)
};


module.exports = getDbConnection;