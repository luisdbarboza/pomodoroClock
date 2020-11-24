class Timer {

    constructor() {
        this.running = false;
    }

    startTimer(minutes = 25, seconds = 60) {
        this.minutesLeft = minutes;
        this.secondsLeft = seconds;
        this.id = this.setTimer();
    }

    setTimer() {
        let id;
        let countdown = new Promise((resolve, reject) => {
            id = setInterval(() => {
                if (this.minutesLeft === 0 && this.secondsLeft === 0) {
                    clearInterval(id)
                    resolve('Se termino el tiempo dude');
                } else {
                    if (this.secondsLeft > 10)
                        console.log(`${this.minutesLeft}:${this.secondsLeft}`);
                    else
                        console.log(`${this.minutesLeft}:0${this.secondsLeft}`);

                    if (this.secondsLeft)
                        this.secondsLeft--;
                    else {
                        this.secondsLeft = 60;
                        this.minutesLeft--;
                    }
                }
            }, 1000);
        });

        countdown.then(msg => {
            console.log(msg);
            this.running = true;
        });

        return id;
    }

    pauseTimer() {
        clearInterval(this.id);
        this.running = true;
    }

    resumeTimer() {
        if (this.running) {
            this.startTimer(this.minutesLeft, this.secondsLeft);
            this.running = false;
        } else {
            console.error("No has pausado el temporizador");
        }
    }

    getTimerState() {
        return {
            running: this.running,
            minutesLeft: this.minutesLeft,
            secondsLeft: this.secondsLeft
        }
    }
}

export default Timer;
