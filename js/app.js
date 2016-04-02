//Offline.js Javascript
/*! offline-js 0.7.13 */
(function(){var a,b,c,d,e,f,g;d=function(a,b){var c,d,e,f;e=[];for(d in b.prototype)try{f=b.prototype[d],null==a[d]&&"function"!=typeof f?e.push(a[d]=f):e.push(void 0)}catch(g){c=g}return e},a={},null==a.options&&(a.options={}),c={checks:{xhr:{url:function(){return"/favicon.ico?_="+Math.floor(1e9*Math.random())},timeout:5e3},image:{url:function(){return"/favicon.ico?_="+Math.floor(1e9*Math.random())}},active:"xhr"},checkOnLoad:!1,interceptRequests:!0,reconnect:!0},e=function(a,b){var c,d,e,f,g,h;for(c=a,h=b.split("."),d=e=0,f=h.length;f>e&&(g=h[d],c=c[g],"object"==typeof c);d=++e);return d===h.length-1?c:void 0},a.getOption=function(b){var d,f;return f=null!=(d=e(a.options,b))?d:e(c,b),"function"==typeof f?f():f},"function"==typeof window.addEventListener&&window.addEventListener("online",function(){return setTimeout(a.confirmUp,100)},!1),"function"==typeof window.addEventListener&&window.addEventListener("offline",function(){return a.confirmDown()},!1),a.state="up",a.markUp=function(){return a.trigger("confirmed-up"),"up"!==a.state?(a.state="up",a.trigger("up")):void 0},a.markDown=function(){return a.trigger("confirmed-down"),"down"!==a.state?(a.state="down",a.trigger("down")):void 0},f={},a.on=function(b,c,d){var e,g,h,i,j;if(g=b.split(" "),g.length>1){for(j=[],h=0,i=g.length;i>h;h++)e=g[h],j.push(a.on(e,c,d));return j}return null==f[b]&&(f[b]=[]),f[b].push([d,c])},a.off=function(a,b){var c,d,e,g,h;if(null!=f[a]){if(b){for(e=0,h=[];e<f[a].length;)g=f[a][e],d=g[0],c=g[1],c===b?h.push(f[a].splice(e,1)):h.push(e++);return h}return f[a]=[]}},a.trigger=function(a){var b,c,d,e,g,h,i;if(null!=f[a]){for(g=f[a],i=[],d=0,e=g.length;e>d;d++)h=g[d],b=h[0],c=h[1],i.push(c.call(b));return i}},b=function(a,b,c){var d,e,f,g,h;return h=function(){return a.status&&a.status<12e3?b():c()},null===a.onprogress?(d=a.onerror,a.onerror=function(){return c(),"function"==typeof d?d.apply(null,arguments):void 0},g=a.ontimeout,a.ontimeout=function(){return c(),"function"==typeof g?g.apply(null,arguments):void 0},e=a.onload,a.onload=function(){return h(),"function"==typeof e?e.apply(null,arguments):void 0}):(f=a.onreadystatechange,a.onreadystatechange=function(){return 4===a.readyState?h():0===a.readyState&&c(),"function"==typeof f?f.apply(null,arguments):void 0})},a.checks={},a.checks.xhr=function(){var c,d;d=new XMLHttpRequest,d.offline=!1,d.open("HEAD",a.getOption("checks.xhr.url"),!0),null!=d.timeout&&(d.timeout=a.getOption("checks.xhr.timeout")),b(d,a.markUp,a.markDown);try{d.send()}catch(e){c=e,a.markDown()}return d},a.checks.image=function(){var b;return b=document.createElement("img"),b.onerror=a.markDown,b.onload=a.markUp,void(b.src=a.getOption("checks.image.url"))},a.checks.down=a.markDown,a.checks.up=a.markUp,a.check=function(){return a.trigger("checking"),a.checks[a.getOption("checks.active")]()},a.confirmUp=a.confirmDown=a.check,a.onXHR=function(a){var b,c,e;return e=function(b,c){var d;return d=b.open,b.open=function(e,f,g,h,i){return a({type:e,url:f,async:g,flags:c,user:h,password:i,xhr:b}),d.apply(b,arguments)}},c=window.XMLHttpRequest,window.XMLHttpRequest=function(a){var b,d,f;return f=new c(a),e(f,a),d=f.setRequestHeader,f.headers={},f.setRequestHeader=function(a,b){return f.headers[a]=b,d.call(f,a,b)},b=f.overrideMimeType,f.overrideMimeType=function(a){return f.mimeType=a,b.call(f,a)},f},d(window.XMLHttpRequest,c),null!=window.XDomainRequest?(b=window.XDomainRequest,window.XDomainRequest=function(){var a;return a=new b,e(a),a},d(window.XDomainRequest,b)):void 0},g=function(){return a.getOption("interceptRequests")&&a.onXHR(function(c){var d;return d=c.xhr,d.offline!==!1?b(d,a.markUp,a.confirmDown):void 0}),a.getOption("checkOnLoad")?a.check():void 0},setTimeout(g,0),window.Offline=a}).call(this),function(){var a,b,c,d,e,f,g,h,i;if(!window.Offline)throw new Error("Offline Reconnect brought in without offline.js");d=Offline.reconnect={},f=null,e=function(){var a;return null!=d.state&&"inactive"!==d.state&&Offline.trigger("reconnect:stopped"),d.state="inactive",d.remaining=d.delay=null!=(a=Offline.getOption("reconnect.initialDelay"))?a:3},b=function(){var a,b;return a=null!=(b=Offline.getOption("reconnect.delay"))?b:Math.min(Math.ceil(1.5*d.delay),3600),d.remaining=d.delay=a},g=function(){return"connecting"!==d.state?(d.remaining-=1,Offline.trigger("reconnect:tick"),0===d.remaining?h():void 0):void 0},h=function(){return"waiting"===d.state?(Offline.trigger("reconnect:connecting"),d.state="connecting",Offline.check()):void 0},a=function(){return Offline.getOption("reconnect")?(e(),d.state="waiting",Offline.trigger("reconnect:started"),f=setInterval(g,1e3)):void 0},i=function(){return null!=f&&clearInterval(f),e()},c=function(){return Offline.getOption("reconnect")&&"connecting"===d.state?(Offline.trigger("reconnect:failure"),d.state="waiting",b()):void 0},d.tryNow=h,e(),Offline.on("down",a),Offline.on("confirmed-down",c),Offline.on("up",i)}.call(this),function(){var a,b,c,d,e,f;if(!window.Offline)throw new Error("Requests module brought in without offline.js");c=[],f=!1,d=function(a){return Offline.trigger("requests:capture"),"down"!==Offline.state&&(f=!0),c.push(a)},e=function(a){var b,c,d,e,f,g,h,i,j;j=a.xhr,g=a.url,f=a.type,h=a.user,d=a.password,b=a.body,j.abort(),j.open(f,g,!0,h,d),e=j.headers;for(c in e)i=e[c],j.setRequestHeader(c,i);return j.mimeType&&j.overrideMimeType(j.mimeType),j.send(b)},a=function(){return c=[]},b=function(){var b,d,f,g,h,i;for(Offline.trigger("requests:flush"),h={},b=0,f=c.length;f>b;b++)g=c[b],i=g.url.replace(/(\?|&)_=[0-9]+/,function(a,b){return"?"===b?b:""}),h[g.type.toUpperCase()+" - "+i]=g;for(d in h)g=h[d],e(g);return a()},setTimeout(function(){return Offline.getOption("requests")!==!1?(Offline.on("confirmed-up",function(){return f?(f=!1,a()):void 0}),Offline.on("up",b),Offline.on("down",function(){return f=!1}),Offline.onXHR(function(a){var b,c,e,f,g;return g=a.xhr,e=a.async,g.offline!==!1&&(f=function(){return d(a)},c=g.send,g.send=function(b){return a.body=b,c.apply(g,arguments)},e)?null===g.onprogress?(g.addEventListener("error",f,!1),g.addEventListener("timeout",f,!1)):(b=g.onreadystatechange,g.onreadystatechange=function(){return 0===g.readyState?f():4===g.readyState&&(0===g.status||g.status>=12e3)&&f(),"function"==typeof b?b.apply(null,arguments):void 0}):void 0}),Offline.requests={flush:b,clear:a}):void 0},0)}.call(this),function(){var a,b,c,d,e;if(!Offline)throw new Error("Offline simulate brought in without offline.js");for(d=["up","down"],b=0,c=d.length;c>b;b++)e=d[b],(document.querySelector("script[data-simulate='"+e+"']")||localStorage.OFFLINE_SIMULATE===e)&&(null==Offline.options&&(Offline.options={}),null==(a=Offline.options).checks&&(a.checks={}),Offline.options.checks.active=e)}.call(this),function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;if(!window.Offline)throw new Error("Offline UI brought in without offline.js");b='<div class="offline-ui"><div class="offline-ui-content"></div></div>',a='<a href class="offline-ui-retry"></a>',f=function(a){var b;return b=document.createElement("div"),b.innerHTML=a,b.children[0]},g=e=null,d=function(a){return k(a),g.className+=" "+a},k=function(a){return g.className=g.className.replace(new RegExp("(^| )"+a.split(" ").join("|")+"( |$)","gi")," ")},i={},h=function(a,b){return d(a),null!=i[a]&&clearTimeout(i[a]),i[a]=setTimeout(function(){return k(a),delete i[a]},1e3*b)},m=function(a){var b,c,d,e;d={day:86400,hour:3600,minute:60,second:1};for(c in d)if(b=d[c],a>=b)return e=Math.floor(a/b),[e,c];return["now",""]},l=function(){var c,h;return g=f(b),document.body.appendChild(g),null!=Offline.reconnect&&Offline.getOption("reconnect")&&(g.appendChild(f(a)),c=g.querySelector(".offline-ui-retry"),h=function(a){return a.preventDefault(),Offline.reconnect.tryNow()},null!=c.addEventListener?c.addEventListener("click",h,!1):c.attachEvent("click",h)),d("offline-ui-"+Offline.state),e=g.querySelector(".offline-ui-content")},j=function(){return l(),Offline.on("up",function(){return k("offline-ui-down"),d("offline-ui-up"),h("offline-ui-up-2s",2),h("offline-ui-up-5s",5)}),Offline.on("down",function(){return k("offline-ui-up"),d("offline-ui-down"),h("offline-ui-down-2s",2),h("offline-ui-down-5s",5)}),Offline.on("reconnect:connecting",function(){return d("offline-ui-connecting"),k("offline-ui-waiting")}),Offline.on("reconnect:tick",function(){var a,b,c;return d("offline-ui-waiting"),k("offline-ui-connecting"),a=m(Offline.reconnect.remaining),b=a[0],c=a[1],e.setAttribute("data-retry-in-value",b),e.setAttribute("data-retry-in-unit",c)}),Offline.on("reconnect:stopped",function(){return k("offline-ui-connecting offline-ui-waiting"),e.setAttribute("data-retry-in-value",null),e.setAttribute("data-retry-in-unit",null)}),Offline.on("reconnect:failure",function(){return h("offline-ui-reconnect-failed-2s",2),h("offline-ui-reconnect-failed-5s",5)}),Offline.on("reconnect:success",function(){return h("offline-ui-reconnect-succeeded-2s",2),h("offline-ui-reconnect-succeeded-5s",5)})},"complete"===document.readyState?j():null!=document.addEventListener?document.addEventListener("DOMContentLoaded",j,!1):(c=document.onreadystatechange,document.onreadystatechange=function(){return"complete"===document.readyState&&j(),"function"==typeof c?c.apply(null,arguments):void 0})}.call(this);


