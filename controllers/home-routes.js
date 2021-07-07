const router = require('express').Router();
const { User, Post, Comment } = require('../models')

// GET all blog posts for homepage

router.get('/', async (req, res) => {
    // try {
    //     const blogData = await Blog.findAll({
    //         include: [
    //             {
    //                 model: Post
    //             }
    //         ]
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json(error);
    // }

    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'time_created'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_content', 'post_id', 'user_id', 'time_created'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }));
            console.log(posts);
            res.render('homepage', { posts, isLoggedIn: req.session.isLoggedIn });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error)
        });
});

module.exports = router;

// // GET one blog post

// router.get('/post/:id', async (req, res) => {
//     try {
//         const 
//     } catch (error) {
//         console.log(error);
//     }
// })