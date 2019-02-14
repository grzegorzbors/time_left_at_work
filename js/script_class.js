class TimeCounter {
    constructor(input) {
        // ustawienie atrybutów odpowiadających za input usera i obecną oraz koncową datę
        this.modalInput = input;
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
        let icon = '';

        // ustawienie ikony font awesome w zależności od tego, ile czasu zostało do końca pracy
        if(hours >= 6) {
            icon = '<i class="far fa-sad-cry"></i>';
        } else if(hours >= 4) {
            icon = '<i class="far fa-sad-tear"></i>';
        } else if(hours >= 3) {
            icon = '<i class="far fa-meh"></i>';
        } else if(hours >= 2) {
            icon = '<i class="far fa-frown-open"></i>';
        } else {
            icon = '<i class="far fa-grin"></i>';
        }

        // ustawienie wyświetlanego czasu
        const timeDisplay = `${hours}h ${minutes}min ${secs}sec... ${icon}`;
        counterElement.innerHTML = timeDisplay;

        // zmień background i tekst po dojściu licznika do 0
        if((hours+minutes+secs) === 0) {
            counterElement.innerHTML = `It's over! Go home, you workaholic! <i class="far fa-grin-tongue-squint"></i>`;
            document.querySelector('body').style.backgroundImage='url("./img/pexels-photo-302810-home.jpeg")';
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
            // this.userHourInput = prompt('Wpisz godzinę, o której kończysz pracę (format HH:MM)');
            this.userHourInput = this.modalInput;
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

class App {
    constructor() {
        // flaga określająca, czy już mamy wyświetlony element z ostrzeżeniem
        this.displayedWarning = false;
    }
    runApp() {
        // dodanie event listenera do buttona modala
        document.querySelector('#modalBtn').addEventListener('click', () => {
            // sprawdzenie, czy pole z czasem ma jakieś value
            if(document.querySelector('#hour-input').value !== '') {
                const counter = new TimeCounter(document.querySelector('#hour-input').value);
                counter.countTime();
                // usunięcie modala z ekranu
                document.querySelector('#modal').style.display = 'none';
            } else {
                this.createWarning();
            }
        });
    }

    // dodanie do modala wiadomości o źle wprowadzonej dacie
    createWarning() {
        if(!this.displayedWarning) {
            const modalElem = document.querySelector('.modal-content');
            const pElem = document.createElement('p');
            pElem.className = 'warning-sign';
            pElem.innerHTML = 'Please enter correct time...';
            modalElem.appendChild(pElem);
            this.displayedWarning = true;
        }
    }
}

const app = new App();
app.runApp();