// raw data of attractions in SF
var initialPlaces = [
	{
		lat: 37.794809,
		lng: -122.411765,
		title: "Cable Car Museum",
		description: '<h2>Cable Car Museum</h2>'+
			'<p>1201 Mason St</p>'+
			'<p>San Francisco, CA 94108</p>'+
			'<p>United States</p>'+
			'<div id="fs"></div>',
		api: 'https://api.foursquare.com/v2/venues/4698e043f964a520f0481fe3?client_id=QHMZ0NO2JR4DBTPMIGAL21XPXCUZKWKO2YJB5FEMKUIELG3N&client_secret=HPLAIBW1VAUZ4END4I3VJGIIZ3XONHV03EC2QIOCW3MW53IO&v=20150501'
	},
	{
		lat: 37.801184,
		lng: -122.409877,
		title: "Lombard Street",
		description: '<h2>Lombard Street</h2>'+
			'<p>Lombard St</p>'+
			'<p>San Francisco, CA 94133</p>'+
			'<p>United States</p>'+
			'<div id="fs"></div>',
		api: 'https://api.foursquare.com/v2/venues/49f62829f964a520136c1fe3?client_id=QHMZ0NO2JR4DBTPMIGAL21XPXCUZKWKO2YJB5FEMKUIELG3N&client_secret=HPLAIBW1VAUZ4END4I3VJGIIZ3XONHV03EC2QIOCW3MW53IO&v=20150501'
	},
	{
		lat: 37.801863,
		lng: -122.419146,
		title: "Washington Square Park",
		description: '<h2>Washington Square Park</h2>'+
			'<p>San Francisco, CA 94133</p>'+
			'<p>United States</p>'+
			'<div id="fs"></div>',
		api: 'https://api.foursquare.com/v2/venues/4486b2d2f964a5202d341fe3?client_id=QHMZ0NO2JR4DBTPMIGAL21XPXCUZKWKO2YJB5FEMKUIELG3N&client_secret=HPLAIBW1VAUZ4END4I3VJGIIZ3XONHV03EC2QIOCW3MW53IO&v=20150501'
	},
	{
		lat: 37.770366,
		lng: -122.486305,
		title: "Golden Gate Park",
		description: '<h2>Golden Gate Park</h2>'+
			'<p>San Francisco, CA</p>'+
			'<p>United States</p>'+
			'<div id="fs"></div>',
		api: 'https://api.foursquare.com/v2/venues/445e36bff964a520fb321fe3?client_id=QHMZ0NO2JR4DBTPMIGAL21XPXCUZKWKO2YJB5FEMKUIELG3N&client_secret=HPLAIBW1VAUZ4END4I3VJGIIZ3XONHV03EC2QIOCW3MW53IO&v=20150501'
	},
	{
		lat: 37.802816,
		lng: -122.449175,
		title: "Palace of Fine Arts Theatre",
		description: '<h2>Palace of Fine Arts Theatre</h2>'+
			'<p>3301 Lyon St</p>'+
			'<p>San Francisco, CA 94123</p>'+
			'<p>United States</p>'+
			'<div id="fs"></div>',
		api: 'https://api.foursquare.com/v2/venues/4468f484f964a5204f331fe3?client_id=QHMZ0NO2JR4DBTPMIGAL21XPXCUZKWKO2YJB5FEMKUIELG3N&client_secret=HPLAIBW1VAUZ4END4I3VJGIIZ3XONHV03EC2QIOCW3MW53IO&v=20150501'
	},
	{
		lat: 37.786466,
		lng: -122.500713,
		title: "Legion of Honor",
		description: '<h2>Legion of Honor</h2>'+
			'<p>100 34th Ave</p>'+
			'<p>San Francisco, CA 94121</p>'+
			'<div id="fs"></div>',
		api: 'https://api.foursquare.com/v2/venues/44d344bef964a52041361fe3?client_id=QHMZ0NO2JR4DBTPMIGAL21XPXCUZKWKO2YJB5FEMKUIELG3N&client_secret=HPLAIBW1VAUZ4END4I3VJGIIZ3XONHV03EC2QIOCW3MW53IO&v=20150501'
	},
	{
		lat: 37.783278,
		lng: -122.418144,
		title: "San Francisco City Hall",
		description: '<h2>San Francisco City Hall</h2>'+
			'<p>1 Dr Carlton B Goodlett Pl</p>'+
			'<p>San Francisco, CA 94102</p>'+
			'<p>United States</p>'+
			'<div id="fs"></div>',
		api: 'https://api.foursquare.com/v2/venues/40982e80f964a520ecf21ee3?client_id=QHMZ0NO2JR4DBTPMIGAL21XPXCUZKWKO2YJB5FEMKUIELG3N&client_secret=HPLAIBW1VAUZ4END4I3VJGIIZ3XONHV03EC2QIOCW3MW53IO&v=20150501'
	},
];

