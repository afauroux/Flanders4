<template>
<b-card title="Capitals" sub-title="know your caps" class="text-left">

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
        <label for="field1">Find the capital of <b >{{pickedCountry.countryName}}</b></label>
      </b-col>

    </b-row>
   
    <b-row >
      <b-col class="sm-12">
        <AutoComplete @submit="Submit" :items="capitals"/>
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

   <b-row >
      <b-col class="sm-12">
				<Map class="map" :answers="answers" :picked="pickedCountry.countryCode.toLowerCase()"/>
      </b-col>
   </b-row >
  <b-modal ref="congrats">
      {{Win ? 'Bravo ! You are still the best !' : 'Looser ! The good answer was: '+this.pickedCountry.capital}}
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
      answers: [],
      dismissSecs: 10,
      countDown: 10,
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
      let a = this.countries.filter(c => {
        return c.capital.length > 0 && Object.keys(c.neighbours).length > 0;
      });

      return a;
    },
    countryNames() {
      return this.filteredCountries.map(c => c.countryName);
    },
    capitals() {
      return this.filteredCountries.map(c => c.capital);
    }
  },

  methods: {
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
      console.log("submit", val);
      if (!val) return; // avoid null trigger
      console.log(this.pickedCountry.capital);
      this.answers.unshift({
        id: this.goodAnswers,
        name: val,
        valid: this.pickedCountry.capital == val
      });

      this.name = "";
      if (this.pickedCountry.capital == val) {
        this.Win = true;
        this.countDown = 0;
        this.$refs.congrats.show();
      }
    }
  }
};
</script>

<style>
.map {
  width: 100%;
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

