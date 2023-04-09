'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transfert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transfert.belongsTo(models['utilisateur'], { as: 'propietaire',foreignKey: 'id_proprietaire' });
      transfert.belongsTo(models['zone'], { as: 'zone_depart',foreignKey: 'id_zone_depart' });
      transfert.belongsTo(models['zone'], { as: 'zone_destination',foreignKey: 'id_zone_destination' });
      transfert.belongsToMany(models['transaction'], { through: 'authorisation' ,as: 'transactions',foreignKey: 'id_transfert',});
      transfert.belongsToMany(models['utilisateur'], { through: 'authorisation' ,as: 'user_auth',foreignKey: 'id_transfert',});
      transfert.belongsToMany(models['transaction'], { through: 'enrichisement',as: 'transactions_agt',foreignKey: 'id_transfert', });
      transfert.belongsToMany(models['utilisateur'], { through: 'enrichisement',as: 'user_agt',foreignKey: 'id_transfert', });
    }
  }
  transfert.init({
    
    id_transfert: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    
    code_transfert:  { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status:  { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {  
        isIn: [['New','Active', 'Banned', 'Verified']]
      }
    },
    is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  }, {
    sequelize,
    modelName: 'transfert',
  });
  return transfert;
};