var config_module = angular.module('myApp.config', []);

var app_Config = {
        'common': {
            'ServiceHost': 'localhost',
            'Protocol': 'http://',
            'AppDirectory': '',
            'PlaceHolder': '{{ServerDetail}}',
            'Port': '3000',
        }
    }
    ;

angular.forEach(app_Config, function (key, value) {
    for (var item in key) {
        if (item === 'PlaceHolder') continue;
        //var cc = 'll';
        if (key[item].toString().indexOf(app_Config.common.PlaceHolder) > -1) {
            key[item] = key[item].toString().replace(app_Config.common.PlaceHolder, app_Config.common.Protocol +
                app_Config.common.ServiceHost + '/' + app_Config.common.AppDirectory);
        }

        if (key[item].toString().indexOf(app_Config.multiSite.PlaceHolder) > -1) {
            key[item] = key[item].toString().replace(app_Config.multiSite.PlaceHolder, app_Config.multiSite.Protocol +
                app_Config.multiSite.ServiceHost + '/' + app_Config.multiSite.AppDirectory);
        }
    }
    config_module.constant(value, key);
});

angular.getAppSection = function (key) {

    return app_Config[key];
};