var iniplaces = [
	{
		name: "Select CityWalk",
		lat: 28.5285479,
		long: 77.2194538,
		description: "One of the best Malls in Delhi"
	},
	{
		name: "DLF Ambience Mall",
		lat: 28.5057298,
		long: 77.0962621,
		description: "This is one of the Asia's biggest Malls"
	},
	{
		name: "The Great India Place",
		lat: 28.567624,
		long: 77.3261979,
		description: " This is again a very good mall to visit in Delhi NCR "
	},
	{
		name: "Cannaught Place",
		lat: 28.6314512,
		long: 77.2166672,
		description: "This is one of the center of attraction to visit in Delhi."
	},
	{
		name: "Lal Qila",
		lat: 28.6558126,
		long: 77.2419522,
		description: "Historical Monument to visit in Delhi."
	},
	{
		name: "Red Fort",
		lat: 28.6561592,
		long: 77.2410203,
		description: "Historical Monument to visit in Delhi."
	},
	{
		name: "Lotus Temple",
		lat: 28.553492,
		long: 77.2588264,
		description: "A peaceful and beautiful Place to visit."
	},
	{
		name: "Garden of five senses",
		lat: 28.513935,
		long: 77.196918,
		description: "Beautiful Place to spend time with loved once."
	},
	{
		name: "AksharDham Mandir",
		lat: 28.6180024,
		long: 77.2793719,
		description: "The best place to get peace of mind."
	},
	{
		name: "India Gate",
		lat: 28.6109401,
		long: 77.234482,
		description: "Built in the memories of Indian War Heroes. A must visit Place."
	},
	{
		name: "National Meuseum",
		lat: 28.6117993,
		long: 77.2194934,
		description: "Meuseumm to learn about India."
	},
	{
		name: "Jawaharlal Nehru Stadium",
		lat: 28.5828456,
		long: 77.2343665,
		description: "A world class Sports Stadium."
	},
	{
		name: "GymKhana Club",
		lat: 28.5983359,
		long: 77.2048893,
		description: "Best Gym you can find in Delhi."
	}
];



