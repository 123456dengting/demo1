const Service = require('egg').Service;

class GetService extends Service{

    //获取用户信息接口
    async getUserInfo(){
        return Promise.all([this.getAge(), this.getName()]).then(values =>{
            return {
                ...values[0],
                ...values[1]
            }
        })
    }

    //获取年龄接口
    async getAge(){
        try {
            let res = await this.ctx.http.get(`http://localhost:8081/getAge`,{});
            return  res;
        } catch (error) {
            this.ctx.logger.warn('API-getAge:', error);
            return {}
        }
    }

    //获取姓名接口
    async getName(){
        try {
            let res = await this.ctx.http.post(`http://localhost:8081/getName`,{});
            return res;
        } catch (error) {
            this.ctx.logger.warn('API-getName:', error);
            return {}
        }

    }
}


module.exports = GetService;