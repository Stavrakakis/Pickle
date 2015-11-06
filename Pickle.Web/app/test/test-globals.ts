// These will be used by anything that imports this global.ts file.
// It means they can be defined in one place only.

///<reference path="../typings/webpack/webpack.d.ts"/>
///<reference path="../typings/mocha/mocha.d.ts"/>
///<reference path="../typings/chai/chai.d.ts"/>
///<reference path="../typings/react/react.d.ts"/>
///<reference path="../typings/react/react-global.d.ts"/>
///<reference path="../typings/sinon/sinon.d.ts"/>
///<reference path="../typings/signalr/signalr.d.ts"/>
///<reference path="../Socket/ChatSocket.ts"/>
///<reference path="../../node_modules/tsunit.external/tsUnit.ts"/>

// This sets the global expect function to be the one provided by Chai
declare var expect: Chai.ExpectStatic;