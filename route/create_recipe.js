const express = require("express");
// const fileUpload = require("express-fileupload")
const recipe = require("../models/Recipes");
const router = express.Router();
router.use(express.json());
// router.use(fileUpload())



router.post('/',  (req, res)=>{
    console.log(req.body,req.files);
    const {file} = req.files;
    console.log(typeof(file.name))
    // let file_val = req.body.file;
    // console.log(typeof(file_val))
    // file_val = file_val.split("\\")
    // console.log(file_val[file_val.length-1])
    file.mv("./uploads/" + file.name, async (err)=>{
        if(err){
            res.json({message: err.message})
        }
        else{
            try{
                const recipe_data = await recipe.create({
                    title:req.body.title,
                    author:req.body.author,
                    ingredients:req.body.ingredients,
                    directions:req.body.directions,
                    file:file.name,
                    user:req.user
                })
                res.json({
                    status:"success",
                    message:"recipe created successfully",
                    recipe_data
                })
            }catch(e){
                res.json({
                    status:"failed",
                    message:e.message
                })
            }
        }
    })
    // try{
    //     console.log(req.body)
    //     const recipe_data = await recipe.create({
    //         title:req.body.title,
    //         author:req.body.author,
    //         ingredients:req.body.ingredients,
    //         directions:req.body.directions,
    //         user:req.user
    //     });
    //     res.json({
    //         status:"Success",
    //         message:"recipe created successfully",
    //         recipe_data
    //     })
    // }catch(e){
    //     res.json({
    //         status:"Failed",
    //         message:e.message
    //     })
    // }
})

module.exports = router