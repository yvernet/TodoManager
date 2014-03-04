/**
 * Created by qyvy7400 on 23/11/13.
 */

'use strict';

/* Controllers */

var tdmControllers = angular.module('tdmControllers', []);

tdmControllers.controller('TodoListCtrl', ['$scope', '$location', 'TaskList',
    function($scope, $location, TaskList) {
        $scope.taskListObject = TaskList.get();
        $scope.taskListObject.$promise.then(function(){
            $scope.taskList = $scope.taskListObject.tasks;
        })
    }]);


/*
apmControllers.controller('BacklogListCtrl', ['$scope', '$location', 'Story',
    function($scope, $location, Story) {
        $scope.backlog = Story.query();
        $scope.canSort = false;
        $scope.isDirty = false;

        $scope.editStory = function (storyId){
            $location.path('/backlog/' + storyId);
        }

        $scope.createStory = function (){
            $location.path('/story-create');
        }

        $scope.toggleSortable = function(){
            ($scope.canSort) ? $scope.canSort=false : $scope.canSort=true;
        }

        $scope.getStoryDown = function(rankStory){
            switchStories(rankStory, 1);
        }

        $scope.getStoryUp = function(rankStory){
            switchStories(rankStory, -1);
        }

        $scope.saveBacklogOrder = function(){
            Story.saveAll($scope.backlog);
            // TODO handle save error
            $scope.isDirty = false;
            $scope.canSort = false;
        }

        $scope.cancelBacklogOrder = function(){
            $scope.backlog = Story.query();
            $scope.isDirty = false;
            $scope.canSort = false;
        }

        // Utility function
        function switchStories(rankStory, inc){
            var currentStory, story1, story2;

            // We identify the two concerned stories
            for (var i = 0; i < $scope.backlog.length; i++){
                currentStory = $scope.backlog[i];
                if (currentStory.rank == rankStory) story1 = currentStory;
                if (currentStory.rank == rankStory + inc) story2 = currentStory;
            }

            // We switch their rank only if it's possible
            if(!!story2){
                story1.rank += inc;
                story2.rank -= inc;
            }

            if(! $scope.isDirty){
                $scope.isDirty = true;
            }
        }

    }]);

apmControllers.controller('StoryCtrl', ['$scope', '$routeParams', '$location', 'Story', '$modal',
    function($scope, $routeParams, $location, Story, $modal) {

        if(!(typeof $routeParams.storyId === "undefined")){
            $scope.story = Story.get({storyId: $routeParams.storyId});
        }else{
            // Define default values
            $scope.story = new Story();
            $scope.story.type = 'User Story'; //storyTypes[0];
            $scope.story.priority = priorities[0];
            $scope.story.complexityType = complexityTypes[0];
        }

        $scope.storyTypes = storyTypes;
        $scope.complexityTypes = complexityTypes;
        $scope.priorities = priorities;

        $scope.save = function(){
            if(!(typeof $routeParams.storyId === "undefined")){
                $scope.story.$update();
            }else{
                Story.save($scope.story);
            }
            goHome();
        }

        $scope.cancel = function(){
            goHome();
        }

        // Functions for the modal box //
        $scope.delete = function(){
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent',
                controller: modalInstanceCtrl
            });

            modalInstance.result.then(function () {
                $scope.story.$delete();
                goHome();
            });
        }

        var modalInstanceCtrl = function ($scope, $modalInstance) {

            $scope.confirmDeletion = function () {
                $modalInstance.close();
            };

            $scope.cancelDeletion = function () {
                $modalInstance.dismiss();
            };
        };

        // End functions for the modal box //

        // Utility function
        function goHome(){
            $location.path('/backlog/');
        }
    }]);
    */