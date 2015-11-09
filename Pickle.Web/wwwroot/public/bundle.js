/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./app/App.tsx ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="./typings/react/react-global.d.ts" />
	/// <reference path="./typings/jquery/jquery.d.ts" />
	/// <reference path="./Actions/Action.ts"/>
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var $ = __webpack_require__(/*! jquery */ 4);
	__webpack_require__(/*! ./App.less */ 5);
	var ChannelStore_1 = __webpack_require__(/*! ./Channels/ChannelStore */ 9);
	var ChannelStoreEvents_1 = __webpack_require__(/*! ./Channels/ChannelStoreEvents */ 21);
	var HubStore_1 = __webpack_require__(/*! ./Hubs/HubStore */ 23);
	var ChannelPanel_1 = __webpack_require__(/*! ./ChannelPanel/ChannelPanel */ 24);
	var ChatPanel_1 = __webpack_require__(/*! ./ChatPanel/ChatPanel */ 27);
	var ChatAppProps = (function () {
	    function ChatAppProps() {
	    }
	    return ChatAppProps;
	})();
	var ChatAppState = (function () {
	    function ChatAppState() {
	    }
	    return ChatAppState;
	})();
	var ChatApp = (function (_super) {
	    __extends(ChatApp, _super);
	    function ChatApp(props) {
	        var _this = this;
	        _super.call(this, props);
	        // handlers
	        this.onChannelActivated = function (event) {
	            _this.setState({
	                activeChannel: event.channel
	            });
	        };
	        this.channelStore = new ChannelStore_1.default($);
	        this.hubStore = new HubStore_1.default();
	        this.state = {
	            activeChannel: null
	        };
	    }
	    ChatApp.prototype.render = function () {
	        if (!this.hub) {
	            return React.createElement("div", null);
	        }
	        return (React.createElement("div", null, React.createElement(ChannelPanel_1.ChannelPanel, {"channelStore": this.channelStore, "hub": this.hub, "activeChannel": this.state.activeChannel}), React.createElement(ChatPanel_1.default, {"channelStore": this.channelStore, "activeChannel": this.state.activeChannel})));
	    };
	    ;
	    ChatApp.prototype.componentDidMount = function () {
	        var _this = this;
	        this.channelStore.addListener(ChannelStoreEvents_1.default.CHANNEL_ACTIVATED, this.onChannelActivated);
	        this.hubStore.getHubs()
	            .then(function (hubs) {
	            _this.hub = hubs[0];
	            return _this.channelStore.getChannelsForHub(_this.hub.id).then(function (channels) {
	                _this.setState({
	                    activeChannel: channels[0]
	                });
	            });
	        });
	    };
	    ;
	    return ChatApp;
	})(React.Component);
	exports.ChatApp = ChatApp;
	function render() {
	    React.render(React.createElement(ChatApp, null), document.getElementsByClassName("chatapp")[0]);
	}
	$(document).ready(function () {
	    render();
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/*!********************!*\
  !*** external "$" ***!
  \********************/
/***/ function(module, exports) {

	module.exports = $;

/***/ },
/* 5 */
/*!**********************!*\
  !*** ./app/App.less ***!
  \**********************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/*!**************************************!*\
  !*** ./app/Channels/ChannelStore.ts ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/flux/flux.d.ts" />
	/// <reference path="../typings/node/node.d.ts" />
	/// <reference path="../typings/jquery/jquery.d.ts" />
	/// <reference path="../typings/signalr/signalr.d.ts" />
	/// <reference path="../Socket/ChatSocket.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var events = __webpack_require__(/*! events */ 10);
	var Dispatcher_1 = __webpack_require__(/*! ../Dispatcher/Dispatcher */ 11);
	var SendMessageAction_1 = __webpack_require__(/*! ./SendMessageAction */ 16);
	var ChannelActivationAction_1 = __webpack_require__(/*! ./ChannelActivationAction */ 18);
	var NewChannelAction_1 = __webpack_require__(/*! ./NewChannelAction */ 19);
	var Channel_1 = __webpack_require__(/*! ./Channel */ 20);
	var ChannelStoreEvents_1 = __webpack_require__(/*! ../Channels/ChannelStoreEvents */ 21);
	var ChatMessageApiModel_1 = __webpack_require__(/*! ./Models/ChatMessageApiModel */ 22);
	var ChannelStore = (function (_super) {
	    __extends(ChannelStore, _super);
	    function ChannelStore($) {
	        var _this = this;
	        _super.call(this);
	        this.$ = $;
	        $.connection.chatHub.client.broadcastMessage = function (hubId, channelId, username, message) {
	            _this.emit(ChannelStoreEvents_1.default.NEW_MESSAGE, new ChatMessageApiModel_1.default(hubId, channelId, username, message));
	        };
	        $.connection.hub.start();
	        this.dispatcherToken =
	            Dispatcher_1.default.register(function (action) {
	                if (action instanceof SendMessageAction_1.default) {
	                    var sendMessageAction = action;
	                    _this.sendMessageToApi(sendMessageAction.channel, sendMessageAction.message)
	                        .then(function () {
	                        _this.sendMessageToChatHub(sendMessageAction.channel, sendMessageAction.message);
	                    })
	                        .fail(function (error) {
	                        console.log(error);
	                    });
	                }
	                if (action instanceof NewChannelAction_1.default) {
	                }
	                if (action instanceof ChannelActivationAction_1.default) {
	                    var channelActivationAction = action;
	                    // TODO
	                    // unsubscribe from full text broadcastMessage() inactive chat panels shouldn't waste bandwidth
	                    _this.emit(ChannelStoreEvents_1.default.CHANNEL_ACTIVATED, channelActivationAction);
	                }
	            });
	    }
	    ChannelStore.prototype.getChannels = function () {
	        var uri = "/api/channels";
	        return this.$.get(uri, function (result) {
	            var data = result.map(function (apiModel) {
	                return new Channel_1.default(apiModel.id, apiModel.hubId, apiModel.name);
	            });
	            return data;
	        });
	    };
	    ChannelStore.prototype.getChannelsForHub = function (hubId) {
	        var uri = "/api/hub/" + hubId + "/channels";
	        return this.$.get(uri, function (result) {
	            var data = result.map(function (apiModel) {
	                return new Channel_1.default(apiModel.id, apiModel.hubId, apiModel.name);
	            });
	            return data;
	        });
	    };
	    ChannelStore.prototype.getMessagesForChannel = function (channel) {
	        var uri = "/api/hub/" + channel.hubId + "/" + channel.id + "/messages";
	        return this.$.get(uri, function (messages) {
	            return messages;
	        });
	    };
	    ChannelStore.prototype.dispose = function () {
	        Dispatcher_1.default.unregister(this.dispatcherToken);
	    };
	    ;
	    // private 
	    ChannelStore.prototype.sendMessageToChatHub = function (channel, message) {
	        this.$.connection.chatHub.server.send(channel.hubId, channel.id, message);
	    };
	    ;
	    ChannelStore.prototype.sendMessageToApi = function (channel, message) {
	        var uri = "/api/hub/" + channel.hubId + "/" + channel.id + "/messages";
	        return this.$.ajax({
	            url: uri,
	            type: "POST",
	            dataType: "json",
	            contentType: "application/json",
	            data: JSON.stringify({ message: message })
	        });
	    };
	    ;
	    return ChannelStore;
	})(events.EventEmitter);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ChannelStore;


/***/ },
/* 10 */
/*!****************************!*\
  !*** ./~/events/events.js ***!
  \****************************/
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
/* 11 */
/*!**************************************!*\
  !*** ./app/Dispatcher/Dispatcher.ts ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/flux/flux.d.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var flux = __webpack_require__(/*! flux */ 12);
	var Dispatcher = (function (_super) {
	    __extends(Dispatcher, _super);
	    function Dispatcher() {
	        _super.apply(this, arguments);
	    }
	    return Dispatcher;
	})(flux.Dispatcher);
	var dispatcher = new Dispatcher();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = dispatcher;


