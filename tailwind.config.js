/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

module.exports = {
    content: ["./views/*.ejs", "./views/components/*.ejs"],
    theme: {},
    plugins: [require("tailwindcss"), require("autoprefixer"), daisyui],
    daisyui: {
        themes: ["light", "dark", "cmyk"],
    },
};
