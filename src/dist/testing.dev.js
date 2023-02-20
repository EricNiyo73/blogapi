"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _expect = _interopRequireDefault(require("expect"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _index = _interopRequireDefault(require("./index.test"));

var _blog = _interopRequireDefault(require("../src/models/blog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe("", function () {
  var token;
  before(function _callee() {
    var response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_chai["default"].request(_index["default"]).post("/api/login").send({
              username: "test",
              password: "password"
            }));

          case 2:
            response = _context.sent;
            token = response.body.data;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  it("It Should return 409 Blog title and content already exist", function _callee2() {
    var blogData, res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            blogData = {
              blogTitle: "Test t blog",
              blogContent: "Test t blog content",
              blogImage: "image.jpg"
            };
            _context2.next = 3;
            return regeneratorRuntime.awrap(_chai["default"].request(_index["default"]).post("/api/blog").set("Authorization", token).attach("blogImage", _fs["default"].readFileSync(_path["default"].join(__dirname, "blog5.jpg")), "blog5.jpg").field("blogTitle", blogData.blogTitle).field("blogContent", blogData.blogContent));

          case 3:
            res = _context2.sent;
            res.should.have.status(409);
            res.body.should.have.property("status").eql("fail");
            res.body.should.have.property("message");

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
});
describe("POST a blog", function () {
  var token;
  before(function _callee3() {
    var response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_chai["default"].request(_index["default"]).post("/api/login").send({
              username: "test",
              password: "password"
            }));

          case 2:
            response = _context3.sent;
            token = response.body.data;

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  beforeEach(function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_blog["default"].deleteMany({}));

          case 3:
            _context4.next = 7;
            break;

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 5]]);
  });
  it("should create a new blog", function _callee5() {
    var blogData, res;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            blogData = {
              blogTitle: "Test t blog",
              blogContent: "Test t blog content",
              blogImage: "image.jpg"
            };
            _context5.next = 3;
            return regeneratorRuntime.awrap(_chai["default"].request(_index["default"]).post("/api/blog").set("Authorization", token).attach("blogImage", _fs["default"].readFileSync(_path["default"].join(__dirname, "blog5.jpg")), "blog5.jpg").field("blogTitle", blogData.blogTitle).field("blogContent", blogData.blogContent));

          case 3:
            res = _context5.sent;
            res.should.have.status(201);
            res.body.should.have.property("status").eql("success");
            res.body.should.have.property("data");
            res.body.data.should.have.property("blogTitle").eql(blogData.blogTitle);
            res.body.data.should.have.property("blogContent").eql(blogData.blogContent);
            res.body.data.should.have.property("blogImage");

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
});
describe("Get single blog", function () {
  var blog;
  var token;
  before(function _callee6() {
    var response;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(_chai["default"].request(_index["default"]).post("/api/login").send({
              username: "test",
              password: "password"
            }));

          case 2:
            response = _context6.sent;
            token = response.body.data;

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
  it("it should GET a blog by the given id", function (done) {
    blog = new _blog["default"]({
      blogTitle: "Test Blog",
      blogContent: "Test Content"
    });
    blog.save(function (error, blog) {
      _chai["default"].request(_index["default"]).get("/api/blog/".concat(blog._id)).set("Authorization", token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("_id").eql(blog._id.toString());
        res.body.data.should.have.property("blogTitle").eql("Test Blog");
        res.body.data.should.have.property("blogContent").eql("Test Content");
        done();
      });
    });
  });
  it("it should return 404 if blog not found", function (done) {
    blog = new _blog["default"]({
      blogTitle: "Test Blog not found",
      blogContent: "Test Content not found"
    });

    _chai["default"].request(_index["default"]).get("/api/blog/".concat(blog._id)).set("Authorization", token).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a("object");
      res.body.should.have.property("status").eql("fail");
      res.body.should.have.property("message");
      done();
    });
  });
});
describe("Delete single blog", function () {
  var blog;
  var token;
  before(function _callee7() {
    var response;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(_chai["default"].request(_index["default"]).post("/api/login").send({
              username: "test",
              password: "password"
            }));

          case 2:
            response = _context7.sent;
            token = response.body.data;

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
  it("it should delete a blog by the given id", function (done) {
    blog = new _blog["default"]({
      blogTitle: "Test Blog",
      blogContent: "Test Content"
    });
    blog.save(function (error, blog) {
      _chai["default"].request(_index["default"])["delete"]("/api/blog/".concat(blog._id)).set("Authorization", token).end(function (err, res) {
        res.should.have.status(204);
        res.body.should.be.empty;
        done();
      });
    });
  });
  it("it should return 404 if blog not found", function (done) {
    _chai["default"].request(_index["default"])["delete"]("/api/blog/".concat(blog._id)).set("Authorization", token).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property("message").eql("blog not found");
      done();
    });
  });
  it("it should return 404 if endpoint not found", function (done) {
    _chai["default"].request(_index["default"])["delete"]("/api/blog/invalidId").set("Authorization", token).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a("object");
      res.body.should.have.property("status").eql("fail");
      res.body.should.have.property("message").eql("endpoint not found");
      done();
    });
  });
});
describe("GET all blog", function () {
  it("should GET all blog", function (done) {
    _chai["default"].request(_index["default"]).get("/api/blog").end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property("status");
      res.body.should.have.property("data");
      done();
    });
  });
});
describe("It should update blog", function () {
  var token;
  before(function _callee8() {
    var response;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return regeneratorRuntime.awrap(_chai["default"].request(_index["default"]).post("/api/login").send({
              username: "test",
              password: "password"
            }));

          case 2:
            response = _context8.sent;
            token = response.body.data;

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    });
  });
  it("should return 409", function _callee9() {
    var blogDataToUpdate, updatedBlog, res;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            blogDataToUpdate = new _blog["default"]({
              blogTitle: "Test t blog",
              blogContent: "Test t blog content",
              blogImage: "image.jpg"
            });
            updatedBlog = {
              blogTitle: "Test t blog",
              blogContent: "Test t blog content",
              blogImage: "image.jpg"
            };
            _context9.next = 4;
            return regeneratorRuntime.awrap(_chai["default"].request(_index["default"]).patch("/api/blog/".concat(blogDataToUpdate._id)).set("Authorization", token).attach("blogImage", _fs["default"].readFileSync(_path["default"].join(__dirname, "blog5.jpg")), "blog5.jpg").field("blogTitle", updatedBlog.blogTitle).field("blogContent", updatedBlog.blogContent));

          case 4:
            res = _context9.sent;
            res.should.have.status(409);
            res.body.should.have.property("status").eql("fail");
            res.body.should.have.property("message");

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
  it("should update the existting blog", function _callee10() {
    var blogDataToUpdate, updatedBlog, res;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            blogDataToUpdate = new _blog["default"]({
              blogTitle: "Test t blog",
              blogContent: "Test t blog content",
              blogImage: "image.jpg"
            });
            updatedBlog = {
              blogTitle: "Test update blog",
              blogContent: "Test update blog content",
              blogImage: "image.jpg"
            };
            _context10.next = 4;
            return regeneratorRuntime.awrap(_chai["default"].request(_index["default"]).patch("/api/blog/".concat(blogDataToUpdate._id)).set("Authorization", token).attach("blogImage", _fs["default"].readFileSync(_path["default"].join(__dirname, "blog5.jpg")), "blog5.jpg").field("blogTitle", updatedBlog.blogTitle).field("blogContent", updatedBlog.blogContent));

          case 4:
            res = _context10.sent;
            res.should.have.status(200);
            res.body.should.have.property("status").eql("success");
            res.body.should.have.property("message");

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    });
  });
});