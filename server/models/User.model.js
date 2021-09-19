module.exports = (sequelize, Sequelize) => {
    const UserModel = sequelize.define(
      'UserModel',
      {
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
      },
    );
  
    return UserModel;
  };