const redis = require('redis')
let Client = null;

module.exports = async function(){
    if (Client == null){
        console.log("init redis...")
        return Client = redis.createClient();
    }
}