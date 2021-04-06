"use strict";
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define(
    "department",
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  );
  department.associate = function (models) {
    // associations can be defined here
    department.belongsTo(models.staff, {as:"lineManager", foreignKey: "lineManagerId" });
    department.hasMany(models.staff, {as:"staffs", foreignKey: "staffCode" });
    
  };
  return department;
};
