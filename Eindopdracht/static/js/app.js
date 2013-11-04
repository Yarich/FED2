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

			    '*': function() {
			    	//home page of iets dergelijks
			    	//SCOREAPP.page.ranking();
                    SCOREAPP.page.schedule();
			    }
			});
		},

		// Zorg ervoor dat de pagina's wisselen. 
		// Change de sectie die is aangegeven.
		change: function (page) {
			console.log("router.change");


			//document.getElementById('URLlink').className = "";
			document.getElementById('URLschedule').className = "";
			document.getElementById('URLranking').className = "";
 
            console.log(page);
            switch (page){
            	// case 'link':
             // 		document.getElementById('URLlink').className = "activelink";
            	// break;
            	case 'schedule':
            		document.getElementById('URLschedule').className = "activelink";
            		break;

           		case 'ranking':
            		document.getElementById('URLranking').className = "activelink";
            		break;
            }

			// Var route = section naam
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

	// Pages
	SCOREAPP.page = {
		//method
		ranking: function () {
			console.log("3. PAGE RENDEREN ranking")

            // Zoek html element met id Loader
			var d = document.getElementById("loader");
            // Verwijder class loaded
			d.classList.remove('loaded');
            // API request
			promise.get(SCOREAPP.settings.rankingURL).then(function(error, text, xhr) {
			    if (error) {
		    	    alert('Error ' + xhr.status);
		        	return;
		    	}
		    	// Parse result naar JSON object
		    	var result = JSON.parse(text);
		    	console.log(result);

		    	// SCOREAPP.poules zijn de objecten uit je parse
		    	SCOREAPP.ranking = JSON.parse(text);
		    	Transparency.render(qwery('[data-route=ranking')[0], SCOREAPP.ranking);
		  
		    	// Voeg class Loaded toe
            	d.className =  "loaded";
			});

            // Gestures
			var elementPage = document.getElementById('rankingPage');
		    // Hammer(elementPage).on("swipeleft", function(event) {
		    //     routie('/home');
		    // });
            // Swipe right and route to schedule
		    Hammer(elementPage).on("swiperight", function(event) {
		        routie('/schedule');
		    });

            SCOREAPP.router.change("ranking");
		},

		//method
		schedule: function () {
			console.log("3. PAGE RENDEREN  schedule")

            // Zoek een element met het ID Loader
			var d = document.getElementById("loader");
            // Verwijder class Loaded
			d.classList.remove('loaded');

            // API request
			promise.get('https://api.leaguevine.com/v1/games/?tournament_id=19389&pool_id=19219&access_token=16efeb5be0').then(function(error, text, xhr) {
				// Omdat je een string krijgt moet je hem Parsen naar Javascript objecten om uit te kunnen lezen
		    	var result = JSON.parse(text);

                var directives = {
                    // Ga in objects
                	objects: {
                        // Maak een nieuwe value aan met de volgende waardes
                		thisID: {
                            // Maak een href een link aan
                			href: function(params) {
                				//console.log("params: " + params)
                				return "#/game/" + this.id;
                			}
                		},

                         date: {
                            text: function(params){
                                var startTime = new Date(this.start_time);
                                var day = startTime.getDate();
                                var month = startTime.getMonth() + 1;
                                var year = startTime.getFullYear();

                                var date = day + "/" + month + "/" + year;
                                return date;
                            }
                        }
                	}
                }


                SCOREAPP.schedule = result;
                console.log('Renderen voltooid');

		    	Transparency.render(qwery('[data-route=schedule')[0], SCOREAPP.schedule, directives);
		    	// Voeg class Loaded toe
            	d.className =  "loaded";
			});

            // Gestures to navigate
			var element = document.getElementById('schedulePage');
            // Swipe left en route naar ranking
		    var hammertime = Hammer(element).on("swipeleft", function(event) {
		        routie('/ranking');
		    });

			SCOREAPP.router.change("schedule");
		},

		game: function (id) {
			console.log("3. PAGE RENDEREN game", id);
			
            // Pak Loader en verwijder class Loaded
            var d = document.getElementById("loader");
			d.classList.remove('loaded');

            // Pak het game ID uit de URL
			var pakID = window.location.hash.slice(6);
            // Log het game ID
			console.log(pakID);

            // API Request
			promise.get(SCOREAPP.settings.gameURL + pakID + '/').then(function(error, text, xhr) {
				if (error) {
	    	    alert('Error ' + xhr.status);
	        	return;
	    	}
	    	// SCOREAPP.poules zijn de objecten uit je parse
	    	SCOREAPP.game = JSON.parse(text);


	    	// Route naar de game sectie
			Transparency.render(qwery('[data-route=game')[0], SCOREAPP.game);
			console.log("SCOREAPP GAME = ", SCOREAPP.game);
			// Method name
			SCOREAPP.router.change("game");
			
			// Voeg class Loaded toe
            d.className =  "loaded"
			});

            // Zoek html element met ID update
			var el = document.getElementById('update');
            // Als erop geklikt wordt voer functie PostData uit
			el.onclick = postData;

            // Post data (Update score)
			function postData() {
				console.log('4. DATA WORDT GEPOST')
				
                // Zoek element met het ID Loader
				var d = document.getElementById("loader");
                // Verwijder de class Loaded
				d.classList.remove('loaded');

                // Pak game ID uit de URL balk
				var postID = window.location.hash.slice(7);
				// Haal team 1 score uit de html
				var e = document.getElementById("team1Score");
                // Zoek geselecteerde element in de dropdown en neem de text
				var team1Score = e.options[e.selectedIndex].text;
				// Haal team 2 score uit de html
				var k = document.getElementById("team2Score");
                // Zoek geselecteerde element in de dropdown en neem de text                
				var team2Score = k.options[k.selectedIndex].text;

                // Zoek een element met het ID isFinal
				var checkBox = document.getElementById('isFinal');
                // Maak variabele met een tekst "False"
				var eindScore = "False";
                // Als checkbox is gechecked eindScore == "True"
				if(checkBox.checked)
				{
					eindScore = "True";
				}

		    	var type 		=  'POST',
					url  		=  'https://api.leaguevine.com/v1/game_scores/',
					postData 	= JSON.stringify({
						game_id: postID,
					    team_1_score: team1Score,
					    team_2_score: team2Score,
					    is_final: eindScore
					});

				// Create request
				var xhr = new XMLHttpRequest();

				// Open request
				xhr.open(type,url,true);

				// Set request headers
				xhr.setRequestHeader('Content-type','application/json');
				xhr.setRequestHeader('Authorization','bearer 82996312dc');

                // De staat van het xhr verandert
				xhr.onreadystatechange = function() {
                    // Als xhr readyState == 4 (Succes) doe dan het volgende
				    if (xhr.readyState==4){
                        // Zoek een html element met het id status
				        var statusdiv = document.getElementById("status");
				        console.log(statusdiv);
                        // Voeg deze tekst toe aan het variabele statusdiv oftewel div Status
					    statusdiv.innerHTML = "Score succesvol doorgevoerd";
                        // Haal className weg
					    statusdiv.className = "";
                        // Update data meteen met de variabeles die gepost worden
						var scoreData = {
						  team_1_score: team1Score,
						  team_2_score:  team2Score
						};

						Transparency.render(qwery('[data-route=game')[0], scoreData);
                        // Na timeout verwijder pop up box voeg class hide toe
					setTimeout(function(){
						statusdiv.className = "hide";
					},15000);


				  } else {  
				      //console.log("Error", xhr.statusText);  
				    }  
				 }

				// Send request (with data as a json string)
				xhr.send(postData);
				// Maak de sectie waarop geklikt is actief
          		  d.className =  "loaded";
          		return false;
    		}

		}

	}

    /**
     * requestAnimationFrame and cancel polyfill
     */
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };


    /**
     * pull to refresh
     * @type {*}
     */
    var PullToRefresh = (function() {
        function Main(container, slidebox, slidebox_icon, handler) {
            var self = this;

            this.breakpoint = 80;

            this.container = container;
            this.slidebox = slidebox;
            this.slidebox_icon = slidebox_icon;
            this.handler = handler;

            this._slidedown_height = 0;
            this._anim = null;
            this._dragged_down = false;

            this.hammertime = Hammer(this.container)
                .on("touch dragdown release", function(ev) {
                    self.handleHammer(ev);
                });
        };


        /**
         * Handle HammerJS callback
         * @param ev
         */
        Main.prototype.handleHammer = function(ev) {
            var self = this;

            switch(ev.type) {
                // reset element on start
                case 'touch':
                    this.hide();
                    break;

                // on release we check how far we dragged
                case 'release':
                    if(!this._dragged_down) {
                        return;
                    }

                    // cancel animation
                    cancelAnimationFrame(this._anim);

                    // over the breakpoint, trigger the callback
                    if(ev.gesture.deltaY >= this.breakpoint) {
                        container_el.className = 'pullrefresh-loading';
                        pullrefresh_icon_el.className = 'icon loading';

                        this.setHeight(60);
                        this.handler.call(this);
                    }
                    // just hide it
                    else {
                        pullrefresh_el.className = 'slideup';
                        container_el.className = 'pullrefresh-slideup';

                        this.hide();
                    }
                    break;

                // when we dragdown
                case 'dragdown':
                    this._dragged_down = true;

                    // if we are not at the top move down
                    var scrollY = window.scrollY;
                    if(scrollY > 5) {
                        return;
                    } else if(scrollY !== 0) {
                        window.scrollTo(0,0);
                    }

                    // no requestAnimationFrame instance is running, start one
                    if(!this._anim) {
                        this.updateHeight();
                    }

                    // stop browser scrolling
                    ev.gesture.preventDefault();

                    // update slidedown height
                    // it will be updated when requestAnimationFrame is called
                    this._slidedown_height = ev.gesture.deltaY * 0.4;
                    break;
            }
        };


        /**
         * when we set the height, we just change the container y
         * @param   {Number}    height
         */
        Main.prototype.setHeight = function(height) {
            if(Modernizr.csstransforms3d) {
                this.container.style.transform = 'translate3d(0,'+height+'px,0) ';
                this.container.style.oTransform = 'translate3d(0,'+height+'px,0)';
                this.container.style.msTransform = 'translate3d(0,'+height+'px,0)';
                this.container.style.mozTransform = 'translate3d(0,'+height+'px,0)';
                this.container.style.webkitTransform = 'translate3d(0,'+height+'px,0) scale3d(1,1,1)';
            }
            else if(Modernizr.csstransforms) {
                this.container.style.transform = 'translate(0,'+height+'px) ';
                this.container.style.oTransform = 'translate(0,'+height+'px)';
                this.container.style.msTransform = 'translate(0,'+height+'px)';
                this.container.style.mozTransform = 'translate(0,'+height+'px)';
                this.container.style.webkitTransform = 'translate(0,'+height+'px)';
            }
            else {
                this.container.style.top = height+"px";
            }
        };


        /**
         * hide the pullrefresh message and reset the vars
         */
        Main.prototype.hide = function() {
            container_el.className = '';
            this._slidedown_height = 0;
            this.setHeight(0);
            cancelAnimationFrame(this._anim);
            this._anim = null;
            this._dragged_down = false;
        };


        /**
         * hide the pullrefresh message and reset the vars
         */
        Main.prototype.slideUp = function() {
            var self = this;
            cancelAnimationFrame(this._anim);

            pullrefresh_el.className = 'slideup';
            container_el.className = 'pullrefresh-slideup';

            this.setHeight(0);

            setTimeout(function() {
                self.hide();
            }, 500);
        };


        /**
         * update the height of the slidedown message
         */
        Main.prototype.updateHeight = function() {
            var self = this;

            this.setHeight(this._slidedown_height);

            if(this._slidedown_height >= this.breakpoint){
                this.slidebox.className = 'breakpoint';
                this.slidebox_icon.className = 'icon arrow arrow-up';
            }
            else {
                this.slidebox.className = '';
                this.slidebox_icon.className = 'icon arrow';
            }

            this._anim = requestAnimationFrame(function() {
                self.updateHeight();
            });
        };

        return Main;
    })();

    function getEl(id) {
        return document.getElementById(id);
    }

    var container_el = getEl('container');
    var pullrefresh_el = getEl('pullrefresh');
    var pullrefresh_icon_el = getEl('pullrefresh-icon');
    var image_el = getEl('random-image');

    var refresh = new PullToRefresh(container_el, pullrefresh_el, pullrefresh_icon_el);

    // update image onrefresh
    refresh.handler = function() {
        var self = this;
        // a small timeout to demo the loading state
        setTimeout(function() {
               //SCOREAPP.page
               refreshPage();
               self.slideUp();
        }, 1000);
    };

    function refreshPage() {
    	var locatie = window.location.hash.slice(2);
    	console.log(locatie);

    	switch(locatie)
			{
			case 'schedule':
			  SCOREAPP.page.schedule();
			  break;
			case 'ranking':
			  SCOREAPP.page.ranking();
			  break;
			}
    }
	// DOM ready
	// Gebruik om de app te initialiseren wanneer DOM = ready
	domready(function () {
		// Zorg ervoor dat de app gaat starten
		SCOREAPP.controller.init();
	});
	
})();