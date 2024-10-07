const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req, res) => {
  try {
    //fetching
    const { post, user, body } = req.body;
    //create a comment object
    const comment = new Comment({
      post,
      user,
      body,
    });

    const saveComment = await comment.save();

    //find the post By Id
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: saveComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();
    res.json({
      post: updatedPost,
    });
  } catch (e) {
    return res.status(500).json({
      error: "error while creating",
    });
  }
};
