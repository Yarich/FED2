// Prevent conflicts with other JS files
var SCOREAPP = SCOREAPP || {};

// Self-invoking anonymous function
(function () {
    // Make sure EMASCRIPT 5 is used
    "use strict";

    // SETTINGS
    SCOREAPP.settings = {
    //  scheduleURL:
        gameURL: 'https://api.leaguevine.com/v1/games',
        rankingURL: 'https://api.leaguevine.com/v1/pools/?tournament_id=19389&order_by=%5Bname%5D&access_token=bf1541681d'

    },

    // Controller Init
    SCOREAPP.controller = {

        // Initialize
        init: function () {
            console.log("1. CONTROLLER")
            // Initialize router
            SCOREAPP.router.init();
        }
    };

    // Router
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
                    SCOREAPP.page.schedule();
                }
            });
        },

        // Make pages change
        // Change selected section
        change: function (page) {
            //console.log("Router Change");

            console.log("Activate Loader");
            SCOREAPP.loader.show();

            //document.getElementById('URLlink').className = "";
            document.getElementById('URLschedule').className = "";
            document.getElementById('URLranking').className = "";
 
            console.log(page);
            
            switch (page){
                case 'schedule':
                    document.getElementById('URLschedule').className = "activelink";
                    break;

                case 'ranking':
                    document.getElementById('URLranking').className = "activelink";
                    break;
            }

            // Var route = section name
            var route = page            
            // Search all sections
            var    sections = qwery('section[data-route]')
            // Data route + section name = page location
            var   section = qwery('[data-route=' + route + ']')[0];

            // Show active section, hide all other sections
            if (section) {
                for (var i=0; i < sections.length; i++){
                    // Change the active section to non-active
                    sections[i].classList.remove('active');
                }
                // Make clicked section active
                section.classList.add('active');
            }

            // Default route ( FALLBACK )
            if (!route) {
                sections[0].classList.add('active');
            }
        }
    };

    // Data objects

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
            console.log("3. Render page ranking")

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
          
                /**** END LOADER ****/
                console.log("Hide Loader")
                SCOREAPP.loader.hide();
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
            console.log("3. Render page schedule")

            // API request
            promise.get('https://api.leaguevine.com/v1/games/?tournament_id=19389&pool_id=19219&access_token=16efeb5be0').then(function(error, text, xhr) {
                // Parse JSON string to JSON object
                var result = JSON.parse(text);

                var directives = {
                    // Go in objects
                    objects: {
                        // Make new value
                        thisID: {
                            // Make href
                            href: function(params) {
                                return "#/game/" + this.id;
                            }
                        },

                         date: {
                            text: function(params){
                                // Get Starttime from JSON Object
                                var startTime = new Date(this.start_time);
                                // Get Day the game is played on
                                var day = startTime.getDate();
                                // Get the month the game is played in +1 otherwise you'll show one month too early
                                var month = startTime.getMonth() + 1;
                                // Get the year the game is played in
                                var year = startTime.getFullYear();

                                var date = day + "/" + month + "/" + year;
                                return date;
                            }
                        }
                    }
                }

                SCOREAPP.schedule = result;

                Transparency.render(qwery('[data-route=schedule')[0], SCOREAPP.schedule, directives);
                
                /**** END LOADER ****/
                console.log("Hide Loader")
                SCOREAPP.loader.hide();
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
            console.log("3. Render page game", id);

            // Get game ID form URL
            var getID = window.location.hash.slice(6);
            // Log game ID
            console.log(getID);

            // API Request
            promise.get(SCOREAPP.settings.gameURL + getID + '/').then(function(error, text, xhr) {
                if (error) {
                alert('Error ' + xhr.status);
                return;
            }
            // SCOREAPP.poules objects from parse
            SCOREAPP.game = JSON.parse(text);

            // Render in 
            Transparency.render(qwery('[data-route=game')[0], SCOREAPP.game);
            console.log("SCOREAPP GAME = ", SCOREAPP.game);
            // Method name
            SCOREAPP.router.change("game");
            
            /**** END LOADER ****/
            console.log("Hide Loader")
            SCOREAPP.loader.hide();
            });

            // Get HTML element with id Update
            var el = document.getElementById('update');
            
            el.onclick = function () {
                SCOREAPP.eventListener.gameUpdateListener();
            }
        },
        
        postData: function(postID, team1Score, team2Score, endScore) {
                console.log('5. DATA POSTING')

                var type        =  'POST',
                    url         =  'https://api.leaguevine.com/v1/game_scores/',
                    postData    = JSON.stringify({
                        game_id: postID,
                        team_1_score: team1Score,
                        team_2_score: team2Score,
                        is_final: endScore
                    });

                // Create request
                var xhr = new XMLHttpRequest();

                // Open request
                xhr.open(type,url,true);

                // Set request headers
                xhr.setRequestHeader('Content-type','application/json');
                xhr.setRequestHeader('Authorization','bearer 82996312dc');

                // XHR State changes
                xhr.onreadystatechange = function() {
                    // If xhr readyState == 4 (Succes) do :
                    if (xhr.readyState==4){
                        console.log('6. DATA POSTED')
                        // Get HTML Element with id status
                        var statusdiv = document.getElementById("status");
                        console.log(statusdiv);
                        // Set this text in the variable "statusdiv" (div status)
                        statusdiv.innerHTML = "Score succesvol doorgevoerd";
                        // Remove classname
                        statusdiv.className = "";
                        // Update data after posting new score
                        var scoreData = {
                          team_1_score: team1Score,
                          team_2_score:  team2Score
                        };

                        Transparency.render(qwery('[data-route=game')[0], scoreData);
                        // After timeout remove pop up box and add class hide toe
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

                return false;
        }
    };

    SCOREAPP.eventListener = {
        gameUpdateListener: function() {
            console.log('4. DATA POSTING')

            
            console.log("Activate Loader");
            SCOREAPP.loader.show();


            // Get game ID from url
            var postID = window.location.hash.slice(7);
            // Get team 1 score from html
            var e = document.getElementById("team1Score");
            // Search element and select text from selected dropdown item  
            var team1Score = e.options[e.selectedIndex].text;
            // Get team 2 score from html
            var k = document.getElementById("team2Score");
            // Search element and select text from selected dropdown item                
            var team2Score = k.options[k.selectedIndex].text;

            // Get element with id "IsFinal"
            var checkBox = document.getElementById('isFinal');
            // Make var with string: "False"
            var endScore = "False";
            // If checkbox is checked endScore == "True"
            if(checkBox.checked) {
                endScore = "True";
            }

            SCOREAPP.page.postData(postID, team1Score, team2Score, endScore);
        }
    };

    SCOREAPP.loader = {
        show: function () {
            var d = document.getElementById("loader");
            d.classList.remove('loaded');
        },

        hide: function () {
            var d = document.getElementById("loader");
            d.className =  "loaded";
        }
    };

    


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