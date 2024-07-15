import mongoose from "mongoose";
import {marked} from "marked";
import slugify from "slugify";
import DOMPurify from "dompurify";
import {JSDOM} from 'jsdom'

const createDOMPurifier = DOMPurify(new JSDOM().window);

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        date: { type: Date, default: Date.now },
        meta: {
            votes: Number,
            favs: Number,
        },
        slug: { type: String, required: true, unique: true },
        sanitizedMarkdownHtml:{
            type:String,
            required:true,
        }
    },
    {
        timestamps: true,
    }
);


function updateSlutAndMarkdown(next){
    if(this.title){
        this.slug = slugify(this.title,{lower:true, strict:true})
    }
    if(this.body){
        this.sanitizedMarkdownHtml = createDOMPurifier.sanitize(marked(this.body));
    }
    next()
}

blogSchema.pre('validate',function(next){
    updateSlutAndMarkdown.call(this,next);
})

blogSchema.pre('findOneAndUpdate', function(next){
    updateSlutAndMarkdown.call(this._update,next);
})

const Blog = new mongoose.model("blog", blogSchema);

export default Blog;
