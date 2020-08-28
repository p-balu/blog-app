const express = require("express");
const router = express.Router();
const db = require("../models");
// get all blogs
router.get("/blogs", (req, res) => {
    db.Blogs.findAll()
        .then(blogs =>
            res.json({
                data: blogs
            }));
});
// get single blog by it's id
router.get("/find/:id", (req, res) => {
    db.Blogs.findAll({
        where: {
            id: req.params.id
        }
    }).then(blog =>
        res.json({
            data: blog
        }));
});
// post new blog in to blogs table
router.post("/add", (req, res) => {
    db.Blogs.create({
        title: req.query.title,
        content: req.query.content,
        slug: req.query.slug,
        published: req.query.published
    }).then(submitedBlog =>
        console.log("Add Entered", submitedBlog),
        res.send
            ({
                "code": 200,
                "success": "Added sucessfully",
            })
    );
});
// delete blog by it's id
router.delete("/delete/:id", (req, res) => {
    db.Blogs.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.send({
            "code": 200,
            "success": "Deleted sucessfully"
        })
        );
});
// edit a blog by id
router.put("/edit", (req, res) => {
    db.Blogs.update(
        {
            title: req.query.title,
            content: req.query.content,
            slug: req.query.slug,
            published: req.query.published
        },
        {
            where: { id: req.query.id }
        }
    ).then(() => res.send({
        "code": 200,
        "success": "Edited sucessfully"
    }));
});

module.exports = router;