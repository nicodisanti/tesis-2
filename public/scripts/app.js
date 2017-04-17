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

$scope.generateRanking=function(){ 


	$scope.hotels.forEach(function(elem) {
		var desde =0;
		var hasta =0;
		var stars =0;
		var deseables=0;

		if(angular.isDefined($scope.preciodesde)&&$scope.preciodesde>=0){
				desde= $scope.preciodesde;
		}
		if(angular.isDefined($scope.preciohasta)&&$scope.preciohasta>=0){
				hasta=$scope.preciohasta;
		}

		var precio = getValorPrecio(desde,hasta,elem.price);
		var calidad =  getValorEstrellas(elem.stars);
		var deseables = getValorDeseables(elem);

		if (typeof precio != 'undefined'){
			elem.ranking = precio*0.2 + calidad*0.5 + deseables*0.3;		
			console.log("hotel "+elem.name + " precio: "+precio+" calidad:"+calidad+" deseables: "+deseables);		
		}
	});
}

function getValorDeseables(elem){

	
	if(angular.isDefined($scope.deseable)&&$scope.deseable.length >0){
		var deseables=$scope.deseable.length;
		var tiene=0;
		if(elem.pileta&&$scope.deseable.includes("pileta")){
			tiene++;		
		}	
		if(elem.cancelacion&&$scope.deseable.includes("cancelacion")){
			tiene++;		
		}
		if(elem.wifi&&$scope.deseable.includes("wifi")){
			tiene++;		
		}
		if(elem.recepcion&&$scope.deseable.includes("recepcion")){
			tiene++;		
		}
		if(elem.playa&&$scope.deseable.includes("playa")){
			tiene++;		
		}
		
		var perc = (deseables*100)/tiene;
		
		if(perc<=100){
			if(perc==50){
				return 3;
			}
			if(perc>60){
				return 5;
			}
			if(perc<40){
				return 1;		
			}
			if(perc>=40&&perc<50){
				return getVal(40,50,1,0,perc);
			}
			return this.getVal(50,60,0,1,perc)*3;
		}
		return 1;
	}else{
		return 5;
	}
}

function getValorPrecio(desde,hasta,precio){

	var perc = ((precio - desde)*100)/(hasta-desde);

	if(perc<=100){
		var barato = isBarato(perc);
		var medio = isMedio(perc);
		var caro = isCaro(perc);

		if(barato&&medio){
			var valBarato =  getVal(20,40,1,0,perc);
			var valMedio = getVal(20,30,0,1,perc);
				
			return valBarato > valMedio ? 5 : 3;
		}
		if(medio&&caro){
			var valMedio2 = getVal(70,80,1,0,perc);
			var valCaro = getVal(60,80,0,1,perc);
			return valMedio2 > valCaro ? 3 :1;	
		}
		if(caro){
			return 1; 	
		}
		if(medio){
			return 3;
		}	
		if(barato){
			return 5;			
		}
	}	
}

function getVal(x1,x2,y1,y2,perc){
	 return (((perc-x1)/(x2-x1))*(y2-y1))+y1;
}
function isBarato(perc){

	if(perc>=40){
		return false;
	}else{
		return true;
	}
}

function isMedio(perc){

	if(perc>=80||perc<=20){
		return false;
	}else{
		return true;
	}
}


function isCaro(perc){

	if(perc<=60){
		return false;
	}else{
		return true;
	}
}

function getValorEstrellas(estrellas){
	if(estrellas==1||estrellas==2){
		return 1; 	
	}
	if(estrellas==4||estrellas==5){
		return 5; 	
	}
	return 3;
}

$scope.ordenar=function(){ 

	$scope.customOrder =  [ ]; 
	var firstOrder = $('#order option:selected').text();
	
	if(firstOrder=="Por preferencias"){
		this.generateRanking();
		$scope.customOrder.push("-ranking");
		$scope.customOrder.push("-stars");
	}

	if(firstOrder=="Precio mayor a menor"){
		$scope.customOrder.push("-price");
	}
	if(firstOrder=="Precio menor a mayor"){
		$scope.customOrder.push("price");
	}
	if(firstOrder=="Estrellas menor a mayor"){
		$scope.customOrder.push("stars");
	}
	if(firstOrder=="Estrellas mayor a menor"){
		$scope.customOrder.push("-stars");
	}
}

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
 	$scope.desde=$scope.preciodesde;
	$scope.hasta=$scope.preciohasta;
	$( "#panelprecio" ).addClass('hidden');
this.updateCounters();
	this.aplicarFiltros();
};

$scope.applyPago = function(){
	$( "#panelpago" ).addClass('hidden');
	$scope.pagos = [];
	$scope.applyFilters = false;
	$scope.showFilters =true;
	$('input[name="pago"]:checked').each(function() {
	   $scope.pagos.push(this.value);
	});
	this.updateCounters();	
	this.aplicarFiltros();
};

