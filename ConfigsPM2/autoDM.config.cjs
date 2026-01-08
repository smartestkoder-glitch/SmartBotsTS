module.exports = {
    apps: [
        {
            name: "AutoDM",
            script: "dist/src/start.js",

            autorestart: true,
            restart_delay: 30000,
            node_args: ["--unhandled-rejections=strict"],
            //cwd: "/Users/Admin/WebstormProjects/smartbotsTS/dist"
        }
    ]
};
