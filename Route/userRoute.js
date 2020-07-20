const express = require('express');
const uuid = require('uuid');

let users = require('../Data/users');

const router = express.Router();

//GET

router.get('/',(req,res)=>{

    try{
        res.send(users);
    }
    catch(err){
        res.status(500).send('SERVER ERROR');
    }
});
//GET BY ID
router.get('/:id',(req,res)=>{

    try{
        let found = users.find((i)=> i.id == req.params.id);
       // console.log(found.id);
        if(found){
            res.status(200).json(found);
        }
        if(!found)
        {
            res.status(404).json({'msg':'This user does not exist'});
        }
    }
    catch(err){
        res.status(500).send('SERVER ERROR');
    }
});

//POST 
//INSERT 

router.post('/',(req,res)=>{
    try{ 
        const newUser={ 
            id : uuid.v4(),    
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        };
        users.push(newUser);
        res.send(users);
    }
    catch(err){
        res.status(500).send('SERVER ERROR');
    }
});

//DELETE
router.delete('/:id',(req,res)=>{

    try{
        const found = users.find((i) => i.id == req.params.id);
      //  console.log(found.id);
        if(!found) 
        {
            return res.status(404).json({'msg':'user not found'});
        }
        users = users.filter( function (i){
             return i.id !== found.id;
            });
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).send('SERVER ERROR');
    }
});

// PUT
// UPDATE
// API/USERS/ID

router.put('/:id',(req,res)=>{
    try{
        const updateUser = users.find((i)=> i.id == req.params.id);
        console.log(updateUser.id)
    if(!updateUser){
        return res.status(500).json({'msg':'No such user found'});
    }

    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    users = users.filter(function (i){
        if(i.id == id){
            i.name=name;
            i.email=email;
            i.password=password;
        }
        return i;
    });
    res.status(200).json(users);
    }
    catch(err){
        res.status(500).send('SERVER ERROR');
    }
});
module.exports = router;