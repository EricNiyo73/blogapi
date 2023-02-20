"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import app from express();
_dotenv["default"].config();

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].set("strictQuery", false);

_mongoose["default"].connect(process.env.MONGO_TEST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
}).then(function () {
  console.log("Successfully connected to the database");
})["catch"](function (err) {
  console.log('something went wrong', err); // process.exit();
});

_app["default"].listen(process.env.PORT_TEST, function () {
  console.log("Server is listening on port 4003");
});

var _default = _app["default"];
exports["default"] = _default;