(function () {

	// CONSTRUCTOR
	this.randomQuote = function () {

		//-------------------------------------------------------------------------------------------//
		// GET QUOTE --------------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function getQuoteFile(file) {
			var theFile = new XMLHttpRequest();
			theFile.open("GET", file, false);
			theFile.onreadystatechange = function () {
				if (theFile.readyState === 4) {
					if (theFile.status === 200 || theFile.status == 0) {
						var theFileContents = theFile.responseText;
						displayQuote(theFileContents);
					}
				}
			}
			theFile.send(null);
		}

		//-------------------------------------------------------------------------------------------//
		// DISPLAY QUOTE ----------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function displayQuote(a) {
			var quotes = a.split("\n"),
				randomNumber = Math.random(length),
				theQuote = document.getElementById("randomQuote"),
				quoteNumber;
			// SHOW TEXT ONE AT A TIME
			quoteNumber = getRandomInt.set(quotes.length);
			showText(theQuote, quotes[quoteNumber], 1000, function () {
				hideText(theQuote, 2500, function () {
					displayQuote(a)
				})
			})
		}

		//-------------------------------------------------------------------------------------------//
		// RANDOM INTEGER ---------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//
		let getRandomInt = (function () {

			let oldnumber = null;

			function previousNum(newnumber) {
				oldnumber = newnumber
				return oldnumber
			}

			function set(max) {
				i = Math.floor(Math.random() * Math.floor(max - 1));

				while (i === oldnumber) {
					i = Math.floor(Math.random() * Math.floor(max - 1));
				}
				previousNum(i)
				return i
			}

			function get() {
				return i;
			}

			return {
				set: set,
				get: get
			}

		})()

		//-------------------------------------------------------------------------------------------//
		// SHOW TEXT --------------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function showText(el, value, interval, cb) {
			setTimeout(function () {
				fadeIn(el, value);
				typeof cb === 'function' && cb();
			}, interval);
		}

		//-------------------------------------------------------------------------------------------//
		// HIDE TEXT --------------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function hideText(value, interval, cb) {
			setTimeout(function () {
				fadeOut(value);
				typeof cb === 'function' && cb();
			}, interval);
		}

		//-------------------------------------------------------------------------------------------//
		// FADEOUT ----------------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function fadeOut(el) {
			el.style.opacity = 1;
			el.innerHTML = "";
			(function fade() {
				if ((el.style.opacity -= .1) < 0) {
					el.style.display = "none";
				} else {
					requestAnimationFrame(fade);
				}
			})();
		}

		//-------------------------------------------------------------------------------------------//
		// FADEIN -----------------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function fadeIn(el, value, display) {
			el.style.opacity = 0;
			el.style.display = display || "block"; // default if not specified
			el.innerHTML = value;
			(function fade() {
				var val = parseFloat(el.style.opacity);
				if (!((val += .1) > 1)) {
					el.style.opacity = val;
					requestAnimationFrame(fade);
				}
			})();
		}

		//-------------------------------------------------------------------------------------------//
		// GET QUOTES FROM TEXT FILE ----------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		getQuoteFile("quotes.txt");


	} // END CONSTRUCTOR

}());


var randomQuote = new randomQuote();
