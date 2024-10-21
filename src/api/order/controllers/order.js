'use strict';

/**
 * order controller
 */

// @ts-ignore
const stripe = require('stripe')(process.env.STRIPE_KEY);

// @ts-ignore
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({strapi}) => ({
    async create(ctx) {
        // @ts-ignore
        const { vinyls } = ctx.request.body;

        try {
            const lineItems = await Promise.all(
                vinyls.map(async (vinyl) => {
                    const item = await strapi
                        .service('api::vinyl.vinyl')
                        .findOne(vinyl.id);

                    return {
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: Math.round(item.price * 100),
                        },
                        quantity: 1
                    }
                })
            );

            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: {
                    allowed_countries: ['ES'],
                },
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: process.env.CLIENT_URL + "/success",
                cancel_url: process.env.CLIENT_URL + "/successError",
                line_items: lineItems,
            });

            await strapi.service('api::order.order').create({
                data: {
                    stripeId: session.id,
                    vinyls
                }
            });

            return {stripeSession: session};
        } catch (error) {
            console.error("Error en la creación de la sesión de Stripe:", error);
            ctx.response.status = 500;
            return { error: "Hubo un problema procesando la orden" };
        }
    }
}));