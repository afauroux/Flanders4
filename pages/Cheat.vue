<template>
  <b-container fluid>

        <section>
          <p>Parameters</p>
          <b-button :pressed.sync="showIsland" :variant="showIsland ? 'primary': 'outlined-primary'">Show Islands</b-button>
        </section>
        <section>
         <p>Table</p>
        <b-table striped hover :items="items" :fields="fields"></b-table>
        </section>
  </b-container>
</template>

<script>
import Toggle from "@/components/Toggle.vue"
import Map from "@/components/Map.vue"
import countries from "@/static/countries.json"

export default {
  components:{
    Map,Toggle
  },
  data () {
    return {
      showIsland: true,
      
      fields: ['countryName', 'capital', 'continentName','areaInSqKm', 'countryCode', 'neighbours']
    }
  },
  computed: {
    items(){
      let c = countries
      return countries.sort((a,b) => a.countryName.localeCompare(b.countryName) ).filter(c=>this.showIsland ? Object.keys(c.neighbours).length>0:true) 
    }
  }
  
}
</script>

<style scoped>
section{
  padding-block-end: 30px;
 
  
}
</style>
