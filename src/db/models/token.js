import { v4 as uuid } from "uuid";

export default (sequelize, DataTypes) => {
  const Token = sequelize.define("Token", {
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
      beforeCreate: (model) => {
        const id = uuid();
        model.id = id;
      }
    }
  });

  Token.findByActual = (actual) => Token.findOne({
    where: { actual }
  });

  return Token;
};
