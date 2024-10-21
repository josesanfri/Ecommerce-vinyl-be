'use strict';

/**
 * vinyl service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vinyl.vinyl');
