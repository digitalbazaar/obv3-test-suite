/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const validVc = require('./obv3-example.json');
const {v4: uuidv4} = require('uuid');

// copies a validVc and adds an id.
const createValidVc = ({issuerId}) => ({
  ...validVc,
  id: `urn:uuid:${uuidv4()}`,
  issuer: issuerId
});

module.exports = {
  createValidVc
};
