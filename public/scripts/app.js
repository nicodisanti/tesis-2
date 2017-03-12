'use strict'
var appDespe = angular.module('testTesis', ['ui.router']);

appDespe.factory('hotelsFactory',function($http){
	return{
		getHotelsByDestination: function(destination){
			return $http.get('/api/hotel/CANCUN').then(function (response) {
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
$( "#prioridad").addClass('hidden');
$( "#opcionesOrdenamiento").removeClass('hidden');	
$( "#ordenar").addClass('hidden');

	var firstOrder = $('#firstOrder option:selected').text();
	var firstValue = $('#firstValue option:selected').text();
	if(firstOrder=="Precio"){
		firstOrder="price";
	}
	
	if(firstOrder=="Estrellas"){
		firstOrder="stars";
	}
	var secOrder = $('#secOrder option:selected').text();
	var secValue = $('#secValue option:selected').text();
	
	if(secOrder=="Precio"){
		secOrder="price";
	}
	
	if(secOrder=="Estrellas"){
		secOrder="stars";
	}
	
	$scope.customOrder = [];
	var customOrder = "";
	if(!firstOrder=="" || !firstValue==""){
		if(firstOrder!='Servicios'){
			if(firstValue=="Mayor a Menor"){
					firstOrder = "-".concat(firstOrder);
			}
			$scope.customOrder.push(firstOrder);			
			
		}else{
			firstValue = "-".concat(firstValue);
			$scope.customOrder.push(firstValue);
					}
		if(!secOrder=="" ||!secValue==""){
			
			if(secOrder!='Servicios'){
				if(secValue=="Mayor a Menor"){
					secOrder = "-".concat(secOrder);
				}
				$scope.customOrder.push(secOrder);
			}else{
				secValue = "-".concat(secValue);
				$scope.customOrder.push(secValue);
			}
		}
		console.log($scope.customOrder);
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
	$( "#estrellas" ).removeClass('active');
	$( "#servicios" ).removeClass('active');
	$( "#pago" ).removeClass('active');
	$( "#precio" ).addClass('active');
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#panelprecio" ).removeClass('hidden');
  };

$scope.showStars = function(){
	$( "#estrellas" ).addClass('active');
	$( "#servicios" ).removeClass('active');
	$( "#pago" ).removeClass('active');
	$( "#precio" ).removeClass('active');
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).removeClass('hidden');
  };


$scope.showServicios = function(){
	$( "#estrellas" ).removeClass('active');
	$( "#servicios" ).addClass('active');
	$( "#pago" ).removeClass('active');
	$( "#precio" ).removeClass('active');
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#panelservicios" ).removeClass('hidden');
  };


$scope.showPago = function(){
	$( "#estrellas" ).removeClass('active');
	$( "#servicios" ).removeClass('active');
	$( "#pago" ).addClass('active');
	$( "#precio" ).removeClass('active');
	$( "#panelservicios" ).addClass('hidden');
	$( "#panelprecio" ).addClass('hidden');
	$( "#panelpago" ).addClass('hidden');
	$( "#panelestrella" ).addClass('hidden');
 	$( "#panelpago" ).removeClass('hidden');
  };

$scope.applyPrecio = function(){
	$scope.applyFilters = false;
	$scope.showFilters =true;
 	$scope.noche=$scope.precio;
	$( "#panelprecio" ).addClass('hidden');      	
  };

$scope.applyPago = function(){
	$( "#panelpago" ).addClass('hidden');
	$scope.pagos = [];
	$scope.applyFilters = false;
	$scope.showFilters =true;
	$('input[name="pago"]:checked').each(function() {
	   $scope.pagos.push(this.value);
	});
};

$scope.applyStars = function(){
	$( "#panelestrella" ).addClass('hidden');	
	$scope.stars = [];
	$scope.applyFilters = false;
	$scope.showFilters =true;
 	$('input[name="estrellas"]:checked').each(function() {
   	$scope.stars.push(this.value);
});
};

$scope.applyServices = function(){
	$( "#panelservicios" ).addClass('hidden');
	$scope.obligatorio = [];
	$scope.selservice = [];
	$scope.deseable = [];
	$scope.applyFilters = false;
	$scope.showFilters =true;	
 	var wifi = $( "#wifi").find(":selected").text();
	var pileta = $( "#pileta").find(":selected").text();
	var recepcion = $( "#recepcion").find(":selected").text();
	var playa = $( "#playa").find(":selected").text();
	if(!$scope.options.includes("Servicios")&&!playa.isEmpty&&!wifi.isEmpty&&!pileta.isEmpty&&!recepcion.isEmpty){
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
		
			var wifi =  true;
			var playa =  true;
			var recepcion = true;
			var desayuno=true;		
			if($scope.obligatorio.includes("WIFI")){
				wifi = element.wifi		
			}
			if($scope.obligatorio.includes("desayuno")){
				desayuno = element.desayuno		
			}
			if($scope.obligatorio.includes("playa")){
				playa = element.playa		
			}
			if($scope.obligatorio.includes("recepcion")){
				recepcion = element.recepcion		
			}
			filterServices = wifi && playa && desayuno && recepcion;
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
	$( "#vacaciones" ).addClass('active');
	$( "#trabajo" ).removeClass('active');
        $( "#mensaje" ).addClass('hidden');        
	$( "#panelbotones" ).removeClass('hidden');
	$( "#panelfiltros" ).removeClass('hidden');
	$( "#servicios" ).removeClass('hidden');
	$( "#precio" ).removeClass('hidden');
	$( "#pago" ).removeClass('hidden');
	$( "#estrellas" ).removeClass('hidden');
	$( "#serviciosTrabajo" ).addClass('hidden');
	$( "#serviciosVacaciones" ).removeClass('hidden');
  };

$scope.showTrabajo = function(){
	$( "#filtros" ).removeClass('hidden');
	$( "#mensaje2" ).removeClass('hidden');
	$( "#mensaje3" ).removeClass('hidden');
	$( "#perfiles" ).removeClass('hidden');
 	$( "#panelvacaciones" ).removeClass('hidden');
	$( "#trabajo" ).addClass('active');
	$( "#vacaciones" ).removeClass('active');
        $( "#mensaje" ).addClass('hidden');        
	$( "#panelbotones" ).removeClass('hidden');
	$( "#panelfiltros" ).removeClass('hidden');
	$( "#servicios" ).removeClass('hidden');
	$( "#precio" ).removeClass('hidden');
	$( "#pago" ).removeClass('hidden');
	$( "#estrellas" ).removeClass('hidden');
	$( "#serviciosTrabajo" ).removeClass('hidden');
	$( "#serviciosVacaciones" ).addClass('hidden');
	
  };

$scope.showLujo = function(){
 	$( "#filtros" ).removeClass('hidden');
	$( "#mensaje2" ).removeClass('hidden');
	$( "#mensaje3" ).removeClass('hidden');
	$( "#perfiles" ).removeClass('hidden');
 	$( "#panelvacaciones" ).removeClass('hidden');
	$( "#vacaciones" ).addClass('active');
	$( "#trabajo" ).removeClass('active');
        $( "#mensaje" ).addClass('hidden');        
	$( "#panelbotones" ).removeClass('hidden');
	$( "#panelfiltros" ).removeClass('hidden');
	$( "#servicios" ).removeClass('hidden');
	$( "#precio" ).removeClass('hidden');
	$( "#pago" ).removeClass('hidden');
	$( "#estrellas" ).removeClass('hidden');
	$( "#serviciosTrabajo" ).addClass('hidden');
	$( "#serviciosVacaciones" ).removeClass('hidden');

	
  };

$scope.showPersonalizado = function(){
        $( "#filtros" ).removeClass('hidden');
	$( "#mensaje2" ).removeClass('hidden');
	$( "#mensaje3" ).removeClass('hidden');
	$( "#perfiles" ).removeClass('hidden');
 	$( "#panelvacaciones" ).removeClass('hidden');
	$( "#vacaciones" ).addClass('active');
	$( "#trabajo" ).removeClass('active');
        $( "#mensaje" ).addClass('hidden');        
	$( "#panelbotones" ).removeClass('hidden');
	$( "#panelfiltros" ).removeClass('hidden');
	$( "#servicios" ).removeClass('hidden');
	$( "#precio" ).removeClass('hidden');
	$( "#pago" ).removeClass('hidden');
	$( "#estrellas" ).removeClass('hidden');
	$( "#serviciosTrabajo" ).addClass('hidden');
	$( "#serviciosVacaciones" ).removeClass('hidden');

	
  };

     function init(){
		$scope.customOrder = ['-pileta','-stars'];
		$scope.hotels =[];
		hotelsFactory.getHotelsByDestination($stateParams.searchString).then(function(d) {
			d.forEach(function(item) {
   			$scope.hotels.push(item);
});			    
		  });
var precio = 'Precio';
var estrellas = 'Estrellas';
$scope.applyFilters = false;
$scope.showFilters =false;
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
$scope.noche;
$scope.algo2 = [ ];	
$scope.stars = [ ];
	}; 
     init();

});

appDespe.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider,$locationProvider) {

  $stateProvider
    .state('home', {
      url: '/despegar/home',
      templateUrl: 'template/form.html',
      controller: 'HomeController'
    });

$stateProvider
    .state('detail', {
      url: '/despegar/detail',
      templateUrl: 'template/detail.html'
    });

  $stateProvider
    .state('hotel', {
      url: '/despegar/hotel',
      templateUrl: 'template/hotel3.html',
      controller: 'HotelController',
      params: { searchString: {} }
    });
  $urlRouterProvider.otherwise('/despegar/home');
}]);
/*
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
*/
appDespe.factory('hotels', [function(){
  var o = {
    hotels: []
  };
  return h;
}]);

