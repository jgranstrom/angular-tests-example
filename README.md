# angular-tests-example

This is a simple angular app targeted at exemplifying a variety of extensive testing methods supported by angularjs.
It may also serve as a slight reference to scalable structuring of angular apps.

## Structure

To ensure modularity and scalability each component of the app is contained within its own module and file.
Controllers, directives, filters and services are all contained within a dedicated folder and has a respectively named
parent module which only purpose is the depend on each of its children. The main app module can then depend on each
of the parent modules to make sure each component is loaded. This way of structuring isolates each component and
helps to avoid the issue of modules and files exploding in size and complexity as the app grows.

To be consistent the unit test are also structured in a similar fashion, with a single test file for each component
that requires testing, grouped in directories by component type.

## Running the tests

There are several ways of running the different tests, some demonstrated here. All tests are run by the Karma
test runner which requires Node.js and the testing framework used is Jasmine.
All tests can simultaneously be run on several browsers which can easily be specified in the config files provided.

### Unit tests

The example app provides unit tests for all of its components including controllers, directives, filters and services.

Running the script `/scripts/test.*` will launch the Karma server and continuously run all unit tests each time a
JavaScript file in `app` is changed.

To run all unit tests a single time run the same script with the arguments `--no-auto-watch --single-run`.

### e2e tests

There are also e2e scenario tests included to verify that the behaviour of the app is correctly represented by the DOM.

Running these tests requires the app to be hosted somewhere, which is why a lightweight web server running on node
is provided under `/scripts`.

Start the web and Karma server for e2e tests by running `/scripts/test-e2e-server.*`.

Running the e2e tests should now be possible by running `/scripts/test-e2e-run.*`.

## JSHint

To further ensure the validity of the app I recommend using JSHint to detect possible coding errors as the app grows
larger. I have provided two `.jshintrc` configuration  files, one for the app section and one for test which both are
somewhat customized to my liking and to support angular and tests.

I have also included a `Gruntfile.js` which is a configuration file for the Grunt task runner. I use this to manually
run the JSHint tool and let it verify all files. The reason for this is that it is then later simple to extend this
configuration to concat, minify files and so on, as needed.