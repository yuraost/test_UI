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
				active: false}];

var app=angular.module("TestApp", []);

app.controller("TestCtrl", function($scope){
	$scope.items = model;
	
	function setActive(index){
		for (i=0; i<$scope.items.length; i++){
			$scope.items[i].active=false;
		}
		$scope.activeIndex = index;
		$scope.items[index].active = true;
		$scope.activeComments=$scope.items[index].comments;
	}
	
	setActive($scope.items.length-1);
	
	$scope.addItem = function(){
		$scope.items.push({
			name: $scope.itemName,
			comments: []
		});
		$scope.itemName="";
		setActive($scope.items.length-1);
	};
	
	$scope.delItem = function(index){
		if (confirm("Are you sure?")){
			if ($scope.items[index].active){
				$scope.items.splice(index, 1);
				setActive($scope.items.length-1);
			}
			else $scope.items.splice(index, 1);
		};
	};
	
	$scope.activateItem = function(index){
		setActive(index);
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
	};

});