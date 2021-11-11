const mongoose = require('mongoose')
const URL = 'mongodb://localhost/fenixGuard'

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB