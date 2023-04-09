'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class zone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      zone.hasMany(models['utilisateur'], { as:'residents',foreignKey: 'id_zone_residence'});
      zone.hasMany(models['transfert'], { as:'provenance',foreignKey: 'id_zone_depart'});
      zone.hasMany(models['transfert'], { as:'destinations',foreignKey: 'id_zone_destination'});
    }
  }
  zone.init({
    id_zone: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Nom: DataTypes.STRING,
    Devise_etiquette: DataTypes.STRING,
    Devise_code: { type: DataTypes.STRING, allowNull: false },
    is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  }, {
    sequelize,
    modelName: 'zone',
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: false,

    // I don't want createdAt
    updatedAt: false,
  });
  return zone;
};