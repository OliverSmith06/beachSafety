// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAm-7IQMWZ1SOCWksxudGifyg1BtgZaWhY',
    authDomain: 'beach-safety-302700.web.app',
    projectId: 'beach-safety-302700'
  });

var beach = firebase.firestore();

let names = [];
let locations = [];
let info = [];

let favourite = ['cat', 'dog', 'movie', 'home', 'school'];
for (var m = 0; m < favourite.length; m++){
  console.log(favourite[m]);
}




// beaches.innerHTML('supercalafragelisticexpiladotiouse')

let map;


function initMap(){
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    });

    beach.collection("beaches").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          names.push(doc.data().name)
          locations.push({lat: doc.data().lat, lng: doc.data().lng})
          info.push({last: doc.data().last, beachType: doc.data().type, level: doc.data().level})
          
        });
        for (var i = 0; i < locations.length ; i++){
          marker = new google.maps.Marker({
                position: locations[i],
                map: map
            });
            let currentName = names[i];
            let last = info[i].last;
            let beachType = info[i].beachType;
            let level = info[i].level;
            let lat = locations[i].lat;
            let long = locations[i].lng;
          marker.addListener("click", () => {
            console.log(currentName);
            document.getElementById('primaryModal').style.display = "block";
            document.getElementById('beachName').innerHTML = `${currentName}`;
            document.getElementById('lastDanger').innerHTML = `${last}`;
            document.getElementById('beachType').innerHTML = `${beachType}`;
            document.getElementById('currentDanger').innerHTML = `${level}`;
            document.getElementById('name').value = `${currentName}`;
            document.getElementById('lat').value = `${lat}`;
            document.getElementById('long').value = `${long}`;
            document.getElementById('danger').value = `${level}`;
            document.getElementById('last').value = `${last}`;
            document.getElementById('shark').value = `${beachType}`;
         })
          
        }
    });
    console.log(locations);
    console.log(names);
}

function editData(initName, name, lat, lng, level, last, type) {
    console.log(name.value);
    beach.collection("beaches").where("name", "==", `${initName.innerText}`)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            beach.collection("beaches").doc(doc.id).set({
                name: name.value,
                lat: parseFloat(lat.value),
                lng: parseFloat(lng.value),
                level: level.value,
                type: type.value,
                last: last.value
            })
        });
    }).then(() => {
        console.log("Document successfully written!");
        successAlert();
        
    })
    .catch((error) => {
        console.log("Error writing document: ", error);
    });
  // location.reload();
}

function addBeach(name, lat, lng, level, last, type) {
    // Add a new document in collection "cities"
    console.log("TESTING");
  beach.collection("beaches").doc(`${name.value}`).set({
      name: name.value,
      lat: parseFloat(lat.value),
      lng: parseFloat(lng.value),
      level: level.value,
      type: type.value,
      last: last.value
  })
  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}



function editName(input, text){
  let name = document.getElementById("name");
  let lat = document.getElementById("lat");
  let long = document.getElementById("long"); // ☜(ﾟヮﾟ☜) 
  let danger = document.getElementById("danger");
  let last = document.getElementById("last");
  let shark = document.getElementById("shark");
  let textName = document.getElementById("beachName");
  if (input.style.display == "none"){
    input.style.display = "block";
    text.style.display = "none";
  } else {
    input.style.display = "none";
    text.style.display = "block";
    beach.collection("beaches").where("name", "==", `${textName.innerText}`)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            beach.collection("beaches").doc(doc.id).set({
                name: name.value,
                lat: parseFloat(lat.value),
                lng: parseFloat(long.value),
                level: danger.value,
                type: shark.value,
                last: last.value
            })
        });
    }).then(() => {
        console.log("Document successfully written!");
        successAlert();
        
    })
    .catch((error) => {
        console.log("Error writing document: ", error);
    });
    location.reload();
  }
  
}