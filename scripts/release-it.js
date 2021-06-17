// @ts-check
const cwd = process.cwd();
const path = require('path');
const releaseIt = require('release-it');
const yargsParser = require('yargs-parser');
const angularConfig = require('../angular.json');
const args = yargsParser(process.argv, {
  boolean: ['major', 'minor', 'patch', 'dry-run', 'ci'],
  string: ['path']
});

// Get Library
const libraries = angularConfig.projects;
if (!libraries) {
  console.info('There is no library to release!');
  process.exit(1);
}

// Init Config
const releaseOptions = [];
const librariesName = Object.keys(angularConfig.projects);
librariesName.forEach(libraryName => {
  const distOutputFolder = path.join(cwd, `dist/${libraries[libraryName].root}`);
  const packageJsonFile = path.join(cwd, `${libraries[libraryName].root}`, 'package.json');
  const changelogFile = path.join(cwd, `${libraries[libraryName].root}`, 'CHANGELOG.md');

  console.log(packageJsonFile);

  let option = {
    'dry-run': args.dryRun,
    ci: args.ci,
    increment: true,
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
        out: [packageJsonFile.replace(/\\/gi, '/')]
      },
      '@release-it/conventional-changelog': {
        preset: 'angular',
        commitPath: distOutputFolder,
        infile: changelogFile,
        sameFile: true,
        tagPrefix: libraryName + '@',
        append: true
      }
    }
  };

  releaseOptions.push(option);
});

// Release Package
releaseOptions.forEach(option => {
  releaseIt(option)
    .then(output => console.log(output))
    .catch(error => {
      console.log(error);
      process.exit(1);
    });
});
