module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    // Giving the Author model a name of type STRING
    location: DataTypes.STRING
  });

  Search.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Search.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Search;
};
