"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Quotes", [
      {
        id: 1,
        authorId: 1,
        quote:
          "The more you like yourself, the less you are like anyone else, which makes you unique.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        authorId: 1,
        quote:
          "Disneyland is a work of love. We didn't go into Disneyland just with the idea of making money.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        authorId: 1,
        quote:
          "I always like to look on the optimistic side of life, but I am realistic enough to know that life is a complex matter.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        authorId: 2,
        quote: "The secret of getting ahead is getting started.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        authorId: 2,
        quote:
          "Part of the secret of a success in life is to eat what you like and let the food fight it out inside.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        authorId: 2,
        quote:
          "You can't depend on your eyes when your imagination is out of focus.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        authorId: 3,
        quote:
          "Look deep into nature, and then you will understand everything better.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        authorId: 3,
        quote:
          "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        authorId: 3,
        quote: "The only source of knowledge is experience.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Quotes", null, {});
  },
};
