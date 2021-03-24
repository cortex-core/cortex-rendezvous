const chai = require('chai');
const chai_http = require('chai-http');

const log = require('../../src/logging/log');

const sinon = require('sinon');

chai.should();
chai.use(chai_http);

describe('Base Blockchain Adapter Tests', function() {

    before(function(){
        log.info("Initializing testing bed...");
    });

    after(function(){
        log.info("Finalizing testing bed...");
    });

    it('should be able to put task with suitable parameters', function(done) {
    });

    it('should be able to verify suitable parameters', function(done) {
    });

    it('should be able to detect not sufficient account', function(done) {
    });

    it('should be able to detect missing parameters', function(done) {
    });
});