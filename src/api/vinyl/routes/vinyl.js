'use strict';

/**
 * vinyl router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::vinyl.vinyl');
