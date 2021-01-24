// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAm-7IQMWZ1SOCWksxudGifyg1BtgZaWhY',
    authDomain: 'beach-safety-302700.web.app',
    projectId: 'beach-safety-302700'
  });
  
var db = firebase.firestore();

let map;

let locations = [];
let names = [];
let info = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    });

    db.collection("beaches").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

        locations.push({lat: doc.data().lat, lng: doc.data().lng})
        names.push(doc.data().name)
        info.push({last: doc.data().last, since: doc.data().since, level: doc.data().level})

        });
        for (i = 0; i < locations.length; i++) {  
            marker = new google.maps.Marker({
                position: locations[i],
                map: map
            });
            let currentName = names[i];
            let last = info[i].last;
            let since = info[i].since;
            let level = info[i].level;
            marker.addListener("click", () => {
                console.log(currentName);
                document.getElementById('beachName').innerHTML = `${currentName}`
                document.getElementById('lastDanger').innerHTML = `${last}`;
                document.getElementById('daysLastDanger').innerHTML = `${since}`;
                document.getElementById('dangerLevel').innerHTML = `${level}`;
                document.getElementById('masterModal').style.display = "block";
            });
        }
    });
}


