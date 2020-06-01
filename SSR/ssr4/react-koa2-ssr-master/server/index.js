require("asset-require-hook")({
  extensions: ["svg", "css", "less", "jpg", "png", "gif"],
  name: '/static/media/[name].[hash:8].[ext]'
});
require("babel-core/register")();
require("babel-polyfill");
require("./app");
