import express from "express";
import path from 'path';
import { connectMongodb } from "./helper.js";
import blogRouter from "./routers/blog.js";
import methodOverride from "method-override";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


connectMongodb();

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride("_request_method"));

app.use("/blog", blogRouter);

app.get("/", (req, res) => {
    res.redirect("/blog");
});

app.get("/*", (req, res) => {
    res.render("error", {
        message:
            "Sorry you jumped at the wrong page! I hope you will get your way around",
        error: false,
    });
});

app.listen(PORT, () => {
    console.log("App is running at port: " + PORT);
});
