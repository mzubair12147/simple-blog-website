import { Router } from "express";
import {
    handleCreateBlog,
    handleDeleteBlog,
    handleGetAllBlog,
    handleGetOneBlog,
    handleUpdateBlog,
    handleEditBlog
} from "../controllers/blog.js";

const router = Router();

router.get("/", handleGetAllBlog);

router.get("/:slug", handleGetOneBlog);

router.get("/edit/:id", handleEditBlog);

router.post("/", handleCreateBlog);

router.put("/:id", handleUpdateBlog);

router.delete("/:id", handleDeleteBlog);
export default router;