//Prevent click bubbling on the search button
ko.bindingHandlers.preventBubble = {
    init: function(element, valueAccessor) {
        var eventName = ko.utils.unwrapObservable(valueAccessor());
        ko.utils.registerEventHandler(element, eventName, function(event) {
           event.cancelBubble = true;
           if (event.stopPropagation) {
                event.stopPropagation();
           }
        });
    }
};

var ViewModel = function(){
	var self = this;
	var map;
	var bounds;
	var mapBounds;
	var infowindow
	var city = ko.observable('New Delhi');
	var markers = [];
	var geocode_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
	var api_key = 'key=AIzaSyAiVoNw54-8R0okGj5Zc9BZzsn98No-efU';
	var geocode = geocode_url + city() + '&' + api_key;

	self.listDisplayed = ko.observable(!0);
	self.query = ko.observable('');
	self.articleList = ko.observableArray([]);

	//Create a place object
	var Place = function(data, map, markers, infowindow){
		this.name = data.name;
		this.lat = data.lat;
		this.long = data.long;

		name_string = String(data.name);

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.lat, data.long),
			title: name_string,
			animation: google.maps.Animation.DROP,
			map: map
		});


		function article(content, url){
			var self = this;
			self.content = content;
			self.url = url;
		}

		function apiData(){
			var wikipediaURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + data.name + '&format=json&callback=wikiCallback';
			var wikiRequestTimeout = setTimeout(function(){
				$wikiData.text("Failed to get Wikipedia resources");
			}, 5000);

			$.ajax({
				url: wikipediaURL,
				dataType: "jsonp",

				success: function (response) {
					self.articleList.removeAll();

					var articles = response[1];

					for (var i=0; i<articles.length; i++){
						articleStr = articles[i];
						var url = 'http://en.wikipedia.org/wiki/' + articleStr;
						self.articleList.push(new article(articleStr, url));
					}

					clearTimeout(wikiRequestTimeout);
				}
			});
		}

		function generate_content(articles){
			var Info_Content = '<ol>\n'

			Info_Content += '<h1>Wikipedia Articles</h1>'

			if (articles.length === 0) {
				Info_Content = 'No Wikipedia article found'
			}

			for (var i=0; i<articles.length; i++){
				var content = articles[i].content;
				var url = articles[i].url;

				if (articles[i].error){
					Info_Content += '<h5 style="color: red">' + content + '</h5>';
				}else{
					Info_Content += '<li><a href="' + url + '">' + content + '</a></li>\n';
				}
			}
			Info_Content += '</ol>';

			return Info_Content;
		};

		google.maps.event.addListener(marker, 'click', function(){
			apiData();
			map.panTo(marker.position);
			window.setTimeout(function(){
				if (Offline.state === 'up') {
					infowindow.setContent("You're now offline :(");
				}
				infowindow.setContent(generate_content(self.articleList()));
				infowindow.open(map, marker);
			}, 500)


		});



		markers.push(marker);

	}



	//Initialize function for the map
	function initialize (){
		var mapOptions = {
          disableDefaultUI: true
        };

        map = new google.maps.Map($('#map-canvas')[0],
            mapOptions);

        infowindow = new google.maps.InfoWindow();

        $.getJSON(geocode, function(data){
			bounds = data.results[0].geometry.bounds
			mapBounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(bounds.southwest.lat, bounds.southwest.lng),
				new google.maps.LatLng(bounds.northeast.lat, bounds.northeast.lng));
			map.fitBounds(mapBounds);
			map.setZoom(11);
		});
	}

	initialize();

	//Create a binding to listen to the click on the list
	self.clickMarker = function(place){
		var placeName = place.name
		for (var i in markers){
			if (markers[i].title === placeName) {
				google.maps.event.trigger(markers[i], 'click');
			}
		}
	};

	//Make the Map Fit the Screen

	window.addEventListener('resize', function(e) {
	    map.fitBounds(mapBounds);
	    $("#map-canvas").height($(window).height());
	});

	//Expand the Search Box when user clicks on Button
	self.expandSearch = function(){
		self.listDisplayed() ? self.listDisplayed(!1) : self.listDisplayed(!0)
	};

	//Push the Trails into a list of viewmodel trail objects
	self.placeList = ko.observableArray([]);

	iniplaces.forEach(function(placeitem){
		self.placeList.push(new Place(placeitem, map, markers, infowindow));
	});


	//Implement the Search Functionality
	self.search = function(value){
		//remove all the current places, which removes them from the view
		self.placeList.removeAll();
		for (var i in markers){
			markers[i].setMap(null);
		}

		for(var x in iniplaces){
			if(iniplaces[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0){
				self.placeList.push(new Place(iniplaces[x], map, markers, infowindow));
			}
		}
	}

	self.query.subscribe(self.search);

};


ko.applyBindings(new ViewModel());
