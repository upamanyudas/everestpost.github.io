// Map styles and initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map when the page is loaded
    if (document.getElementById('map')) {
        initMap();
    }
});

function initMap() {
    // Coordinates for the location
    const location = { lat: -36.87855801694823, lng: 174.8473641645209 }; // Provided coordinates

    // Custom grayscale style based on the reference code
    const grayscaleStyle = [
        { featureType: "landscape.man_made", elementType: "all", stylers: [{ lightness: 51 }] },
        { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
        { featureType: "road.local", elementType: "all", stylers: [{ gamma: 2.51 }] },
        { featureType: "road.arterial", elementType: "all", stylers: [{ gamma: 1.9 }] },
        { featureType: "water", elementType: "all", stylers: [{ gamma: 1.36 }, { lightness: -47 }] },
        { featureType: "road.highway", elementType: "all", stylers: [{ gamma: 1.33 }] },
        { featureType: "transit.station.rail", elementType: "all", stylers: [{ visibility: "simplified" }] },
        { featureType: "transit.station.bus", elementType: "all", stylers: [{ visibility: "simplified" }] },
        { featureType: "transit", elementType: "all", stylers: [{ gamma: 1.2 }, { hue: "#0033ff" }] },
        { featureType: "administrative.neighborhood", elementType: "labels", stylers: [{ gamma: 1.43 }] },
        { featureType: "all", elementType: "all", stylers: [{ saturation: -100 }] },
        { featureType: "road.arterial", elementType: "labels", stylers: [{ lightness: 23 }] },
        { elementType: "labels", stylers: [{ visibility: "on" }] }
    ];

    // Create the map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
        styles: grayscaleStyle,
        disableDefaultUI: true,
        scrollwheel: true,
        draggable: true
    });

    // Custom marker icon
    const markerIcon = {
        url: '/assets/img/icons/pin-dark.png', // You'll need to create this image
        size: new google.maps.Size(48, 64),
        scaledSize: new google.maps.Size(24, 32),
        anchor: new google.maps.Point(12, 32)
    };

    // Add marker
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: markerIcon,
        title: "56A Swainston Road, Auckland, New Zealand"
    });

    // Add click event to marker
    marker.addListener('click', function() {
        const position = marker.getPosition().toUrlValue();
        const address = encodeURIComponent("56A Swainston Road, Auckland, New Zealand");
        const zoom = map.getZoom();
        window.open(`https://maps.google.com/maps?q=${address}&ll=${position}&z=${zoom}`);
    });
}
