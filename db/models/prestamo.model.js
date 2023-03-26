const { Model, Sequelize } = require('sequelize');

const PRESTAMO_TABLE = 'prestamos';
const USER_TABLE = 'users';
const CLIENTE_TABLE = 'clientes';
const PrestamoSchema = {
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
  idCliente: {
    allowNull: false,
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: CLIENTE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  monto: {
    type: Sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  saldo: {
    type: Sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  tasa: {
    type: Sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pagado: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  mora: {
    type: Sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  vencimiento: {
    allowNull: false,
    type: Sequelize.DataTypes.DATEONLY,
  },
  emitido: { allowNull: false, type: Sequelize.DataTypes.DATEONLY },
  createdAt: {
    allowNull: false,
    type: Sequelize.DataTypes.DATEONLY,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Prestamo extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'idUser' });
    this.belongsTo(models.Cliente, { foreignKey: 'idCliente' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRESTAMO_TABLE,
      modelName: 'Prestamo',
      timestamps: false,
    };
  }
}

module.exports = { Prestamo, PrestamoSchema, PRESTAMO_TABLE };
