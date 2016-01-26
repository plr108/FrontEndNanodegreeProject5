// Model //////////////////////////////////////////////////////////////////////
var model = {
    ballparks : [{
        title: 'PNC Park',
        lat: 40.4470471765,
        lng: -80.0061745423
    }, {
        title: 'Citizens Bank Park',
        lat: 39.905569,
        lng: -75.166591
    }, {
        title: 'Oriole Park at Camden Yards',
        lat: 39.283505,
        lng: -76.621911
    }, {
        title: 'Progressive Field',
        lat: 41.495537,
        lng: -81.685278
    }, {
        title: 'U.S. Cellular Field',
        lat: 41.830176,
        lng: -87.634225
    }, {
        title: 'Great American Ball Park',
        lat: 39.097466,
        lng: -84.507029
    }, {
        title: 'Wrigley Field',
        lat: 41.947902,
        lng: -87.655823
    }],
};
var Ballpark = function(data) {
    this.title = ko.observable(data.title);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
};

// End Model //////////////////////////////////////////////////////////////////

// View ///////////////////////////////////////////////////////////////////////
//
var mapView = {

    // markers will be used to track the map markers
    markers : []

    // TODO: populate markers[] via ViewModel
};

// Google Maps callback function
window.initMap = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
        // coordinates to show entire US on a 1600x900px display
        center: {
            lat: 41.5,
            lng: -80.5
        },
        zoom: 6
    });

    // create one infoWindow for use by the marker for the activeBallpark
    var infoWindow = new google.maps.InfoWindow();

    // create map markers for all ballparks
    for (i = 0; i < model.ballparks.length; i++) {
        var marker = new google.maps.Marker({
            map: map,
            title: model.ballparks[i].title,
            position: new google.maps.LatLng(model.ballparks[i].lat, model.ballparks[i].lng),
            animation: google.maps.Animation.DROP
        });

        // create event listener for clicking the marker
        google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                // make the marker bounce for 750ms
                setBounce(marker);

                // create infoWindow contentHTML
                var contentHTML = marker.title;

                // close the infoWindow (if it is open)
                infoWindow.close();

                // initialize infoWindow
                initializeInfoWindow(marker, contentHTML, infoWindow);

                // open the infoWindow
                infoWindow.open(map, marker);
            };
        })(marker));

        var initializeInfoWindow = function(marker, contentHTML, infoWindow) {

            // set InfoWindow content
            infoWindow.setContent(contentHTML);

        }


        // make the marker bounce for 750ms
        function setBounce(marker) {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 750);

        };
    }
};

// End View ///////////////////////////////////////////////////////////////////

// View Model /////////////////////////////////////////////////////////////////
var ViewModel = function() {
    // self is the ViewModel binding
    var self = this;

    // self.ballparkList
    this.ballparkList = ko.observableArray([]);
    this.activeBallpark = null;

    model.ballparks.forEach(function(ballparkItem) {
        self.ballparkList.push(new Ballpark(ballparkItem));

    });

    this.activeBallpark = ko.observable(this.ballparkList()[0]);

    this.setActiveBallpark = function(clickedBallpark) {
        self.activeBallpark(clickedBallpark);
    }
};

// activate Knockout
ko.applyBindings(new ViewModel());
// End View Model /////////////////////////////////////////////////////////////
