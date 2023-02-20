"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _index = _interopRequireDefault(require("./index.test"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _User = _interopRequireDefault(require("../models/User"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _expect = _interopRequireDefault(require("expect"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('POST /api/posts/create', function () {
  var token;
  var user;
  var server;
  jest.setTimeout(30000);
  beforeAll(function _callee() {
    var response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            server = _index["default"].listen(3000); // Login user and get JWT token for authentication

            user = new _User["default"]({
              username: "testuser",
              email: "testuser@example.com",
              password: "password"
            });
            _context.next = 5;
            return regeneratorRuntime.awrap(user.save());

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_index["default"]).post('/api/auth/login').send({
              email: user.email,
              password: "password"
            }));

          case 7:
            response = _context.sent;
            token = response.body.token;
            _context.next = 13;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 11]]);
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
            return regeneratorRuntime.awrap(_Post["default"].deleteMany());

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
  test('should create a new post', function _callee3() {
    var response, post;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_index["default"]).post('/api/posts/create').set('Authorization', "Bearer ".concat(token)).field('title', 'Test Post').field('desc', 'This is a test post').field('username', 'testuser').field('categories', 'test,post').attach('photo', _fs["default"].readFileSync(_path["default"].join(__dirname, "blogImg.jpg")), "blogImg.jpg"));

          case 3:
            response = _context3.sent;
            (0, _expect["default"])(response.status).toBe(200);
            (0, _expect["default"])(response.body).toHaveProperty('status', 'your post was successfully uploaded'); // Verify post was created in database

            _context3.next = 8;
            return regeneratorRuntime.awrap(_Post["default"].findOne({
              title: 'Test Post'
            }));

          case 8:
            post = _context3.sent;
            (0, _expect["default"])(post).toBeDefined();
            (0, _expect["default"])(post.desc).toBe('This is a test post');
            (0, _expect["default"])(post.username).toBe('testuser');
            (0, _expect["default"])(post.categories).toEqual(_expect["default"].arrayContaining(['test', 'post']));
            (0, _expect["default"])(post.photo).toBe('blogImg.jpg');
            _context3.next = 18;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](0);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 16]]);
  });
  test('should return an error if file type is not supported', function _callee4() {
    var response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_index["default"]).post('/api/posts/create').set('Authorization', "Bearer ".concat(token)).field('title', 'Test Post').field('desc', 'This is a test post').field('username', 'testuser').field('categories', 'test,post').attach('photo', _fs["default"].readFileSync(_path["default"].join(__dirname, "blogImg.jpg")), "blogImg.jpg"));

          case 3:
            response = _context4.sent;
            (0, _expect["default"])(response.status).toBe(400);
            (0, _expect["default"])(response.body).toHaveProperty('message', 'File type is not supported');
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
  test('should return an error if user is not authenticated', function _callee5() {
    var response;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_index["default"]).post('/api/posts/create').field('title', 'Test Post').field('desc', 'This is a test post').field('username', 'testuser').field('categories', 'test,post').attach('photo', _fs["default"].readFileSync(_path["default"].join(__dirname, "blogImg.jpg")), "blogImg.jpg"));

          case 3:
            response = _context5.sent;
            (0, _expect["default"])(response.status).toBe(401);
            (0, _expect["default"])(response.body).toHaveProperty('message', 'Authentication failed');
            _context5.next = 10;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
});