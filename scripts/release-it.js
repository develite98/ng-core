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
const nxJsonFile = path.join(packageRoot, 'nx.json');
const changelogFile = path.join(packageRoot, 'CHANGELOG.md');

if (!packagePath || !fs.existsSync(packageJsonFile)) {
  console.error('Please provide a valid package path.');
  process.exit(1);
}

const nxJson = JSON.parse(fs.readFileSync(nxJsonFile, 'utf-8'));
const libraries = [...nxJson.libraries];
const options = [];

libraries.forEach(libraryName => {
  const distOutputFolder = path.join(cwd, `dist/${libraryName}`, packagePath);
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
      'before:release': `echo "//registry.npmjs.org/:_authToken=${process.env.GITHUB_TOKEN}" > .npmrc`,
      'after:release': `npm publish ${distOutputFolder} --access public && yarn rimraf .npmrc`
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

  options.push(option);
});

options.forEach(option => {
  releaseIt(option)
    .then(output => console.log(output))
    .catch(error => {
      console.log(error);
      process.exit(1);
    });
});
