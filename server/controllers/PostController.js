import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";

export const CreatePost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);
    const post = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await post.save();

    const posts = await Post.find().sort({ _id: -1 });

    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const GetUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    const userPosts = await Post.find({ userId }).sort({ _id: -1 });
    // if(userPosts==={}){
    //     res.status(300).json({"msg":"no Posts "})
    // }
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const AddRemoveLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const UpdatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    //updatingthe specific post

    res.status(200).json(UpdatedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const SinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const AddComments = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;
    const post = await Post.findById(id);

    if (comment !== "") {
      post.comments.push({
        comment: comment,
        userId: userId,
      });
    }

    const UpdatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );
    res.status(200).json(UpdatedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
