appDespe.factory('hotelsFactory',function($http){
	return{
		getHotelsByDestination: function(destination){
			return $http.get('/api/hotel/'+destination).then(function (response) {
				return response.data;
      		});
		}
	}
});
