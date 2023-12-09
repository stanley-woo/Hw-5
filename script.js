class RatingWidget extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = '<h1>Rating Widget</h1>';
        const formy = document.getElementById('formy');
        document.getElementsByName('sentBy')[0].value = "JS";
        console.log(document.getElementsByName('sentBy'));
        this.stars = [];
        for(let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.textContent = '\u2606';
            star.style = "font-size: 3rem;";
            star.style.color = 'red';
            star.dataset.index = i;
            star.addEventListener('mouseover', this.mouseOver.bind(this));
            star.addEventListener('click', this.clickEvent.bind(this));
            this.stars.push(star);
        }
        async function yoasobi(){
            const request = await fetch('https://httpbin.org/post', {
                method: 'POST',
                body: new URLSearchParams(new FormData(formy)),
                headers : { 'X-Send-By': 'JS'},
            });
            console.log(request);
        }

        yoasobi();


        this.msg = document.createElement('p');
        this.msg.innerHTML = '';


        this.renderStars();

    }

    renderStars() {
        this.stars.forEach(star => {
            this.shadowRoot.appendChild(star);
        });

        this.stars.forEach((star, index) => {
            star.textContent = index < this.rating ? '\u2605' : '\u2606';
        });
    }

    mouseOver(event) {
        const hoverIndex = event.target.dataset.index;

        this.stars.forEach((star, index) => {
            star.textContent = index < hoverIndex ? '\u2605' : '\u2606';
        });
    }

    clickEvent(event) {
        const clickIndex = event.target.dataset.index;
        this.rating = clickIndex;
        if(this.rating >= 4) {
            this.msg.innerHTML = 'Thanks for the ' + this.rating + ' stars.';
            this.shadowRoot.appendChild(this.msg);
        }
        else {
            this.msg.innerHTML = 'Thanks for your feetback of ' + this.rating+ ' stars. We\'ll try to do better!';
            this.shadowRoot.appendChild(this.msg);
        }
        this.renderStars();
    }

}

class WeatherWidget extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.weatherTitle = document.createElement('h1');
        this.weatherTitle.innerHTML = "Current Weather";

        this.shadowRoot.appendChild(this.weatherTitle);
        this.logWeather();
    }

    async logWeather() {
        const response = await fetch('https://api.weather.gov/points/32.8328,-117.2713');
        const res = await response.json();
        const response2 = await fetch(res.properties.forecast);
        const res2 = await response2.json();
        const weatherJson = res2.properties.periods[0]
        this.weatherInfo = document.createElement('h2');
        const iconImg = document.createElement('img');
        iconImg.src = weatherJson.icon;
        iconImg.alt = 'Weather Icon';
        this.weatherInfo.innerHTML = weatherJson.detailedForecast
        this.shadowRoot.appendChild(iconImg);
        this.shadowRoot.appendChild(this.weatherInfo);
    }
}

window.customElements.define('rating-widget', RatingWidget);

window.customElements.define('weather-widget', WeatherWidget);

