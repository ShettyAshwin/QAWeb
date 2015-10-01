var config_module = angular.module('barcoApp', []);

var app_Config = {
    'common': {
        'ServiceHost': 'localhost',
        'Protocol': 'http://',
        'AppDirectory': '',
        'PlaceHolder': '{{ServerDetail}}',
        'Port': '3000',
    },
    'hospital': {
        'list': '{{ServerDetail}}/hospitals/getAll/',
        'add': '{{ServerDetail}}/hospitals/add/',
        'update': '{{ServerDetail}}/hospitals/update/',
        'delete': '{{ServerDetail}}/hospitals/delete/',
        'get': '{{ServerDetail}}/hospitals/get/'
    },
    'location': {
        'list': '{{ServerDetail}}/locations/getAll/',
        'add': '{{ServerDetail}}/locations/add/',
        'update': '{{ServerDetail}}/locations/update/',
        'delete': '{{ServerDetail}}/locations/delete/',
        'get': '{{ServerDetail}}/locations/get/',
        'getByHospital': '{{ServerDetail}}/locations/getByHospital/',
    },
    'hierarchy': {
        'list': '{{ServerDetail}}/hierarchies/getAll/',
        'add': '{{ServerDetail}}/hierarchies/add/',
        'update': '{{ServerDetail}}/hierarchies/update/',
        'delete': '{{ServerDetail}}/hierarchies/delete/',
        'get': '{{ServerDetail}}/hierarchies/get/'
    },
    'asset': {
        'list': '{{ServerDetail}}/assets/getAll/',
        'add': '{{ServerDetail}}/assets/add/',
        'update': '{{ServerDetail}}/assets/update/',
        'delete': '{{ServerDetail}}/assets/delete/',
        'get': '{{ServerDetail}}/assets/get/'
    }
};


angular.forEach(app_Config, function (key, value) {
    for (var item in key) {    
        if (item === 'PlaceHolder') continue;
        if (key[item].toString().indexOf(app_Config.common.PlaceHolder) > -1) {
            key[item] = key[item].toString().replace(app_Config.common.PlaceHolder, app_Config.common.Protocol +
                app_Config.common.ServiceHost + ':' + app_Config.common.Port + app_Config.common.AppDirectory);
        }
    }
    config_module.constant(value, key);
});

angular.getAppSection = function (key) {
    return app_Config[key];
};