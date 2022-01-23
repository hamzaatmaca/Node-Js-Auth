const router = require('express').Router()
const ClientSchema = require('../model/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register',async (req,res)=>{
	
	console.log(req.body)
	const checkEmail = await ClientSchema.findOne({email:req.body.email});
	
	if(checkEmail){

		return res.status(400).json({error:'email exixst'})

	}
	else{

		//PASSWORD HASHING
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password,salt)

		const client = new ClientSchema({
			name:req.body.name,
			email:req.body.email,
			password:hashPassword

		})
		try{

			const saveClient = await client.save();
			res.status(200).json({data:saveClient})
		}
		catch(err){
			res.status(500).json({err:err});
		}
	}
	
});

router.post('/login', async (req,res)=>{
	
	const control = await ClientSchema.findOne({email:req.body.email});
	
	if(!control){

		return res.status(400).send('Email or Password is wrong');
	
	}
	else{

		const passControl = await bcrypt.compare(req.body.password,control.password)

		if(!passControl){
			
			return res.status(400).send('Password is wrong');

		}
		else{

			//Token
			const createToken = jwt.sign({_id:control._id}, process.env.SECRET)

			res.header('auth_token',createToken).send(createToken);
		}
	}
})

module.exports= router