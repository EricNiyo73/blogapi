"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _index = _interopRequireDefault(require("./index.test"));

var _usersControllers = require("../controllers/users.controllers.js");

var _dotenv = _interopRequireDefault(require("dotenv"));

var http = _interopRequireWildcard(require("http"));

var supertest = _interopRequireWildcard(require("supertest"));

var Koa = _interopRequireWildcard(require("koa"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import request from 'supertest';
var apps = new Koa();

_dotenv["default"].config();

describe('findAll', function () {
  var testUsers;
  jest.setTimeout(30000);
  beforeAll(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            testUsers = new _User["default"]({
              username: 'John Doe',
              email: 'johndoe@example.com',
              password: 'password123'
            });
            _context.next = 4;
            return regeneratorRuntime.awrap(testUsers.save());

          case 4:
            _context.next = 8;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 6]]);
  });
  afterAll(function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_User["default"].deleteMany({}));

          case 3:
            _context2.next = 5;
            return regeneratorRuntime.awrap(_index["default"].close());

          case 5:
            _context2.next = 9;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
  it('should return all users', function _callee3() {
    var apptest, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            apptest = supertest(http.createServer(apps.callback()));
            _context3.next = 3;
            return regeneratorRuntime.awrap(apptest(_index["default"]).get('/api/users/getall'));

          case 3:
            res = _context3.sent;
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("data");

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it('should return an error message when there is an error', function _callee4() {
    var apptest, res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_mongoose["default"].connection.close());

          case 2:
            apptest = supertest(http.createServer(apps.callback()));
            _context4.next = 5;
            return regeneratorRuntime.awrap(apptest(_index["default"]).get('/api/users/getall'));

          case 5:
            res = _context4.sent;
            expect(res.status).toBe(500);
            expect(res.body.message).toBeDefined();

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
});