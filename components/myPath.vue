<template>
  <path :class="{'mistake': isAnswer[1], 'answer': isAnswer[0] ,'selectedcountry': name == picked }" :name="name" :d="d"/>
</template>

 <script>
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
		isAnswer() {
			let isAnswer = false;
			let isMistake = false;
			for (let i in this.answers) {
				console.log(
					this.answers[i].name.toLowerCase().substring(0, 2),
					this.name.toLowerCase().substring(0, 2)
				);
				if (this.answers[i].name.toLowerCase().substring(0, 2) == this.name.toLowerCase().substring(0, 2)) {
					if (this.answers[i].valid) {
						isAnswer = true;
					} else {
						isMistake = true;
					}
				}
			}

			return [isAnswer, isMistake];
		},
	},
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