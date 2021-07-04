firebase.initializeApp({
    apiKey: 'AIzaSyAm-7IQMWZ1SOCWksxudGifyg1BtgZaWhY',
    authDomain: 'beach-safety-302700.web.app',
    projectId: 'beach-safety-302700'
  });

var beach = firebase.firestore();

let names = [];
let locations = [];
let info = [];

    beach.collection("beaches").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          names.push(doc.data().name)
          locations.push({lat: doc.data().lat, lng: doc.data().lng})
          info.push({last: doc.data().last, beachType: doc.data().type, level: doc.data().level})
          
        });
        ul = document.getElementsByClassName('gallery-wrapper');
        // var node = document.createElement("UL");
        for (var i = 0; i < names.length ; i++){
            let currentName = names[i];
            let last = info[i].last;
          
            let beachType = info[i].beachType;
            let level = info[i].level;
            var gallery = `<div id="bondi-gal" class="gallery">
                            <a>
                              <img src="img/${currentName}-beach.jpg" width="600" height="400">
                            </a>
                            <div class="desc">
                              ${currentName} Beach 
                              (Danger level: ${level})
                            </div>
                          </div>`;
                          // document.body.innerHTML += gallery;
                          ul[0].innerHTML += gallery;
                          console.log(ul[0]);
        }
        
    });