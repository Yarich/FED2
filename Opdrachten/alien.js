/**
 *	Object constructor with argument, property & method
 *	
 *  var, this, comment, console (log, command line)
 */


function Persoon(name, food, walk) {
	this.name = name;
	this.food = food;
	this.walk = walk;
}

Persoon.prototype.speak = function () {
	console.log('Hi, my name is ' + this.name);
};

Persoon.prototype.eat = function () {
	console.log('I love ' + this.food);
};

Persoon.prototype.walk = function() {
	console.log('I am walking to ' + this.walk);
};


var Bob = new Persoon('Bob', 'Bami', 'School');

Bob.speak();
Bob.eat();
Bob.walk();