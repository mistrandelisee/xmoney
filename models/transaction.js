'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models['utilisateur'], { as: 'gestionnaire',foreignKey: 'id_gestionnaire' });
      transaction.belongsToMany(models['transfert'], { through: 'authorisation' ,as: 'transferts_auth',foreignKey: 'id_transaction',});
      transaction.belongsToMany(models['utilisateur'], { through: 'authorisation' ,as: 'user_auth',foreignKey: 'id_transaction',});
      transaction.belongsToMany(models['utilisateur'], { through: 'enrichisement',as: 'user_agt',foreignKey: 'id_transaction', });
      transaction.belongsToMany(models['transfert'], { through: 'enrichisement',as: 'transfert_agt',foreignKey: 'id_transaction', });
    }
  }
  transaction.init({
    id_transaction: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    code_transaction:  { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status:  { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {  
        isIn: [['New','Approuvee','Rejet', 'Fermee Ok', 'fermee Ko', 'Annulee']]
      }
    },
    note:  { 
      type: DataTypes.TEXT, 
    },
    vu: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};