const express = require("express");
const router = express.Router();
const recipe = require("../models/Recipes");
const path = require("path");

router.get('/', async (req, res)=>{
    try{
        const find_recipe = await recipe.find({user:req.user});
        if(find_recipe){
            res.json({
                status:"Success",
                message:"data received",
                find_recipe
            })
        }
        else{
            res.json({
                status:"Failed",
                message:"No Data Found"
            })
        }
    }catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })
    }
})

router.get('/:fileName',  (req, res)=>{
    console.log(path.join(__dirname, `./uploads/${req.params.fileName}`))
    res.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`))
})

router.get('/:title', async (req, res)=>{
    try{
        const find_recipe = await recipe.find({title:req.params.title});
        if(find_recipe){
            res.json({
                status:"Success",
                message:"data received",
                find_recipe
            })
        }
        else{
            res.json({
                status:"Failed",
                message:"No Data Found"
            })
        }
    }catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })
    }
})

module.exports = router