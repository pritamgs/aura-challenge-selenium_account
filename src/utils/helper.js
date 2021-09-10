var fs = require('fs');
module.exports= {
    getData: function (filePath){
        try{
            return JSON.parse(fs.readFileSync(filePath,'utf8'));
        }catch(Exception){
            console.log('Exception in reading testData : '+ Exception);
        }
    }
};