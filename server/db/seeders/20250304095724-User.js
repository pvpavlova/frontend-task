"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("lkJlkn8hj", 10);

    return queryInterface.bulkInsert("Users", [
      {
        fullName: "Alexey",
        email: "aleksei@example.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Users",
      { email: "aleksei@example.com" },
      {}
    );
  },
};
