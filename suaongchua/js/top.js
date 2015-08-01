/**
 * gmap.js
 * 
 * @author: Takuma Ando
 * @lisence: Apache Lisence 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * @version: 0.4.0-new
 * @lastmodified: January 5th, 2011
 */
/**
 * initilizing
 * using google ajax api
 */
google.load('maps', '3.x', { other_params: 'sensor=false' });
function initialize(){
	var googlemaps = new googleMapsController();
}
google.setOnLoadCallback(initialize);

/**
 * contractor
 */
function googleMapsController(opt){
	this.options = this._extend({
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		scaleControl: true
	}, opt);
	
	this.init();
}

/**
 * init method
 * @void
 */
googleMapsController.prototype.init = function(){
	var elms = this.getElementsByClass('googlemaps');
	for(var i = 0; i < elms.length; i++){
		var _center = this.getElementsByClass('googleCenter', elms[i])[0];
		var center = this.getElementsByClass('googleLatLng', _center)[0].firstChild.nodeValue;
		var opt = this._extend({
			center: new google.maps.LatLng(center.split(',')[0] - 0, center.split(',')[1] - 0) 
		}, this.options);
		
		var _className = ( elms[i].className ) ? elms[i].className : elms[i].getAttribute('class');
		
		//zoom override
		if ( _className.match(/zoom(\d+)/i) ){
			opt.zoom = RegExp.$1 - 0;
		}
		
		//navigation style override
		if ( _className.match(/withNavigation([a-z]+)/i) ){
			opt.navigationControlOptions = { style: eval('google.maps.NavigationControlStyle.' + RegExp.$1.toUpperCase()) };
		}
		
		var _markers = [];
		var markers = this.getElementsByClass('googleMarker', elms[i]);
		for(var j = 0; j < markers.length; j++){
			_markers.push({
				LatLng: this.getElementsByClass('googleLatLng', markers[j])[0],
				InfoWindow: this.getElementsByClass('googleInfoWindow', markers[j])[0],
				Icon: this.getElementsByClass('googleIcon', markers[j])
			});
		}
		
		var map = new google.maps.Map(elms[i], opt);
		for(var j = 0; j < _markers.length; j++){
			var _latlng = _markers[j].LatLng.firstChild.nodeValue;
			var latlng = new google.maps.LatLng(_latlng.split(',')[0] - 0, _latlng.split(',')[1] - 0);
			if ( _markers[j].InfoWindow ){
				var marker = this.setMarkerWithInfoWindow(map, {
					position: latlng,
					map: map,
					icon: (_markers[j].Icon.length) ? _markers[j].Icon.getAttribute('src') : null
				}, {
					content: this.wrap(_markers[j].InfoWindow)
				});
			} else {
				var marker = new google.maps.Marker({
					position: latlng,
					map: map,
					icon: (_markers[j].Icon.length) ? _markers[j].Icon.getAttribute('src') : null
				});
			}
			
			//start with infoWindow minified
			if ( !_className.match(/minifyInfoWindow/) && j == 0 ){
				google.maps.event.trigger(marker, 'click');
			}
		}
	}
}

/**
 * getElementsByClass method
 * @array ( document objects )
 */
googleMapsController.prototype.getElementsByClass = function( c, elm ){
	var elm = (elm) ? elm : document;
	if(elm.all){
		var elms=elm.all;
	}else if(elm.getElementsByTagName){
		var elms=elm.getElementsByTagName("*");
	}else{
		return null;
	}
	var extracted=new Array();
	re=new RegExp("(^|\ +)"+c+"(\ +|$)");
	for(i=0,j=0; i<elms.length; i++){
		if(elms[i].className.search(re) != -1) {
			extracted[j]=elms[i];
			j++;
		}
	}
	return extracted;
}

/**
 * setMarkerWithInfoWindow method
 * @object ( google.maps.Marker object )
 */
googleMapsController.prototype.setMarkerWithInfoWindow = function(map, markerOptions, infoWindowOptions){
	var marker = new google.maps.Marker(markerOptions);
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	google.maps.event.addListener(marker, 'click', function(){
		infoWindow.open(map, marker);
	});
	return marker;
};

/**
 * wrap method
 * @object ( document object )
 */
googleMapsController.prototype.wrap = function(nodes, _tagName){
	_tagName = _tagName || 'div';
	var wrapper = document.createElement(_tagName);
	if(typeof nodes == 'array'){
		for(var i = 0; i < nodes.length; i++){
			wrapper.appendChild(nodes[i]);
		}
	}else{
		wrapper.appendChild(nodes);
	}
	return wrapper;
};

/**
 * _extend method
 * @object
 */
/**
 * this method makes "_defualt" extended with "extension" object 
 */
googleMapsController.prototype._extend = function(_default, extension){
	for( var prop in extension){
		_default[ prop ] = extension[ prop ];
	}
	return _default;
};

/* End Of File */