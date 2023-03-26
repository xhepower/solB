const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    allowNull: true,
    type: Sequelize.DataTypes.STRING,
    field: 'recovery_token',
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'usuario',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Ruta, {
      as: 'rutas',
      foreignKey: 'idUser',
    });
    this.hasMany(models.Gasto, {
      as: 'gastos',
      foreignKey: 'idUser',
    });
    this.hasMany(models.Cliente, {
      as: 'clientes',
      foreignKey: 'idUser',
    });
  }
  /*Team.hasMany(Player, {
    foreignKey: 'clubId'
  });*/
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
