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
        <label for="field1">Find all the {{name}} of <b >{{picked}}</b></label>
      </b-col>

    </b-row>
   
    <b-row >
      <b-col class="sm-12">
        <AutoComplete @submit="Submit" :items="possybilityStringArray"/> 
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
      {{Win ? 'Bravo ! You are still the best !' : 'Looser ! the answer was: '}}<span v-html="prettyfy(this.solutions)"></span>
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
	props: {
		name: {
			type: String,
			default: 'Continents',
			required: false,
		},
		dismissSecs: {
			type: Number,
			default: 300,
			required: false,
		},
		showClues: {
			type: Boolean,
			default: false,
			required: false,
		},
		possibilityFilter: {
			type: Function,
			default: c => {
				return c.continent.length > 0;
			},
			required: false,
		},
		possibilityMapping: {
			type: Function,
			default: c => {
				return c.countryNames;
			},
			required: false,
		},
		answersMapping: {
			type: Function,
			default: picked => {
				console.log(picked);
				return function(map, c) {
					if (c.continent == picked.continent) {
						if (!map[c.countryName]) map[c.countryName] = [];
						map[c.countryName].push(c.countryName);
					}
				};
			},
			required: false,
		},
		isAnswer: {
			type: Function,
			default: (solutions, ans) => {
				console.log(solutions);
				for (let c of solutions) {
					if (c.toLowerCase().includes(ans.toLowerCase())) {
						return true;
					}
				}
				return false;
			},
			required: false,
		},
	},
	data: function() {
		return {
			data: [],
			typed: '',
			selected: null,
			answers: [],
			countDown: this.dismissSecs,
			countries,
			seed: Math.random(),
			Win: false,
			goodAnswers: 0,
		};
	},
	computed: {
		picked() {
			return this.possibilityMapping(this.possibilities[Math.floor(this.seed * this.possibilities.length)]);
		},
		possibilities() {
			console.log(this.countries.filter(this.possibilityFilter));
			return this.countries.filter(this.possibilityFilter);
		},
		possybilityStringArray() {
			if (!this.possibilities) return [];
			console.log(this.possibilities.map(this.possibilityMapping));
			return this.possibilities.map(this.possibilityMapping);
		},
		solutions() {
			if (!this.picked) return [];
			return this.possibilities.reduce(this.answersMapping(this.picked));
		},
	},

	methods: {
		prettyfy(arr) {
			return arr.join('<br>');
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
		Submit(ans) {
			console.log('submit', ans);
			if (!ans) return; // avoid null trigger
			console.log(this.solutions);
			this.answers.unshift({
				id: this.answers.length,
				name: ans,
				valid: this.isAnswer(this.solutions, ans),
			});

			this.typed = '';
			if (this.answers[0].valid) {
				this.goodAnswers++;
			}
			if (this.goodAnswers == this.solutions.length) {
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