/***/ },
/* 12 */
/*!*************************!*\
  !*** ./~/flux/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	module.exports.Dispatcher = __webpack_require__(/*! ./lib/Dispatcher */ 13);


/***/ },
/* 13 */
/*!**********************************!*\
  !*** ./~/flux/lib/Dispatcher.js ***!
  \**********************************/
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
	
	var invariant = __webpack_require__(/*! fbjs/lib/invariant */ 15);
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 14)))

/***/ },
/* 14 */
/*!**********************************************************!*\
  !*** (webpack)/~/node-libs-browser/~/process/browser.js ***!
  \**********************************************************/
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
/* 15 */
/*!****************************************!*\
  !*** ./~/flux/~/fbjs/lib/invariant.js ***!
  \****************************************/
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 14)))

/***/ },
/* 16 */
/*!*******************************************!*\
  !*** ./app/Channels/SendMessageAction.ts ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Action_1 = __webpack_require__(/*! ../Actions/Action */ 17);
	var SendMessageAction = (function (_super) {
	    __extends(SendMessageAction, _super);
	    function SendMessageAction(channel, message) {
	        _super.call(this);
	        this._message = message;
	        this._channel = channel;
	    }
	    Object.defineProperty(SendMessageAction.prototype, "message", {
	        get: function () {
	            return this._message;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SendMessageAction.prototype, "channel", {
	        get: function () {
	            return this._channel;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return SendMessageAction;
	})(Action_1.default);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SendMessageAction;


/***/ },
/* 17 */
/*!*******************************!*\
  !*** ./app/Actions/Action.ts ***!
  \*******************************/
/***/ function(module, exports) {

	var Action = (function () {
	    function Action() {
	    }
	    return Action;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Action;


/***/ },
/* 18 */
/*!*************************************************!*\
  !*** ./app/Channels/ChannelActivationAction.ts ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Action_1 = __webpack_require__(/*! ../Actions/Action */ 17);
	var ChannelActivationEvent = (function (_super) {
	    __extends(ChannelActivationEvent, _super);
	    function ChannelActivationEvent(channel) {
	        _super.call(this);
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
	})(Action_1.default);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ChannelActivationEvent;


/***/ },
/* 19 */
/*!******************************************!*\
  !*** ./app/Channels/NewChannelAction.ts ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Action_1 = __webpack_require__(/*! ../Actions/Action */ 17);
	var NewChannelAction = (function (_super) {
	    __extends(NewChannelAction, _super);
	    function NewChannelAction(channel) {
	        _super.call(this);
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
	})(Action_1.default);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = NewChannelAction;


/***/ },
/* 20 */
/*!*********************************!*\
  !*** ./app/Channels/Channel.ts ***!
  \*********************************/
/***/ function(module, exports) {

	var Channel = (function () {
	    function Channel(id, hubId, name) {
	        this._id = id;
	        this._hubId = hubId;
	        this._name = name;
	    }
	    Object.defineProperty(Channel.prototype, "id", {
	        get: function () {
	            return this._id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(Channel.prototype, "hubId", {
	        get: function () {
	            return this._hubId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(Channel.prototype, "name", {
	        get: function () {
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    return Channel;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Channel;


/***/ },
/* 21 */
/*!********************************************!*\
  !*** ./app/Channels/ChannelStoreEvents.ts ***!
  \********************************************/
/***/ function(module, exports) {

	var ChannelStoreEvents = (function () {
	    function ChannelStoreEvents() {
	    }
	    ChannelStoreEvents.NEW_CHANNEL = "NEW_CHANNEL";
	    ChannelStoreEvents.NEW_MESSAGE = "NEW_MESSAGE";
	    ChannelStoreEvents.CHANNEL_ACTIVATED = "CHANNEL_ACTIVATED";
	    return ChannelStoreEvents;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ChannelStoreEvents;


/***/ },
/* 22 */
/*!****************************************************!*\
  !*** ./app/Channels/Models/ChatMessageApiModel.ts ***!
  \****************************************************/
/***/ function(module, exports) {

	var ChatMessageApiModel = (function () {
	    function ChatMessageApiModel(hubId, channelId, username, message) {
	        this._channelId = channelId;
	        this._username = username;
	        this._message = message;
	        this._hubId = hubId;
	    }
	    Object.defineProperty(ChatMessageApiModel.prototype, "channelId", {
	        get: function () {
	            return this._channelId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(ChatMessageApiModel.prototype, "hubId", {
	        get: function () {
	            return this._hubId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(ChatMessageApiModel.prototype, "username", {
	        get: function () {
	            return this._username;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ChatMessageApiModel.prototype, "message", {
	        get: function () {
	            return this._message;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ChatMessageApiModel;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ChatMessageApiModel;


/***/ },
/* 23 */
/*!******************************!*\
  !*** ./app/Hubs/HubStore.ts ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/flux/flux.d.ts" />
	/// <reference path="../typings/node/node.d.ts" />
	/// <reference path="../typings/jquery/jquery.d.ts" />
	/// <reference path="../typings/signalr/signalr.d.ts" />
	/// <reference path="../Socket/ChatSocket.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var events = __webpack_require__(/*! events */ 10);
	var $ = __webpack_require__(/*! jquery */ 4);
	var HubStore = (function (_super) {
	    __extends(HubStore, _super);
	    function HubStore() {
	        _super.call(this);
	    }
	    HubStore.prototype.getHubs = function () {
	        var uri = "/api/hubs";
	        return $.get(uri, function (result) {
	            return result;
	        });
	    };
	    ;
	    return HubStore;
	})(events.EventEmitter);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = HubStore;


/***/ },
/* 24 */
/*!*******************************************!*\
  !*** ./app/ChannelPanel/ChannelPanel.tsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/react/react.d.ts" />
	/// <reference path="../typings/react/react-global.d.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ChannelStoreEvents_1 = __webpack_require__(/*! ../Channels/ChannelStoreEvents */ 21);
	var ChannelListItem_1 = __webpack_require__(/*! ./ChannelListItem */ 25);
	var ChannelPanelProps = (function () {
	    function ChannelPanelProps() {
	    }
	    return ChannelPanelProps;
	})();
	exports.ChannelPanelProps = ChannelPanelProps;
	var ChannelPanelState = (function () {
	    function ChannelPanelState() {
	    }
	    return ChannelPanelState;
	})();
	var ChannelPanel = (function (_super) {
	    __extends(ChannelPanel, _super);
	    function ChannelPanel(props) {
	        var _this = this;
	        _super.call(this, props);
	        // handlers
	        this.onChannelActivated = function (event) {
	            _this.setState({
	                channels: _this.state.channels,
	                activeChannel: event.channel
	            });
	        };
	        this.onNewChannel = function () {
	            _this.getChannels();
	        };
	        this.state = {
	            channels: [],
	            activeChannel: props.activeChannel
	        };
	    }
	    // public
	    ChannelPanel.prototype.componentDidMount = function () {
	        this.props.channelStore.addListener(ChannelStoreEvents_1.default.CHANNEL_ACTIVATED, this.onChannelActivated);
	        this.props.channelStore.addListener(ChannelStoreEvents_1.default.NEW_CHANNEL, this.onNewChannel);
	        this.getChannels();
	    };
	    ;
	    ChannelPanel.prototype.render = function () {
	        var _this = this;
	        var channelList = this.state.channels.map(function (channel) {
	            return React.createElement(ChannelListItem_1.default, {"channel": channel, "active": _this.state.activeChannel.id === channel.id});
	        });
	        return (React.createElement("div", {"id": "pickle-channel-panel"}, React.createElement("h2", null, this.props.hub ? this.props.hub.name : ""), React.createElement("ul", null, channelList)));
	    };
	    ;
	    // private 
	    ChannelPanel.prototype.getChannels = function () {
	        var _this = this;
	        var channels = this.props.hub
	            ? this.props.channelStore.getChannelsForHub(this.props.hub.id)
	            : this.props.channelStore.getChannels();
	        return channels.then(function (chans) {
	            _this.setState({
	                channels: chans,
	                activeChannel: _this.state.activeChannel
	            });
	        });
	    };
	    ;
	    return ChannelPanel;
	})(React.Component);
	exports.ChannelPanel = ChannelPanel;


/***/ },
/* 25 */
/*!**********************************************!*\
  !*** ./app/ChannelPanel/ChannelListItem.tsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/react/react-global.d.ts" />
	/// <reference path="../typings/classnames/classnames.d.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var classNames = __webpack_require__(/*! classnames */ 26);
	var Dispatcher_1 = __webpack_require__(/*! ../Dispatcher/Dispatcher */ 11);
	var ChannelActivationAction_1 = __webpack_require__(/*! ../Channels/ChannelActivationAction */ 18);
	var ChannelListItemProps = (function () {
	    function ChannelListItemProps() {
	    }
	    return ChannelListItemProps;
	})();
	var ChannelListItemState = (function () {
	    function ChannelListItemState() {
	    }
	    return ChannelListItemState;
	})();
	var ChannelListItem = (function (_super) {
	    __extends(ChannelListItem, _super);
	    function ChannelListItem(props) {
	        var _this = this;
	        _super.call(this, props);
	        this.channelClicked = function () {
	            Dispatcher_1.default.dispatch(new ChannelActivationAction_1.default(_this.channel));
	        };
	        this.channel = props.channel;
	    }
	    ChannelListItem.prototype.render = function () {
	        return (React.createElement("li", {"onClick": this.channelClicked, "className": classNames({ "p-active": this.props.active })}, this.channel.name));
	    };
	    ;
	    return ChannelListItem;
	})(React.Component);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ChannelListItem;


/***/ },
/* 26 */
/*!*******************************!*\
  !*** ./~/classnames/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 27 */
/*!*************************************!*\
  !*** ./app/ChatPanel/ChatPanel.tsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/react/react-global.d.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var $ = __webpack_require__(/*! jquery */ 4);
	var Dispatcher_1 = __webpack_require__(/*! ../Dispatcher/Dispatcher */ 11);
	var SendMessageAction_1 = __webpack_require__(/*! ../Channels/SendMessageAction */ 16);
	var ChannelStoreEvents_1 = __webpack_require__(/*! ../Channels/ChannelStoreEvents */ 21);
	var ChatPanelProps = (function () {
	    function ChatPanelProps() {
	    }
	    return ChatPanelProps;
	})();
	var ChatPanelState = (function () {
	    function ChatPanelState() {
	    }
	    return ChatPanelState;
	})();
	var ChatPanel = (function (_super) {
	    __extends(ChatPanel, _super);
	    function ChatPanel(props) {
	        var _this = this;
	        _super.call(this, props);
	        this.onChannelActivated = function (event) {
	            _this.getMessages(event.channel).then(function (messages) {
	                _this.chatId = _this.props.activeChannel.hubId + _this.props.activeChannel.id;
	                _this.setState({
	                    message: "",
	                    messages: messages
	                });
	                _this.scrollToBottom();
	            });
	        };
	        this.onMessageChanged = function (event) {
	            _this.setState({
	                message: event.target.value,
	                messages: _this.state.messages
	            });
	        };
	        this.onNewMessage = function (newMessage) {
	            if (newMessage.channelId === _this.props.activeChannel.id) {
	                _this.state.messages.push(newMessage);
	                _this.setState({
	                    messages: _this.state.messages,
	                    message: _this.state.message
	                });
	                _this.scrollToBottom();
	            }
	        };
	        this.sendMessage = function (event) {
	            event.preventDefault();
	            if (!_this.state.message) {
	                return;
	            }
	            Dispatcher_1.default.dispatch(new SendMessageAction_1.default(_this.props.activeChannel, _this.state.message));
	            _this.setState({
	                message: null,
	                messages: _this.state.messages
	            });
	        };
	        this.chatId = this.props.activeChannel.hubId + this.props.activeChannel.id;
	        this.state = {
	            message: null,
	            messages: []
	        };
	    }
	    ChatPanel.prototype.componentDidMount = function () {
	        var _this = this;
	        this.props.channelStore.addListener(ChannelStoreEvents_1.default.NEW_MESSAGE, this.onNewMessage);
	        this.props.channelStore.addListener(ChannelStoreEvents_1.default.CHANNEL_ACTIVATED, this.onChannelActivated);
	        this.getMessages(this.props.activeChannel)
	            .then(function (messages) {
	            _this.setState({
	                messages: messages,
	                message: null
	            });
	            _this.scrollToBottom();
	        });
	    };
	    ;
	    ChatPanel.prototype.render = function () {
	        var messages = [];
	        for (var i = 0; i < this.state.messages.length; i++) {
	            var message = this.state.messages[i];
	            messages.push(React.createElement("div", {"className": "p-chat-message"}, React.createElement("div", null, message.username), React.createElement("div", null, message.message)));
	        }
	        return (React.createElement("section", {"id": "p-chat-panel-container-" + this.chatId, "className": "p-chat-panel-container"}, React.createElement("header", null, this.props.activeChannel.name), React.createElement("div", {"id": "p-chat-panel-" + this.chatId, "className": "p-chat-panel"}, React.createElement("ul", null, messages)), React.createElement("form", {"onSubmit": this.sendMessage}, React.createElement("input", {"type": "text", "value": this.state.message, "onChange": this.onMessageChanged}), React.createElement("button", {"type": "submit"}, "Send"))));
	    };
	    ;
	    // private
	    ChatPanel.prototype.scrollToBottom = function () {
	        var element = $("#p-chat-panel-" + this.chatId)[0];
	        element.scrollTop = element.scrollHeight;
	    };
	    ;
	    ChatPanel.prototype.getMessages = function (channel) {
	        return this.props.channelStore.getMessagesForChannel(channel)
	            .then(function (messages) {
	            return messages;
	        });
	    };
	    ;
	    return ChatPanel;
	})(React.Component);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ChatPanel;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map