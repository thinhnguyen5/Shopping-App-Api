var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var multerUpload = multer({dest: 'uploads/'});

let products= [
    {
        id: 1,
        title: 'Shirt',
        category: 'Shirt',
        image: [],
        price: 10,
        brand: "Nike",
        description: 'nice shirt',
        dateOfPosting: '2021-02-08',
        location: 'Oulu',
        DeliveryType: 'Shipping',
        username: 'tester',
        phone: '0452518653'
    },
    {
        id: 2,
        title: 'Car',
        category: 'Car',
        image: [],
        price: 10,
        brand: "BMW",
        description: 'nice car',
        dateOfPosting: '2021-01-03',
        location: 'Oulu',
        DeliveryType: 'Pickup',
        username: 'tester',
        phone: '0452518653'
    },
    {
        id: 3,
        title: 'Shoe',
        category: 'Sneaker',
        image: [],
        price: 10,
        brand: "adidas",
        description: 'nice shoe',
        dateOfPosting: '2021-02-08',
        location: 'Helsinki',
        DeliveryType: 'Shipping',
        username: 'tester',
        phone: '0452518653'
    },
    {
        id: 4,
        title: 'clothes',
        category: 'Pant',
        image: [],
        price: 10,
        brand: "Nike",
        description: 'nice pant',
        dateOfPosting: '2021-02-20',
        location: 'Oulu',
        DeliveryType: 'Shipping',
        username: 'tester',
        phone: '0452518653'
    }
]

//get all products
router.get('/', (req, res) => {
    res.status(200).json(products);
});

//get single product base on ID
router.get('/:Id', (req, res) => {
    const item = products.find(p => p.id == req.params.Id);
    res.status(200).json(item);
    console.log(item);
});

router.post('/addproduct', multerUpload.array('myFiles', 4), (req, res) => {
    var date = new Date();
    //console.log(req.files);
    req.files.forEach(f => {
        fs.renameSync(f.path, './uploads/' + f.originalname)
    })
    const tam = [];
    req.files.forEach(i => tam.push(i.originalname));
    // console.log(tam);

    //const images = req.files.forEach(i => console.log(i.originalname));
    //console.log(images);
    const newProduct = {
        id: products.length + 1,
        title: req.body.title,
        category: req.body.category,
        image: tam,
        price: req.body.price,
        brand: req.body.brand,
        description: req.body.description,
        dateOfPosting: date,
        location: req.body.location,
        DeliveryType: req.body.DeliveryType,
        username: req.body.username,
        phone: req.body.phone
    }
    console.log(newProduct);
    products.push(newProduct);
    res.status(200).json({status: "adding successful!"});
});

//search by location
router.get('/location/:location', (req, res) => {
    const item = products.filter(p => p.location == req.params.location);
    res.status(200).json(item);
});

//search by category
router.get('/category/:category', (req, res) => {
    const item = products.find(p => p.category == req.params.category);
    res.status(200).json(item);
});

//search by date of posting
router.get('/date/:date', (req, res) => {
    const item = products.find(p => p.dateOfPosting == req.body.date);
    res.status(200).json(item);
});

//delete posting
router.delete('/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.sendStatus(200);
});

//update posting
router.put('/:id', multerUpload.array('myFiles', 4), (req, res) => {
    req.files.forEach(f => {
        fs.renameSync(f.path, './uploads/' + f.originalname)
    })
    const tam = [];
    req.files.forEach(i => tam.push(i.originalname));

    if(object[(req.params.id) - 1]) {
        var date = new Date();
        object[(req.params.id) - 1] = {
            id: req.params.id,
            title: req.body.title,
            category: req.body.category,
            image: tam,
            price: req.body.price,
            brand: req.body.brand,
            description: req.body.description,
            dateOfPosting: date,
            location: req.body.location,
            DeliveryType: req.body.DeliveryType,
            username: req.body.username,
            phone: req.body.phone
        }
        res.status(200).send(products);
    }
    else {
        res.status(500).json({status: "no result"});
    }
});

module.exports = router;