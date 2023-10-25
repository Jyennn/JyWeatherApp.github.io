const vm = Vue.createApp({
    data() {
      return {
        currentTempC: '',
        currentTempF: '',
        time: '',
        countryName: '',
        feelLikesC: '',
        feelLikesF: '',
        temperatureUnit: 'Celsius',
        icons: '',
        errorMessage: '',
        location: '',
      };
    },
    methods: {
      async searchWeather() {
        try {
            if(!this.location){
                alert('Input field is empty');
                return
            }
            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/current.json',
                params: { q: this.location },
                headers: {
                  'X-RapidAPI-Key': '7aabba8e77msh92b028a1cf53f46p1804dajsn7425f873876c',
                  'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                },
              };
      
              const res = await axios.request(options);
      
              this.currentTempC = res.data.current.temp_c + '°C';
              this.currentTempF = res.data.current.temp_f + '°F';
              this.countryName = res.data.location.name + ',' + res.data.location.country;
              this.feelLikesC = res.data.current.feelslike_c + '°C';
              this.feelLikesF = res.data.current.feelslike_f + '°F'; // corrected from feelslike_c
              this.condition = res.data.current.condition.text;
              this.time = new Date().toLocaleString();
              this.icons = res.data.current.condition.icon;
              console.log(res.data);
        } catch (err) {
            this.errorMessage = err.response.data.error.message;
        }
      },
    },
  });
  
  vm.mount('#app');
  