$scope.applyStars = function(){
	$( "#panelestrella" ).addClass('hidden');	
	$scope.stars = [];
	$scope.applyFilters = false;
	$scope.showFilters =true;
 	$('input[name="estrellas"]:checked').each(function() {
   	$scope.stars.push(this.value);
	});
	this.updateCounters();
	this.aplicarFiltros();
};

$scope.applyServices = function(){

	$scope.obligatorio = [];
	$scope.selservice = [];
	$scope.deseable = [];
	$scope.obligatorioName = [];
	$scope.deseableName = [];
	$scope.applyFilters = false;
	$scope.showFilters =true;	
 	var wifi = $( "#wifi").find(":selected").text();
	var pileta = $( "#pileta").find(":selected").text();
	var recepcion = $( "#recepcion").find(":selected").text();
	var playa = $( "#playa").find(":selected").text();
	var cancelacion = $( "#cancelacion").find(":selected").text();
	
	if(!$scope.options.includes("Servicios")&&!playa.isEmpty&&!wifi.isEmpty&&!pileta.isEmpty&&!recepcion.isEmpty){
		$scope.options.push("Servicios");
	}
	if(wifi=="Imprescindible" ){
		if(!$scope.selservice.includes("wifi")){
			$scope.obligatorio.push("wifi");
			$scope.obligatorioName.push("Wifi");
			$scope.selservice.push("wifi");
		}		
	}
	if(wifi =="Deseable" ){
		if(!$scope.selservice.includes("wifi")){
		$scope.deseable.push("wifi");
		$scope.deseableName.push("Wifi");
		$scope.selservice.push("wifi");
		}		
	}		
 	 
	if(pileta=="Imprescindible" ){
		if(!$scope.selservice.includes("pileta")){
			$scope.obligatorio.push("pileta");
			$scope.obligatorioName.push("Pileta");		
			$scope.selservice.push("pileta");		
		}
	}
	if(pileta =="Deseable" ){
		if(!$scope.selservice.includes("pileta")){
			$scope.deseable.push("pileta");
			$scope.deseableName.push("Pileta");
			$scope.selservice.push("pileta");		
		}
	}

	if(recepcion=="Imprescindible" ){
		if(!$scope.selservice.includes("recepcion")){
		$scope.obligatorio.push("recepcion");
		$scope.obligatorioName.push("Recepción las 24 hs");
		$scope.selservice.push("recepcion");	
		}		
	}
	if(recepcion =="Deseable" ){
		if(!$scope.selservice.includes("recepcion")){
			$scope.deseable.push("recepcion");
			$scope.deseableName.push("Recepcion las 24 hs");
			$scope.selservice.push("recepcion");
		}		
	}

	if(playa=="Imprescindible" ){
		if(!$scope.selservice.includes("playa")){
			$scope.obligatorioName.push("Acceso a playa");
			$scope.obligatorio.push("playa");
			$scope.selservice.push("playa");
		}
				
	}
	if(playa =="Deseable" ){
		if(!$scope.selservice.includes("playa")){
			$scope.deseable.push("playa");
			$scope.deseableName.push("Acceso a playa");
			$scope.selservice.push("playa");
		}
	}
	if(cancelacion=="Imprescindible" ){
		if(!$scope.selservice.includes("cancelacion")){
			$scope.obligatorio.push("cancelacion");
			$scope.obligatorioName.push("Cancelacion gratuita");
			$scope.selservice.push("cancelacion");
		}		
	}
	if(cancelacion =="Deseable" ){
		if(!$scope.selservice.includes("cancelacion")){
		$scope.deseable.push("cancelacion");
		$scope.deseableName.push("Cancelacion gratuita");
		$scope.selservice.push("cancelacion");
		}		
	}

	this.updateCounters();
	this.aplicarFiltros();
};

