const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.status(200).send("İnex sayfası");
})



const port = 3000;
app.listen(port, () => {
    console.log("Sunucu çalışıyor. Port : " + port);
})

