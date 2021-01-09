let url;
let value;

function setUrl(urlName){
    url = urlName;
}

function getValue(){
 return value;
}

function getData(){
    fetch(url)
        .then(
            data => {
                // console.log(data);
                data.text().then(
                    function (v){
                        // console.log(v)
                        value = v
                    }
                )
                //data.TYPE tells your fetch to turn your promise into the requested data type, ie data.JSON
            }
        )

}

export {setUrl, getData, getValue}

// "Plug the lines below into the top of your module js in order to import and call on this snipet page's functions"

// import * as fetchItems from './fetch.js'
// fetchItems.setUrl("https://csa2020studentapi.azurewebsites.net/rpsls");
// fetchItems.getData();
// setTimeout(()=>{console.log(fetchItems.getValue())}, 1000);