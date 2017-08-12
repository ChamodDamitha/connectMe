import { Component , ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement;
  map : any;

  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController) {
    this.initializeItems();
  }

  ionViewDidLoad(){
    this.initMap();
  }

  placeMarker(latLng, map){
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: 'Hello World!'
    });

  }

  initMap() {
    let latLngStart = new google.maps.LatLng(5.9549, 80.5550);
    let mapOptionsStart = {
      center: latLngStart,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptionsStart);

    var pathCoordinates = [
      {lat:5.9549, lng:80.5550},
      {lat: 6.0535, lng: 80.2210}
    ];
    var path = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    var myCoord = [
      new google.maps.LatLng(5.9549, 80.5550),
      new google.maps.LatLng(6.0535, 80.2210)
    ];


    this.placeMarker(myCoord[0], this.map);
    this.placeMarker(myCoord[1], this.map);

    // BEGIN: Snap to road
    var service = new google.maps.DirectionsService(), polys, snap_path=[];
    path.setMap(this.map);
    for(var j = 0; j < myCoord.length-1; j++){
      service.route({origin: myCoord[j],destination: myCoord[j+1],
        travelMode: google.maps.TravelMode.DRIVING}, function(result, status) {
        if(status == google.maps.DirectionsStatus.OK) {
          snap_path = snap_path.concat(result.routes[0].overview_path);
          path.setPath(snap_path);
        }
      });
    }
  }


  initializeItems() {
    this.items = [
      'Harini',
      'Chamod'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
