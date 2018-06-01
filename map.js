var bounds = L.latLngBounds([47.5836, 12.17], [47.583, 12.175], 16)             //Koordinaten von Kufstein
var mymap = L.map('mapid').fitBounds(bounds);

/*Kein Zoom und auf Karte begrenzen */
mymap.touchZoom.disable();
mymap.doubleClickZoom.disable();
mymap.scrollWheelZoom.disable();
mymap.boxZoom.disable();
mymap.removeControl(mymap.zoomControl);
mymap.scrollWheelZoom.disable();



var MapIcon = L.Icon.extend({												//Variabeln werden für  die Icons erstellt
    options: {
       iconSize:     [38, 40],
       iconAnchor:   [38, 0],
       popupAnchor:  [-5, 0]
    }
});
var toDoIcon = new MapIcon({												//Katze- diese Punkte erreichen
    iconUrl: 'img/kitty.png',
})

var doneIcon = new MapIcon({												//Pfeil- wenn Katze erreicht wurde
    iconUrl: 'img/hook.png',
})

var mario = new MapIcon({													//Mario- Der Marker für unsere Position
    iconUrl: 'img/mario.png'
})

//Variabeln für Sucess
var doneCnt =0;
//var navWatch;


var leafletMap = L.tileLayer('https://maps4.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg' , {
}); //.addtomap();

mymap.addLayer(leafletMap);

var destCoord = [                                                                               //destination markers
    [47.583857, 12.173269],
    [47.583857, 12.173679],
    [47.583707, 12.173279],
    [47.583707, 12.173679],
    [47.5836, 12.1724]];               
var destMarker1 = L.marker(destCoord[0], {icon: toDoIcon}).bindPopup("Rette mich, Mario!").addTo(mymap);
var destMarker2 = L.marker(destCoord[1], {icon: toDoIcon}).bindPopup("Rette mich, Mario!").addTo(mymap);
var destMarker3 = L.marker(destCoord[2], {icon: toDoIcon}).bindPopup("Rette mich, Mario!").addTo(mymap);
var destMarker4 = L.marker(destCoord[3], {icon: toDoIcon}).bindPopup("Rette mich, Mario!").addTo(mymap);
var destMarker5 = L.marker(destCoord[4], {icon: toDoIcon}).bindPopup("Rette mich, Mario!").addTo(mymap);
var destMarkers = [destMarker1, destMarker2, destMarker3, destMarker4, destMarker5];     

var currPosMarker;  



if (!navigator.geolocation){
    alert("Geolocation wird von deinem Browser nicht unterstützt.");
  }else{
    function success(position) {
        console.log(position.coords.latitude); //zur Prüfung im Entwicklertool

      
        var currPosition = L.latLng(position.coords.latitude,position.coords.longitude);        //Variable für unsere Positionsangabe in Latitude & Longtude
        
		
		if(currPosMarker === undefined){                                                        
            currPosMarker = new L.marker(currPosition, {icon:mario}).bindPopup("Das bist du").addTo(mymap);                             //Marker auf Karte 
		}else{
            currPosMarker.setLatLng(currPosition);                                              //Update position Marker auf jetzige Position 
        }
		
		//for Schleife um die Distanz zu den Katzen anzeigen zu lassen ->Icon gewechselt und Distanz errechnet
        for(var i = 0; i < destCoord.length; i++){
            if(currPosition.distanceTo(destCoord[i]) < 3.0){
                destMarkers[i].setIcon(doneIcon);
                destMarkers[i].bindPopup("Da warst du schon.");
                if(destMarkers[i].getPopup().getContent() != "Da warst du schon."){
                    doneCnt++;
                }
            }else{
                if(destMarkers[i].getPopup().getContent() != "Da warst du schon."){
                    destMarkers[i].bindPopup("Noch " + Math.round(currPosition.distanceTo(destCoord[i]) * 10)/10 + " Meter");
                    /*doneCnt++;
                    if(doneCnt == 4){
                        //quitWatch();
                    }*/
                }
            }
            
            if(destMarkers[0].getPopup().getContent() == "Da warst du schon." &&
            destMarkers[1].getPopup().getContent() == "Da warst du schon." &&
            destMarkers[2].getPopup().getContent() == "Da warst du schon." &&
            destMarkers[3].getPopup().getContent() == "Da warst du schon." &&
            destMarkers[4].getPopup().getContent() == "Da warst du schon.") {
                /*document.getElementById('mapid').style.display="none";
                document.getElementById('buttonGetLocation').style.display="none";
                document.getElementById('buttonGeoFindMe').style.display="none";
                document.getElementById('glueckwunschnochmal').style.display="block";
                document.getElementById('nochmal').style.display="none";
                document.getElementById('deineZeit').style.display="none";
                */
               window.location.href='success.html'
            }
							
            
						  
		}
						/*
						if ((destMarkers[0].setIcon(doneIcon)) && (destMarkers[1].setIcon(doneIcon)) && (destMarkers[2].setIcon(doneIcon)) && (destMarkers[3].setIcon(doneIcon)) && (destMarkers[4].setIcon(doneIcon))) { 
						  document.getElementById('mapid').style.display="none";
						  document.getElementById('buttonGetLocation').style.display="none";
						  document.getElementById('buttonGeoFindMe').style.display="none";
						  document.getElementById('glueckwunschnochmal').style.display="block";
						  //clearTimeout(zeit); 
						} 
						*/
		
    }


    /* Error Handling for details see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition */
    function error(e) {                                                     
        switch(e.code){
            case e.PERMISSION_DENIED:
                console.log("Fehler: Zugriff verweigert.");
                break;
            case e.POSITION_UNAVAILABLE:
                console.log("Fehler: Position unerreichbar.");
                break;
				
				/*
            case e.TIMEOUT:
                console.log("Fehler: Zeit ist abgelaufen.");
                break;
				*/
        }
    }
	
	
	/*
    function quitWatch(){
        navigator.geolocation.clearWatch(navWatch);
    */
    
    var geo_options = {
        enableHighAccuracy  : true,                                            
        maximumAge          : 0, 
        timeout             : 2000,												
        distanceFilter      : 1													
    };
	
	navWatch = navigator.geolocation.watchPosition(success, error, geo_options);

  }
    
	function getPosition(){
        mymap.locate({setView: true, maxZoom: 16});
    }
	
    setInterval(getPosition, 20000);
    //navWatch = navigator.geolocation.watchPosition(success, error, geo_options);
    
    
  
 