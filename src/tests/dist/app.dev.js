"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _auth = _interopRequireDefault(require("../routes/auth.js"));

var _users = _interopRequireDefault(require("../routes/users.js"));

var _posts = _interopRequireDefault(require("../routes/posts.js"));

var _categories = _interopRequireDefault(require("../routes/categories.js"));

var _commentCo = _interopRequireDefault(require("../routes/commentCo.js"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // import app from express();

_dotenv["default"].config();

app.use(_express["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use("/api/comment", _commentCo["default"]);
app.use("/api/auth", _auth["default"]);
app.use("/api/users", _users["default"]);
app.use("/api/posts", _posts["default"]);
var _default = app;
exports["default"] = _default;