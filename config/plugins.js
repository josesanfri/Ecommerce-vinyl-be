module.exports = {
    'strapi-neon-tech-db-branches': {
        enabled: true,
        config: {
            neonApiKey: "t9t3e6j2k4c6g0bxhrf969wah1uad08vh3cdeqdcwz8icndm94roxjk0boj0hxc8", // get it from here: https://console.neon.tech/app/settings/api-keys
            neonProjectName: "ecommerce-vinyl", // the neon project under wich your DB runs
            neonRole: "neondb_owner", // create it manually under roles for your project first
            gitBranch: "main", // branch can be pinned via this config option. Will not use branch from git then. Usefull for preview/production deployment
        }
    },
}