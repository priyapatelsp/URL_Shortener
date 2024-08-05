const express= require('express');
const app = express();

const connectDB=require('./config/db')

connectDB();
app.use(express.json({extended : false}))

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT= 8080;
app.listen(PORT,()=>
    {
    console.log("Listening here::")
    console.log("http://localhost:"+PORT);
    }
)
