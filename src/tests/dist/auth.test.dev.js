"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("./app.js"));

var _user = _interopRequireDefault(require("../models/user"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// assuming this is the express app instance
_dotenv["default"].config();

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].set("strictQuery", false);

describe('POST /api/auth/signup', function () {
  var server;
  jest.setTimeout(30000);
  beforeAll(function () {
    _mongoose["default"].connect(process.env.MONGO_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    });

    server = _app["default"].listen(3000); // start server
  });
  afterAll(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_user["default"].deleteMany({}));

          case 3:
            server.close();
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
  test('should create a new user', function _callee2() {
    var user, res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            user = {
              username: 'testuser',
              email: 'testuser@example.com',
              password: 'testpassword'
            };
            _context2.next = 4;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post('/api/auth/signup').send(user));

          case 4:
            res = _context2.sent;
            expect(res.status).toBe(201);
            expect(res.body.data.user.username).toBe(user.username);
            expect(res.body.data.user.email).toBe(user.email);
            expect(res.body.data.user.password).toBe(user.password);
            _context2.next = 13;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 11]]);
  });
  test('should return 400 when username is missing', function _callee3() {
    var user, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            user = {
              email: 'testuser@example.com',
              password: 'testpassword'
            };
            _context3.next = 4;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post('/api/auth/signup').send(user));

          case 4:
            res = _context3.sent;
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Username is required');
            _context3.next = 11;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 9]]);
  });
  test('should return 400 when email is missing', function _callee4() {
    var user, res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            user = {
              username: 'testuser',
              password: 'testpassword'
            };
            _context4.next = 4;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post('/api/auth/signup').send(user));

          case 4:
            res = _context4.sent;
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Email is required');
            _context4.next = 11;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 9]]);
  });
  test('should return 400 when password is missing', function _callee5() {
    var user, res;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            user = {
              username: 'testuser',
              email: 'testuser@example.com'
            };
            _context5.next = 4;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post('/api/auth/signup').send(user));

          case 4:
            res = _context5.sent;
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Password is required');
            _context5.next = 11;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 9]]);
  });
});