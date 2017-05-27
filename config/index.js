var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        return 'mongodb://'+ configValues.uname +':'+ configValues.pwd +'@ds161580.mlab.com:61580/proabogadosapi';
    }
    
}