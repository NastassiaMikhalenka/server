import PostModel from "../models/postModel.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec(); // связь с пользователем
        res.json(posts);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to retrieve articles',
        });
    }
};

export const getOnePost = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate(
            {_id: postId,},
            {$inc: {viewsCount: 1},},
            {returnDocument: 'after',}, // после обновления вернуть актуальный документ
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Unable to return article',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Article not found',
                    });
                }

                res.json(doc);
            },
        ).populate('user'); // связь с user
    } catch (err) {
        res.status(500).json({
            message: 'Failed to retrieve articles',
        });
    }
};

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to create article',
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete(
            {
                _id: postId,
            },
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Failed to delete article',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Article not found',
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        res.status(500).json({
            message: 'Failed to retrieve articles',
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to update article',
        });
    }
};