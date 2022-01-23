const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoute = require('./routes/posts');
const cors = require('cors');

dotenv.config({path:'./config/.env'});

//BODY PARSER
app.use(express.json())

app.use(cors());

//DB
mongoose.connect(process.env.MONGO,{
	useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(()=>{
	console.log(`Db is running good`)
})
.catch((err)=>{
	console.log(err)
})


//Routes
app.use('/api/client', authRouter);
app.use('/api/client/posts',postRoute);



app.listen(PORT,()=>{
	console.log(`Server is running on port ${PORT}`)
})
