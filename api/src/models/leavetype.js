'use strict';
module.exports = (sequelize, DataTypes) => {
  const leaveType = sequelize.define(
    "leaveType",
    {
      type: DataTypes.STRING,
      code: DataTypes.STRING,
      isPreAllocated: DataTypes.BOOLEAN,
      maxDays: DataTypes.INTEGER,
      description: DataTypes.STRING,
    }, {}
  );
  leaveType.associate = function(models) {
    // associations can be defined here
  };
  return leaveType;
};