angular.module('starter.controllers', [])

        .controller('IndexController', ['$scope', '$http', '$state', '$stateParams', '$ionicSlideBoxDelegate', '$rootScope', '$ionicPush', '$ionicUser',
            function ($scope, $http, $state, $stateParams, $ionicSlideBoxDelegate, $rootScope, $ionicPush, $ionicUser) {

                $rootScope.$on('$cordovaPush:tokenReceived', function (event, data) {
                    $scope.token = data.token;
                    alert('Got token: ' + data.token);
                });

                $scope.getSliderFilter = function () {
//                    $scope.identifyUser();
                    var dataPost = {
                        api_key: '1',
                        usuario: 'hassefe',
                        senha: 'testandoaqui'
                    }
                    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
//            $http.post('http://sys.tilary.com/public/has_update/xml/data_7.xml', dataPost)
                    $http.post('http://sys.hassefe.com.br/app/api/get.data.portfolio', dataPost)
                            .success(function (data, status, headers, config) {
                                $scope.app_titulo = data.about.appNameLong;
                                $scope.ls_slider = data.slider.photo;
                                $scope.ls_category = data.menu.category;


                                $scope.logo_hassefe = data.about.appLogotipoHassefe;
                                $scope.logo_main = data.about.appImageMain;
                                $scope.about_content = data.about.content;

                                $ionicSlideBoxDelegate.update();

                            })
                }

                $scope.getListProducts = function (id) {
                    $state.go('produtos', {category_id: id});
                }


                $scope.identifyUser = function () {
                    var user = $ionicUser.get();
                    if (!user.user_id) {
                        // Set your user_id here, or generate a random one
                        user.user_id = $ionicUser.generateGUID()
                    }
                    ;
                    $scope.identified = user.user_id;
                    console.log('Identifying user: ' + user.user_id);
                    angular.extend(user, {
                        name: 'Hassefe',
                        message: 'Application Portfolio'
                    });
                    $ionicUser.identify(user);

                }

                //Basic registration
                $scope.pushRegister = function () {
                    $ionicPush.register({
                        canShowAlert: false,
                        onNotification: function (notification) {
                            // Called for each notification for custom handling
                            $scope.lastNotification = JSON.stringify(notification);
                            alert("token exist: " + $scope.token);
                        }
                    }).then(function (deviceToken) {
                        $scope.token = deviceToken;
                    });
                }

                $scope.nextSlide = function () {
                    $ionicSlideBoxDelegate.next();
                    $scope.pushRegister();
                }


                $scope.getSliderFilter();

            }
        ])

        .controller('CategoryController', ['$scope', '$http', '$state', '$stateParams', '$ionicHistory',
            function ($scope, $http, $state, $stateParams, $ionicHistory) {

                $scope.category_id = $stateParams.category_id;
                $scope.content_id = $stateParams.content_id;
                $scope.content_title = $stateParams.content_title;
                $scope.content_description = $stateParams.content_description;
                $scope.content_photo = $stateParams.content_photo;

                $scope.getProducts = function () {
                    var category_id = $stateParams.category_id;

                    var dataPost = {
                        api_key: '1',
                        usuario: 'hassefe',
                        senha: 'testandoaqui'
                    }

                    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                    $http.post('http://sys.hassefe.com.br/app/api/get.data.portfolio', dataPost)
                            .success(function (data, status, headers, config) {

                                angular.forEach(data.menu.category, function (value, key) {
                                    if (value.category_id == category_id) {
                                        $scope.category_id = value.category_id;
                                        $scope.titulo_categoria = value.title;
                                        $scope.photo_category = value.photo;
                                        $scope.contents = value.dishes.dish;
                                        stop();
                                    }
                                });

                            })
                }
 
                $scope.getDescriptionProduct = function (category_id, content_id, content_title, content_photo, content_description) {

                    $state.go('product-description', {
                        category_id: category_id,
                        content_id: content_id,
                        content_title: content_title,
                        content_photo: content_photo,
                        content_description: content_description
                    });
                }

                $scope.goBackHistory = function () {
                    $ionicHistory.goBack();
                }

                $scope.getProducts();

            }
        ])

        .controller('AppCtrl', function ($scope, $rootScope, $ionicPush, $ionicUser) {
            $rootScope.$on('$cordovaPush:tokenReceived', function (event, data) {
                $scope.token = data.token;
                console.log('Got token', data.token, data.platform);
                alert('Got token: ' + data.token);
            });
            //Basic registration
            $scope.pushRegister = function () {
                alert('Registering...');

                $ionicPush.register({
                    canShowAlert: false,
                    onNotification: function (notification) {
                        // Called for each notification for custom handling
                        $scope.lastNotification = JSON.stringify(notification);
                        alert("token exist: " + $scope.token);
                    }
                }).then(function (deviceToken) {
                    $scope.token = deviceToken;
                }, function (err) {
                    alert("erro: " + err);
                });
            }
            $scope.identifyUser = function () {
                alert('Identifying');

                var user = $ionicUser.get();
                if (!user.user_id) {
                    // Set your user_id here, or generate a random one
                    user.user_id = $ionicUser.generateGUID()
                }
                ;

                $scope.identified = user.user_id;

                console.log('Identifying user: ' + user.user_id);
                alert('Identifying user: ' + user.user_id);

                angular.extend(user, {
                    name: 'Test User',
                    message: 'I come from planet Ion'
                });

                $ionicUser.identify(user);

            }

            $scope.identifyUser();
            $scope.pushRegister();
        })

