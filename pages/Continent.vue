<template>
<b-card title="Continent" sub-title="counting cont's" class="text-left">


   <b-row align-h="end">
     <b-col cols="1">
      <b-button @click="givup()" variant="danger"  >Give Up</b-button>
     </b-col>
     <b-col cols="1">
      <b-button @click="reset()" variant="primary" >Reset</b-button> 
      </b-col>
  </b-row>
   
    
    <b-row>
      <b-col>
        <label for="field1">Find all the countries of <b >{{pickedContinent}}</b></label>
      </b-col>

    </b-row>
   
    <b-row >
      <b-col class="sm-12">
        <AutoComplete @submit="Submit" :items="countryNames"/>
      </b-col>
    </b-row>
    <b-row >
      <b-col>
        <b-alert :show="countDown"
                variant="warning"
                @dismissed="countDown=0"
                @dismiss-count-down="countDownChanged">
          <p>You got {{countDown}} seconds remaining...</p>
          <b-progress variant="warning"
                      :max="dismissSecs"
                      :value="countDown"
                      height="4px">
          </b-progress>
        </b-alert>
      </b-col>
    </b-row>
   <b-alert  show dismissible  v-for="(answer,i) in answers" :key="i" :variant="answer.valid ? 'success' : 'danger'">{{answer.name}}</b-alert>

   <b-row class="align-items-center justify-content-center">
      <b-col class="sm-12">

        <div class="mapContainer"><Map class="map" :answers="answers" /></div>
      </b-col>
   </b-row >
  <b-modal ref="congrats">
      {{Win ? 'Bravo ! You are still the best !' : 'Looser ! the answer was: '}}<span v-html="prettyfy(this.solution)"></span>
  </b-modal>

</b-card>
</template>



<script>
import countries from '@/static/countries.json';
import Map from '@/components/Map';
import AutoComplete from '@/components/AutoComplete';

export default {
	components: {
		Map,
		AutoComplete,
	},
	data: function() {
		return {
			data: [],
			typed: '',
			selected: null,
			answers: [],
			dismissSecs: 300,
			countDown: 300,
			countries,
			seed: Math.random(),
			Win: false,
			goodAnswers:0
		};
	},
	computed: {
		pickedContinent() {
			return this.filteredCountries[Math.floor(this.seed * this.filteredCountries.length)].continent;
		},
		filteredCountries() {
			let a = this.countries.filter(c => {
				return c.continent.length > 0 
			});

			return a;
		},
		countryNames() {
			return this.filteredCountries.map(c => c.countryName);
		},
		countryContinents(){
			return  this.filteredCountries.reduce(function(map, obj) {
					map[obj.countryName] = obj.continent;
					return map;
			}, {});
			
		},
		solution(){
			return  this.filteredCountries
			.filter( c=>{
				return c.continent == this.pickedContinent
			}).map(c=> c.countryName);
			
		}
	},

	methods: {
		prettyfy(arr){
			return arr.join('<br>')
		},
		reset() {
			this.answers = [];
			this.countDown = 10;
			this.seed = Math.random();
		},
		givup() {
			this.countDownChanged(0);
		},
		countDownChanged(countDown) {
			this.countDown = countDown;
			if (this.countDown == 0) {
				this.$refs.congrats.show();
			}
		},
		Submit(val) {
			console.log('submit', val);
			if (!val) return; // avoid null trigger
			console.log(this.solution)
			this.answers.unshift({
				id: this.answers.length,
				name: val,
				valid: this.countryContinents[val] == this.pickedContinent,
			});

			this.name = '';
			if (this.answers[0].valid) {
				this.goodAnswers++;
			}
			if(this.goodAnswers == this.solution.length){
				this.Win = true;
				this.countDown = 0;
				this.$refs.congrats.show();
			}
		},
	},
};
</script>

<style>
.map {
	margin: 30px;

	text-align: center;
}
.mapContainer {
	padding: 0;
	margin: 0;
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: center;
}
button:active {
	transform: translateY(2px);
}
input {
	margin-bottom: 10px;
}
.modal-header {
	display: none;
}
.modal-footer {
	display: none;
}
</style>

