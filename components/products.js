const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const multerUpload = multer({dest: 'uploads/'});

let products= [
    {
        id: 1,
        title: 'Shirt',
        category: 'Shirt',
        image: [
            'https://outdoor-and-country-res.cloudinary.com/image/upload/e_trim:2/bo_8px_solid_white/c_pad,b_white,w_1000,h_1200,f_auto,q_auto/v1540205233/product/186710.jpg',
            'https://i.insider.com/5daf22344af90918f721dc0b?width=600&format=jpeg&auto=webp',
            'https://i.insider.com/5daf22344af90918f721dc0b?width=600&format=jpeg&auto=webp',
            'https://i.insider.com/5daf22344af90918f721dc0b?width=600&format=jpeg&auto=webp'
        ],
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
        image: [
            'https://preview2.netcarshow.com/Toyota-C-HR-2017-1600-03.jpg',
            'https://preview2.netcarshow.com/Toyota-C-HR-2017-1600-03.jpg',
            'https://preview2.netcarshow.com/Toyota-C-HR-2017-1600-03.jpg',
            'https://preview2.netcarshow.com/Toyota-C-HR-2017-1600-03.jpg'
        ],
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
        image: [
            'https://images.complex.com/complex/images/c_crop,h_705,w_1047,x_12,y_18/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/uzwwpxnquuevgquyugey/adidas-yeezy-451-nuriel-rumored-release-info',
            'https://images.complex.com/complex/images/c_crop,h_705,w_1047,x_12,y_18/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/uzwwpxnquuevgquyugey/adidas-yeezy-451-nuriel-rumored-release-info',
            'https://images.complex.com/complex/images/c_crop,h_705,w_1047,x_12,y_18/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/uzwwpxnquuevgquyugey/adidas-yeezy-451-nuriel-rumored-release-info',
            'https://images.complex.com/complex/images/c_crop,h_705,w_1047,x_12,y_18/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/uzwwpxnquuevgquyugey/adidas-yeezy-451-nuriel-rumored-release-info'
        ],
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
        image: [
            'https://www.target.com.au/medias/static_content/product/images/full/76/39/A1487639.jpg?impolicy=mobile_hero',
            'https://www.target.com.au/medias/static_content/product/images/full/76/39/A1487639.jpg?impolicy=mobile_hero',
            'https://www.target.com.au/medias/static_content/product/images/full/76/39/A1487639.jpg?impolicy=mobile_hero',
            'https://www.target.com.au/medias/static_content/product/images/full/76/39/A1487639.jpg?impolicy=mobile_hero'
        ],
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