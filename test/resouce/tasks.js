const chai = require('chai');
const chai_http = require('chai-http');

const log = require('../../src/logging/log');

const Auth = require('../../src/auth/auth');

const sinon = require('sinon');

chai.should();
chai.use(chai_http);

describe('Rendezvous Tasks Resource Tests', function() {

    let service;
    let auth_stub;

    before(function(){
        auth_stub = sinon.stub(Auth.prototype, 'authorize');
        auth_stub.callsFake(function(req) {
            return new Promise(function(resolve, reject) {
                let response = { status: 200 };
                if (req == "some_valid_token") {
                    resolve(response);
                } else if (req == "some_invalid_token") {
                    response.status = 401;
                    resolve(response);
                }
                reject();
            });
        });
        return new Promise(function (resolve) {
            log.info("Initializing testing bed...");
            service = require('../../service');
            resolve();
        });
    });

    after(function(){
        log.info("Finalizing testing bed...");
        auth_stub.restore();
    });


    it('should be able to submit task via /submit POST endpoint', function(done){
        let submit_request = { access_token: 'some_valid_token', task: 'some_task_id' };
        chai.request(service)
            .post('/tasks/submit')
            .send(submit_request)
            .end(function(err, res){
                chai.should().equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('tracking_number');
                res.body.should.have.property('reward_per_task');
                done();
            });
    });

    it('should fail to submit without access_token parameter', function(done){
        let submit_request = {};
        chai.request(service)
            .post('/tasks/submit')
            .send(submit_request)
            .end(function(err, res){
                chai.should().equal(err, null);
                res.should.have.status(403);
                res.body.should.not.be.null;
                done();
            });
    });

    it('should fail to submit without task parameter', function(done){
        let submit_request = { access_token: 'some_valid_token' };
        chai.request(service)
            .post('/tasks/submit')
            .send(submit_request)
            .end(function(err, res){
                chai.should().equal(err, null);
                res.should.have.status(403);
                res.body.should.not.be.null;
                done();
            });
    });

    it('should fail to submit when auth failed', function(done){
        let submit_request = { access_token: 'some_invalid_token', task: 'some_task_id' };
        chai.request(service)
            .post('/tasks/submit')
            .send(submit_request)
            .end(function(err, res){
                chai.should().equal(err, null);
                res.should.have.status(401);
                res.body.should.not.be.null;
                done();
            });
    });
});
