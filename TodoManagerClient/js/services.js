/**
 * Created by qyvy7400 on 24/11/13.
 */
'use strict';

/* Services */

var tdmServices = angular.module('tdmServices', ['ngResource']);

/*
tdmServices.factory('TaskList', ['$resource',
    function($resource){
        return $resource('http://localhost:5000/todomanager/tasks', {}, {
        });
    }]);
*/

tdmServices.factory('Task', ['$resource',
    function($resource){
        return $resource('http://localhost:5000/todomanager/tasks/:taskId', {taskId:'@id'}, {
            save: {method: 'POST', headers: {'Content-Type': 'application/json'}}
        });
    }]);


/*
apmServices.factory('Story', ['$resource',
    function($resource){
        return $resource('http://yvernet.apiary.io/backlog/:backlogId/stories/:storyId', {backlogId:1,storyId:'@id'}, {
            update: {method: 'PUT'},
            saveAll: {method: 'PUT', isArray:true}
        });
    }]);

    */