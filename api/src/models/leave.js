'use strict';
module.exports = (sequelize, DataTypes) => {
  const leave = sequelize.define(
    "leave",
    {
      code: DataTypes.STRING,
      totalLeaveDays: DataTypes.INTEGER,
      description: DataTypes.STRING,
      status: DataTypes.ENUM([
        "PENDING",
        "APPROVED",
        "ON-GOING",
        "CANCELLED",
        "COMPLETED",
        "REJECTED"
      ]),
      leaveStartDate: DataTypes.STRING,
      leaveEndDate: DataTypes.STRING,
      resumptionDate: DataTypes.STRING,
    },
    {}
  );
  leave.associate = function(models) {
    // associations can be defined here
    leave.belongsTo(models.staff, {as:"staff", foreignKey: "staffId" });
    leave.belongsTo(models.staff, {as:"approver", foreignKey: "approverId" });
    leave.belongsTo(models.department, {as:"department", foreignKey: "departmentId" });
    leave.belongsTo(models.leaveType, {as:"leaveType", foreignKey: "leaveTypeId" });
  };
  return leave;
};