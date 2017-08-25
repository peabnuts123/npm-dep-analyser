const argv = require('yargs').argv;
const getPackagesInstalled = require('./src/getPackagesInstalled');
const populatePackageDetails = require('./src/populatePackageDetails');


getPackagesInstalled(argv._)
  .then(function (packageInfo) {
    return populatePackageDetails(packageInfo.allPackages)
      .then(function () {
        summarisePackage(packageInfo);
      });
  });


function summarisePackage(packageInfo) {
  console.log(`Summary of installing ${packageInfo.packages.length} package${packageInfo.packages.length > 1 ? 's' : ''}:`);
  packageInfo.packages.forEach((pkg, index, array) => {
    console.log(`
========================= ${pkg.details.name} (${index + 1}/${array.length}) =========================
Name: ${pkg.details.name}
Version: ${pkg.details.version}
Published: ${pkg.details.publishDate} by ${pkg.details.publishAuthor}
Repository URL: ${pkg.details.repositoryURL}
Homepage: ${pkg.details.homepage}
License: ${pkg.details.license}
`);
  });

  console.log("DEPENDENCY INFORMATION:");
  console.log(`
New Installed Dependencies: ${packageInfo.allPackages.length}
`);
}