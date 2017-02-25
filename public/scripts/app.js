'use strict'
var appDespe = angular.module('testTesis', ['ui.router']);

appDespe.factory('hotelsFactory',function($http){
	return{
		getHotelsByDestination: function(destination){
			return $http.get('/api/hotel/'+destination).then(function (response) {
				return response.data;
      		});
		}
	}
});



appDespe.controller('HomeController', function($scope,hotelsFactory,$state){

$scope.findHotels =function (){
		$state.go("hotel", { searchString: $scope.destination})
  	};
});


appDespe.controller('HotelController', function($scope,filterFilter,hotelsFactory,$stateParams){

$scope.enableFirstValue=function(){
var precio="Precio";
var estrellas ="Estrellas";
$scope.ordenadores = [precio,estrellas];
$( "#firstValue").removeAttr('disabled');
$scope.ordenadores2=[];
var secOrder = $('#firstOrder option:not(:selected)').text();
	$scope.ordenadores2.push(secOrder);
}

$scope.enableSecondValue=function(){
$( "#secValue").removeAttr('disabled');
}

$scope.enableSecOrder=function(){
	$( "#secOrder").removeAttr('disabled');
}


$scope.aplicarFiltros  = function(){
	var upStarsUpPrice;
	var upStarsDownPrice;
	var downStarsUpPrice;
	var downStarsDownpPrice;
	var upPriceDownStars;
	var upPriceUpStars;
	var DownPriceDownStars;
	var DownPriceUpStars;
};

$scope.aplicarOrden = function(){

$( "#prioridad").removeClass('hidden');
var priceAndStars = angular.isDefined($scope.precio)&&angular.isDefined($scope.stars);
var showPrice = !priceAndStars && angular.isDefined($scope.precio);
var showStars = !priceAndStars && angular.isDefined($scope.stars);
var showServices = angular.isDefined($scope.services);
$scope.showPriceAndStars=priceAndStars;
$scope.showPrice=showPrice;
$scope.showStars=showStars;
$scope.showServices=showServices;
};

$scope.showProfiles = function(){
        $( "#mensaje" ).removeClass('hidden');
	$( "#servicios" ).addClass('hidden');
	$( "#precio" ).addClass('hidden');
	$( "#prioridad" ).addClass('hidden');
	$( "#pago" ).addClass('hidden');
	$( "#estrellas" ).addClass('hidden');
	$( "#perfiles" ).addClass('hidden');
        $( "#trabajo" ).removeClass('hidden');
 	$( "#vacaciones" ).removeClass('hidden');
        $( "#lujo" ).removeClass('hidden');
        $( "#personalizado" ).removeClass('hidden');
	$( "#panelbotones" ).addClass('hidden');
	$( "#panelfiltros" ).addClass('hidden');
	$( "#divestrellas" ).addClass('hidden');
	$( "#panelestrella").addClass('hidden');
	$( "#panelprecio").addClass('hidden');
	$( "#panelservicios").addClass('hidden');
	$( "#panelpago").addClass('hidden');
	$( "#mensaje2" ).addClass('hidden');
	$( "#mensaje3" ).addClass('hidden');
  };

$scope.showPrecio = function(){
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#panelprecio" ).removeClass('hidden');
  };

$scope.showStars = function(){
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).removeClass('hidden');
  };


$scope.showServicios = function(){
$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#panelservicios" ).removeClass('hidden');
  };


$scope.showPago = function(){
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#panelpago" ).removeClass('hidden');
  };

$scope.applyPrecio = function(){
 	$( "#panelprecio" ).addClass('hidden');
	$scope.precio=$scope.precio;        	
  };

$scope.applyPago = function(){
 	$( "#panelpago" ).addClass('hidden');
	
$('input[name="pago"]:checked').each(function() {
   $scope.pagos.push(this.value);
});
};

$scope.applyStars = function(){
 	$( "#panelestrella" ).addClass('hidden');
	$('input[name="estrellas"]:checked').each(function() {
   $scope.stars.push(this.value);
});
};

$scope.applyServices = function(){
 	$( "#panelservicios" ).addClass('hidden');
	var wifi = $( "#wifi").find(":selected").text();
	var pileta = $( "#pileta").find(":selected").text();
	var recepcion = $( "#recepcion").find(":selected").text();
	var playa = $( "#playa").find(":selected").text();

   	if(wifi=="Obligatorio" ){
		$scope.obligatorio.push("wifi");		
	}
	if(wifi =="Deseable" ){
		$scope.deseable.push("wifi");		
	}		
 	 
	if(pileta=="Obligatorio" ){
		$scope.obligatorio.push("pileta");		
	}
	if(pileta =="Deseable" ){
		$scope.deseable.push("pileta");		
	}

	if(recepcion=="Obligatorio" ){
		$scope.obligatorio.push("recepcion");		
	}
	if(recepcion =="Deseable" ){
		$scope.deseable.push("recepcion");		
	}

	if(pago=="Obligatorio" ){
		$scope.obligatorio.push("pago");		
	}
	if(pago =="Deseable" ){
		$scope.deseable.push("pago");		
	}	
};


$scope.showVacaciones = function(){
	$( "#mensaje2" ).removeClass('hidden');
	$( "#mensaje3" ).removeClass('hidden');
	$( "#perfiles" ).removeClass('hidden');
 	$( "#panelvacaciones" ).removeClass('hidden');
        $( "#vacaciones" ).removeClass('btn btn-primary');
        $( "#lujo" ).removeClass('btn btn-primary');
        $( "#trabajo" ).removeClass('btn btn-primary');
        $( "#personalizado" ).removeClass('btn btn-primary');
	$( "#personalizado" ).addClass('btn btn-default');
	$( "#trabajo" ).addClass('btn btn-default');
	$( "#lujo" ).addClass('btn btn-default');
	$( "#vacaciones" ).addClass('btn btn-primary');
	$( "#mensaje" ).addClass('hidden');        
	$( "#panelbotones" ).removeClass('hidden');
	$( "#panelfiltros" ).removeClass('hidden');
	$( "#servicios" ).removeClass('hidden');
	$( "#precio" ).removeClass('hidden');
	$( "#pago" ).removeClass('hidden');
	$( "#estrellas" ).removeClass('hidden');
  };

$scope.showTrabajo = function(){
$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden'); 	
        $( "#paneltrabajo" ).addClass('hidden');
 	$( "#vacaciones" ).addClass('hidden');
        $( "#lujo" ).addClass('hidden');
        $( "#personalizado" ).addClass('hidden');
  };

$scope.showLujo = function(){
 	$( "#panellujo" ).removeClass('hidden');
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#vacaciones" ).addClass('hidden');
        $( "#trabajo" ).addClass('hidden');
        $( "#personalizado" ).addClass('hidden');
  };

var precio="Precio";
var estrellas ="Estrellas";
$scope.ordenadores = [precio,estrellas];

$scope.showPersonalizado = function(){
        $( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#panelpersonalizado" ).removeClass('hidden');
 	$( "#vacaciones" ).addClass('hidden');
        $( "#trabajo" ).addClass('hidden');
        $( "#lujo" ).addClass('hidden');
  };

     function init(){
		$scope.customOrder = ['-price','-stars'];
		$scope.hotels =[];
		hotelsFactory.getHotelsByDestination($stateParams.searchString).then(function(d) {
			h.forEach(function(item) {
   			$scope.hotels.push(item);
});			    
	console.log($scope.hotels);		
//	$scope.hotels = h;
		  });
$scope.obligatorio = [ ];
$scope.deseable = [ ];
$scope.pagos = [ ];
$scope.ordenadores2= [ ];
$scope.services = [ ];	
$scope.algo = [ ];
$scope.algo2 = [ ];	
$scope.stars = [ ];
	}; 
     init();

});

appDespe.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'template/home.html',
      controller: 'HomeController'
    });

  $stateProvider
    .state('hotel', {
      url: '/hotel',
      templateUrl: 'template/hotel.html',
      controller: 'HotelController',
      params: { searchString: {} }
    });

  $urlRouterProvider.otherwise('home');
}]);

var h = [ 
		{destination: "RIO",		
		name: "H1",
		stars: 3,
		services : ["WIFI"],
		price: 345}
	,

		{destination: "RIO",		
		name: "H2",
		stars: 3,
		services : ["WIFI"],
		price: 341}
	,      {destination: "RIO",		
		name: "H3",
		stars: 4,
		services : ["WIFI"],
		price: 345}
	,      {destination: "RIO",		
		name: "H4",
		stars: 4,
		services : ["WIFI"],
		price: 3400}
	,
		{destination: "RIO",		
		name: "H5",
		stars: 4,
		services : ["WIFI"],
		price: 34}
	
	];

appDespe.factory('hotels', [function(){
  var o = {
    hotels: []
  };
  return h;
}]);

