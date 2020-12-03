module.exports = options => {
    //给每个ajaxa返回值加上 status = 200
    return async function addStatus(ctx, next) {
      await next();

      let body = ctx.body;

      if (!body) return;
      if (typeof body === "object") {
        console.log("111111-md2")
          ctx.body.status = 200
      }
    };
  };