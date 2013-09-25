// Maak namespace aan zodat je geen conflicten krijgt met andere libraries
var SCOREAPP = SCOREAPP || {};

// Self-invoking anonymous function
(function () {
	// Local scope == function scope == lexical scope

	// Router
	// Routie plugin helpt bij het navigeren tussen verschillende "pagina's" op één pagina
	SCOREAPP.router = {
		init: function () {
	  		routie({
			    '/schedule': function() {
			    	//namescpaeobject.object.method
			    	SCOREAPP.page.schedule();
				},
			    '/game': function() {
			    	SCOREAPP.page.game();
			    },

			    '/ranking': function() {
			    	SCOREAPP.page.ranking();
			    },
			    '*': function() {
			    	SCOREAPP.page.schedule();
			    }
			});
		},

		// Zorg ervoor dat de pagina's wisselen. 
		change: function () {
            var route = window.location.hash.slice(2),
                sections = qwery('section[data-route]'), // Zoek alle sections op
                section = qwery('[data-route=' + route + ']')[0];  //data-route + "route" = is de locatie van de pagina

            // Laat actieve sectie zien en verberg te andere
            if (section) {
            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route ( FALLBACK )
            if (!route) {
            	sections[0].classList.add('active');
            }

		}
	};

	// Data objecten
	SCOREAPP.schedule = {
		items: [ 
		{ date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
	    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
	    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
	    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
	    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
	    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
	    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
	    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
	    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
	    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
	    ]
	};
	
	SCOREAPP.game = {
		items: [
		{ score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
	    { score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
	    { score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
	    { score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
	    { score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
	    { score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
	    { score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
	    { score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
	    { score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
	    { score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
	    { score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
	    { score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
	    { score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
	    { score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
	    { score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
	    { score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
	    { score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
	    { score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
	    { score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
	    { score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
	    { score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
	    { score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
	    { score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
	    ]

	    //if(SCOREAP.game.items[SCOREAP.game.items.length-1].team1Score > SCOREAP.game.items[SCOREAP.game.items.length-1].team2Score){
	    	// Team 1 is winnaar voeg * toe
	    //}else {
	    	// Team 2 is winnaar voeg * toe
	    //}
	};

	SCOREAPP.ranking = {
		items: [
	    { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
	    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
	    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
	    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
	    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
	    ]
	};
	
	// Controller Init
	SCOREAPP.controller = {
		// Initialize; Dit is het eerste wat je wilt uitvoeren
		init: function () {
			// Initialize router
			SCOREAPP.router.init();
		}
	};

	// Pages
	SCOREAPP.page = {
		//method
		schedule: function () {
			// Zoek de plek (data-route) in de html, waar je de SCOREAPP.schedule data in gaat verwerken
			// De [0] verwijst naar de eerste data-route schedule op de pagina (mochten er meerdere zijn)
			Transparency.render(qwery('[data-route=schedule')[0], SCOREAPP.schedule);
			SCOREAPP.router.change();
		},

		//method
		game: function () {
			Transparency.render(qwery('[data-route=game')[0], SCOREAPP.game);
			SCOREAPP.router.change();
		},

		//method
		ranking: function () {
			Transparency.render(qwery('[data-route=ranking')[0], SCOREAPP.ranking);
			SCOREAPP.router.change();
		}
	}
	// DOM ready
	// Gebruik om de app te initialiseren wanneer DOM = ready
	domready(function () {
		// Zorg ervoor dat de app gaat starten
		SCOREAPP.controller.init();
	});
	
})();