module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/csv2json-vue/" //任意
      : "/",
};
