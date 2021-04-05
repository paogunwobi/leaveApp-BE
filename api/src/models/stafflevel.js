module.exports = (sequelize, DataTypes) => {
    const staffLevel = sequelize.define('staffLevel', {
      levelName: DataTypes.STRING,
      description: DataTypes.STRING
    }, {});
    staffLevel.associate = function(models) {
      // associations can be defined here
      staffLevel.hasMany(models.staff, {
        as: 'staffs',
        foreignKey: 'staffId',
      });
    };
    return staffLevel;
  };