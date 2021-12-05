var root = new Vue({
    el: '#app',
    data: {
        api_key: 'ea8535a0ff11a4e50f1a25f6cedfa299',
        info_main: null,
        info_sys: null,
        info_weather: null,
        info: null,
        loading: true,
        load_anim: true,
        errored: false,
        searchCity: '',
        default_city: true,
        ip: null,
        ip_data: null,
        ip_me: '',
        not_found: false,
        country: null,
        forecast: null,
        days: [
            'Minggu',
            'Senin',
            'Selasa',
            'Rabu',
            'Kamis',
            "Jum'at",
            'Sabtu',
        ]
    },
    methods: {
        getWeather(city) {
            this.load_anim = true;
            axios
                .get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=id&appid=' + this.api_key)
                .then(response => {
                    this.info_main = response.data.main
                    this.info_sys = response.data.sys
                    this.info_weather = response.data.weather
                    this.info = response.data
                })
                .catch(error => {
                    console.log(error)
                    this.not_found = true
                })
                .finally(() => {
                    this.load_anim = false
                })
        },
        getForecast(city) {
            axios
                .get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&lang=id&cnt=5&appid=' + this.api_key)
                .then(response => {
                    this.forecast = response.data.list
                })
                .catch(error => {
                    console.log(error)
                    this.erored = true
                })
                .finally(() => {
                    this.loading = false
                })
        },
        getDays(i) {
            /*var d = new Date().getDate() + 2 + i
            if (d > 6) {
                d = i - 1
                return this.days[new Date().getDay()]
            } else {
                return this.days[new Date().getDay()]
            }*/
            var d = new Date().getDay() + i
            if (d > 6) {
                d = 0 - 1
                return this.days[d]
            } else {
                return this.days[d]
            }
        },
        getCountry(id) {
            return eval('this.country.' + id);
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
            this.getForecast(this.searchCity)
        }
    },
    mounted() {
        var ip = fetch("https://checkip.amazonaws.com/").then(res => res.text()).then(data => console.log(data))
        axios
            .get('https://api.ipify.org/?format=json')
            .then(response => {
                this.ip = response.data,
                    this.ip_me = this.ip.ip
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('https://ipapi.co/' + this.ip_me + '/json/')
            .then(response => {
                this.ip_data = response.data,
                    this.getWeather(this.ip_data.city),
                    this.getForecast(this.ip_data.city)
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
        axios
            .get('https://flagcdn.com/en/codes.json')
            .then(response => {
                this.country = response.data
            })
            .catch(error => {
                console.log(error)
                this.erored = true
            })
            .finally(() => {
                this.load_anim = false
            })

    },
})