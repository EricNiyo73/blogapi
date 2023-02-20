"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.findAll = exports.findOne = exports.deletep = exports.updatep = exports.create = exports.upload = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _Post = _interopRequireDefault(require("../models/Post.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _cloudinary = require("cloudinary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import router from "express".Router();
var router = (0, _express["default"])();
var app = (0, _express["default"])();
router.use("/images", _express["default"]["static"](_path["default"].join(process.cwd(), "/images")));
router.use(_bodyParser["default"].urlencoded({
  extended: true
}));
router.use(_bodyParser["default"].json()); //CREATE POST
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, "eric.jpg");
//   },
// });
// const upload = multer({ storage: storage });
// =============================

_cloudinary.v2.config({
  cloud_name: "dmdogre0f",
  api_key: "295662518861996",
  api_secret: "H35LhOiKccJExJLZJIJoI_o-25E"
});

var upload = (0, _multer["default"])({
  storage: _multer["default"].diskStorage({}),
  fileFilter: function fileFilter(req, file, cb) {
    try {
      var ext = _path["default"].extname(file.originalname);

      if (ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        return cb(new Error("File type is not supported"), false);
      }

      cb(null, true);
    } catch (error) {
      return cb(error, false);
    }
  }
});
exports.upload = upload;

var create = function create(req, res) {
  var result, newPost, savePost;
  return regeneratorRuntime.async(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_cloudinary.v2.uploader.upload(req.file.path));

        case 3:
          result = _context.sent;
          // console.log(req.body,req.file);
          newPost = new _Post["default"]({
            photo: result.secure_url,
            title: req.body.title,
            desc: req.body.desc,
            username: req.body.username,
            categories: req.body.categories
          });
          _context.next = 7;
          return regeneratorRuntime.awrap(newPost.save());

        case 7:
          savePost = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            savePost: savePost,
            status: "your post was successfully uploaded"
          }));

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json(_context.t0));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; //UPDATE POST


exports.create = create;

var updatep = function updatep(req, res) {
  var postId, result, updatedPost;
  return regeneratorRuntime.async(function updatep$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          postId = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_cloudinary.v2.uploader.upload(req.file.path));

        case 4:
          result = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(_Post["default"].findByIdAndUpdate({
            _id: postId
          }, {
            photo: result.secure_url,
            title: req.body.title,
            desc: req.body.desc,
            categories: req.body.categories
          }, {
            "new": true
          }));

        case 7:
          updatedPost = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            updatedPost: updatedPost,
            status: "your post was successfully updated"
          }));

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json(_context2.t0));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; //DELETE POST


exports.updatep = updatep;

var deletep = function deletep(req, res) {
  var post;
  return regeneratorRuntime.async(function deletep$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Post["default"].findById(req.params.id));

        case 3:
          post = _context3.sent;
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(post["delete"]());

        case 7:
          return _context3.abrupt("return", res.status(200).json("Post has been deleted..."));

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](4);
          return _context3.abrupt("return", res.status(500).json(_context3.t0));

        case 13:
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t1 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json(_context3.t1));

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15], [4, 10]]);
}; //GET POST


exports.deletep = deletep;

var findOne = function findOne(req, res) {
  var post;
  return regeneratorRuntime.async(function findOne$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Post["default"].findById(req.params.id));

        case 3:
          post = _context4.sent;
          return _context4.abrupt("return", res.status(200).json(post));

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json(_context4.t0));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //GET ALL POSTS


exports.findOne = findOne;

var findAll = function findAll(req, res) {
  var username, catName, posts;
  return regeneratorRuntime.async(function findAll$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          username = req.query.user;
          catName = req.query.cat;
          _context5.prev = 2;

          if (!username) {
            _context5.next = 9;
            break;
          }

          _context5.next = 6;
          return regeneratorRuntime.awrap(_Post["default"].find({
            username: username
          }));

        case 6:
          posts = _context5.sent;
          _context5.next = 18;
          break;

        case 9:
          if (!catName) {
            _context5.next = 15;
            break;
          }

          _context5.next = 12;
          return regeneratorRuntime.awrap(_Post["default"].find({
            categories: {
              $in: [catName]
            }
          }));

        case 12:
          posts = _context5.sent;
          _context5.next = 18;
          break;

        case 15:
          _context5.next = 17;
          return regeneratorRuntime.awrap(_Post["default"].find());

        case 17:
          posts = _context5.sent;

        case 18:
          return _context5.abrupt("return", res.status(200).json({
            data: posts
          }));

        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](2);
          return _context5.abrupt("return", res.status(500).json(_context5.t0));

        case 24:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 21]]);
};

exports.findAll = findAll;
var _default = router;
exports["default"] = _default;