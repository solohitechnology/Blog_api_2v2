import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
const port = process.env.PORT || 2000;
import { greetings, updateUser, deleteUserById, getUserById } from './routes/users.js';
import { getPost, creatNewPost, updatePost, deletePost } from './routes/post.js';
import { getAllCat, creatNewCart } from './routes/categorys.js';
import { Register, Login } from './routes/auth.js';
import multer from 'multer';

//ENV CONFIGURATION
dotenv.config();

//APPLICATION
const app = express();

//MIDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URL, {
}).then(() => console.log('DB connection success'))
    .catch((err) => console.log(err));

//UPLOAD ROUTES
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'image');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({ storage: storage })
app.post('/solo/upload', upload.single('file'), (req, res) => {
    res.status(200).json('file has been uploaded')
})

// POST ROUTES
app.use('/post/getpost', getPost);
app.use('/api/delepost', deletePost);
app.use('/api/updatepost', updatePost);
app.use('/api/creatpost', creatNewPost);

//USER ROUTES
app.use('/api', greetings);
app.use('/api/updateuser', updateUser);
app.use('/api/getuserbyid', getUserById);
app.use('/api/deleteuser', deleteUserById);


//CATEGORY ROUTE
app.use('/api/getallcat', getAllCat);
app.use('/api/category', creatNewCart);

// AUTH ROUTES

app.use('/api/register', Register)
app.use('/api/login', Login)



app.listen(port, () => console.log(`server running on port ${port}`));