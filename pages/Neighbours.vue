<template>
<b-card title="Flanders" sub-title="Find them neighbours" class="text-left">
    <br><br>
    <label for="field1">Find all neighbouring country of <b >{{pickedCountry}}</b></label>
    <b-input :autocomplete="countryNames">
      
    </b-input>
  </b-card>
  <!--
  <div class="container">
      <div class="card">
 
  <div class="card-content">
    <div class="media">
      <div class="media-left">
   
          <b-img thumbnail src="@/static/globe.png" fluid />
       
      </div>
      <div class="media-content">
        <p class="title is-4">Flanders</p>
        <p class="subtitle is-6">For Magda from Tony</p>
      </div>
    </div>

    <div class="content">
    <label for="field1">Find all neighbouring country of <b >{{pickedCountry}}</b></label>
      <b-form-input id="field1">
            <b-autocomplete
                rounded
                v-model="typed"
                :data="filteredDataArray"
                placeholder="e.g. Poland ;-)"
                icon="magnify"
                @select="option => selected = option">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-form-input>
      
        <b-message   v-for="answer in answers" :key="answer.id" :type="answer.valid ? 'is-success' : 'is-danger'">{{answer.name}}</b-message>
    
    </div>

     <div class="card-image">
    <figure class="image ">
     <Map/>
    </figure>
  </div>
  </div>
</div>
  </div-->

</template>



<script>
import countries from "@/static/countries.json";
import Map from "@/components/Map";


export default {
  components: {
    Map
  },
  data: function() {
    return {
      data: [],
      chosen: "",
      typed: "",
      selected: null,
      attemps: 0,
      answers: []
    };
  },
  computed: {
    countryNames: function(){
      return countries.map(c => c.countryName)
    },
    pickedCountry(){
      return this.countryNames[Math.floor(Math.random() * this.countryNames.length)];
    },
    filteredDataArray() {
      return this.countryNames.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.typed.toLowerCase()) >= 0
        );
      });
    }
  },

  watch: {
    selected: function(val) {
      if (!val) return; // avoid null trigger
      console.log(this.getNeighbours(this.chosen));
      this.answers.unshift({
        id: this.attemps,
        name: val,
        valid: this.getNeighbours(this.chosen).indexOf(val) > -1
      });
      this.attemps++;
      this.name = "";
    }
  },
  methods: {
    autocomplete(){
      console.log('autocomplete')
    },
    getNeighbours(c) {
      let n = [];
      for (var i in countries[c]) {
        n.push(countries[c][i][0]);
      }
      return n;
    }
  }
 
}
</script>


