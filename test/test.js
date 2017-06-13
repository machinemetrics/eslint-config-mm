'use strict';

const eslint = require('eslint');
const expect = require('chai').expect;
const mm = require('../');

const tmp = require('tmp');
const fs = require('fs');

const unsafeCleanup = false;
const testDir = tmp.dirSync({ unsafeCleanup }).name;

const eslintOpts = {
  envs: ['node', 'es6'],
  useEslintrc: false,
  rules: mm.rules,
};

let codeNum = 0;
function testEslint(codeToTest) {
  codeNum += 1;
  const testFile = `${testDir}/${codeNum}.js`;
  fs.writeFileSync(testFile, codeToTest);

  const report = new eslint.CLIEngine(eslintOpts).executeOnFiles([testFile]);

  return report;
}

/* eslint-disable no-console */
describe('lints as expected', () => {
  it('allows lines of 120 characters', () => {
    const report = testEslint(`
//3456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 1234567890
    `);
    if (report.errorCount || report.WarningCount) {
      console.error('unexpected errors/warnings:\n', JSON.stringify(report.results, null, 2));
    }
    expect(report.errorCount).to.eq(0);
    expect(report.warningCount).to.eq(0);
  });

  it('does not allow lines of 121 characters', () => {
    const report = testEslint(`
//3456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 12345678901
    `);
    if (+process.env.verbose) {
      console.error('detailed errors/warnings:\n', JSON.stringify(report.results, null, 2));
    }
    expect(report.errorCount).to.eq(1);
    expect(report.warningCount).to.eq(0);
    expect(report.results[0].messages[0].ruleId).to.eq('max-len');
  });
});
