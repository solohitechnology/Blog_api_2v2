const express = require('express');
const app = express();
const port = process.env.PORT || 2000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/post');
const categoryRoute = require('./routes/categorys');
const multer = require('multer');

dotenv.config();
app.use(express.json());


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlparser: true,
    userUnifiedTopology: true,
    useCreateIndex: true,
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb( null, 'image');
    },
    filename: (req, file, cb) => {
          cb(null, req.body.name);
    }
})

const upload = multer({storage: storage})
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('file has been uploaded')
})

app.use('/api/auth', authRoute);
app.use('api/users', userRoute);
app.use('/api/post', postRoute);
app.use('/api/categories', categoryRoute);







app.listen(port, () => console.log(`server running on port ${port}`))