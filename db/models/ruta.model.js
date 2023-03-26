const { Model, Sequelize } = require('sequelize');

const RUTA_TABLE = 'rutas';
const USER_TABLE = 'users';
const RutaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER,
  },
  idUser: {
    allowNull: false,
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  descripcion: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  createdAt: {
    allowNull: false,
    type: Sequelize.DataTypes.DATEONLY,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Ruta extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'idUser' });
    this.hasMany(models.Cliente, {
      as: 'clientes',
      foreignKey: 'idRuta',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RUTA_TABLE,
      modelName: 'Ruta',
      timestamps: false,
    };
  }
}

module.exports = { Ruta, RutaSchema, RUTA_TABLE };
