const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    'User',
    {
      userNum: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      auth_kind: { type: DataTypes.STRING(40) },
      role: { type: DataTypes.INTEGER },
      email: { type: DataTypes.STRING(32) },
      password: { type: DataTypes.STRING(12) },
      nickName: { type: DataTypes.STRING(32) },
      genre: { type: DataTypes.STRING(32) },
      purpose: { type: DataTypes.STRING(32) },
      createAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
      loginAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
    },
    {
      timestamps: false,
      tableName: 'User'
    }
  );
  return User;
};
