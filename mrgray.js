/*jslint -W033, -W098, -W099, -W116 */
/*jslint browser: true*/
/*global $,Meny*/
// loader
(function(c,f){ Array.prototype.foreach = function(h){for(var g=0;g<this.length;g++){h(g,this[g])}};

asyncLoader = function(i,h){ i.foreach( function(k,j){e(j,d(j),h)}); if(typeof h.callback=="function"){var g=setInterval(function(){if(f.readyState==="complete"){clearInterval(g);h.callback()}},10)}};var d=function(g){var h=g.split(".");return h[h.length-1]},e=function(h,i,g){switch(i){case"js":a(h,g);break;case"css":b(h);break;default:break}},a=function(i,h){var g=document.createElement("script");g.type="text/javascript";g.async=true;g.src=i;document.getElementsByTagName("head")[0].appendChild(g)},b=function(g){var h=document.createElement("link");h.type="text/css";h.rel="stylesheet";h.href=g;document.getElementsByTagName("head")[0].appendChild(h)};})(this,document);

// thisFolder = function() {  var loc = window.location.pathname;  return loc.substring(0, loc.lastIndexOf('/')) + '/'; }
// ws = new ReconnectingWebSocket('ws://....')   - https://github.com/joewalnes/reconnecting-websocket/

/* pre-declare required user-space  $(function(){ }). usge..  
	docready = function(){  
		$('blahblablah').... 
	}
*/
var	_docReady, docReady, docJS, docReady1, docReady2,	  
		mrgray = 'http://mrgray.com', mrgrayjs = mrgray + '/js', mrgraycss = mrgray + '/css'

var foundation = [
  // mrgray    + '/jquery-ui.css',	
	// mrgrayjs  + '/split-pane/split-pane.css',
	// mrgraycss + '/flatuipro/UI/bootstrap/css/bootstrap.css', 
	// mrgraycss + '/flatuipro/UI/bootstrap/css/bootstrap-responsive.css',
  // mrgrayjs  + '/jquery.layout.css',
	mrgraycss + '/dead-simple-grid/css/screen.css',
	mrgrayjs  + '/jquery-gridly/gridly.css',
 	mrgray 		+ '/jquery-ui.css',
	mrgray 		+ '/flatui/UI/css/flat-ui.css',
	mrgrayjs 	+ '/underscore.js',  	 // http://underscorejs.org/docs/underscore.html
 	mrgray 		+ '/jq',
	'http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js',
	'http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'
]

var jqplugins = [

	/* 	Live Query utilizes the power of jQuery selectors by binding events or firing callbacks for matched elements auto-magically, even after the page has been loaded and the DOM updated.
			For example you could use the following code to bind a click event to all A tags, even any A tags you might add via AJAX.
					$('a').livequery('click', function(event) {  alert('clicked'); return false; });  - more examples at https://github.com/brandonaaron/livequery	 */
	'livequery/jquery.livequery.js',
	/* 	Watch for width or height changes and log values
		$('div').watch('width height', function(){ console.log(this.style.width, this.style.height); });
		$('div').animate({width:'100px',height:'200px'}, 500); // Animated div */
	'jquery-watch/jquery.watch.js', 

	'jquery-gridly/javascripts/jquery.gridly.js',

	/* drag and drop     $('#pep').pep();  */
	'jquery.pep.js/dist/jquery.pep.min.js',

	'ICanHaz.js/ICanHaz.js',
	'randomizeColor.js',
	'split-pane/split-pane.js',
 	'tablesorter/js/jquery.tablesorter.js'
]
// mrgrayjs + '/sugar.js',

var flatui   = function(){
  asyncLoader( [
    '/flatui/UI/css/flat-ui.css'
    ], { 'callback' : function() { console.log('loaded /flatui/UI/css/flat-ui.css')
      asyncLoader( [
        '/flatui/UI/js/',
        '/flatui/UI/js/flatui-radio.js'

        ], { 'callback':function() { console.log('loaded flat-ui js') }
      })
    }
  })
} 

