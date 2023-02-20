"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _app = _interopRequireDefault(require("./app.js"));

var _usersControllers = require("../controllers/users.controllers.js");

var _supertest = _interopRequireDefault(require("supertest"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import * as http from 'http';
// // import * as supertest from 'supertest';
// import * as Koa from 'koa';
// const apps = new Koa();
_dotenv["default"].config();

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].set("strictQuery", false);

describe('findAll', function () {
  var testUsers;
  var server;
  jest.setTimeout(30000);
  beforeAll(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            _mongoose["default"].connect(process.env.MONGO_TEST, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true,
              useFindAndModify: true
            });

            server = _app["default"].listen(3000);
            testUsers = new _User["default"]({
              username: 'John Doe',
              email: 'johndoe@example.com',
              password: 'password123'
            });
            _context.next = 6;
            return regeneratorRuntime.awrap(testUsers.save());

          case 6:
            _context.next = 10;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
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
            return regeneratorRuntime.awrap(_app["default"].close());

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
    var res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).get('/api/users/getall'));

          case 2:
            res = _context3.sent;
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("data");

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it('should return an error message when there is an error', function _callee4() {
    var res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_mongoose["default"].connection.close());

          case 2:
            _context4.next = 4;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).get('/api/users/getall'));

          case 4:
            res = _context4.sent;
            expect(res.status).toBe(500);
            expect(res.body.message).toBeDefined();

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
});