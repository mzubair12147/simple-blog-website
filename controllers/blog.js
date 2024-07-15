import Blog from "../models/blog.js";

export async function handleGetAllBlog(req, res) {
    try {
        const blogs = await Blog.find({});
        res.status(200).render("blog", { title: "InfoVerse", blogs: blogs });
    } catch (error) {
        res.status(500).render('error', {
            message: "Failed while retrieving blogs",
            error: error,
        });
    }
}

export async function handleCreateBlog(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            console.log(req.body);
            return res.status(400).render("create", new Blog());
        }

        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).redirect(`/blog/${blog.slug}`);
    } catch (error) {
        res.status(500).render("error", { message: "Sorry! but we Could not create your blog!", error:error });
    }
}

export async function handleGetOneBlog(req, res) {
    if (req.params.slug === "create") {
        res.render("create");
        return;
    }
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res
                .status(404)
                .render("error", {
                    message: `Blog ${req.params.slug} is not found.`,
                    error: false
                });
        }

        res.status(200).render("show", { blog: blog });
    } catch (error) {
        res.status(500).render("error", {
            message: "Error retrieving blog " + req.params.slug,
            error: error,
        });
    }
}

export async function handleEditBlog(req, res) {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res
                .status(404)
                .render("error", {
                    message: `Blog ${req.params.slug} is not found.`,
                    error:false
                });
        }

        res.render("edit", { blog: blog });
    } catch (error) {
        res.status(500).render("error", {
            message: "Error retrieving blog " + req.params.slug,
            error: error,
        });
    }
}

export async function handleUpdateBlog(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).render('error',{
                message: "Fields cannot be empty",
                error: false,
            });
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            useFindAndModify: true,
            new: true,
        });

        if (!blog) {
            return res.status(404).render('error',{
                message: "Blog not found " + req.params.id,
                error:false
            });
        }
        res.redirect(`/blog/${blog.slug}`);
    } catch (error) {
        res.status(500).render('error',{
            message: "Error updating blog: " + req.params.id,
            error: error,
        });
    }
}

export async function handleDeleteBlog(req, res) {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).render('error', {
                message: "Blog not found " + req.params.id,
                error:false
            });
        }
        res.status(200).redirect("/blog");
    } catch (error) {
        res.status(500).render('error',{
            message: "Error deleting blog with id " + req.params.id,
            error: error,
        });
    }
}
