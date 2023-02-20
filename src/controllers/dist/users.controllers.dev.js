"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.findAll = exports.deletet = exports.update = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const router = require("express").Router();
var router = (0, _express["default"])();

// sign up
//UPDATE
var update = function update(req, res) {
  var salt, updatedUser;
  return regeneratorRuntime.async(function update$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.body.userId === req.params.id)) {
            _context.next = 20;
            break;
          }

          if (!req.body.password) {
            _context.next = 8;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

        case 4:
          salt = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(req.body.password, salt));

        case 7:
          req.body.password = _context.sent;

        case 8:
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(_User["default"].findByIdAndUpdate(req.params.id, {
            $set: req.body
          }, {
            "new": true
          }));

        case 11:
          updatedUser = _context.sent;
          return _context.abrupt("return", res.status(200).json(updatedUser));

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](8);
          res.status(500).json(_context.t0);

        case 18:
          _context.next = 21;
          break;

        case 20:
          return _context.abrupt("return", res.status(401).json("You can update  your account only!"));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 15]]);
}; //DELETE


exports.update = update;

var deletet = function deletet(req, res) {
  var user;
  return regeneratorRuntime.async(function deletet$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_User["default"].findById(req.params.id));

        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_User["default"].findByIdAndDelete(req.params.id));

        case 6:
          return _context2.abrupt("return", res.status(200).json("User has been deleted..."));

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(404).json("User not found!"));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; //GET USER
// export const findone = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, ...others } = user._doc;
//     return res.status(200).json(others);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };
// getall================================


exports.deletet = deletet;

var findAll = function findAll(req, res) {
  _User["default"].find().then(function (users) {
    return res.send(users);
  })["catch"](function (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving user."
    });
  });
};

exports.findAll = findAll;
var _default = router;
exports["default"] = _default;