var flatlibs = [
		'jquery.ui.touch-punch.min.js',
		'bootstrap.min.js', 'bootstrap-select.js', 'bootstrap-switch.js',
		'jquery.tagsinput.js', 'jquery.placeholder.js', 'jquery.stacktable.js', 
		'flatui-checkbox.js', 'flatui-radio.js', 'application.js'
]
var otherlibs = [

	/* WebFontConfig = {  google: { families: [ 'Ubuntu+Mono:400,700:latin' ] } };  */
	/*	'http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1' */
]

	
function ReconnectingWebSocket(a){function f(g){c=new WebSocket(a);if(b.debug||ReconnectingWebSocket.debugAll){console.debug("ReconnectingWebSocket","attempt-connect",a)}var h=c;var i=setTimeout(function(){if(b.debug||ReconnectingWebSocket.debugAll){console.debug("ReconnectingWebSocket","connection-timeout",a)}e=true;h.close();e=false},b.timeoutInterval);c.onopen=function(c){clearTimeout(i);if(b.debug||ReconnectingWebSocket.debugAll){console.debug("ReconnectingWebSocket","onopen",a)}b.readyState=WebSocket.OPEN;g=false;b.onopen(c)};c.onclose=function(h){clearTimeout(i);c=null;if(d){b.readyState=WebSocket.CLOSED;b.onclose(h)}else{b.readyState=WebSocket.CONNECTING;if(!g&&!e){if(b.debug||ReconnectingWebSocket.debugAll){console.debug("ReconnectingWebSocket","onclose",a)}b.onclose(h)}setTimeout(function(){f(true)},b.reconnectInterval)}};c.onmessage=function(c){if(b.debug||ReconnectingWebSocket.debugAll){console.debug("ReconnectingWebSocket","onmessage",a,c.data)}b.onmessage(c)};c.onerror=function(c){if(b.debug||ReconnectingWebSocket.debugAll){console.debug("ReconnectingWebSocket","onerror",a,c)}b.onerror(c)}}this.debug=false;this.reconnectInterval=1e3;this.timeoutInterval=2e3;var b=this;var c;var d=false;var e=false;this.url=a;this.readyState=WebSocket.CONNECTING;this.URL=a;this.onopen=function(a){};this.onclose=function(a){};this.onmessage=function(a){};this.onerror=function(a){};f(a);this.send=function(d){if(c){if(b.debug||ReconnectingWebSocket.debugAll){console.debug("ReconnectingWebSocket","send",a,d)}return c.send(d)}else{throw"INVALID_STATE_ERR : Pausing to reconnect websocket"}};this.close=function(){if(c){d=true;c.close()}};this.refresh=function(){if(c){c.close()}}}ReconnectingWebSocket.debugAll=false


Object.values = function (obj){ var vals = []; 
	for( var key in obj ) if(obj.hasOwnProperty(key)) vals.push(obj[key]); return vals;  
}
window._console = { log:   function ()    { _.each(arguments, function(arg){ log(stringify(arg, true));}); },
                    dir:   function ()    { var l = arguments.length, i = 0; for (; i < l; i++) { log(stringify(arguments[i]));  } },
                    props: function (obj) { var props = [], realObj; try {  for (var p in obj) props.push(p);  } catch (e) {}  return props; } 
}

