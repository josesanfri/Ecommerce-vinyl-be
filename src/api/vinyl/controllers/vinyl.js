'use strict';

/**
 * vinyl controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::vinyl.vinyl');
