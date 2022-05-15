/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const chai = require('chai');

const should = chai.should();

function shouldThrowInvalidInput({result, error}) {
  should.not.exist(result, 'Expected no result from issuer.');
  should.exist(error, 'Expected issuer to Error.');
  should.exist(error.status, 'Expected an HTTP error response code.');
  error.status.should.not.equal(401,
    'Should not get an Authorization Error.');
  error.status.should.equal(400,
    'Expected status code 400 invalid input!');
}

function testIssuedVc({issuedVc}) {
  issuedVc.should.be.an('object');
  issuedVc.should.have.property('@context');
  issuedVc.should.have.property('type');
  issuedVc.type.should.contain('VerifiableCredential');
  issuedVc.should.have.property('id');
  issuedVc.id.should.be.a('string');
  issuedVc.should.have.property('credentialSubject');
  issuedVc.credentialSubject.should.be.an('object');
  issuedVc.should.have.property('issuer');
  const issuerType = typeof(issuedVc.issuer);
  issuerType.should.be.oneOf(['string', 'object']),
  issuedVc.should.have.property('proof');
  issuedVc.proof.should.be.an('object');
  if(issuerType === 'object') {
    should.exist(issuedVc.issuer.id,
      'Expected issuer object to have property id');
  }
}

module.exports = {
  shouldThrowInvalidInput,
  testIssuedVc
};
