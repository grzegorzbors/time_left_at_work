class TimeCounter {
    constructor() {
        // ustawienie atrybutów odpowiadających za input usera i obecną oraz koncową datę
        this.userHourInput = null;
        this.currDate = null;
        this.endDate = null;
    }

    countTime() {
        // element, gdzie ma się pokazywać godzina
        const counterElement = document.getElementById('time-left');
        // console.log(getTimeDifference());
        // ustawienie zmiennych odnoszących się do czasu
        const time = this.getTimeDifference();
        // console.log(time)
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const secs = time.getSeconds();
    
        const timeDisplay = `${hours}h ${minutes}min ${secs}sec... <i class="far fa-sad-tear"></i>`;
        counterElement.innerHTML = timeDisplay;

        if((hours+minutes+secs) === 0) {
            counterElement.innerHTML = `It's over! Go home, you workaholic! <i class="far fa-grin-tongue-squint"></i>`;
            document.querySelector('body').style.backgroundImage='url("../img/pexels-photo-302810-home.jpeg")';
            counterElement.classList.add('go-home');
            throw new Error('Go home!');
        }
        // console.log(this.userHourInput)
        // rekursywne wywołanie po sekundzie
        const t = setTimeout(this.countTime.bind(this), 1000);
    }

    getTimeDifference() {
        // zmienne do ustawienia godziny zakończenia pracy
        let hourToSet, minutesToSet, secsToSet;
        if(this.userHourInput === null) {
            // dialog proszący usera o podanie godziny powrotu do pracy
            this.userHourInput = prompt('Wpisz godzinę, o której kończysz pracę (format HH:MM)');
            // wykonaj, jeśli użytkownik poda godzinę
            // split inputu po znaku ':', żeby ustalić godzinę i minuty
            const splitInput = this.userHourInput.split(':');
            // zadeklarowanie i przypisan1ie odpowiednich elementów z array; array będzie zawsze [godzina, minuty]
            // poprawienie godziny ze względu na timezone offset
            const roznicaCzasu = (new Date().getTimezoneOffset() / 60);
            hourToSet = parseInt(splitInput[0]) + roznicaCzasu;
            minutesToSet = splitInput[1];
            secsToSet = 0;
            // ustawienie atrybutu klasy endDate na wyjście z pracy
            this.endDate = new Date(new Date().setHours(hourToSet, minutesToSet, secsToSet));
        }
            // stworzenie obiektów obecnej daty i daty, kiedy chcemy skończyć pracę, oraz różnicy
            this.currDate = new Date();
            const dateDiff = new Date(this.endDate - this.currDate);
    
            return dateDiff;
        }
    }

const counter = new TimeCounter();
counter.countTime();