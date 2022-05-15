# Open Badges v3 Test Suite

This is a cross-vendor interoperability test suite for the 
<a href="https://github.com/IMSGlobal/openbadges-specification/">Open Badges v3 specification</a>.

The tests were performed by sending an Open Badges v3 compliant 
<a href="https://www.w3.org/TR/vc-data-model/">Verifiable Credential</a> to 
various issuers that implement the
<a href="https://w3c-ccg.github.io/vc-api/">Verifiable Credential API</a>.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Implementation](#implementation)

## Install

You will need version 16 or greater of node.js to run the test suite.

```js
npm i --legacy-peer-deps
```

## Usage

```
npm test
```

## Implementation
To add your implementation to this test suite see the [README here.](https://github.com/w3c-ccg/vc-api-test-suite-implementations)
Add the tag `VC-API` to the issuers and verifiers you want tested. To run the tests, some implementations require client secrets
that can be passed as env variables to the test script. To see which ones require client secrets, you can check the [vc-api-test-suite-implementations](https://github.com/w3c-ccg/vc-api-test-suite-implementations) library.
