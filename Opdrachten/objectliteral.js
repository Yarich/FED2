/**
 *	Object constructor with argument, property & method
 *	
 *  var, this, comment, console (log, command line)
 */

var Persoon = {
	name: 'Bob',
	food: 'Roti',
	walking: 'school',
	
	/*speak: function () {
		console.log('Hi, my name is ' + this.name);
		console.log('I love to eat ' + this.food);
		console.log('Iam walking to ' + this.walking);
	}*/
	
	speak: function () {
		console.log('Hi, my name is ' + this.name);
	}

	eat: function () {
		console.log('I love to eat ' + this.food);
	};
	
	walk: function () {
		console.log('Iam walking to ' + this.walking);
	};


		// console.log("This is:" + this.constructor);
}

Persoon.speak();

	/* console.log('Hi my name is ' + Persoon.name);
	console.log('I love to eat ' + Persoon.food);
	console.log('Iam walking to ' + Persoon.walking);
	*/
