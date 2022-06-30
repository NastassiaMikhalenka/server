import CommentModel from "../models/commentModel.js";

export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find()
        res.json(comments);
    } catch (err) {
        res.status(500).json({
            message: 'Failed to retrieve comments',
        });
    }
};

export const createComment = async (req, res) => {
    const {text, postId} = req.body;

    const data = {
        text: text,
        user: req.userId,
        post: postId,
    };

    const comment = new CommentModel(data);
    try {
        const result = await comment.save().then((doc) => doc.populate('user'));
        if (result) {
            return res.status(201).json(result);
        }
        return res.status(400).json({message: 'Failed to create comment'});
    } catch (err) {
        return res.status(500).json({message: 'A server error has occurred'});
    }
};

export const postComments = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await CommentModel.find({post: id}).populate('user');
        if (result) {
            return res.status(200).json(result);
        }
        return res.status(404).json({message: 'There is no such entry in the database.'});
    } catch (err) {
        return res.status(500).json({message: 'A server error has occurred'});
    }
};