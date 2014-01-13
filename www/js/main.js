"use strict";

var shop_slug = 'diandanbao';
var pushNotification;
var baseUrl = "/shop/" + shop_slug;
$.ui.autoLaunch = false; //By default, it is set to true and you're app will run right away.  We set it to false to show a splashscreen
/* This function runs when the body is loaded.*/
$.ui.useOSThemes = false;

$.ui.backButtonText = "返回";
$.ui.loadDefaultHash=false;
$.feat.nativeTouchScroll=false;
$.ui.slideSideMenu = false;
$.ui.splitView = true;
$.ui.setLeftSideMenuWidth("120px");


/* This code is used for Intel native apps */
var onDeviceReady = function () {
    try
      {
        console.log("device.platform="+device.platform);
        pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android') {
        $("#app-status-ul").append('<li>registering android</li>');
        pushNotification.register(successHandler, errorHandler, {"senderID":"1001216603633","ecb":"onNotificationGCM"});   // required!
      } else {
        $("#app-status-ul").append('<li>registering iOS</li>');
            pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});  // required!
          }
        }
    catch(err)
    {
      txt="There was an error on this page.\n\n";
      txt+="Error description: " + err.message + "\n\n";
      alert(txt);
    }
    $.ui.blockPageScroll();
    intel.xdk.device.hideSplashScreen();
};
function load_panel(panel){
  if($(panel).data('title')){
    $.ui.setTitle();
  }
};

document.addEventListener("intel.xdk.device.ready", onDeviceReady, false);
if (!((window.DocumentTouch && document instanceof DocumentTouch) || 'ontouchstart' in window)) {
    var script = document.createElement("script");
    script.src = "/plugins/appframework/plugins/af.desktopBrowsers.js";
    var tag = $("head").append(script);
}


 angular.module('diandanbao_seller', ['ngResource', 'ngSanitize',
    'diandanbao_seller.services.order',
    'diandanbao_seller.controllers.order',
    'diandanbao_seller.services.account',
    'diandanbao_seller.controllers.account'])
.config(['$compileProvider', function ($compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
}]).config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');
   }])
.run(['$location', '$rootScope',
     function($location, $rootScope){
      $rootScope.new_orders_count = 10;
  }]);

var application ;
angular.element(document).ready(function () {
    application = angular.bootstrap(document, ['diandanbao_seller']);
    $.ui.ready(function(){});
});


var init = function () {
  //$.ui.customClickHandler=myClickHandler;
  window.setTimeout(function () {
      $.ui.launch();
  }, 1500);//We wait 1.5 seconds to call $.ui.launch after DOMContentLoaded fires
};

document.addEventListener("DOMContentLoaded", init, false);