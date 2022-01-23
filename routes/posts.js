const router = require('express').Router();
const tokenControl = require('./tokenControl');

router.get('/',tokenControl,(req,res)=>{
	res.send(req.client)
	
})

module.exports = router;