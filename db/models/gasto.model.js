const { Model, Sequelize } = require('sequelize');

const GASTO_TABLE = 'gastos';
const USER_TABLE = 'users';
const GastoSchema = {
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
    allowNull: false,
  },
  emitido: {
    allowNull: false,
    type: Sequelize.DataTypes.DATEONLY,
  },
  monto: {
    type: Sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DataTypes.DATEONLY,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Gasto extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'idUser',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GASTO_TABLE,
      modelName: 'Gasto',
      timestamps: false,
    };
  }
}

module.exports = { Gasto, GastoSchema, GASTO_TABLE };
