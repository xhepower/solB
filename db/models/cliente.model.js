const { Model, Sequelize } = require('sequelize');

const CLIENTE_TABLE = 'clientes';
const USER_TABLE = 'users';
const RUTA_TABLE = 'rutas';
const ClienteSchema = {
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
  idRuta: {
    allowNull: false,
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: RUTA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  nombre: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  identidad: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  direccion: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DataTypes.DATEONLY,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Cliente extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'idUser' });
    this.belongsTo(models.Ruta, { foreignKey: 'idRuta' });
    this.hasMany(models.Prestamo, {
      as: 'prestamos',
      foreignKey: 'idCliente',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENTE_TABLE,
      modelName: 'Cliente',
      timestamps: false,
    };
  }
}

module.exports = { Cliente, ClienteSchema, CLIENTE_TABLE };
