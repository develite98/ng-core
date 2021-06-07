const { execSync } = require('child_process');
const { types } = require('../.cz-config.js');

console.log('🐟🐟🐟 Validating git branch 🐟🐟🐟');

const branch = process.argv[2] || execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const allowedTypes = types.map(type => type.value);
const usersBranchRegex = `users/(([a-z0-9.])+)/(${allowedTypes.join('|')})/(([a-z0-9._-])+)`;
const featureBranchRegex = 'features/(([a-z0-9._-])+)';
const matchUsers = new RegExp(usersBranchRegex, 'g').test(branch);
const matchFeatures = new RegExp(featureBranchRegex, 'g').test(branch);

const exitCode = +!(matchUsers || matchFeatures || branch === 'HEAD');

if (exitCode === 0) {
  console.log('GIT BRANCH ACCEPTED 👌');
} else {
  console.log(
    '[Error]: Ho no! 😦 Your branch name: \n' +
      '-------------------------------------------------------------------\n' +
      branch +
      '\n-------------------------------------------------------------------' +
      '\n\n 👉️ Does not follow the commit message convention specified in the "docs/developers/01-git.md" file.'
  );
  console.log('\nusers/<name>/<type>/<branch-name>');
  console.log(`possible types: ${allowedTypes.join('|')}`);
  console.log('\nEXAMPLE: \n' + 'users/phong.cao/feat/product_management\n');

  process.exit(exitCode);
}
