<template>
  <b-container fluid>


        <b-button class="float-right" :pressed.sync="showIsland" :variant="showIsland ? 'outlined-primary': 'primary'">Show Islands</b-button>
        
        <b-table responsive class="center" fluid striped hover :items="items" :fields="fields">

           
        </b-table>


  </b-container>
</template>

<script>
import Map from '@/components/Map.vue';
import countries from '@/static/countries.json';

export default {
	components: {
		Map,
	},
	data() {
		return {
			showIsland: true,

			fields: {
				countryName: { label: 'Country', sortable: true },
				capital: { label: 'Capital', sortable: true },
				continentName: { label: 'Continent', sortable: true },
				areaInSqKm: { label: 'Area(km2)', sortable: true },
				countryCode: { label: 'Code', sortable: true },
				neighbours: { label: 'Neighbours', sortable: false },
			},
		};
	},
	computed: {
		items() {
			let c = countries;
			return countries
				.sort((a, b) => a.countryName.localeCompare(b.countryName))
				.filter(c => (this.showIsland ? Object.keys(c.neighbours).length > 0 : true));
		},
	},
};
</script>

<style scoped>
button {
	margin: 10px;
}
section {
	padding-block-end: 30px;
}
</style>
