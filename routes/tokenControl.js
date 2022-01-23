const jwt = require('jsonwebtoken');

const tokenControlFunc = (req,res,next)=>{
	const token =req.header('auth_token')
	if(!token){
		return res.status(401).send('Forbidden')
	}
	
	try{
	
		const controlToken = jwt.verify(token,process.env.SECRET)
		req.client = controlToken
		next();
	}
	catch(err){
		res.status(400).send('Invalid Token');
	}
}

module.exports = tokenControlFunc;