import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
      beforeCreate: (model) => {
        model.id = uuid();
      },
      beforeSave: (model) => {
        const salt = bcrypt.genSaltSync(17);
        model.password = bcrypt.hashSync(model.password, salt);
      }
    }
  });

  User.findByEmail = (email) => User.findOne({
    where: {
      email
    }
  });

  return User;
};
