const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const server = require('../index');

describe('Test routes', function() {
    before(function() {
        server.start();
    });
    after(function() {
        server.close();
    });
    
    describe('Testing route /users', function() {
        it('Should return status 200 with request', async function() {
            await chai.request('http://localhost:3000/users').get('/')
            .then(response => {
                expect(response).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
        })

        it('Should return status 400 with missing fields', function() {
            //
        })
    })
    describe('Testing route /users/register', function() {
        it('should return status 400 with missing fields', async function() {
            await chai.request('http://localhost:3000/users').post('/register')
            .send({
                username: " ",
                //password: " "
            })
            .then(response => {
                expect(response.status).to.equal(400);
            })
            .catch(error => {
                throw error;
            })
        })
        it('should return status 500', async function() {
            await chai.request('http://localhost:3000/users').post('/register')
            .send({
                username: "tester",
                password: "asd"
            })
            .then(response => {
                expect(response.status).to.equal(500);
            })
            .catch(error => {
                throw error;
            })
        })
        it('should return status 201', async function() {
            await chai.request('http://localhost:3000/users').post('/register')
            .send({
                username: "asd",
                password: "asd"
            })
            .then(response => {
                expect(response.status).to.equal(201);
            })
            .catch(error => {
                throw error;
            })
        })
    })
    describe('Testing route /users/login', function() {
        it('Should return status 500 with missing fields', async function() {
            await chai.request('http://localhost:3000/users').get('/login')
            .send({
                username: "tester",
                password: "tester"
            })
            .then(response => {
                expect(response.status).to.equal(500);
            })
            .catch(error => {
                throw error;
            })
        })
        it('Should return status 201 with missing fields', async function() {
            await chai.request('http://localhost:3000/users').get('/login')
            .send({
                username: "tester",
                password: "testerpassword"
            })
            .then(response => {
                expect(response.status).to.equal(201);
            })
            .catch(error => {
                throw error;
            })
        })
        it('Should return status 400 with missing fields', async function() {
            await chai.request('http://localhost:3000/users').get('/login')
            .send({
                username: " ",
                password: " "
            })
            .then(response => {
                expect(response.status).to.equal(400);
            })
            .catch(error => {
                throw error;
            })
        })
    })

///Product///
    describe('Testing route /products', function() {
        it('Should return status 200 with all product', async function() {
            await chai.request('http://localhost:3000/products').get('/')
            .then(response => {
                expect(response).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
        })
    })
    describe('Testing route /products', function() {
        it('Should return status 200 with single product', async function() {
            await chai.request('http://localhost:3000/products').get('/:Id')
            .then(response => {
                expect(response).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
        })
    })
    describe('Testing route /products', function() {
        it('Should return status 200 with request add product', async function() {
            await chai.request('http://localhost:3000/products').get('/addproduct')
            .then(response => {
                expect(response).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
        })
    })
    describe('Testing route /products', function() {
        it('Should return status 200 with request search by location', async function() {
            await chai.request('http://localhost:3000/products').get('/location/:location')
            .then(response => {
                expect(response).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
        })
    })
    describe('Testing route /products', function() {
        it('Should return status 200 with request search by category', async function() {
            await chai.request('http://localhost:3000/products').get('/category/:category')
            .then(response => {
                expect(response).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
        })
    })
    describe('Testing route /products', function() {
        it('Should return status 200 with request search by date of posting', async function() {
            await chai.request('http://localhost:3000/products').get('/date/:date')
            .then(response => {
                expect(response).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
        })
    })
    describe('Testing route /products', function() {
        it('Should return status 200 with reqeust delete', async function() {
            await chai.request('http://localhost:3000/products').delete('/:id')
            .then(response => {
                expect(response).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
        })
    })
    describe('Testing route /products', function() {
        it('Should return status 200 with update successful', async function() {
            await chai.request('http://localhost:3000/products').put('/:id')
            .then(response => {
                expect(response).to.have.status(200);
            })
            .catch(error => {
                throw error;
            })
        })
        it('Should return status 500 with bad request', async function() {
            await chai.request('http://localhost:3000/products').put('/:id')
            .then(response => {
                expect(response).to.have.status(500);
            })
            .catch(error => {
                throw error;
            })
        })
    })
})
