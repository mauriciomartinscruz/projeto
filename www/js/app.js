// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ionic.service.core', 'ionic.service.push'])

ionicApp.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

ionicApp.config(function ($ionicAppProvider, $stateProvider, $urlRouterProvider) {
    $ionicAppProvider.identify({
        app_id: '21451d54',
        api_key: 'a478a9d50ccb37164bd30fd4e76bc976127ecaaca9d1c4e4',
        gcm_id: '473977577600',
        dev_push: true
    });

    $stateProvider
            .state('tabs', {
                url: '/t',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tabs.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/home.html',
                        controller: 'IndexController'
                    }
                }
            })
            .state('tabs.sobre', {
                url: '/sobre',
                views: {
                    'sobre-tab': {
                        templateUrl: 'templates/sobre.html',
                        controller: 'IndexController'
                    }
                }
            })
            .state('tabs.pedidos', {
                url: '/pedidos',
                views: {
                    'pedidos-tab': {
                        templateUrl: 'templates/pedidos.html'
                    }
                }
            })
            .state('tabs.contato', {
                url: '/contato',
                views: {
                    'contato-tab': {
                        templateUrl: 'templates/contato.html'
                    }
                }
            })
            .state('produtos', {
                url: '/produtos/:category_id',
                templateUrl: 'templates/products-list.html',
                controller: 'CategoryController'
            })
            .state('product-description', {
                url: '/product-description/:category_id/:content_id/:content_title/:content_photo/:content_description',
                templateUrl: 'templates/product-description.html',
                controller: 'CategoryController'
            })

    $urlRouterProvider.otherwise('/t/home');

});


//        .controller('starter.PushController', function ($scope, $rootScope, $ionicUser, $ionicPush) {
//
//            $rootScope.$on('$cordovaPush:tokenReceived', function (event, data) {
//                alert("Successfully registered token " + data.token);
//                console.log('Ionic Push: Got token ', data.token, data.platform);
//                $scope.token = data.token;
//            });
//            
//            $scope.identifyUser = function () {
//                var user = $ionicUser.get();
//                if (!user.user_id) {
//                    // Set your user_id here, or generate a random one.
//                    user.user_id = $ionicUser.generateGUID();
//                }
//                ;
//
//                // Metadata
//                angular.extend(user, {
//                    name: 'Hassefe',
//                    bio: 'Hassefe 2015'
//                });
//
//                // Identify your user with the Ionic User Service
//                $ionicUser.identify(user).then(function () {
//                    $scope.identified = true;
//                    console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
//                });
//            };
//
//
//            // Registers a device for push notifications
//            $scope.pushRegister = function () {
//                console.log('Ionic Push: Registering user');
//
//                // Register with the Ionic Push service.  All parameters are optional.
//                $ionicPush.register({
//                    canShowAlert: true, //Can pushes show an alert on your screen?
//                    canSetBadge: true, //Can pushes update app icon badges?
//                    canPlaySound: true, //Can notifications play a sound?
//                    canRunActionsOnWake: true, //Can run actions outside the app,
//                    onNotification: function (notification) {
//                        // Handle new push notifications here
//                        return true;
//                    }
//                });
//            };
//
//            $scope.pushRegister();
//            $scope.identifyUser();
//        });










