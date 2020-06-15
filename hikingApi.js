document.addEventListener('DOMContentLoaded', function() {

// 4 steps
const successCallback = (position) => {
document.getElementById('button').addEventListener('click', loadText);

function loadText() {

let lat = position.coords.latitude;
let long = position.coords.longitude;
const apiKey = '200800735-45428d381b4d7094fe7742fad2c39041';

const url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=${apiKey}`;

const xhr = new XMLHttpRequest();

xhr.open('GET', url, true);

xhr.onload = function () {
    if (this.status === 200 && this.readyState === 4) {
        const json = JSON.parse(this.responseText);
        console.log(json.trails[0]);

        let trail = json.trails[0].name;
        let location = json.trails[0].location;
        let summary = json.trails[0].summary;

        const hikingInfo = `<p>A local trail nearby is the ${trail} trail. It is located at ${location}. ${summary}</p>`

        document.getElementById('dataDetail').innerHTML = hikingInfo;

        // const jsonArrayKey = Object.keys(json)
        // const jsonArrayVal = Object.values(json)

        // let html = '<ul>'
        // for (let i = 0; i < jsonArrayKey.length; i++) {
        //     html += `<li>${jsonArrayKey[i]}: ${jsonArrayVal[i]}</li>`
        // }
        // html = html + '<ul>'
        // document.getElementById('dataDetail').innerHTML = JSON.stringify(html);
        // console.log(html);

    } else if (this.status === 400) {
        document.getElementById('dataDetail').innerText = '404 Error: File Not Found!';
    }
}
xhr.send();
}
};

const errorCallback = (position) => {
    console.error(position);
    
    if (position.code === 1) {
        console.log('PERMISSION DENIED!')
    } else if (position.code === 2) {
        console.log('POSITION UNAVAILABLE!')
    } else if (Geoloca.code === 3) { 
        console.log('TIMEOUT')
    }
    
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
    enableHighAccuracy: true,
});

});