import express from "express";
import { VerifyToken } from "../middleware/AuthMiddleware.js";
import { GetPosts,GetUserPosts,AddRemoveLikes, AddComments, SinglePost } from "../controllers/PostController.js";
const router=express.Router();



/* READ */
/* getPosts */
router.get("/",VerifyToken,GetPosts);

/* GetUserPosts */
router.get("/:userId/posts",VerifyToken,GetUserPosts);

/* getSinglePost */
router.get("/:postId/post",VerifyToken,SinglePost);

/*UPDATE */
router.patch("/:id/like",VerifyToken,AddRemoveLikes);

router.patch("/:id/comment",VerifyToken,AddComments);


export default router;