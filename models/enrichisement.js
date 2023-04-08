'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class enrichisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  enrichisement.init({
    id_agent: {
      type: DataTypes.INTEGER,
      references: {
        model: 'utilisateur', // Can be both a string representing the table name or a Sequelize model
        key: 'id_utilisateur'
      },
      set(value) {
        this.setDataValue('id_agent', value);
      }
    },
    id_transfert: {
      type: DataTypes.INTEGER,
      references: {
        model: 'transfert', // Can be both a string representing the table name or a Sequelize model
        key: 'id_transfert'
      },
      set(value) {
        this.setDataValue('id_transfert', value);
      }
    },
    id_transaction: {
      type: DataTypes.INTEGER,
      references: {
        model: 'transaction', // Can be both a string representing the table name or a Sequelize model
        key: 'id_transaction'
      },
      set(value) {
        this.setDataValue('id_transaction', value);
      }
    },
    status:  { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {  
        isIn: [['En cours','Terminee Ok','Terminee Ko']]
      }
    },
    note:  { 
      type: DataTypes.TEXT, 
    },
    vu: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  }, {
    sequelize,
    modelName: 'enrichisement',
  });
  return enrichisement;
};