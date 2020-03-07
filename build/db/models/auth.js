"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Enter a valid email."
        },
        notEmpty: {
          msg: "Email address is required."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required."
        }
      }
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: function beforeCreate(model) {
        model.id = (0, _uuid.v4)();
      },
      beforeSave: function beforeSave(model) {
        var salt = _bcryptjs["default"].genSaltSync(17);

        model.password = _bcryptjs["default"].hashSync(model.password, salt);
      }
    }
  });

  User.findByEmail = function (email) {
    return User.findOne({
      where: {
        email: email
      }
    });
  };

  return User;
};

exports["default"] = _default;