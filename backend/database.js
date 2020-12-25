const mongoose = require('mongoose');
const e = require('express');

const uri = () => {
    if(process.env.MONGODB_URI){
        return process.env.MONGODB_URI;
    }else{
        return 'mongodb://localhost/fullstackjs';
    }
}

mongoose.connect(uri(),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then( e => console.log('DB is connected') )
    .catch( err => console.log(`Error ocurred:\n ${err}`) );