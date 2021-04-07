const Post = require("./posts-model.js");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    Post.find(req.query)
        .then((post) => {
            res.status(200).json(post);
            console.log(post);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "The posts information could not be retrieved",
            });
        });
}); // GET ALL POSTS

router.get("/:id", (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "The post information could not be retrieved",
            });
        });
}); // GET SPECIFIC ID

router.post("/", (req, res) => {
    const newPost = req.body;
    if (!newPost.title || !newPost.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        });
    } else {
        Post.insert(newPost)
            .then(({ id }) => {
                return Post.findById(id);
            })
            .then((post) => {
                res.status(201).json(post);
            })
            .catch(() => {
                res.status(500).json({
                    message:
                        "There was an error while saving the post to the database",
                });
            });
    }
}); // POST NEW POST

router.delete("/:id", (req, res) => {
    Post.remove(req.params.id)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist",
                });
            } else {
                res.json(post);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "The post could not be removed",
            });
        });
}); // DELETES POST

router.put("/:id", (req, res) => {
    const changes = req.body;

    if (!changes.title || !changes.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        });
    } else {
        Post.findById(req.params.id)
            .then((stuff) => {
                if (!stuff) {
                    res.status(404).json({
                        message:
                            "The post with the specified ID does not exist",
                    });
                } else {
                    return Post.update(req.params.id, req.body);
                }
            })
            .then((data) => {
                if (data) {
                    return Post.findById(req.params.id);
                }
            })
            .then((post) => {
                res.json(post);
            })
            .catch(() => {
                res.status(500).json({
                    message: "The post information could not be modified",
                });
            });
    }
}); // PUT UPDATES POST

router.get("/:id/comments", (req, res) => {
    Post.findPostComments(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "The comments information could not be retrieved",
            });
        });
}); // GET COMMENTS FOR SPECIFIC ID

module.exports = router;
