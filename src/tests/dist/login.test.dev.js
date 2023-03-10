"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("./app.js"));

var _user = _interopRequireDefault(require("../models/user"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].set("strictQuery", false);

describe('POST /api/auth/signup', function () {
  var user;
  var hashedPassword;
  var server;
  jest.setTimeout(30000);
  beforeAll(function _callee() {
    var salt;
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
            _context.next = 5;
            return regeneratorRuntime.awrap(_user["default"].deleteMany());

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

          case 7:
            salt = _context.sent;
            _context.next = 10;
            return regeneratorRuntime.awrap(_bcrypt["default"].hash('testpassword', salt));

          case 10:
            hashedPassword = _context.sent;
            user = new _user["default"]({
              username: 'testuser',
              email: 'testuser@example.com',
              password: hashedPassword
            });
            _context.next = 14;
            return regeneratorRuntime.awrap(user.save());

          case 14:
            _context.next = 18;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 16]]);
  });
  afterAll(function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_user["default"].deleteMany());

          case 3:
            _context2.next = 5;
            return regeneratorRuntime.awrap(_mongoose["default"].connection.close());

          case 5:
            _context2.next = 7;
            return regeneratorRuntime.awrap(server.close());

          case 7:
            _context2.next = 11;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  });
  test('should login user with correct credentials', function _callee3() {
    var response, decodedToken;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post('/api/auth/login').send({
              username: 'testuser',
              password: 'testpassword'
            }));

          case 3:
            response = _context3.sent;
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Logged in successfully');
            expect(response.body).toHaveProperty('token');
            decodedToken = _jsonwebtoken["default"].verify(response.body.token, process.env.JWT_SECRET);
            expect(decodedToken).toHaveProperty('id', user.id);
            done();
            _context3.next = 14;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 12]]);
  });
  test('should not login user with incorrect credentials', function _callee4() {
    var response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post('/api/auth/login').send({
              username: 'testuser',
              password: 'wrongpassword'
            }));

          case 3:
            response = _context4.sent;
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Wrong credentials!');
            _context4.next = 10;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
  test('should return 500 when an error occurs', function _callee5() {
    var response, response2;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post('/api/auth/login').send({
              username: 'testuser',
              password: 'testpassword'
            }));

          case 3:
            response = _context5.sent;
            _context5.next = 6;
            return regeneratorRuntime.awrap(_user["default"].deleteMany());

          case 6:
            _context5.next = 8;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post('/api/auth/login').send({
              username: 'testuser',
              password: 'testpassword'
            }));

          case 8:
            response2 = _context5.sent;
            expect(response2.status).toBe(500);
            _context5.next = 14;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 12]]);
  });
});