const express=require('express');

const router = express.Router();

const Comic = require('../models/comic')

router.get('/',async (req,res)=>{
    const max = await Comic.find().countDocuments();
    
    let comics=[];

    if(max==1){
        var pri = parseInt(Math.random() * (max - 0) + 0);
        const comic_1= await Comic.find().limit(1).skip(pri);
        comics=[
            comic_1[0]
        ]
    }else if(max==2){
        var pri = parseInt(Math.random() * (max - 0) + 0);
        var seg =  parseInt(Math.random() * (max - 0) + 0);
         while(seg==pri){
        seg =  parseInt(Math.random() * (max - 0) + 0);
         }
         const comic_1= await Comic.find().limit(1).skip(pri);
         const comic_2= await Comic.find().limit(1).skip(seg);
         comics=[
            comic_1[0],
            comic_2[0]
        ]
    }else if(max>=3){
        var pri = parseInt(Math.random() * (max - 0) + 0);
        var seg =  parseInt(Math.random() * (max - 0) + 0);
         while(seg==pri){
        seg =  parseInt(Math.random() * (max - 0) + 0);
         }
         var ter = parseInt(Math.random() * (max - 0) + 0);
        while(ter==pri || ter==seg){
            ter =  parseInt(Math.random() * (max - 0) + 0);
        }
        const comic_1= await Comic.find().limit(1).skip(pri);
        const comic_2= await Comic.find().limit(1).skip(seg);
        const comic_3= await Comic.find().limit(1).skip(ter);
        comics=[
            comic_1[0],
            comic_2[0],
            comic_3[0]
        ]
    } 
    

    res.json(comics);
});

router.get('/:titulo',async(req,res)=>{
    const task = await Comic.find({titulo:req.params.titulo});
     res.json(task);
 })

router.put('/:id',async(req,res)=>{
    const calificacion=parseInt((req.body.cali_prev + req.body.cali_guar)/2);
    const {titulo,imagen}=req.body;
    const actualizar = {titulo,imagen,calificacion};
    await Comic.findByIdAndUpdate(req.params.id,actualizar);
    res.json({status:'comic actualizado'});
})

router.post('/',async (req,res)=>{
    const {titulo,imagen,cali_guar}=req.body;
    const comic= new Comic({
        titulo,
        imagen,
        calificacion:cali_guar
    })
    await comic.save();
    res.json({status:'comic guardada'})
})

module.exports = router;