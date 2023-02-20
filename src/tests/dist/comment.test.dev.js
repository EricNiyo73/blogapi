"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("./app.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _User = _interopRequireDefault(require("../models/User"));

var _fs = _interopRequireDefault(require("fs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].set("strictQuery", false);

describe('POST /blogs/:blogId/comments', function () {
  var authToken;
  var blog;
  var server;
  jest.setTimeout(30000);
  beforeAll(function _callee() {
    var user;
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

            server = _app["default"].listen(3001); // Create a user and get an auth token

            user = new _User["default"]({
              username: 'testuser',
              email: 'testuser@test.com',
              password: 'testpassword'
            });
            _context.next = 6;
            return regeneratorRuntime.awrap(user.save());

          case 6:
            authToken = _jsonwebtoken["default"].sign({
              id: user._id
            }, process.env.JWT_SECRET); // Create a blog to be used in the test

            blog = new _Post["default"]({
              title: 'Test Blog',
              desc: 'Lorem ipsum dolor sit amet',
              username: "testuser",
              photo: "blogImg.jpg"
            });
            _context.next = 10;
            return regeneratorRuntime.awrap(blog.save());

          case 10:
            _context.next = 14;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 12]]);
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
            return regeneratorRuntime.awrap(_Post["default"].deleteMany({}));

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
  it('should return 401 if no auth token is provided', function _callee3() {
    var response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post("/api/comment/blogs/".concat(blog._id, "/comments")).send({
              text: 'Test comment',
              author: 'Test author'
            }));

          case 3:
            response = _context3.sent;
            expect(response.status).toBe(401);
            _context3.next = 9;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
  it('should return 404 if blog is not found', function _callee4() {
    var response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post('/api/comment/blogs/123456789/comments').set('Authorization', "Bearer ".concat(authToken)).send({
              text: 'Test comment',
              author: 'Test author'
            }));

          case 3:
            response = _context4.sent;
            expect(response.status).toBe(404);
            _context4.next = 9;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
  it('should add a comment to the blog and return it', function _callee5() {
    var response;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap((0, _supertest["default"])(_app["default"]).post("/api/comment/blogs/".concat(blog._id, "/comments")).set('Authorization', "Bearer ".concat(authToken)).send({
              text: 'Test comment',
              author: 'Test author'
            }));

          case 3:
            response = _context5.sent;
            expect(response.status).toBe(201);
            expect(response.body.comments.length).toBe(1);
            expect(response.body.comments[0].text).toBe('Test comment');
            expect(response.body.comments[0].author).toBe('Test author');
            _context5.next = 12;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
});