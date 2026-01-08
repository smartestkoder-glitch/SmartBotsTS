"use strict";
module.exports = {
    apps: [
        {
            name: "Test",
            script: "test.ts",
            autorestart: true,
            max_restarts: 20,
            restart_delay: 3000,
            node_args: ["--unhandled-rejections=strict"]
        }
    ]
};
