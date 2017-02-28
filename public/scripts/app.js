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

$scope.ordenar=function(){ 

	var firstOrder = $('#firstOrder option:selected').text();
	var firstValue = $('#firstValue option:selected').text();

	var secOrder = $('#secOrder option:selected').text();
	var secValue = $('#secValue option:selected').text();

	var customOrder;
	if(!firstOrder.isEmpty &&firstValue.isEmpty){
		if(firstOrder!='Servicios'){
			if(firstValue=="Mayor a Menor"){
					customOrder = firstOrder.concat('-');
			}
			customOrder = customOrder.concat(firstOrder); 
		}else{
			customOrder = firstValue;
		}
		if(!secOrder.isEmpty &&secValue.isEmpty){
			customOrder = customOrder.concat(",");
			if(secOrder!='Servicios'){
				if(secValue=="Mayor a Menor"){
					customOrder = customOder.concat('-');
				}
				customOrder = customOrder.concat(secOrder)
			}else{
				customOrder = customOder.concat(secValue);
			}
		}
		$scope.customOrder=customOrder;				
	}
}

$scope.enableFirstValue=function(){ 
	
	$scope.valueOptions = [];
	$scope.valueOptions2 = [];
	$scope.ordenadores2 = [];

	$( "#segundoCriterio").addClass('hidden');	
	var selectedValue = $('#firstOrder option:selected').text();
	if(selectedValue =='Servicios'){
		$scope.selservice.forEach((function(item) {
			$scope.valueOptions.push(item);	
		}
		));
		$( "#segundoCriterio").removeClass('hidden');
		$( "#secOrder").removeAttr('disabled'); 
	
		$scope.ordenadores2.push("Estrellas");
		$scope.ordenadores2.push("Precio");
		$scope.valueOptions2.push("Mayor a Menor");
		$scope.valueOptions2.push("Menor a Mayor");			     	
	
	}else{
		if(selectedValue!=""){

		$scope.valueOptions.push("Mayor a Menor");
		$scope.valueOptions.push("Menor a Mayor");
		if(angular.isDefined($scope.selservice)&&$scope.selservice.length>0){
			$( "#segundoCriterio").removeClass('hidden');
			$( "#secOrder").removeAttr('disabled');
			$scope.ordenadores2.push("Servicios");
 			$scope.selservice.forEach((function(item) {
				$scope.valueOptions2.push(item);	
				}
			));
		}
		}	
	}
	$( "#firstValue").removeAttr('disabled'); 
}

$scope.enableSecondValue=function(){
$( "#secValue").removeAttr('disabled');
}

$scope.enableSecOrder=function(){
	$( "#secOrder").removeAttr('disabled');
}

$scope.aplicarOrden = function(){

$("#prioridad").removeClass('hidden');
var showServices = angular.isDefined($scope.services);
$scope.showServices=showServices;
$( "#opcionesOrdenamiento").addClass('hidden');	
$( "#ordenar").removeClass('hidden');	

};

$scope.ordenar = function(){
$( "#prioridad").addClass('hidden');
$( "#opcionesOrdenamiento").removeClass('hidden');	
$( "#ordenar").addClass('hidden');	
};

$scope.showProfiles = function(){
	$( "#resultados" ).removeClass('hidden');        
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
	$( "#estrellas" ).css("background-color","#adad85");
	$( "#servicios" ).css("background-color","#adad85");
	$( "#pago" ).css("background-color","#adad85");
	$( "#precio" ).css("background-color","#19a08c");
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#panelprecio" ).removeClass('hidden');
  };

$scope.showStars = function(){
	$( "#estrellas" ).css("background-color","#19a08c");
	$( "#servicios" ).css("background-color","#adad85");
	$( "#pago" ).css("background-color","#adad85");
	$( "#precio" ).css("background-color","#adad85");
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).removeClass('hidden');
  };


$scope.showServicios = function(){
	
	$( "#estrellas" ).css("background-color","#adad85");
	$( "#servicios" ).css("background-color","#19a08c");
	$( "#pago" ).css("background-color","#adad85");
	$( "#precio" ).css("background-color","#adad85");	
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#panelservicios" ).removeClass('hidden');
  };


$scope.showPago = function(){
	$( "#estrellas" ).css("background-color","#adad85");
	$( "#servicios" ).css("background-color","#adad85");
	$( "#pago" ).css("background-color","#19a08c");
	$( "#precio" ).css("background-color","#adad85");
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#panelpago" ).removeClass('hidden');
  };

$scope.applyPrecio = function(){
$scope.applyFilters = false;
	$( "#estrellas" ).css("background-color","#19a08c");
	$( "#servicios" ).css("background-color","#19a08c");
	$( "#pago" ).css("background-color","#19a08c");
	$( "#precio" ).css("background-color","#19a08c");
 	$( "#panelprecio" ).addClass('hidden');
	$scope.precio=$scope.precio;        	
  };

$scope.applyPago = function(){
$scope.applyFilters = false;
	$( "#estrellas" ).css("background-color","#19a08c");
	$( "#servicios" ).css("background-color","#19a08c");
	$( "#pago" ).css("background-color","#19a08c");
	$( "#precio" ).css("background-color","#19a08c");
 	$( "#panelpago" ).addClass('hidden');
	
$('input[name="pago"]:checked').each(function() {
   $scope.pagos.push(this.value);
});
};

