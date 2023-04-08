'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authorisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  authorisation.init({
    id_approuveur: {
      type: DataTypes.INTEGER,
      references: {
        model: 'utilisateur', // Can be both a string representing the table name or a Sequelize model
        key: 'id_utilisateur'
      },
      set(value) {
        this.setDataValue('id_approuveur', value);
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
        isIn: [['Approvee','Rejet']]
      }
    },
    mode_matching:  { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {  
        isIn: [['Auto','Manuel']]
      }
    },
    montant_calcule:  { 
      type: DataTypes.DOUBLE, 
      allowNull: false,
      validate: {  
        min: 1, 
      }
    },
    frais:  { 
      type: DataTypes.DOUBLE, 
      allowNull: false,
      validate: {  
        min: 1, 
      }
    },
    note:  { 
      type: DataTypes.TEXT, 
    },
    vu: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },



  }, {
    sequelize,
    modelName: 'authorisation',
  });
  return authorisation;
};