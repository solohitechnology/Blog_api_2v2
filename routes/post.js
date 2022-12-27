 const Post = '../models/Post'


export const getPost = async (req, res, next) => {
    res.send('you are on the post routes')
}

//CREAT POST
export const creatNewPost = async (req, res, next) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost);
    } catch (err) {
        res.status(401).json(err)
    }
}
// //UPDATE POST
export const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if( post.username === req.body.username) {
            try{
               const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                   $set: req.body,
               },
               { new: true }
               );
               res.status(200).json(updatedPost)
            }catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json('you can update only your post!')
        }
    } catch (err) {
        res.status(500).json(err)
    }
};

// DELETE POST
export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if( post.username === req.body.username) {
            try{
              await post.delete();
              res.status(200).json('post has been deleted...')
            }catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json('you can delete only your post!')
        }
    } catch (err) {
        res.status(500).json(err)
    }  
};

//  //GET POST
export const getpostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        
        res.status(200).json(others)
    }catch (err) {
        res.status(500).json(err)
    }
};
