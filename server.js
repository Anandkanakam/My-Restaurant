const express =require('express');
const colors=require("colors");
const cors=require("cors");
const morgan=require("morgan")
const dotenv=require("dotenv")
const connectDb=require("./config/db");
//dot env configuration
dotenv.config();
//db connection
connectDb();
//rest object
const app=express();
//middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan("dev"));
//route
app.use('/api/v1/test',require("./routes/testRoutes"));
app.use('/api/v1/auth',require("./routes/authRoutes"));
app.use('/api/v1/user',require("./routes/userRoutes"));
app.use('/api/v1/restaurent',require("./routes/restaurentRoutes"));
app.use('/api/v1/category',require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API is healthy!' });
});

app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Welcome to My Restaurant<h1>");
});
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST}:${PORT}`.white.bgMagenta);
});

