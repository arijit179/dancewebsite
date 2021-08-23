const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
// const bodyparser = require('bodyparser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true}, { useUnifiedTopology: true });
const port = 8000;

var ContactSchema = new mongoose.Schema({
    nam: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', ContactSchema);


app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));
// Endpoints
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
})

// app.post('/', (req, res) => {
//     nam = req.body.nam
//     phone = req.body.phone
//     email = req.body.email
//     address = req.body.address
//     desc = req.body.desc
//     let outputWrite = `the name of the client is ${nam}, Mobile number is ${phone}, Email id is ${email}, residing at ${address} and descricption is : ${desc}`
//     fs.writeFileSync('output.txt',outputWrite);
//     const params = { 'message': 'Your form has been submitted successfully' };
//     res.status(200).render('index.pug', params);
// })


app.listen(port, () => {
    console.log(`The application is started successfully on port ${port}`);
})