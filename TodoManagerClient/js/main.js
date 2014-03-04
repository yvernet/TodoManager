'use strict';

/* App Module */

var tdmApp = angular.module('tdmApp', ['ngRoute', 'tdmControllers', 'tdmServices', 'ui.bootstrap']);

tdmApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/todomanager', {
                templateUrl: 'views/todolist.html',
                controller: 'TodoListCtrl'
            }).
            otherwise({
                redirectTo: '/todomanager'
            });
    }]);
