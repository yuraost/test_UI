var model = [{	name: "First item with custom name",
					comments: [	{val:"First comment"},
								{val:"Second comment"},
								{val:"Third comment"},
								{val:"Fourth comment"},
								{val:"Fifth comment"},
								{val:"Sixth comment"},
								{val:"Seventh comment"},
								{val:"Eighth comment"},
								{val:"Nineth comment"},
								{val:"Tenth comment"}
							  ],
					active: false},
					
				 {	name: "Second item is active",
					comments: [ {val:"A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s"},
								{val:"A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s"},
								{val:"A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980sA variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980sA variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s"}
							  ],
					active: true}];

var app=angular.module("TestApp", ['LocalStorageModule']);

app.config(function(localStorageServiceProvider){
	localStorageServiceProvider.setPrefix('TestApp');
});

app.controller("TestCtrl", function($scope, localStorageService){
	if (localStorageService.get('data') === null) localStorageService.set('data', model);

	$scope.items = localStorageService.get('data');
	
	function setActive(index){
		if($scope.items.length != 0){
			for (i=0; i<$scope.items.length; i++){
				if ($scope.items[i].active == true) {
					if(index == -1) index = i;
					else $scope.items[i].active = false;
					continue;
				}
			}
			$scope.activeIndex = index;
			$scope.items[index].active = true;
			$scope.activeComments=$scope.items[index].comments;
		}
		else{
			$scope.activeComments = "";
		}
	}
	
	setActive(-1);
	
	$scope.addItem = function(){
		$scope.items.push({
			name: $scope.itemName,
			comments: []
		});
		$scope.itemName="";
		setActive($scope.items.length-1);
		localStorageService.set('data', $scope.items);
	};
	
	$scope.delItem = function(index){
		if ($scope.items[index].active){
			$scope.items.splice(index, 1);
			setActive($scope.items.length-1);
		}
		else $scope.items.splice(index, 1);
		localStorageService.set('data', $scope.items);
	};
	
	$scope.activateItem = function(index){
		setActive(index);
		localStorageService.set('data', $scope.items);
	};
	
	$scope.activeClass = function(index){
		return $scope.items[index].active ? "active_item" : "";
	};
	
	$scope.getClass = function(odd){
		return odd ? "back_purple" : "back_orange";
	}
	
	$scope.addComment = function(){
		$scope.items[$scope.activeIndex].comments.push({val: $scope.newComment});
		$scope.newComment="";
		localStorageService.set('data', $scope.items);
	};

});