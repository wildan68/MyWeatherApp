var root = new Vue({
    el: '#app',
    data() {
        return {
            info_main: null,
            info_sys: null,
            info_weather: null,
            info: null,
            loading: true,
            errored: false,
            searchCity: '',
            default_city: 'dubai',
        }
    },
    methods: {
        getWeather(city) {
            axios
                .get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=id&appid=ea8535a0ff11a4e50f1a25f6cedfa299')
                .then(response => {
                    this.info_main = response.data.main
                    this.info_sys = response.data.sys
                    this.info_weather = response.data.weather
                    this.info = response.data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        toInt(x) {
            return Math.floor(x)
        },
        toCelcius(x) {
            return x - 273;
        },
        capitalize(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        },
        searchCityBtn() {
            this.getWeather(this.searchCity)
        }
    },
    created() {
        axios
            .get('https://api.openweathermap.org/data/2.5/weather?q=' + this.default_city + '&lang=id&appid=ea8535a0ff11a4e50f1a25f6cedfa299')
            .then(response => {
                this.info_main = response.data.main
                this.info_sys = response.data.sys
                this.info_weather = response.data.weather
                this.info = response.data
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
    }
})