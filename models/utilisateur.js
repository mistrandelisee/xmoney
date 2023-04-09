'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      utilisateur.belongsTo(models['zone'], { as: 'zone_residence',foreignKey: 'id_zone_residence' });
      utilisateur.hasMany(models['transaction'], { as:'trans_gerees'});
      utilisateur.hasMany(models['transfert'], { as:'transferts',foreignKey: 'id_proprietaire'});
      utilisateur.belongsToMany(models['transfert'], { through: 'authorisation' ,as: 'transferts_auth',foreignKey: 'id_approuveur',});
      utilisateur.belongsToMany(models['transaction'], { through: 'authorisation' ,as: 'transactions',foreignKey: 'id_approuveur',});
      utilisateur.belongsToMany(models['transaction'], { through: 'enrichisement',as: 'transactions_agt',foreignKey: 'id_agent', });
      utilisateur.belongsToMany(models['transfert'], { through: 'enrichisement',as: 'transfert_agt',foreignKey: 'id_agent', });
    }
  }
  utilisateur.init({
    id_utilisateur: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nom:  { type: DataTypes.TEXT, allowNull: false},
    prenom: DataTypes.TEXT,
    email:  { 
      type: DataTypes.TEXT, 
      allowNull: false,
      unique: true,
      validate: {  isEmail: true,  }
    },
    password: {
      type: DataTypes.STRING,
      
    },
    status:  { 
      type: DataTypes.STRING, 
      allowNull: false, defaultValue: 'NEW',
      validate: {  
        isIn: [['NEW','ACTIVE', 'BANNED', 'VERIFIED']]
      }
    },
    role:  { 
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {  
        isIn: [['ADMIN','CLIENT', 'AGENT', 'GESTIONNAIRE']]
      }
    },
    gender: { type: DataTypes.STRING, allowNull: false, defaultValue: 'X',
      validate: {  
        isIn: [['MALE','FEMALE', 'X']]
      } 
    },
    token: DataTypes.TEXT,
    is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    nom_complet: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.nom ? this.nom : ''} ${this.prenom ? this.prenom : ''}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    }
    
  }, {
    sequelize,
    modelName: 'utilisateur',
  });
  return utilisateur;
};