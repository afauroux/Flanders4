<template>
  <path :class="{'mistake': isAnswer[1], 'answer': isAnswer[0] ,'selectedcountry': name == picked }" :name="name" :d="d"/>
</template>

 <script>

import countries from '@/static/countries.json';

export default {
	props: {
		answers: {
			type: Array,
			required: false,
			default: [],
		},
		picked: {
			type: String,
			required: false,
			default: '',
		},
		d: {
			type: String,
			required: false,
			default: '',
		},
		name: {
			type: String,
			required: false,
			default: '',
		},
	},
	computed: {
		countryCodes(){
			return  countries.reduce(function(map, obj) {
					map[obj.countryName] = obj.countryCode;
					return map;
			}, {});
			
		},
		isAnswer() {
			let isAnswer = false;
			let isMistake = false;
			for (let i in this.answers) {
				let code = this.countryCodes[this.answers[i].name]
				if(code){
					if (code.toLowerCase().substring(0, 2) == this.name.toLowerCase().substring(0, 2)) {
						if (this.answers[i].valid) {
							isAnswer = true;
						} else {
							isMistake = true;
						}
					}
				}
			}

			return [isAnswer, isMistake];
		},
	},
	method:{
		
	}
};
</script>
 
 <style scoped>
.water {
	fill: #64beff;
}

.border {
	stroke: #707070;
	stroke-width: 1;
	stroke-opacity: 0.5;
}

.country {
	fill: #ffff80;
}
.country:hover {
	fill: #afff80;
}

.light-water {
	fill: #beedff;
}

.disputed {
	fill: #808080;
}
.selectedcountry {
	fill: blue;
}
.answer {
	fill: green;
}
.mistake {
	fill: red;
}
</style>