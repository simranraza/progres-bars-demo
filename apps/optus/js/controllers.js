'use strict';

/* Controllers */

(function() {
    
    var LoginController = function ($scope,$log,$location,Page,Bars) {
        
        
        $scope.Page = Page;
		$scope.Bars = [];
        function init() {
			
			
			
			Page.setTitle('test');
            
            var myDataPromise = Bars.getBars();
            myDataPromise.then(function(data) {  

               // this is only run after getBars() resolves
                               
                
                $scope.Bars = data.bars;
                $scope.Buttons = data.buttons;
                $scope.Limit = data.limit;
                
                var barArray = [];
            
            
                for (var i=0; i<data.bars.length;i++ ){
                    var b = {name:"progress"+ (i+1),value:data.bars[i]}
                    barArray.push(b);
                }

                
                $scope.Bars = barArray;
                
                $scope.selItem = $scope.Bars[0]
            });
            //var data = myService.currentItem;
            
            
        }
		
		$scope.SetTitle = function(arg1){
			console.log('Title:  ' + arg1);
		}
		
		
        
        
        $scope.relativePercentage = function(w){
            var rval = (w/$scope.Limit)*100
            
            return Math.round(rval);
        }
        
        $scope.perform = function(arg1){
            
            var v = $scope.selItem
            
            
            v.value = v.value + arg1;
            
            if (v.value < 0)
                v.value = 0;
            for (var i = 0; i < $scope.Bars.length; i++) {
                if ($scope.Bars[i].name === v.name) {
                    $scope.Bars[i].value = v.value;
                }
                
            }
        }
        
        
        init();
        
        
    };
    
    LoginController.$inject = ['$scope', '$log','$location','Page','Bars'];

    angular.module('optusassignment')
      .controller('LoginController', LoginController);
    
}());

/////////////////////////////////////////////////


