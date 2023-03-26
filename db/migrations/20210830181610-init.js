'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { GASTO_TABLE } = require('./../models/gasto.model');
const { RUTA_TABLE } = require('./../models/ruta.model');
const { CLIENTE_TABLE } = require('./../models/cliente.model');
const { PRESTAMO_TABLE } = require('./../models/prestamo.model');
const { PAGO_TABLE } = require('./../models/pago.model');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      recoveryToken: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
        field: 'recovery_token',
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'usuario',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(RUTA_TABLE, {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(GASTO_TABLE, {
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
      emitido: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY,
      },
      descripcion: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
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
    });
    await queryInterface.createTable(CLIENTE_TABLE, {
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
        unique: true,
        allowNull: false,
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
    });
    await queryInterface.createTable(PRESTAMO_TABLE, {
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
      mora: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      pagado: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      vencimiento: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY,
      },
      emitido: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(PAGO_TABLE, {
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
      emitido: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PAGO_TABLE);
    await queryInterface.dropTable(PRESTAMO_TABLE);
    await queryInterface.dropTable(CLIENTE_TABLE);
    await queryInterface.dropTable(RUTA_TABLE);
    await queryInterface.dropTable(GASTO_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  },
};
