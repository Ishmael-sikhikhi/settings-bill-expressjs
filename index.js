let express = require('express');
let app = express();

app.get('/', (req, res)=>{
    res.send("Settings Bill App")
})

const PORT = process.env.PORT || 3011

app.listen(PORT, ()=>{
    console.log('App started at port:', PORT)
})