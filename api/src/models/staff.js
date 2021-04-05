'use strict';

module.exports = (sequelize, DataTypes) => {
  const staff = sequelize.define('staff', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    staffCode: DataTypes.STRING,
    eligible: DataTypes.BOOLEAN,
    status: DataTypes.ENUM(["ACTIVE", "DISABLED", "REMOVED"]),
    role: DataTypes.ENUM([
      "ADMIN",
      "LINE-MANAGER",
      "STAFF",
    ]),
  }, {});
  staff.associate = function(models) {
    // associations can be defined here
    staff.belongsTo(models.department);
    staff.belongsTo(models.staffLevel, { foreignKey: 'staffLevelId', as: 'staffLevel'});
    staff.hasMany(models.leave, {
      foreignKey: 'leaveId',
      as: 'leaves',
      onDelete: 'CASCADE',
    });
    
  };
  return staff;
};