// make array of all js to be loaded
var libs = function() { return _.union( _.map( jqplugins, function(js){ return mrgrayjs + '/' + js; }),
                                        _.map( flatlibs,  function(js){ return flatuiJS + '/' + js; }), 
																				otherlibs); 
}
function addDiv(target){
  $('<div>').css('background-color', color)
    (target = target == null ? $('body') : target).append(div) // if(!div.attr('style')) console.log(color);
}
_docReady 		= function(more) { 	console.log('loaded mrgray.com JS')
WebFontConfig = { google: { families: [ 'Ubuntu+Mono:400,700:latin' ] }  };
doDocReady    = function(more){ 
	
	if (_.isFunction(docReady)) { console.log('loading docReady'); docReady(); } 
 	if (_.isArray(docJS)) 			{ 
		asyncLoader( docJS, { 'callback':function() { console.log('loaded docJS');  doDocReady(); } }) }
  else doDocReady(function(){  $('body').fadeIn(500); })
}

// START!
asyncLoader(   foundation, {'callback': function(){ console.log('loaded jquery')
  asyncLoader( foundation2, {'callback': function(){ console.log('loaded jqueryUI + underscore.js')
		asyncLoader( libs(), 
                            {'callback': function(){ _docReady();  
		}})
	}})
}}) 

var randomColor = function(){ return '#'+Math.random().toString(16).substr(2,6); };

 // 'http://' + (location.host || 'localhost' || mrgray.com).split(':')[0] + ':35729/livereload.js?snipver=1'
// 'http://mrgray.com/css/flatuipro/UI/js/jquery.ui.touch-punch.min.js',
	

// 'http://rawgithub.com/joequery/Stupid-Table-Plugin/master/stupidtable.js?dev',
// 'http://mrgray.com/jquery',
// 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js',
// '/js/++/jquerypp.js',
// 'http://mrgray.com/js/jQuery-Bindings/src/jquery.bindings.js',
// 'http://mrgray.com/js/jQuery-Bindings/src/jquery.bindings.css.js',
// for (var dr in [, docReady1, docReady2])
// $('body').append('<div>Ilove to poop</div>');      DO STUFF HERE...


          // $('#test').delay(500).fadeIn();
            // Syntax Highlighting
            // $('pre code').each(function(i, e) {hljs.highlightBlock(e)});

    // 'css/bootstrap.min.css',
    // 'css/bootstrap-responsive.min.css',
    // 'css/font-awesome.css',
    // 'http://yandex.st/highlightjs/7.3/styles/pojoaque.min.css',
    // '//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js',
    // '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.0/jquery-ui.min.js',
    // 'http://yandex.st/highlightjs/7.3/highlight.min.js'

/*jslint node: true */

/*** function to load a given css file  */
// loadCSS = function(href) { var link = $('<link>'); $('head').append(link); link.attr({ rel:'stylesheet', href: href }) }
/*** function to load a given js file * tip from fisherman: you can use jquery function instead of this custom function
 * http://api.jquery.com/jQuery.getScript
 */
// loadJS = function(src) { var jsLink = $("<script>"); $("head").append(jsLink); jsLink.attr('src',src); };





/** getscript - Load a script (JQ) into <script> element  https://github.com/premasagar/cmd.js
 * @param src     {String}  The source url for the script to load
 * @param callback  {Function}  Called when the script has loaded
 */
       // link = document.createElement( 'link' );           // create the link node
/*


function getscript(src, callback, options, isStyle) {  isStyle = isStyle ?: NO
  "use strict"
  var document = window.document,
          head = document.head || document.getElementsByTagName("head")[0],
        script = document.createElement("script"),
        loaded = false
       options = options || {}
  function finish() {                           // Clean up circular references to prevent memory leaks in IE
    script.onload = script.onreadystatechange = script.onerror = null
    if (!options.keep) head.removeChild(script) // Remove script element once loaded
    callback && callback.call(options.target || window, loaded)
  }
  script.type     = 'text/javascript'
  script.charset  = 'utf-8'
  script.onload   = script.onreadystatechange = function() {  var state = this.readyState
    if (!loaded && (!state || state === "complete" || state === "loaded")) { loaded = true; finish(); }
  };
  script.onerror  = finish;   // NOTE: doesn't work in IE. Maybe IE
  script.async    = false;      // Extra hinting for compliant browsers) Apply the src, with opt `noCache`, to bust cache
  script.src      = src + (options.noCache ? "?v=" + (new Date()).getTime() : "");
  head.appendChild(script);   // Go...
}
var mgjs = 'http://mrgray.com/js/'

var stylesheets = [
'http://mrgray.com/jqueryuicss'
]

var scripts = [
  'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js',
  // '/js/++/jquerypp.js',
  // 'http://mrgray.com/js/jQuery-Bindings/src/jquery.bindings.js',
    // 'http://mrgray.com/js/jQuery-Bindings/src/jquery.bindings.css.js',
  'http://mrgray.com/js/jquery-gridly/javascripts/jquery.gridly.js',
  'http://mrgray.com/js/underscore/underscore.js',
  'http://mrgray.com/js/ICanHaz.js/ICanHaz.js',
  'http://mrgray.com/js/randomizeColor.js',
// 'http://rawgithub.com/joequery/Stupid-Table-Plugin/master/stupidtable.js?dev',
  'http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js',  */
/* WebFontConfig = {  google: { families: [ 'Ubuntu+Mono:400,700:latin' ] } };  */
/*  '/js/tablesorter/js/jquery.tablesorter.js',
  'http://' + (location.host || 'localhost' || mrgray.com).split(':')[0] + ':35729/livereload.js?snipver=1'
]

// getscript('http://mrgray.com/js/cmd.js/cmd.js', function(status) {
//  if (status) cmd(['http://mrgray.com/js/jquery.getCSS.js'], function(success){
//    if (status)  cmd(['http://mrgray.com/js/jquery.latest.js'], function(success){
//      var success = true;
//      for (var sheet in stylesheets) {
//        $.getCSS( , function(success){  if (success) {
//      if (status)  cmd(['http://mrgray.com/js/jquery.latest.js'], function(success){
//      console.log('Jquery was ' + (success ? 'loaded' : 'NOT LOADED') + ' via tricks!')
//        cmd(scripts, function(s){
//          _docReady();
//        })
//      })
//    })
//  }
// })
/* $('div').css('background-color','red');
    randomizeColor({  speed : 500, // OR "fast", "slow", ...
             property : 'background-color',  OR "color" or "all"
           infinite : true, //If don't want to stop changing while mouse is over
          definedColors : ['#FF8000', '#AA0070'], //Do you want to choose random just between these?
    });   */

// function loadStyleSheet( 'http://mrgray.com/css/jquery-ui.css', function( success, link ) {
//    if ( success ) { console.log('css loaded aok... ('+link+')')
//      loadupthejs();
//       // code to execute if the style sheet was loaded successfully
//    }
//    else {
//    console.log('CSS FAILURE!!!!')
//       // code to execute if the style sheet failed to successfully
//    }
// });


  // script-two.js contents:
  // var result = "script two loaded";
  // Result
  // script two loaded
  // $.getScript("http://mrgray.com", function()
  // {
    //
    //    alert("Script loaded and executed.");
    //    // Here you can use anything you defined in the loaded script
    //
  // }); *//**************************************************************************     END JQUERY   ************/


  // docReady();
  // for (var dr in [, docReady1, docReady2])
    // if (isaFunction(dr)) dr()
  // $('body').append('<div>Ilove to poop</div>');      DO STUFF HERE...
// }


    // loadCSS('http://mrgray.com/css/jquery-ui.css');


// var myDiv = $.create("div");
// DOM node ID can be specified as second parameter:
//
// var secondItem = $.create("div","item2");
// Is it serious? No. But this syntax is better than $("<div></div>"), and it's a very good value for that money.
//
// I'm a new jQuery user, switching from DOMAssistant, which has a similar function: http://www.domassistant.com/documentation/DOMAssistantContent-module.php
//
// My plugin is simpler, I think attrs and content is better to add by chaining methods:
//
// $("#container").append($.create("div").addClass("box").html("Hello, world!"));
// https://github.com/ern0/jquery.create
// jquery.create.js - 2013.08.15
// (function($) {
//  $.create = function(tag, id) {
//    elm = document.createElement(tag.toUpperCase());
//    if (typeof(id) != "undefined") elm.id = id;
//    return $(elm);
//  };
//  // $.create()
// }(jQuery));

// (function() {
//   var wf = document.createElement('script');
//   wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//   wf.type = 'text/javascript';
//   wf.async = 'true';
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(wf, s);
// })();



// function loadStyleSheet( path, fn, scope ) {
//    var head = document.getElementsByTagName( 'head' )[0], // reference to document.head for appending/ removing link nodes
//        link = document.createElement( 'link' );           // create the link node
//    link.setAttribute( 'href', path );
//    link.setAttribute( 'rel', 'stylesheet' );
//    link.setAttribute( 'type', 'text/css' );
//    var sheet, cssRules;
//    if ( 'sheet' in link ) { sheet = 'sheet'; cssRules = 'cssRules'; }  // get the correct properties to check for depending on the browser
//    else { sheet = 'styleSheet'; cssRules = 'rules'; }
//    var timeout_id = setInterval( function() {                     // start checking whether the style sheet has successfully loaded
//           try {
//              if ( link[sheet] && link[sheet][cssRules].length ) { // SUCCESS! our style sheet has loaded
//                 clearInterval( timeout_id );                      // clear the counters
//                 clearTimeout( timeout_id );
//                 fn.call( scope || window, true, link );           // fire the callback with success == true
//              }
//           } catch( e ) {} finally {}
//        }, 10 ),                                                   // how often to check if the stylesheet is loaded
//        timeout_id = setTimeout( function() {       // start counting down till fail
//           clearInterval( timeout_id );             // clear the counters
//           clearTimeout( timeout_id );
//           head.removeChild( link );                // since the style sheet didn't load, remove the link node from the DOM
//           fn.call( scope || window, false, link ); // fire the callback with success == false
//        }, 15000 );                                 // how long to wait before failing
//    head.appendChild( link );  // insert the link node into the DOM and start loading the style sheet
//    return link; // return the link node;
// }

   //     var timeout_id = setInterval( function() {                     // start checking whether the style sheet has successfully loaded
   //        try {
   //           if ( sct[sheet] && link[sheet][cssRules].length ) { // SUCCESS! our style sheet has loaded
   //              clearInterval( timeout_id );                      // clear the counters
   //              clearTimeout( timeout_id );
   //              fn.call( scope || window, true, link );           // fire the callback with success == true
   //           }
   //        } catch( e ) {} finally {}
   //     }, 10 ),                                                   // how often to check if the stylesheet is loaded
   //     timeout_id = setTimeout( function() {       // start counting down till fail
   //        clearInterval( timeout_id );             // clear the counters
   //        clearTimeout( timeout_id );
   //        head.removeChild( link );                // since the style sheet didn't load, remove the link node from the DOM
   //        fn.call( scope || window, false, link ); // fire the callback with success == false
   //     }, 15000 );                                 // how long to wait before failing
   // head.appendChild( link );  // insert the link node into the DOM and start loading the style sheet
   // return link; // return the link node;

// function isaFunction(x) {  // prevents error if we DON'T use docReady.. 
  // return (typeof (possibleFunction) === typeof (Function)); // it checks if a VAR is a FUNCTION.
// }
