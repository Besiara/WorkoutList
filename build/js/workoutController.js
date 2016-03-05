(function(){
    'use strict';
    angular
        .module('app')
        .controller('WorkoutController', WorkoutController);
        WorkoutController.$inject = ['$scope', '$filter', 'localStorageService'];
    
    function WorkoutController($scope, $filter, localStorageService) { 
        
        var vm = this;
        vm.setsArr=[1,2,3,4,5];
        vm.set=0;
        vm.exercises = localStorageService.get('exerciseList')||[];
        vm.setsNumber=setsNumber;
        vm.removeSet=removeSet;
        vm.addExercise=addExercise;
        vm.tempSet=[];
        
        function addExercise() {
            if (vm.set==0){
                vm.exercises.push({name:vm.name}); 
            } else {
                for (var i = 1; i < vm.set+1; i++) {
                    vm.tempSet.push(
                    {reps:vm.reps[i],
                    weight:vm.weight[i],
                    timer:vm.timer[i],
                    time:vm.time[i],
                    sound:vm.sound[i]});
                    vm.reps[i]="";
                    vm.weight[i]="";
                    vm.timer[i]=false;
                    vm.sound[i]=false;
                    vm.time[i]="";
                }
                vm.exercises.push({name:vm.name,setNum:vm.tempSet});
                vm.tempSet=[];
                console.log(vm.exerciseList);
            }
            vm.set=0;
            vm.name="";
        }   
        
        
        function setsNumber(num) {
            return  new Array(num);
        }
        function removeSet(){
            vm.set-=1;
        }

        $scope.$watchCollection('vm.exercises', function(newVal, oldVal) {
            if (!angular.equals(newVal, oldVal)) {
                localStorageService.set('exerciseList', vm.exercises);
            }
        }, true);
        
        
        
        console.log(vm.exercises);
        
    }   
        
})();