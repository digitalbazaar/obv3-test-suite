/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const chai = require('chai');
const {filterByTag} = require('vc-api-test-suite-implementations');
const {shouldThrowInvalidInput, testIssuedVc} = require('./assertions');
const {createValidVc} = require('./mock.data');

const should = chai.should();
const {match, nonMatch} = filterByTag({issuerTags: ['VC-API']});

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
      it('MUST successfully issue a credential.', async function() {
        this.test.cell = {
          columnId: name,
          rowId: this.test.title
        };
        const {issuer: {id: issuerId}} = issuer;
        const credential = createValidVc({issuerId});
        const body = {credential};
        const {result, data: issuedVc, error} = await issuer.issue({body});
        should.exist(result, 'Expected result from issuer.');
        should.exist(issuedVc, 'Expected result to have data.');
        should.not.exist(error, 'Expected issuer to not Error.');
        result.status.should.equal(201, 'Expected statusCode 201.');
        testIssuedVc({issuedVc});
      });
    });
  }
});
