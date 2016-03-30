'use strict';

var Model = {

	// Hardcoded location data used for the API requests
	mapdata : {
		map : null,
		service : null,
		bounds: null,
		// Data used to build the infowindows
		// Using Google Place and Yelp APIs
		infowindows : [
			{
				googlePlaceId: "ChIJJzLofDb9DDkRO-6CwXvhsFA",
				yelpPlaceId: "jardin-du-luxembourg-paris"
			},
			{
				googlePlaceId: "ChIJMxtaOMxx5kcR28SQEfSygUc",
				yelpPlaceId: "cinéma-gaumont-parnasse-paris-3"
			},
			{
				googlePlaceId: "ChIJOzl9Icxx5kcRWcga16oXZEw",
				yelpPlaceId: "le-falstaff-paris"
			},
			{
				googlePlaceId: "ChIJxy57Nudx5kcRbGtimYdLcrk",
				yelpPlaceId: "album-paris-7"
			},
			{
				googlePlaceId: "ChIJxy57Nudx5kcRcfSt_e_iADU",
				yelpPlaceId: "album-paris-6"
			},
			{
				googlePlaceId: "ChIJkYSjLedx5kcRaNJBiMaJRfk",
				yelpPlaceId: "pulps-paris"
			},
			{
				googlePlaceId: "ChIJKZtiueZx5kcRl9zQESU6I9A",
				yelpPlaceId: "marché-maubert-paris-2"
			},
			{
				googlePlaceId: "ChIJ6_YgoOZx5kcRx_kUrl7wU7g",
				yelpPlaceId: "boucherie-parisienne-debray-paris"
			},
			{
				googlePlaceId: "ChIJ4fRivuZx5kcR_nMndA0Lv24",
				yelpPlaceId: "laurent-dubois-paris-3"
			}
		],
		// Data used to build the marker
		markers : [
			{
				position: {lat: 28.6299894, lng: 77.2201622},
				title: "StarBucks"
			},
			{
				position: {lat: 48.84303, lng: 2.32448},
				title: "Gaumont Parnasse"
			},
			{
				position: {lat: 48.84281, lng: 2.32605},
				title: "Falstaff - Bar à bière"
			},
			{
				position: {lat: 48.85101, lng: 2.34538},
				title: "Librairie Album - Manga & BD"
			},
			{
				position: {lat: 48.85064, lng: 2.34563},
				title: "Librairie Album - Comics & Figurine"
			},
			{
				position: {lat: 48.85084, lng: 2.34612},
				title: "Pulp Comics - Boutique Star Wars"
			},
			{
				position: {lat: 48.84988, lng: 2.34851},
				title: "Marché Maubert - Jeudi & Samedi"
			},
			{
				position: {lat: 48.84980, lng: 2.34856},
				title: "Boucherie"
			},
			{
				position: {lat: 48.84983, lng: 2.34841},
				title: "Fromagerie"
			}
		]
	},

	LayoutInfoWindow : function(place) {
		// Store the InforWindow layout
		var layoutContent = '';

		// Check that every required field has data, then build an HTML code around it
		if (place.geometry.location.lat() && place.geometry.location.lng()) {
			layoutContent = layoutContent + '<div class="infwin-img"><img src="https://maps.googleapis.com/maps/api/streetview?size=200x200&location=' + place.geometry.location.lat() + ',' + place.geometry.location.lng() + '&key=AIzaSyC9V681P6SnJXI-5glxGhYipuRb9QiDtHM"/></div></br>';
		}
		if (place.name) {
			layoutContent = layoutContent + '<span class="infwin-name">' + place.name + '</span></br>';
		}
		if (place.formatted_address) {
			layoutContent = layoutContent + '<span class="infwin-adress">' + place.formatted_address + '</span></br>';
		}
		if (place.formatted_phone_number) {
			layoutContent = layoutContent + '<a class="infwin-phone" href="tel:' + place.formatted_phone_number.replace(" ","") + '">' + place.formatted_phone_number + '</a></br>';
		}
		if (place.rating) {
			layoutContent = layoutContent + '<span class="infwin-rating">Rating: ' + place.rating + '/5</span></br>';
		}
		if (place.website) {
			layoutContent = layoutContent + '<a class="infwin-website" href="' + place.website + '">Website</a></br>';
		}
		return layoutContent;
	},

	LayoutInfoWindowYelp : function(place) {
		// Store the InfoWindow layout (with mandatory Yelp logo)
		var layoutContent = '';

		// Check that every required field as data, then build an HTML code around it
		if (place.url) {
			layoutContent = layoutContent + '<a class="infwin-website" href="' + place.url + '"><img src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/14f29ad24935/assets/img/yelp_logo_40x20.png"/></a>';
		}
		if (place.rating && place.rating_img_url_small) {
			place.rating_img_url_small = place.rating_img_url_small.replace('http://', 'https://');
			layoutContent = layoutContent + '<span class="infwin-yelp-rating"><img src="' + place.rating_img_url_small + '"/> ' + place.rating + '/5</span></br>';
		}
		return layoutContent;
	}

};
