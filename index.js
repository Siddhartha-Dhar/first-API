const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Import models
const Post = require('./src/models/post');


//define Application
const app = express();

// Define DB Connection
const db = mongoose.connect('mongodb://localhost:27017/first-node-api')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', function(req, res){
    res.send({
        ping: 'pong'
    })
})

// (CRUD)
// 1. Create a new Post
// 2. Read details of a Post
// 3. Update a Post
// 4. Delete a Post

// 1. Create
app.post('/posts', function(req, res){
    const title = req.body.title
    const author = req.body.author
    const content = req.body.content

    // Assign values to Post model
    var post = new Post();
    post.title = title
    post.author = author
    post.content = content

    // Save the post
    post.save(function(error, savedPost) {
        if(error){
            // send error response
            res.status(500). send({ error: 'Unable to save Post' })
        } else{
            // send success responses
            res.status(200).send(savedPost)
        }
    })
})

// 2. Read
app.get('/posts', function(req, res){
    Post.find({}, function(error, posts){
        if(error){
            // send error response
            res.status(422). send({ error: 'Unable to fetch Post' })
        } else{
            // send success responses
            res.status(200).send(posts)
        }        
    })
})


// One posts only by ID

app.get('/posts/:id', (req, res)=>{
    const {id} = req.params;
    Post.findById(id, (error, Singlepost_deleted)=>{
      if(error) {
        // sends error response
        res.status(422).send({ error: 'Unable to fetch post '})
      } else {
        // sends success response
        res.status(200).send(Singlepost_deleted)
      }
    });
});

// 3. Update

app.patch('/posts/:id', (req, res)=>{
    const {id} = req.params;
   Post.findByIdAndUpdate(id, req.body, {new:true}, (error, updated_post)=>{
      if(error) {
        // sends error response
        res.status(422).send({ error: 'Error in updating post '})
      } else {
        // sends success response
        res.status(200).send(updated_post)
      }
    });
});

// 4. Delete

app.delete('/posts/:id', (req, res)=>{
    const {id} = req.params;
    Post.findByIdAndDelete(id, (error,post_deleted )=>{
      if(error) {
        // sends error response
        res.status(422).send({ error: 'Unable to delete post '})
      } else {
        // sends success response
        res.status(200).send(post_deleted)
      }
    });
});


app.listen(3302, function(){
    console.log("server is running at port 3302.....");
})

