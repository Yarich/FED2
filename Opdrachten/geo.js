/***
* cmdaan.js
*	Bevat functies voor CMDAan stijl geolocatie welke uitgelegd
*	zijn tijdens het techniek college in week 5.
*
*	Author: J.P. Sturkenboom <j.p.sturkenboom@hva.nl>
* 	Credit: Dive into html5, geo.js, Nicholas C. Zakas
*
*	Copyleft 2012, all wrongs reversed.
*/

// Variable declaration
var SANDBOX = "SANDBOX";
var LINEAIR = "LINEAIR";
var GPS_AVAILABLE = 'GPS_AVAILABLE';
var GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
var POSITION_UPDATED = 'POSITION_UPDATED';
var REFRESH_RATE = 1000;
var currentPosition = currentPositionMarker = customDebugging = debugId = map = interval =intervalCounter = updateMap = false;
var locatieRij = markerRij = [];


var SPACE = SPACE || {}


(function(){
	// Test of GPS beschikbaar is (via geo.js) en vuur een event af
	SPACE.gps = {
		
		init: function() {
			debugMessage("Controleer of GPS beschikbaar is...");
			ET.addListener(GPS_AVAILABLE, startInterval);
			ET.addListener(GPS_UNAVAILABLE, function(){debugMessage('GPS is niet beschikbaar.')});
		},
		
		startInterval: function() {
			self = this;
			(geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);
		    debugMessage("GPS is beschikbaar, vraag positie.");
		    updatePosition();
		    interval = self.setInterval(updatePosition, REFRESH_RATE);
		    ET.addListener(POSITION_UPDATED, self.checkLocations);
		},
		
		// Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
		updatePosition: function() {
		    intervalCounter++;
		    geo_position_js.getCurrentPosition(setPosition, geoErrorHandler, {enableHighAccuracy:true});	
		},
		
		// Callback functie voor het instellen van de huidige positie, vuurt een event af
		setPosition: function() {
			currentPosition = position;
		    ET.fire("POSITION_UPDATED");
		    debugMessage(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);		
		},
		
		// Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
		checkLocations: function() {

		},	
		
		// Bereken het verchil in meters tussen twee punten
		calculateDistance: function() {
			
		}
	
	};
	
	
		// GOOGLE MAPS FUNCTIES
		/**
		 * generate_map(myOptions, canvasId)
		 *	roept op basis van meegegeven opties de google maps API aan
		 *	om een kaart te genereren en plaatst deze in het HTML element
		 *	wat aangeduid wordt door het meegegeven id.
		 *
		 *	@param myOptions:object - een object met in te stellen opties
		 *		voor de aanroep van de google maps API, kijk voor een over-
		 *		zicht van mogelijke opties op http://
		 *	@param canvasID:string - het id van het HTML element waar de
		 *		kaart in ge-rendered moet worden, <div> of <canvas>
		 */
	SPACE.maps = {
		
		generateMap: function() {
			
		},
	
		// Update de positie van de gebruiker op de kaart		
		updatePositie: function() {
			
		}
			
	};
		
	// FUNCTIES VOOR DEBUGGING
	SPACE.debug = {
	
		geoErrorHandler: function() {
			
		},
		
		debugMessage: function() {
			
		},
		
		setCustomDebugging: function() {
			
		}
	};
	
	var helper {
		isNumber: function() {
			
		},
	}
});