$scope.updateCounters  =function (){

	$scope.cantwifi=0;
	$scope.cantpile=0;	
	$scope.cantrec=0;
	$scope.cantplaya=0;
	$scope.cantcanc=0;

	$scope.hotels.forEach(function(item) {
		

		var filterdesde = true;
		var filterhasta = true;
		var filterStars = true;
		var filterServices = true;
		if(angular.isDefined($scope.preciodesde)&&$scope.preciodesde>0){
			filterdesde= item.price >= $scope.preciodesde;
		}
		if(angular.isDefined($scope.preciohasta)&&$scope.preciohasta>0){
			filterhasta= item.price <= $scope.preciohasta;
		}
		if(angular.isDefined($scope.stars)&&$scope.stars.length>0){
			var stars = false;	
			$scope.stars.forEach((function(it) {
				if(it == item.stars)		
					stars=true;		
				}
				));
			filterStars = stars;
		}

		if(angular.isDefined($scope.obligatorio)&&$scope.obligatorio.length >0){
			var wifi =  true;
			var playa =  true;
			var recepcion = true;
			var cancelacion=true;		
			var pileta=true;			
		
			
			if($scope.obligatorio.includes("pileta")){
				pileta = item.pileta;		
			}
			if($scope.obligatorio.includes("wifi")){
				wifi = item.wifi;		
			}
			if($scope.obligatorio.includes("cancelacion")){
				desayuno = item.cancelacion;		
			}
			if($scope.obligatorio.includes("playa")){
				playa = item.playa;		
			}
			if($scope.obligatorio.includes("recepcion")){
				recepcion = item.recepcion		
			}

			var s = wifi&&playa&&recepcion&&cancelacion&&pileta;
			if(filterdesde&&filterhasta&&filterStars&item.wifi&&s){
				$scope.cantwifi++;			
			}
			if(filterdesde&&filterhasta&&filterStars&item.pileta&&s){
				$scope.cantpile++;			
			}
			if(filterdesde&&filterhasta&&filterStars&item.recepcion&&s){
				$scope.cantrec++;			
			}
			if(filterdesde&&filterhasta&&filterStars&item.cancelacion&&s){
				$scope.cantcanc++;			
			}
			if(filterdesde&&filterhasta&&filterStars&item.playa&&s){
				$scope.cantplaya++;			
			}
		}else{
			if(filterdesde&&filterhasta&&filterStars&item.wifi){
				$scope.cantwifi++;	
			}
			if(filterdesde&&filterhasta&&filterStars&item.pileta){
				$scope.cantpile++;			
			}
			if(filterdesde&&filterhasta&&filterStars&item.recepcion){
				$scope.cantrec++;			
			}
			if(filterdesde&&filterhasta&&filterStars&item.cancelacion){
				$scope.cantcanc++;			
			}
			if(filterdesde&&filterhasta&&filterStars&item.playa){
				$scope.cantplaya++;			
			}
		}
	});
}

var cant =0;
$scope.aplicarFiltros  = function(){
	$scope.applyFilters = true;
	$scope.cantstars=0;
	cant=0;
};


$scope.customFilter = function(element) {

	if($scope.applyFilters){
		var filterdesde = true;
		var filterhasta = true;
		var filterStars = true;
		var filterServices = true;
		if(angular.isDefined($scope.preciodesde)&&$scope.preciodesde>0){
			filterdesde= element.price >= $scope.preciodesde;
		}
		if(angular.isDefined($scope.preciohasta)&&$scope.preciohasta>0){
			filterhasta= element.price <= $scope.preciohasta;
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
			var cancelacion=true;		
			var pileta=true;			
		
			
			if($scope.obligatorio.includes("pileta")){
				pileta = element.pileta;		
			}
			if($scope.obligatorio.includes("wifi")){
				wifi = element.wifi;		
			}
			if($scope.obligatorio.includes("cancelacion")){
				cancelacion = element.cancelacion;		
			}
			if($scope.obligatorio.includes("playa")){
				playa = element.playa;		
			}
			if($scope.obligatorio.includes("recepcion")){
				recepcion = element.recepcion		
			}
			filterServices =pileta && wifi && playa && cancelacion && recepcion;
		}
		var result = filterdesde && filterhasta && filterServices && filterStars;
		return result;
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
				if(item.wifi){
					$scope.cantwifi++;
				}
				if(item.recepcion){
					$scope.cantrec++;
				}
				if(item.pileta){
					$scope.cantpile++;
				}
				if(item.playa){
					$scope.cantplaya++;
				}
				if(item.cancelacion){
					$scope.cantcanc++;
				}
			});
					    
		  });
var precio = 'Precio';
var estrellas = 'Estrellas';
$scope.applyFilters = false;
$scope.showFilters =false;
$scope.cantwifi=0;
$scope.cantrec=0;
$scope.cantpile=0;
$scope.cantplaya=0;
$scope.cantcanc=0;
$scope.options = [precio,estrellas];
$scope.deseableName  = [ ];
$scope.obligatorioName  = [ ];
$scope.selservice = [ ];
$scope.ops = [ ];
$scope.valueOptions = [ ];
$scope.obligatorio = [ ];
$scope.deseable = [ ];
$scope.pagos = [ ];
$scope.cantstars=0;
$scope.wifiopt=[ ];
$scope.cancopt=[ ];
$scope.pileopt=[ ];
$scope.recopt=[ ];
$scope.preciohasta;
$scope.preciodesde;
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

appDespe.factory('hotels', [function(){
  var o = {
    hotels: []
  };
  return h;
}]);