// update the display of all markers on the map
function setAllMap(map, places) {
	for (var i = 0; i < places.length; i++) {
		places[i].setMap(map);
	}
}

// set all markers to unclicked status
function resetMarker() {
	if(vm.lastPlace !== null) {
		vm.lastPlace.infowindow.close();
		vm.lastPlace.setAnimation(null);
		$('li').eq(vm.lastPlace.index).css('background', 'white');
	}
}

// update markers and list when the marker gets clicked
function clickMarker(marker, index) {
	if(marker !== vm.lastPlace) {
		resetMarker();
		
		vm.lastPlace = marker;
		// update the display of the marker being clicked and related list item
		marker.infowindow.open(vm.map, marker);
		marker.setAnimation(google.maps.Animation.BOUNCE);
		$('li').eq(index).css('background', '#ccc');

		// get Foursquare data asynchronously and display it in the infowindow
		$.getJSON(marker.api, function(data) {
			$('div#fs').html('<img src="img/Foursquare-icon.png">'+
				'<span class="visits">Visits: '+data.response.venue.stats.visitsCount+'</span>'+
				'<p><a href="'+data.response.venue.canonicalUrl+'" target="_blank">Foursqure Link</a></p>');
		}).error(function(e) {
			$('div#fs').html('<span class="warning">Foursqure Could Not Be Loaded!</span>');
		});
	}
}

// update markers and list when a list item gets clicked
function clickList(list) {
	var index = list.index();
	var marker = vm.places()[index];
	if(marker !== vm.lastPlace) {
		resetMarker();

		vm.lastPlace = marker;
		// update the display of the list item being clicked and related marker
		marker.infowindow.open(vm.map, marker);
		marker.setAnimation(google.maps.Animation.BOUNCE);
		list.css('background', '#ccc');

		// get Foursquare data asynchronously and display it in the infowindow
		$.getJSON(marker.api, function(data) {
			$('div#fs').html('<img src="img/Foursquare-icon.png">'+
				'<span class="visits">Visits: '+data.response.venue.stats.visitsCount+'</span>'+
				'<p><a href="'+data.response.venue.canonicalUrl+'" target="_blank">Foursqure Link</a></p>');
		}).error(function(e) {
			$('div#fs').html('<span class="warning">Foursqure Could Not Be Loaded!</span>');
		});
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
	// initialize the map
	this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	this.keyword = ko.observable('');	// search keyword

	this.places = ko.observableArray([]);	// attractions displayed on the screen
	this.oriPlaces = this.places();  // all attractions
	this.lastPlace = null;  // used to keep track of the place last clicked

	// create marker objects from raw data and set events
	initialPlaces.forEach(function(place, index) {
		var marker = new google.maps.Marker({      
			position: new google.maps.LatLng(place.lat, place.lng),
			map: self.map, 
			title: place.title,
			infowindow: new google.maps.InfoWindow({content: place.description}),
			index: index,
			api: place.api
		});
		self.places.push(marker);

		// listen to the event when the marker gets clicked
		google.maps.event.addListener(marker, 'click', function() {
			clickMarker(marker, marker.index);
		});
		// listen to the event when the infowindow gets closed
		google.maps.event.addListener(marker.infowindow, 'closeclick', function() {
			marker.setAnimation(null);
			$('li').eq(self.lastPlace.index).css('background', 'white');
		});
	});

	// filter the places based on the search keyword
	this.filter = ko.computed(function() {
		var results = [];

		// deactivate the active marker and list item 
		if(self.lastPlace !== null) {
			self.lastPlace.infowindow.close();
			self.lastPlace.setAnimation(null);
			$('li').eq(vm.lastPlace.index).css('background', 'white');
			self.lastPlace = null;
		}
		// set attractions displayed on the screen to original data
		self.places(self.oriPlaces);
		self.places().forEach(function(place, index) {
			place.index = index;
		});

		// if search keyword is not empty, match the markers and list items with the keyword and update on the screen.
		if(self.keyword() !== undefined && self.keyword() !== '') {
			var index = 0;
			for(var i = 0; i < self.places().length; i++) {
				if(self.places()[i].getTitle().toLowerCase().indexOf(self.keyword().toLowerCase()) !== -1) {
					self.places()[i].index = index;
					index++;
					results.push(self.places()[i]);
				}
			}
			self.places(results);
			setAllMap(null, self.oriPlaces);
			setAllMap(self.map, self.places());
		// if search keyword is empty, reset markers and list items back to original.
		} else if(self.keyword() === '') {
			self.places(self.oriPlaces);
			setAllMap(self.map, self.places());
		}
		// listen to the event when list items get clicked
		$('li').on('click', function() {
			clickList($(this));
		});
	});
};

var vm = new ViewModel();

ko.applyBindings(vm);

// listen to the event when list items get clicked
$('li').on('click', function() {
	clickList($(this));
});