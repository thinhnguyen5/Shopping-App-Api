const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const server = require('../server');

describe('Test routes', function() {
    before(function() {
        server.start();
    });
    after(function() {
        server.close();
    });

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