// @ts-check
const path = require('path');
const yargsParser = require('yargs-parser');
const releaseIt = require('release-it');
const angularConfig = require('../angular.json');

const args = yargsParser(process.argv, {
  boolean: ['major', 'minor', 'patch', 'dry-run', 'ci'],
  string: ['path']
});
const cwd = process.cwd();
const libraries = angularConfig.projects;

if (!libraries) {
  console.info('There is no library to release!');
  process.exit(1);
}

const releaseOptions = [];
const librariesName = Object.keys(angularConfig.projects);

// Init config
librariesName.forEach(libraryName => {
  const distOutputFolder = path.join(cwd, `dist/${libraries[libraryName].root}`);
  const packageJsonFile = path.join(distOutputFolder, 'package.json');
  const changelogFile = path.join(distOutputFolder, 'CHANGELOG.md');

  console.log(distOutputFolder);

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
        in: `../dist/libs/${librariesName}/package.json`,
        out: [`../dist/libs/${librariesName}/package.json`]
      },
      '@release-it/conventional-changelog': {
        preset: 'angular',
        commitPath: distOutputFolder,
        infile: `../dist/libs/${librariesName}/CHANGELOG.md`,
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
