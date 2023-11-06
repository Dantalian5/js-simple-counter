function valueValidator(value, max = 99) {
	// this function set the value of input between 0 & max, an mantain a 2 digits config.
	// Check if the value is an empty string or not a number
	if (value < 0 || value == "") {
		value = "00"; // Set the value to 0 if it's an empty string or not a number
	} else if (value < 10) {
		value = "0" + value; // Add a leading zero if it's less than 10
	} else if (value > max) {
		value = max; // Limit the value to 'max' if it's greater than this limit
	}
	return value;
}
function Alarm(soundActive = false, soundElement) {
	// Deploy an alert when timer is zero, and use a sound if requested
	if (soundActive) {
		soundElement.play();
		soundElement.onended = function () {
			alert("Time Over!");
		};
	} else {
		alert("Time Over!");
	}
}
export {valueValidator, Alarm};
