const { defineConfig } = require("@vue/cli-service");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "certs", "private-key.pem")),
      cert: fs.readFileSync(
        path.resolve(__dirname, "certs", "public-certificate.pem")
      ),
    },
    port: 8080, // You can change the port to any available one
    host: "localhost",
    open: true, // This will automatically open the browser when you run `npm run serve`
  },
  transpileDependencies: true,
});
