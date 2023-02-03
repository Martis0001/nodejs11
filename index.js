//sukuriu savo serveri
const express = require('express');
const app = express();

//duomenys bus gaunami, perduodami json formatu
app.use(express.json());

//sukuriu testiniu duomenu masyva
const products = [
    {id: 1, title: "Fja"},
    {id: 2, title: "Mens"},
    {id: 3, title: "Solid"},
]



//svarbu sukurti route
app.get('/api/products', (req, res) => {
    res.send(products);
});

//vienas konkretus produktas
app.get('/api/products/:id', (req,res) => {
    const my_product = products.find(product => product.id === parseInt(req.params.id));
    if(!my_product) res.status(404).send("not found");

    my_product.title = req.body.title;
    res.send(my_product);
});

//naujos prekes pridejimas
//be patikrinimu

app.post('/api/products', (req, res) => {
    const product = {
        id: products.length +1,
        title: req.body.title
    };
    products.push(product);
    res.send(products);
});

//esamos prekes atnaujinimas
app.put('/api/products/:id', (req, res)=>{
    const my_product = products.find(product => product.id === parseInt(req.params.id));
    if(!my_product) res.status(404).send("not found");

    my_product.title = req.body.title;
    res.send(my_product);
});

//esamos prekes trynimas
app.delete('/api/products/:id', (req, res)=>{
    const my_product = products.find(product => product.id === parseInt(req.params.id));
    if(!my_product) res.status(404).send("not found");

    const product_index = products.indexOf(my_product);
    products.splice(product_index, 1);
    
    res.send(my_product);

});



//apsirasome port'a ant kurio veiks serveris
const PORT = 5001;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});