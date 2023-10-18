'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('blogs', [
      {
        title: "Hello World",
        content: "Welcome to class fullstack developer",
        image: "img.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: "Hello World",
        content: "Welcome to class fullstack developer II",
        image: "img.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blogs', null, {});
  }
};
