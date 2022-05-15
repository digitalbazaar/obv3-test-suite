/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const chai = require('chai');
chai.use(require('chai-string'));
const {filterByTag} = require('vc-api-test-suite-implementations');
const {shouldThrowInvalidInput, testIssuedVc} = require('./assertions');
const {createValidVc} = require('./mock.data');

const should = chai.should();
const {match, nonMatch} = filterByTag({issuerTags: ['VC-API']});

function addReportCell({test, name}) {
  test.cell = {
    columnId: name,
    rowId: test.title
  };
}

describe('Issuer - OpenBadge v3 - Achievment', function() {
  const summaries = new Set();
  this.summary = summaries;
  const reportData = [];
  // this will tell the report
  // to make an interop matrix with this suite
  this.matrix = true;
  this.report = true;
  this.implemented = [...match.keys()];
  this.notImplemented = [...nonMatch.keys()];
  this.rowLabel = 'Test Name';
  this.columnLabel = 'Issuer';
  // the reportData will be displayed under the test title
  this.reportData = reportData;
  for(const [name, implementation] of match) {
    const issuer = implementation.issuers.find(
      issuer => issuer.tags.has('VC-API'));
    describe(name, function() {
      let achievementVc;
      before(async () => {
        const {issuer: {id: issuerId}} = issuer;
        const credential = createValidVc({issuerId});
        const body = {credential};
        const {result, data: issuedVc, error} = await issuer.issue({body});
        //should.exist(result, 'Expected result from issuer.');
        //result.status.should.equal(201, 'Expected statusCode 201.');
        //should.exist(issuedVc, 'Expected result to have data.');
        achievementVc = issuedVc;
      });

      it('MUST be a valid Verifiable Credential.', () => {
        addReportCell({test: this.ctx.test, name});
        testIssuedVc({issuedVc: achievementVc});
      });

      it('MUST be of type `OpenBadge`.', () => {
        addReportCell({test: this.ctx.test, name});

        achievementVc.type.should.contain(
          'OpenBadge', 'Expected VC type of `OpenBadge`');
      });

      it('MUST contain an `achievement` of type `Achievement`.', () => {
        addReportCell({test: this.ctx.test, name});
        const achievement = achievementVc.credentialSubject.achievement;

        achievement.type.should.equal(
          'Achievement', 'Expected achievement `type` of `Achievement`');
      });  

      it('MUST contain an `achievementType` of `Certificate`.', () => {
        addReportCell({test: this.ctx.test, name});
        const achievement = achievementVc.credentialSubject.achievement;

        achievement.achievementType.should.equal(
          'Certificate', 'Expected `achievementType` of `Certificate`');
      });  

      it('MAY use an `issuer` that is a valid `did:key`.', () => {
        addReportCell({test: this.ctx.test, name});

        achievementVc.issuer.should.startWith(
          'did:key', 'Expected issuer to start with `did:key`');
      });  

      it('MAY contain a `proof` of type `Ed25519Signature2020`.', () => {
        addReportCell({test: this.ctx.test, name});

        achievementVc.proof.type.should.equal(
          'Ed25519Signature2020', 
          'Expected proof type of `Ed25519Signature2020`');
      });  

    });
  }
});
