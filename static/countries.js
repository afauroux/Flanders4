var axios =  require('axios');
var fs = require('fs');

const parameters = 'username=afauroux';

function main() {
    var apiMethod = 'countryInfoJSON';


    axios.get('http://api.geonames.org/' +
        apiMethod + '?' + parameters)
        .then((data) => {
            countries = data.data["geonames"]
            
            for (let k in countries) {
               
                countries[k]["neighbours"] = [];
            }
            
            getNeighbours(countries)

    })
}
function getNeighbours(countries){

    var apiMethod = 'neighboursJSON?geonameId=';
    let k = 0;
   
    function request(){
        return axios.get('http://api.geonames.org/'+ apiMethod + countries[k]["geonameId"] + '&' + parameters)
            .then((data) => {
            data = data.data["geonames"]
            
            for (let k2 in data) {
                if (data[k2].fcl == "A") { 
                    countries[k].neighbours.push(data[k2].countryName);
                }
            }
            console.log(k, countries[k].countryName, countries[k].neighbours)
                if (countries[k].neighbours.length == 0){
                    delete countries[k] // we remove countries without neighbours 
                }
            if (k >= Object.keys(countries).length-1){
                writeJSON(countries);
                return 'done'
            } 
            k++;
            return request();
        });

    }
    request();
}

function writeJSON(countries){

    console.log(countries)
    var json = JSON.stringify(countries);

    fs.writeFile('countries.json', json, 'utf8', () => {console.log('success')});
}



main();
