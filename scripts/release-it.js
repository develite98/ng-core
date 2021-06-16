// @ts-check
const fs = require('fs');
const path = require('path');
const yargsParser = require('yargs-parser');
const releaseIt = require('release-it');

const args = yargsParser(process.argv, {
  boolean: ['major', 'minor', 'patch', 'dry-run', 'ci'],
  string: ['path']
});
const packagePath = args.path;
const cwd = process.cwd();
const packageRoot = path.join(cwd, packagePath);
const packageJsonFile = path.join(packageRoot, 'package.json');
const changelogFile = path.join(packageRoot, 'CHANGELOG.md');
const angularConfig = require('../angular.json');
const libraries = angularConfig.projects;

console.log(packagePath);
console.log(angularConfig);

// if (!packagePath || !fs.existsSync(packageJsonFile)) {
//   console.error('Please provide a valid package path.');
//   process.exit(1);
// }

if (!libraries) {
  console.info('There is no library to release!');
  process.exit(1);
}

const releaseOptions = [];
const librariesName = Object.keys(angularConfig.projects);

// Init config
librariesName.forEach(libraryName => {
  const distOutputFolder = path.join(cwd, `dist/${libraries[libraryName].root}`);
  console.log(distOutputFolder);
  let option = {
    'dry-run': args.dryRun,
    ci: args.ci,
    increment: (args.major && 'major') || (args.minor && 'minor') || 'patch',
    verbose: true,
    git: {
      commitMessage: `ci(release): ${libraryName}@` + '${version}',
      tagName: libraryName + '@${version}',
      tagAnnotation: 'Release ' + libraryName + '@${version}',
      requireCleanWorkingDir: false
    },
    github: {
      release: true,
      releaseName: 'Release ' + libraryName + '@${version}'
    },
    npm: false,
    hooks: {
      'after:release': `npm publish ${distOutputFolder} --access public`
    },
    plugins: {
      '@release-it/bumper': {
        in: packageJsonFile,
        out: [packageJsonFile.replace(/\\/gi, '/'), path.join(distOutputFolder, 'package.json').replace(/\\/gi, '/')]
      },
      '@release-it/conventional-changelog': {
        preset: 'angular',
        commitPath: packageRoot,
        infile: changelogFile,
        sameFile: true,
        tagPrefix: libraryName + '@',
        append: true
      }
    }
  };

  releaseOptions.push(option);
});

// Release package
releaseOptions.forEach(option => {
  releaseIt(option)
    .then(output => console.log(output))
    .catch(error => {
      console.log(error);
      process.exit(1);
    });
});
