// POST FABION TIP var e = document.getElementById("ddlViewBy");
// var strUser = e.options[e.selectedIndex].value;
// http://stackoverflow.com/questions/1085801/how-to-get-the-selected-value-of-dropdownlist-using-javascript

// Maak namespace aan zodat je geen conflicten krijgt met andere libraries 
var SCOREAPP = SCOREAPP || {};

// Self-invoking anonymous function
(function () {
	// Local scope == function scope == lexical scope
	// Zorgt ervoor dat je script in EMASCRIPT 5 draait	
	"use strict";

	// SETTINGS
	SCOREAPP.settings = {
	//	scheduleURL:
		gameURL: 'https://api.leaguevine.com/v1/games',
		rankingURL: 'https://api.leaguevine.com/v1/pools/?tournament_id=19389&order_by=%5Bname%5D&access_token=bf1541681d'

	},

	// Controller Init
	SCOREAPP.controller = {

		// Initialize; Dit is het eerste wat je wilt uitvoeren
		init: function () {
			console.log("1. CONTROLLER")
			// Initialize router
			SCOREAPP.router.init();
		}
	};

	// Router
	// Routie plugin helpt bij het navigeren tussen verschillende "pagina's" op één pagina
	SCOREAPP.router = {

		init: function () {
			console.log("2. ROUTER"),

	  		routie({

			    '/ranking': function(){
			    	SCOREAPP.page.ranking();
			    },

			    '/schedule': function(){
			    	SCOREAPP.page.schedule();
			    },

			    '/game/:id': function(id){
			    	SCOREAPP.page.game(id);
			    },

			    '/post/:id': function(id){
			    	SCOREAPP.page.post(id);
			    },

			    '*': function() {
			    	//home page of iets dergelijks
			    	//SCOREAPP.page.ranking();
			    }
			});
		},

		// Zorg ervoor dat de pagina's wisselen. 
		// Change de sectie die is aangegeven.
		change: function (page) {
			console.log("router.change ");

			// Var route = Pagina naam
            var route = page            
            // Zoek alle secties
            var    sections = qwery('section[data-route]')
            // Data route + sectie naam = de locatie van de pagina
            var   section = qwery('[data-route=' + route + ']')[0];


            // Laat actieve sectie zien en verberg te andere
            if (section) {
            	for (var i=0; i < sections.length; i++){
            		// Zet de sectie die actief is op non-actief
            		sections[i].classList.remove('active');
            	}
            	// Maak de sectie waarop geklikt is actief
            	section.classList.add('active');
            }

            // Default route ( FALLBACK )
            if (!route) {
            	sections[0].classList.add('active');
            }
        }

	};

	// Data objecten

	SCOREAPP.ranking = {

	};


	SCOREAPP.schedule = {

	};

	SCOREAPP.game = {

	};

	SCOREAPP.post ={
		name: "Post succes"
	};

	SCOREAPP.gamesTEST = {
		objects: [{

		}]
	};

	// Pages
	SCOREAPP.page = {


		//method
		ranking: function () {
			console.log("3. PAGE RENDEREN ranking")

			promise.get(SCOREAPP.settings.rankingURL).then(function(error, text, xhr) {
			    if (error) {
		    	    alert('Error ' + xhr.status);
		        	return;
		    	}
		    	
		    	// Omdat je een string krijgt moet je hem Parsen naar Javascript objecten om uit te kunnen lezen
		    	//console.log(JSON.parse(text));
		    	
		    	var result = JSON.parse(text);
		    	console.log(result);

		    	// SCOREAPP.poules zijn de objecten uit je parse
		    	SCOREAPP.ranking = JSON.parse(text);
		    	Transparency.render(qwery('[data-route=ranking')[0], SCOREAPP.ranking);
		    	SCOREAPP.router.change("ranking");
		    	
			});

			// SCOREAPP.router.change();
		},

		//method
		schedule: function () {
			console.log("3. PAGE RENDEREN  schedule")

			promise.get('https://api.leaguevine.com/v1/games/?tournament_id=19389&pool_id=19222&access_token=16efeb5be0').then(function(error, text, xhr) {
				// Omdat je een string krijgt moet je hem Parsen naar Javascript objecten om uit te kunnen lezen
		    	var result = JSON.parse(text);

				/*var filterGames = new Array();
                for (var i in result.objects) {
                    // zet alle games in een array om een game maar 1keer terug te krijgen. 
                    // Je krijgt natuurlijk meerdere, maar je kan maar 1 met dezelfde naam 
                    // hebben dus hij overschrijft hem steeds; de laatste (de nieuwste) blijf over
                    filterGames[result.objects[i].game_id] = result.objects[i];
                }

                // 	Zet overgebleven games terug in een object
                var game_count = 0;
                // Vervanging for each
                for (var game_id in filterGames) {
                	// Game count is zodat de array van het object netjes opbouwt
                	// Als je game id daar zet loopt browser vast
                    SCOREAPP.sortGames.objects[game_count] = filterGames[game_id];
                    game_count++;



                }*/

                var directives = {
                	objects: {
                		thisID: {
                			href: function(params) {
                				//console.log("params: " + params)
                				return "#/game/" + this.id;
                			}
                		}
                	}
                }

                var poolName = result.objects[0].name

                SCOREAPP.schedule = result;
                console.log('SCOREAPP.schedule +' , SCOREAPP.schedule);

		    	Transparency.render(qwery('[data-route=schedule')[0], SCOREAPP.schedule, directives);
			});

			SCOREAPP.router.change("schedule");
		},

		game: function (id) {
			console.log("3. PAGE RENDEREN game", pakID	);

			var pakID = window.location.hash.slice(6);
			console.log(pakID);

			promise.get(SCOREAPP.settings.gameURL + pakID + '/').then(function(error, text, xhr) {
								if (error) {
	    	    alert('Error ' + xhr.status);
	        	return;
	    	}
	    	// SCOREAPP.poules zijn de objecten uit je parse
	    	SCOREAPP.game = JSON.parse(text);

	    	var directives = {
	    			postID: {
	    				href: function(params){
	    					return "#/post/" + this.id;
	    				}
	    			}
	    	}

			Transparency.render(qwery('[data-route=game')[0], SCOREAPP.game, directives);
			console.log("SCOREAPP GAME = ", SCOREAPP.game);
			SCOREAPP.router.change("game");

			});


	    	//var knopPost = document.getElementById("updateScore");
	    	//var updateScoreBtn = knopPost.options[knopPost.selectedIndex].value;

	  //   	if (updateScoreBtn.addEventListener) {  // all browsers except IE before version 9
			//   updateScoreBtn.addEventListener("click", postTeamData, false);
			// } else {
			//   if (updateScoreBtn.attachEvent) {   // IE before version 9
			//     updateScoreBtn.attachEvent("click", postTeamData);
			//   }
			// }

			// SCOREAPP.router.change();

		},


		//MAAK NOG EEN POST SECTION AAN MET SUCCES ALS FEEDBACK
		post: function (id) {
			console.log("3. PAGE RENDEREN post succes", pakID	);
			var pakID = window.location.hash.slice(6);
			console.log(pakID);

	    	var directives = {
	    			backToGameID: {
	    				href: function(params){
	    					return "#/game" + pakID;
	    				}
	    			}
	    	}

	    	var type 		=  'POST',
				url  		=  'https://api.leaguevine.com/v1/game_scores/',
				postData 	= JSON.stringify({
					game_id: '129763',
				    team_1_score: '10',
				    team_2_score: '8',
				    //is_final: eindScore
				});

			// Create request
			var xhr = new XMLHttpRequest();

			// Open request
			xhr.open(type,url,true);

			// Set request headers
			xhr.setRequestHeader('Content-type','application/json');
			xhr.setRequestHeader('Authorization','bearer 82996312dc');

			// Send request (with data as a json string)
			xhr.send(postData);

			Transparency.render(qwery('[data-route=post')[0], SCOREAPP.post, directives);
			console.log("SCOREAPP GAME = ", SCOREAPP.game);
			SCOREAPP.router.change("post");


            /*** UPDATE SCORE ***/
   //          Set variables
			// var type 		=  'POST',
			// 	url  		=  'https://api.leaguevine.com/v1/game_scores/',
			// 	postData 	= JSON.stringify({
			// 		game_id: pakID,
			// 	    team_1_score: team_1_score,
			// 	    team_2_score: team_2_score,
			// 	    is_final: eindScore
			// 	});

			// // Create request
			// var xhr = new XMLHttpRequest();

			// // Open request
			// xhr.open(type,url,true);

			// // Set request headers
			// xhr.setRequestHeader('Content-type','application/json');
			// xhr.setRequestHeader('Authorization','bearer [access token]');

			// // Send request (with data as a json string)
			// xhr.send(postData);

			// if (click updatescore){

			// 	var e = document.getElementById("team1score");
			// 	var team_1_score = e.options[e.selectedIndex].text;
			// 	var k = document.getElementById("team2score");
			// 	var team_2_score = k.options[k.selectedIndex].text;
			// 	var is_final = document.getElementById("isFinal");
			// 	var eindScore = is_final.options[is_final.selectedIndex].text;
			// }

		}

	}
	// DOM ready
	// Gebruik om de app te initialiseren wanneer DOM = ready
	domready(function () {
		// Zorg ervoor dat de app gaat starten
		SCOREAPP.controller.init();
	});
	
})();