// These will be used by anything that imports this global.ts file.
// It means they can be defined in one place only.
///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>

// This sets the global expect function to be the one provided by Chai
declare var expect: Chai.ExpectStatic;