$scope.applyStars = function(){
$scope.applyFilters = false;
$( "#estrellas" ).css("background-color","#19a08c");
	$( "#servicios" ).css("background-color","#19a08c");
	$( "#pago" ).css("background-color","#19a08c");
	$( "#precio" ).css("background-color","#19a08c");
 	$( "#panelestrella" ).addClass('hidden');
	$('input[name="estrellas"]:checked').each(function() {
   $scope.stars.push(this.value);
});
};

$scope.applyServices = function(){
	$scope.applyFilters = false;	
	$( "#estrellas" ).css("background-color","#19a08c");
	$( "#servicios" ).css("background-color","#19a08c");
	$( "#pago" ).css("background-color","#19a08c");
	$( "#precio" ).css("background-color","#19a08c");
	
 	$( "#panelservicios" ).addClass('hidden');
	var wifi = $( "#wifi").find(":selected").text();
	var pileta = $( "#pileta").find(":selected").text();
	var recepcion = $( "#recepcion").find(":selected").text();
	var playa = $( "#playa").find(":selected").text();
	if(!playa.isEmpty&&!wifi.isEmpty&&!pileta.isEmpty&&!recepcion.isEmpty){
		$scope.options.push("Servicios");
	}
	if(wifi=="Impresindible" ){
		if(!$scope.selservice.includes("wifi")){
			$scope.obligatorio.push("wifi");
			$scope.selservice.push("wifi");
		}		
	}
	if(wifi =="Deseable" ){
		if(!$scope.selservice.includes("wifi")){
		$scope.deseable.push("wifi");
		$scope.selservice.push("wifi");
		}		
				
	}		
 	 
	if(pileta=="Impresindible" ){
		if(!$scope.selservice.includes("pileta")){
			$scope.obligatorio.push("pileta");		
			$scope.selservice.push("pileta");		
		}
	}
	if(pileta =="Deseable" ){
		if(!$scope.selservice.includes("pileta")){
			$scope.deseable.push("pileta");
			$scope.selservice.push("pileta");		
		}
	}

	if(recepcion=="Impresindible" ){
		if(!$scope.selservice.includes("recepcion")){
		$scope.obligatorio.push("recepcion");
		$scope.selservice.push("recepcion");	
		}		
	}
	if(recepcion =="Deseable" ){
		if(!$scope.selservice.includes("recepcion")){
			$scope.deseable.push("recepcion");
			$scope.selservice.push("recepcion");
		}		
	}

	if(playa=="Impresindible" ){
		if(!$scope.selservice.includes("playa")){
			$scope.obligatorio.push("playa");
			$scope.selservice.push("playa");
		}
				
	}
	if(playa =="Deseable" ){
		if(!$scope.selservice.includes("playa")){
			$scope.deseable.push("playa");
			$scope.selservice.push("playa");
		}
	}

};

$scope.aplicarFiltros  = function(){
	$scope.applyFilters = true;
};

$scope.customFilter = function(element) {

	if($scope.applyFilters){
		var filterPrecio = true;
		var filterStars = true;
		var filterServices = true;
		if(angular.isDefined($scope.precio)&&$scope.precio>0){
			filterPrecio= element.price <= $scope.precio;
		}
		if(angular.isDefined($scope.stars)&&$scope.stars.length>0){
			var stars = false;	
			$scope.stars.forEach((function(item) {
				if(item == element.stars)		
					stars=true;		
				}
				));
			filterStars = stars;
		}
		if(angular.isDefined($scope.obligatorio)&&$scope.obligatorio.length >0){
		
			var wifi =  false;
			var playa =  false;		
			if($scope.obligatorio.includes("WIFI")){
				wifi = !element.wifi.isEmpty		
			}
			if($scope.obligatorio.includes("playa")){
				playa = !element.playa.isEmpty		
			}
			filterServices = wifi && playa;
		}
		return filterPrecio && filterServices && filterStars;
	}
	return true;
}

$scope.showVacaciones = function(){

	$( "#filtros" ).removeClass('hidden');
	$( "#mensaje2" ).removeClass('hidden');
	$( "#mensaje3" ).removeClass('hidden');
	$( "#perfiles" ).removeClass('hidden');
 	$( "#panelvacaciones" ).removeClass('hidden');
        $( "#mensaje" ).addClass('hidden');        
	$( "#panelbotones" ).removeClass('hidden');
	$( "#panelfiltros" ).removeClass('hidden');
	$( "#servicios" ).removeClass('hidden');
	$( "#precio" ).removeClass('hidden');
	$( "#pago" ).removeClass('hidden');
	$( "#estrellas" ).removeClass('hidden');
	$( "#trabajo" ).css("background-color","#adad85");
	$( "#lujo" ).css("background-color","#adad85");
	$( "#personalizado" ).css("background-color","#adad85");
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
		  });
var precio = 'Precio';
var estrellas = 'Estrellas';
$scope.applyFilters = false;
$scope.options = [precio,estrellas];
$scope.selservice = [ ];
$scope.ops = [ ];
$scope.valueOptions = [ ];
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
      templateUrl: 'template/form.html',
      controller: 'HomeController'
    });

  $stateProvider
    .state('hotel', {
      url: '/hotel',
      templateUrl: 'template/hotel3.html',
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

