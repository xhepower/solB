const { Model, Sequelize } = require('sequelize');

const PAGO_TABLE = 'pagos';
const USER_TABLE = 'users';
const PRESTAMO_TABLE = 'clientes';
const PagoSchema = {
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
  idPrestamo: {
    allowNull: false,
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: PRESTAMO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  monto: {
    type: Sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  emitido: { allowNull: false, type: Sequelize.DataTypes.DATEONLY },
  createdAt: {
    allowNull: false,
    type: Sequelize.DataTypes.DATEONLY,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Pago extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'idUser' });
    this.belongsTo(models.Prestamo, { foreignKey: 'idPrestamo' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAGO_TABLE,
      modelName: 'Pago',
      timestamps: false,
    };
  }
}

module.exports = { Pago, PagoSchema, PAGO_TABLE };
