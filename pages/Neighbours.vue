<template>
<b-card title="Neighbours" sub-title="Find them neighborinos" class="text-left" fluid>

   <b-row align-h="end">
     <b-col sm="auto">
      <b-button block @click="givup()" variant="danger"  >Give Up</b-button>
     </b-col>
     <b-col sm="auto">
      <b-button block @click="reset()" variant="primary" >Reset</b-button> 
      </b-col>
  </b-row>
   
    
    <b-row>
      <b-col>
        <label for="field1">Find all neighbouring country of <b >{{pickedCountry.countryName}}</b></label>
      </b-col>
      <b-col class="text-right">
        <span >Good Answers: {{goodAnswers}}/{{Object.keys(pickedCountry.neighbours).length}}</span>
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
   

   <b-row cclass="bv-example-row" fluid >
		
			 
		 	<b-col sm="auto" align-h="end">
				 <div style="background-color:blue;" sm="auto"><b-alert  show dismissible  v-for="(answer,i) in answers" :key="i" :variant="answer.valid ? 'success' : 'danger'">{{answer.name}}</b-alert></div>
      </b-col>
      <b-col  align-h="end">
       <Map class="map" :answers="answers" :picked="pickedCountry.countryCode.toLowerCase()" :pick="pickedCountry.countryCode"/>
      </b-col>
			

   </b-row >

  <b-modal ref="congrats">
      {{Win ? 'Bravo ! You are still the best !' : 'Looser ! the answer was: '+this.pickedCountry.neighbours}}
  </b-modal>

</b-card>
</template>



<script>
import countries from "@/static/countries.json";
import Map from "@/components/Map";
import AutoComplete from "@/components/AutoComplete";

export default {
  components: {
    Map,
    AutoComplete
  },
  data: function() {
    return {
      data: [],
      typed: "",
      selected: null,
      goodAnswers: 0,
      answers: [],
      dismissSecs: 120,
      countDown: 120,
      countries,
      seed: Math.random(),
      Win: false
    };
  },
  computed: {
    pickedCountry() {
      return this.filteredCountries[
        Math.floor(this.seed * this.filteredCountries.length)
      ];
    },
    filteredCountries() {
      return this.countries.filter(c => {
        return Object.keys(c.neighbours).length > 0; //we want only country with neighbours
      });
    },
    countryNames() {
      return this.filteredCountries.map(c => c.countryName);
    }
  },

  methods: {
    reset() {
      this.goodAnswers = 0;
      this.answers = [];
      this.countDown = 120;
      this.seed = Math.random();
    },
    countDownChanged(countDown) {
      this.countDown = countDown;
      if (this.countDown == 0) {
        this.$refs.congrats.show();
      }
    },
    givup() {
      this.countDownChanged(0);
    },
    Submit(val) {
      console.log("submit", val);
      if (!val) return; // avoid null trigger
      console.log(this.pickedCountry.neighbours);
      this.answers.unshift({
        id: this.goodAnswers,
        name: val,
        valid: this.pickedCountry.neighbours.indexOf(val) > -1
      });
      if (this.pickedCountry.neighbours.indexOf(val) > -1) {
        this.goodAnswers++;
      }
      this.name = "";
      if (
        this.goodAnswers == Object.keys(this.pickedCountry.neighbours).length
      ) {
        this.Win = true;
        this.countDown = 0;
        this.$refs.congrats.show();
      }
    }
  }
};
</script>

<style>
.bax {
  background-color: blue;
}
.map {
  margin: 0px;
  width: 810px;
  height: 450px;
  text-align: center;
}

button {
  margin: 5px;
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

