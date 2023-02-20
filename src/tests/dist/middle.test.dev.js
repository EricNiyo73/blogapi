"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var _mustHveAccount = _interopRequireDefault(require("../middlewires/mustHveAccount"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _app = _interopRequireDefault(require("./app"));

var _supertest = _interopRequireDefault(require("supertest"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].set("strictQuery", false); // Define mock user data for testing


describe('authMiddleware', function () {
  var req, res, next;
  var server;
  beforeAll(function () {
    try {
      _mongoose["default"].connect(process.env.MONGO_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
      });

      server = _app["default"].listen(3000);
    } catch (err) {}
  });
  afterAll(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_User["default"].deleteMany({}));

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
  jest.setTimeout(30000);
  beforeEach(function () {
    // Reset the request, response, and next functions before each test
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });
  it('should call next() if a valid token is provided', function _callee2() {
    var user, _res, token;

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
            _res = _context2.sent;
            token = _jsonwebtoken["default"].sign({
              id: user._id
            }, process.env.JWT_SECRET);
            req.headers.authorization = "".concat(token);
            _User["default"].findById = jest.fn().mockResolvedValue(user);
            _context2.next = 10;
            return regeneratorRuntime.awrap((0, _mustHveAccount["default"])(req, _res, next));

          case 10:
            expect(next).toHaveBeenCalled();
            _context2.next = 15;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 13]]);
  });
  it('should return a 401 status if no token is provided', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap((0, _mustHveAccount["default"])(req, res, next));

          case 2:
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
              message: 'please! create an account'
            });
            expect(next).not.toHaveBeenCalled();

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it('should return a 401 status if an invalid token is provided', function _callee4() {
    var token;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            token = 'invalidtoken';
            req.headers.authorization = "Bearer ".concat(token);
            _context4.next = 4;
            return regeneratorRuntime.awrap((0, _mustHveAccount["default"])(req, res, next));

          case 4:
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
              message: 'Unauthorized,please Login'
            });
            expect(next).not.toHaveBeenCalled();

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
});