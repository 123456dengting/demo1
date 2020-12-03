module.exports = options => {
    //给每个ajaxa返回值加上 success = true
    return async function resadd(ctx, next) {
      await next();

      let body = ctx.body;

      if (!body) return;
      let result = {
          success: true
      }
      if (typeof body === "object") {
          console.log("111111-md1")
          result.data = body
          ctx.body = result
      }
    };
  };