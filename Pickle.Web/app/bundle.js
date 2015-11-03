/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/react/react-global.d.ts" />
	/// <reference path="./Actions/Action.ts"/>
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ChannelStore = __webpack_require__(1);
	var ChannelPanel_1 = __webpack_require__(13);
	var ChatPanel_1 = __webpack_require__(15);
	var app;
	(function (app) {
	    var components;
	    (function (components) {
	        var ChatApp = (function (_super) {
	            __extends(ChatApp, _super);
	            function ChatApp(props) {
	                var _this = this;
	                _super.call(this, props);
	                this.onChannelActivated = function (channelActivationAction) {
	                    _this.activeChatChannels.push(channelActivationAction.channel);
	                    _this.setState({
	                        activeChatChannels: _this.activeChatChannels
	                    });
	                };
	                this.channelStore = new ChannelStore();
	                var initialChannel = this.channelStore.channels[0];
	                this.activeChatChannels = [initialChannel];
	                this.state = {
	                    activeChatChannels: this.activeChatChannels
	                };
	            }
	            ChatApp.prototype.componentDidMount = function () {
	                this.channelStore.addListener(ChannelStore.CHANNEL_ACTIVATED, this.onChannelActivated);
	            };
	            // the JSX syntax is quite intuitive but check out
	            // https://facebook.github.io/react/docs/jsx-in-depth.html
	            // if you need additional help
	            ChatApp.prototype.render = function () {
	                var _this = this;
	                var chatPanels = this.state.activeChatChannels.map(function (channel) {
	                    return React.createElement(ChatPanel_1.default, {"store": _this.channelStore, "activeChannel": channel});
	                });
	                return (React.createElement("div", null, React.createElement(ChannelPanel_1.default, {"store": this.channelStore}), chatPanels));
	            };
	            ;
	            return ChatApp;
	        })(React.Component);
	        components.ChatApp = ChatApp;
	    })(components = app.components || (app.components = {}));
	})(app || (app = {}));
	var ChatApp = app.components.ChatApp;
	function render() {
	    React.render(React.createElement(ChatApp, null), document.getElementsByClassName('chatapp')[0]);
	}
	render();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/flux/flux.d.ts" />
	/// <reference path="../../typings/node/node.d.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Dispatcher = __webpack_require__(2);
	var NewMessageAction = __webpack_require__(7);
	var ChannelActivationAction = __webpack_require__(9);
	var NewChannelAction = __webpack_require__(10);
	var Events = __webpack_require__(11);
	var Channel_1 = __webpack_require__(12);
	var ChannelStore = (function (_super) {
	    __extends(ChannelStore, _super);
	    function ChannelStore() {
	        var _this = this;
	        _super.call(this);
	        this._channels = [new Channel_1.default("Bristol"), new Channel_1.default("Edinburgh")];
	        Dispatcher.register(function (action) {
	            if (action instanceof NewMessageAction) {
	                var newMessageAction = action;
	                var channel = _this._channels.filter(function (c) { return c.name == newMessageAction.channel.name; })[0];
	                channel.recentMessages.push(newMessageAction.message);
	                _this.emit(ChannelStore.NEW_MESSAGE, newMessageAction.message);
	            }
	            if (action instanceof NewChannelAction) {
	                var newChannelAction = action;
	                _this._channels.push(newChannelAction.channel);
	                _this.emit(ChannelStore.NEW_CHANNEL, (newChannelAction.channel));
	            }
	            if (action instanceof ChannelActivationAction) {
	                var channelActivationAction = action;
	                _this.emit(ChannelStore.CHANNEL_ACTIVATED, channelActivationAction);
	            }
	        });
	    }
	    Object.defineProperty(ChannelStore.prototype, "channels", {
	        get: function () {
	            return this._channels;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ChannelStore.prototype.getMessagesForChannel = function (channel) {
	        return this.channels.filter(function (c) { return c.name == channel.name; })[0].recentMessages;
	    };
	    ChannelStore.NEW_MESSAGE = "new_message";
	    ChannelStore.NEW_CHANNEL = "new_channel";
	    ChannelStore.CHANNEL_ACTIVATED = "channel_activated";
	    return ChannelStore;
	})(Events.EventEmitter);
	module.exports = ChannelStore;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/flux/flux.d.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var flux = __webpack_require__(3);
	var Dispatcher = (function (_super) {
	    __extends(Dispatcher, _super);
	    function Dispatcher() {
	        _super.apply(this, arguments);
	    }
	    return Dispatcher;
	})(flux.Dispatcher);
	var dispatcher = new Dispatcher();
	module.exports = dispatcher;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(4);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var invariant = __webpack_require__(6);

	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	var Dispatcher = (function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);

	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */

	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   */

	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */

	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   */

	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   */

	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */

	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };

	  return Dispatcher;
	})();

	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Action = __webpack_require__(8);
	/**
	 * A Flux Action which is sent to increment the Counter
	 * This action is "marked" a view sourced action i.e. an action triggered by user interaction
	 */
	var NewMessageAction = (function (_super) {
	    __extends(NewMessageAction, _super);
	    function NewMessageAction(channel, message) {
	        _super.call(this, Action.Source.View);
	        this._message = message;
	        this._channel = channel;
	    }
	    Object.defineProperty(NewMessageAction.prototype, "message", {
	        get: function () {
	            return this._message;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(NewMessageAction.prototype, "channel", {
	        get: function () {
	            return this._channel;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return NewMessageAction;
	})(Action);
	module.exports = NewMessageAction;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var Action = (function () {
	    function Action(source) {
	        this._source = source;
	    }
	    Object.defineProperty(Action.prototype, "source", {
	        /**
	         * The Source of the action
	         * Make sure the source is immutable to avoid change
	         * during Dispatch
	         */
	        get: function () {
	            return this._source;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Action;
	})();
	var Action;
	(function (Action) {
	    (function (Source) {
	        Source[Source["View"] = 0] = "View";
	        Source[Source["Server"] = 1] = "Server";
	    })(Action.Source || (Action.Source = {}));
	    var Source = Action.Source;
	})(Action || (Action = {}));
	module.exports = Action;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Action = __webpack_require__(8);
	/**
	 * A Flux Action which is sent to increment the Counter
	 * This action is "marked" a view sourced action i.e. an action triggered by user interaction
	 */
	var ChannelActivationEvent = (function (_super) {
	    __extends(ChannelActivationEvent, _super);
	    function ChannelActivationEvent(channel) {
	        _super.call(this, Action.Source.View);
	        this._channel = channel;
	    }
	    Object.defineProperty(ChannelActivationEvent.prototype, "channel", {
	        get: function () {
	            return this._channel;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ChannelActivationEvent;
	})(Action);
	module.exports = ChannelActivationEvent;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Action = __webpack_require__(8);
	/**
	 * A Flux Action which is sent to increment the Counter
	 * This action is "marked" a view sourced action i.e. an action triggered by user interaction
	 */
	var NewChannelAction = (function (_super) {
	    __extends(NewChannelAction, _super);
	    function NewChannelAction(channel) {
	        _super.call(this, Action.Source.View);
	        this._channel = channel;
	    }
	    Object.defineProperty(NewChannelAction.prototype, "channel", {
	        get: function () {
	            return this._channel;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return NewChannelAction;
	})(Action);
	module.exports = NewChannelAction;


/***/ },
/* 11 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	var Channel = (function () {
	    function Channel(name) {
	        this.name = name;
	        this.recentMessages = [];
	    }
	    return Channel;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Channel;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ChannelStore = __webpack_require__(1);
	var ChannelListItem_1 = __webpack_require__(14);
	var ChannelPanel = (function (_super) {
	    __extends(ChannelPanel, _super);
	    function ChannelPanel(props) {
	        var _this = this;
	        _super.call(this, props);
	        this.channelClicked = function (event) {
	            console.log(event);
	        };
	        this.onNewChannel = function (newChannel) {
	            _this.setState({
	                channels: _this.channelStore.channels
	            });
	        };
	        this.channelStore = props.store;
	        this.channels = this.channelStore.channels;
	        this.state = {};
	    }
	    ChannelPanel.prototype.componentDidMount = function () {
	        this.props.store.addListener(ChannelStore.NEW_CHANNEL, this.onNewChannel);
	    };
	    ChannelPanel.prototype.render = function () {
	        var channelList = this.channels.map(function (channel) { return React.createElement(ChannelListItem_1.default, {"channel": channel}); });
	        return (React.createElement("div", null, React.createElement("ul", null, channelList)));
	    };
	    ;
	    return ChannelPanel;
	})(React.Component);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ChannelPanel;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var dispatcher = __webpack_require__(2);
	var ChannelActivationAction = __webpack_require__(9);
	var ChannelListItem = (function (_super) {
	    __extends(ChannelListItem, _super);
	    function ChannelListItem(props) {
	        var _this = this;
	        _super.call(this, props);
	        this.channelClicked = function (event) {
	            dispatcher.dispatch(new ChannelActivationAction(_this.channel));
	        };
	        this.channel = props.channel;
	    }
	    ChannelListItem.prototype.render = function () {
	        return (React.createElement("li", {"onClick": this.channelClicked}, this.channel.name));
	    };
	    ;
	    return ChannelListItem;
	})(React.Component);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ChannelListItem;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var dispatcher = __webpack_require__(2);
	var NewMessageAction = __webpack_require__(7);
	var ChannelStore = __webpack_require__(1);
	var ChatPanel = (function (_super) {
	    __extends(ChatPanel, _super);
	    function ChatPanel(props) {
	        var _this = this;
	        _super.call(this, props);
	        this.onMessageChanged = function (event) {
	            _this.setState({
	                message: event.target.value
	            });
	        };
	        this.onNewMessage = function (newMessage) {
	            _this.setState({
	                messages: _this.channelStore.getMessagesForChannel(_this.state.activeChannel)
	            });
	        };
	        this.messageUpdated = function (event) {
	            _this.setState({ message: event.target.value });
	        };
	        this.sendMessage = function (event) {
	            event.preventDefault();
	            dispatcher.dispatch(new NewMessageAction(_this.state.activeChannel, _this.state.message));
	            _this.setState({ message: null });
	        };
	        this.state = {
	            message: null,
	            activeChannel: props.activeChannel
	        };
	        this.channelStore = props.store;
	        this.messages = this.channelStore.getMessagesForChannel(this.state.activeChannel);
	    }
	    ChatPanel.prototype.componentDidMount = function () {
	        this.props.store.addListener(ChannelStore.NEW_MESSAGE, this.onNewMessage);
	    };
	    ChatPanel.prototype.render = function () {
	        var messages = [];
	        for (var i = 0; i < this.messages.length; i++) {
	            messages.push(React.createElement("div", null, this.messages[i]));
	        }
	        return (React.createElement("div", null, React.createElement("header", null, "Chat Panel - ", this.state.activeChannel.name), React.createElement("div", null, messages), React.createElement("form", {"onSubmit": this.sendMessage}, React.createElement("input", {"type": "text", "value": this.state.message, "onChange": this.onMessageChanged}), React.createElement("button", {"type": "submit"}, "Send"))));
	    };
	    ;
	    return ChatPanel;
	})(React.Component);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ChatPanel;


/***/ }
/******/ ]);