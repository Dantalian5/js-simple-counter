export const Timer = {
	play: function () {
		--segundero;
		switch (true) {
			case valueCounter == 0:
				if (cycleCheck.checked) {
					valueCounterUpdate(0, true);
					timerDataUpdate(1, 30, 0);
				} else {
					timerReset();
					timerAlert();
				}
				break;
			case segundero == 0:
				segundero = 60;
				valueCounterUpdate(-1);
		}
		setMarkers(watchSegundero, segundero);
	},
	pause: function () {
		clearInterval(playTime);
		timerActive = false;
		pauseTime = setInterval(function () {
			timerDataUpdate(0, 0, 1);
		}, 1000);
	},
    reset function timerReset() {
        timerPause();
        segundero = 60;
        valueCounterUpdate(0, true);
        setMarkers(watchSegundero, 60);
    }
};
