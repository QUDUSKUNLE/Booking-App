import chai from 'chai';
import assert from 'assert';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import server from '../server';
import userMock from '../__mock__/userMock';

dotenv.config();
chai.should();
const { expect } = chai;
chai.use(chaiHttp);

// Test for UserController
describe('User Controller Test', () => {
  const { user } = userMock;
  // Test sign up route
  describe('User signup route', () => {
    before((done) => {
      mongoose.createConnection(process.env.MONGODB_URL, () => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      });
    });
    it('should signup a new user', (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .set('Content-Type', 'application/json')
        .send(user.signUp)
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(true, res.body.success);
          res.body.should.have.property('message').equals('Sign up successful');
          done();
        });
    });
    it(
      'should return status 400 if password is less than 6 characters',
      (done) => {
        chai.request(server)
          .post('/api/v1/signup')
          .set('Content-Type', 'application/json')
          .send(user.signUpErr)
          .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.success).to.eql(false);
            res.body.error.should
              .equals('Password length must be more than 6 characters');
            done();
          });
      }
    );
    it(
      'should return status 400 if password is less than 6 characters',
      (done) => {
        chai.request(server)
          .post('/api/v1/signup')
          .set('Content-Type', 'application/json')
          .send(user.signUpErr)
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal(false, res.body.success);
            res.body.should.have.property('error')
              .equals('Password length must be more than 6 characters');
            done();
          });
      }
    );
    it(
      'should return status 400 if password not defined',
      (done) => {
        chai.request(server)
          .post('/api/v1/signup')
          .type('application/json')
          .send(user.signUpUndefinedPass)
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal(false, res.body.success);
            res.body.should.have.property('error')
              .equals('Either email, password or username must not be empty');
            done();
          });
      }
    );
    it('should return status 400 if username is an empty string', (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .set('Content-Type', 'application/json')
        .send(user.signUpEmptyUsername)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('Username field cannot be empty');
          done();
        });
    });
    it('should return status 409 if username already exist', (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .type('form')
        .send(user.existingUserName)
        .end((err, res) => {
          res.should.have.status(409);
          assert.equal(false, res.body.success);
          res.body.should.have.property('error')
            .equals('Username already exist');
          done();
        });
    });
    it(
      'should return status 400 if username charcter is less than 2',
      (done) => {
        chai.request(server)
          .post('/api/v1/signup')
          .type('form')
          .send(user.shortUserName)
          .end((err, res) => {
            res.should.have.status(400);
            assert.equal(false, res.body.success);
            res.body.should.have.property('error')
              .equals('Username must be more than 2 characters');
            done();
          });
      }
    );
    it('should return status 400 if email is an empty string', (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .type('form')
        .send(user.emptyEmail)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.success).to.eql(false);
          res.body.should.have.property('error')
            .equals('Email address field cannot be empty');
          done();
        });
    });
    it('should return status 400 if email is badly formatted', (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .type('form')
        .send(user.invalidEmail)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.success).to.eql(false);
          res.body.should.have.property('error')
            .equals('Email is badly formatted');
          done();
        });
    });
    it('should return status 409 if email already registered', (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .type('form')
        .send(user.existingEmail)
        .end((err, res) => {
          res.should.have.status(409);
          expect(res.body.success).to.eql(false);
          res.body.should.have.property('error')
            .equals('Email is already registered');
          done();
        });
    });
    it('should return status 400 if password is an empty string', (done) => {
      chai.request(server)
        .post('/api/v1/signup')
        .type('form')
        .send(user.emptyPassword)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.success).to.eql(false);
          res.body.error.should.equals('Password field cannot be empty');
          done();
        });
    });
  });
});
