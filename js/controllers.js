angular.module('myapp', [])

.controller('mainCtrl', function($scope, $timeout){
	$scope.items = [];


	chrome.tabs.query({url:"https://www.youtube.com/*"}, function(results){

		results.forEach(function(element, index){
			chrome.tabs.executeScript(element.id, {
				// code: 'var paused = document.getElementsByTagName("video")[0].paused;paused;'
				file: 'js/getStatus.js'
			}, function(results){
				console.log(index);
				console.log(results);			
				setTimeout(function(){
					element.paused = results[0].paused;
					element.loop = results[0].loop;
					$scope.$apply(function(){
						$scope.items.push(element);
					});
				}, 300);
			});
		});		
	});


	$scope.clickTitle = function($index){
		chrome.tabs.update($scope.items[$index].id, {
			selected: true
		});
	}

	$scope.clickPlay = function($index){
		chrome.tabs.executeScript($scope.items[$index].id, {
			code: "document.getElementsByClassName('ytp-play-button')[0].click();"
		});
		$scope.items[$index].paused = !$scope.items[$index].paused;
	};

	$scope.clickLoop = function($index){
		chrome.tabs.executeScript($scope.items[$index].id, {
			code: "document.getElementById('loop').click();"
		});
		$scope.items[$index].loop = !$scope.items[$index].loop;
	};


});



