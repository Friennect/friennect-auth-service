"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = require("uuid");

var _default = function _default(sequelize, DataTypes) {
  var Token = sequelize.define("Token", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    actual: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: function beforeCreate(model) {
        var id = (0, _uuid.v4)();
        model.id = id;
      }
    }
  });

  Token.findByActual = function (actual) {
    return Token.findOne({
      where: {
        actual: actual
      }
    });
  };

  return Token;
};

exports["default"] = _default;