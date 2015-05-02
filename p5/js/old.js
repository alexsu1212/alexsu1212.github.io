var initialPlaces = [
  {
    lat: 37.794809,
    lng: -122.411765,
    title: "Cable Car Museum",
    description: '<h2>Cable Car Museum</h2>'+
      '<p>1201 Mason St</p>'+
      '<p>San Francisco, CA 94108</p>'+
      '<p>United States</p>',
    api: 'test'
  },
  {
    lat: 37.801184,
    lng: -122.409877,
    title: "Lombard Street",
    description: '<h2>Lombard Street</h2>'+
      '<p>Lombard St</p>'+
      '<p>San Francisco, CA 94133</p>'+
      '<p>United States</p>',
    api: 'test'
  },
  {
    lat: 37.801863,
    lng: -122.419146,
    title: "Washington Square Park",
    description: '<h2>Lombard Street</h2>'+
      '<p>San Francisco, CA 94133</p>'+
      '<p>United States</p>',
    api: 'test'
  },
  {
    lat: 37.770366,
    lng: -122.486305,
    title: "Golden Gate Park",
    description: '<h2>Golden Gate Park</h2>'+
      '<p>San Francisco, CA</p>'+
      '<p>United States</p>',
    api: 'test'
  },
  {
    lat: 37.802816,
    lng: -122.449175,
    title: "Palace of Fine Arts Theatre",
    description: '<h2>Palace of Fine Arts Theatre</h2>'+
      '<p>3301 Lyon St</p>'+
      '<p>San Francisco, CA 94123</p>'+
      '<p>United States</p>',
    api: 'test'
  },
];

var place = function(data) {
  this.position = ko.obaservable(data.position);
  this.title = ko.obaservable(data.title);
  this.description = ko.obaservable(data.description);
}

function setAllMap(map, markers) {
  for (var i = 0; i < markers.length; i++) {
  markers[i].marker.setMap(map);
  }
}

var ViewModel = function() {
  var self = this;

  var myLatlng = new google.maps.LatLng(37.789838, -122.444209);

  var mapOptions = {
    center: myLatlng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  this.keyword = ko.observable('');

  this.places = ko.observableArray([]);
  this.oriPlaces = this.places();

  initialPlaces.forEach(function(place, index) {
    var marker = new google.maps.Marker({      
      position: new google.maps.LatLng(place.lat, place.lng),
      map: self.map, 
      title: place.title,
      infowindow: new google.maps.InfoWindow({content: place.description}),
    })
    self.places.push({marker: marker, api: place.api});

    google.maps.event.addListener(marker, 'click', function() {
      self.places().forEach(function(place) {
        if(place.marker != marker){
          place.marker.infowindow.close();
          place.marker.setAnimation(null);
        }
      });
      marker.infowindow.open(self.map, marker);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      
      $('li').eq(index).css('background', '#ccc');
    });
    google.maps.event.addListener(marker.infowindow, 'closeclick', function() {
      marker.setAnimation(null);
    });

  });

  this.filter = ko.computed(function() {
    var results = [];
    self.places(self.oriPlaces);

    if(self.keyword() !== undefined && self.keyword() !== '') {
      for(var i = 0; i < self.places().length; i++) {
        if(self.places()[i].getTitle().toLowerCase().indexOf(self.keyword().toLowerCase()) !== -1) {
          results.push(self.places()[i]);
        }
      }
      self.places(results);
      setAllMap(null, self.oriPlaces);
      setAllMap(self.map, self.places());
    } else if(self.keyword() === '') {
      self.places(self.oriPlaces);
      setAllMap(self.map, self.places());
    }
  });
};

var vm = new ViewModel();

ko.applyBindings(vm);

$('li').click(function() {
  // $(this).css('background', 'black');
});

// $.getJSON('https://api.foursquare.com/v2/venues/4698e043f964a520f0481fe3?client_id=QHMZ0NO2JR4DBTPMIGAL21XPXCUZKWKO2YJB5FEMKUIELG3N&client_secret=HPLAIBW1VAUZ4END4I3VJGIIZ3XONHV03EC2QIOCW3MW53IO&v=20150501', function(data) {
//  console.log(data);
// });

var search = 'https://api.foursquare.com/v2/venues/search?client_id=QHMZ0NO2JR4DBTPMIGAL21XPXCUZKWKO2YJB5FEMKUIELG3N&client_secret=HPLAIBW1VAUZ4END4I3VJGIIZ3XONHV03EC2QIOCW3MW53IO&v=20130815&ll=37.802816,-122.449175'

$.getJSON(search, function(data) {
  console.log(data);
});