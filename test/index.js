const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const fs = require("fs");
chai.use(chaiHttp);

const baseUrl = 'http://localhost:8080';
let loginJWT = null;
let userId = null;
let companyId = null;

describe('have categories', function() {
    it('check if categories exist', function(done) {
        chai.request(baseUrl)
        .get('/category')
        .end((err, resp) => {
            expect(err).to.be.null
            expect(resp).to.have.status(200)
            done();
        })
    })
});

describe('User tests', function () {
    after(async function() {
        console.log("start delete")
        chai.request(baseUrl)
            .delete('/user')
            .set('Cookie', loginJWT)
            .end((err, resp) => {
                console.log('user deleted')
            })
        console.log("done")
    })
    it('Create new user', function(done) {
        chai.request(baseUrl)
        .put('/user')
        .attach('profilePic', fs.readFileSync('./test/test.jpg'), 'test.jpg')
        .field("name", "testUser")
        .field("password", "testPassword1")
        .field("firstName", "firstName")
        .field("lastName", "lastName")
        .field("email", "user.test@domain.com")
        .end((err, resp) => {
            expect(err).to.be.null
            expect(resp).to.have.status(200)
            done()
        })
    })
    it('login', function(done){
        chai.request(baseUrl)
        .post('/login')
        .send({
            name: "testUser",
            password: "testPassword1"
        })
        .end((err, resp) => {
            expect(err).to.be.null
            expect(resp).to.have.status(200)
            expect(resp).to.have.cookie('connect.sid');
            loginJWT = resp.headers['set-cookie'][0].split(';')[0];
            userId = resp.body.id;
            done();
        })
    })
    it('Update created user', function(done) {
        chai.request(baseUrl)
        .post('/user/update')
        .set('Cookie', loginJWT)
        .attach('profilePic', fs.readFileSync('./test/test.jpg'), 'test.jpg')
        .field("name", "testUserUPDATED")
        .field("firstName", "firstNameUPDATED")
        .field("lastName", "lastNameUPDATED")
        .field("email", "user.test@domain.com")
        .end((err, resp) => {
            expect(err).to.be.null
            expect(resp).to.have.status(200)
            done();
        })
    })
    it("Get user data and check if it's correct", function(done) {
        chai.request(baseUrl)
        .get(`/user/${userId}`)
        .end((err, resp) => {
            expect(err).to.be.null
            expect(resp).to.have.status(200)
            expect(resp.body.name).to.equal("testUserUPDATED")
            expect(resp.body.firstName).to.equal("firstNameUPDATED")
            expect(resp.body.lastName).to.equal("lastNameUPDATED")
            done();
        })
    })
    it("Get user profile picture", function(done) {
        chai.request(baseUrl)
        .get(`/user/profilePic/${userId}`)
        .end((err, resp) => {
            expect(err).to.be.null
            expect(resp).to.have.status(200)
            done();
        })
    })
    // perform other test with this user before deleting him
    describe('Company tests', function() {
        after(function(done) {
            chai.request(baseUrl)
            .delete(`/company/delete/${companyId}`)
            .set('Cookie', loginJWT)
            .end((err, resp) => {
                console.log("company delete")
                done();
            })
        })
        it('Create company' , function(done){
            chai.request(baseUrl)
            .post('/company')
            .set('Cookie', loginJWT)
            .attach('gallery[0]', fs.readFileSync('./test/test.jpg'), 'test.jpg')
            .field("name", "testCompany1")
            .field("category", 1)
            .field("email", "testCompany1@domain.com")
            .field("address", "testCompany1Address")
            .field("homepage", "https://www.testCompany1.com")
            .field("description", "meh")
            .end((err, resp) => {
                expect(err).to.be.null
                expect(resp).to.have.status(200)
                companyId = resp.body.comp.id;
                done();
            })
        })
        it('Update company', function(done){
            chai.request(baseUrl)
            .post(`/company/${companyId}`)
            .set('Cookie', loginJWT)
            .send({
                description: "UPDATED",
                address: "testCompany1Address",
                homepage: "https://www.testCompany1.com"
            })
            .end((err, resp) => {
                expect(err).to.be.null
                expect(resp).to.have.status(200)
                done();
            })
        })
        it('Get Company', function(done){
            chai.request(baseUrl)
            .get(`/company/${companyId}`)
            .set('Cookie', loginJWT)
            .end((err, resp) => {
                expect(err).to.be.null
                expect(resp).to.have.status(200)
                expect(resp.body.company.name).to.equal("testCompany1")
                expect(resp.body.company.description).to.equal("UPDATED")
                done();
            })
        })
        it('Get Company picture', function(done) {
            chai.request(baseUrl)
            .get(`/company/${companyId}/picture/test.jpg`)
            .end((err, resp) => {
                expect(err).to.be.null
                expect(resp).to.have.status(200);
                done();
            })
        })
        describe('Review and Comment test', function() {
            let reviewId;
            it('Create new review', function(done) {
                chai.request(baseUrl)
                .post(`/review/${companyId}`)
                .set('Cookie', loginJWT)
                .send({
                    rating: 5,
                    content: "testReview",
                    user_id: userId
                })
                .end((err, resp) => {
                    expect(err).to.be.null
                    err ? done(err) : null;
                    expect(resp).to.have.status(200)
                    reviewId = resp.body.review.id
                    done()
                })
            })
            it('Create new comment', function(done) {
                chai.request(baseUrl)
                .post(`/comment/${reviewId}`)
                .set('Cookie', loginJWT)
                .send({
                    content: "testComment",
                    commentType: "company",
                    commenterId: companyId,
                    reviewId: reviewId
                })
                .end((err, resp) => {
                    expect(err).to.be.null
                    expect(resp).to.have.status(200)
                    done()
                })
            })
            it('Get reviews', function() {
                chai.request(baseUrl)
                .get(`/review/company/${companyId}`)
                .end((err, resp) => {
                    expect(err).to.be.null
                    expect(resp).to.have.status(200)
                    done()
                })
            })
        })
    })
})

// Found Problems
    // tests work properly however an error is always raised "Uncaught ReferenceError: done is not defined" in after all hook. There is however apparantly no issue with the code.
        //  The error does not occur every time.  - perhaps the mocha needs some time to complete the tests even after the script is completed?

    // duplicate user names because of lack of prevention on update - implement passport strategy for user update
    // user cannot be deleted if he has created a review already - remove userId freign key from reviews/ users will be only disabled not deleted

