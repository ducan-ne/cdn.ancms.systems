!function(){"use strict";var f=angular.module("app",["firebase","ngRoute","ngclipboard","ngCookies"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/home",{title:"Trang chủ",controller:"HomeController",templateUrl:"template/html/home.view.html",controllerAs:"vm"}).when("/stats",{title:"Thống kê live video",controller:"StatsController",templateUrl:"template/html/stats.view.html",controllerAs:"vm"}).when('/livevote',{title:'Live vote reactions',controller:'LiveVoteCtrl',templateUrl:"template/html/livevote.view.html",controllerAs:'vm'}).when("/library",{title:"Thư viện live của bạn",controller:"LibraryController",templateUrl:"template/html/library.view.html",controllerAs:"vm"}).otherwise({redirectTo:"/home"})}]).run(["$rootScope","$location","$cookieStore","$interval","$http","$timeout",function(a,b,c,d,z,u){toastr.options={closeButton:!0,debug:!1,progressBar:!0,positionClass:"toast-bottom-right",onclick:null,showDuration:"400",hideDuration:"1000",timeOut:"8000",extendedTimeOut:"1500",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"},a.settings=c.get("settings")||{title:"",describe:"From F8Live with <3"},a.responseLive=c.get("responseLive")||!1,a.getRandomIndex=function(a){return Math.floor(Math.random()*a)},a.ancms={base_url:"http://ancms.systems/apps/live-video",site_name:"AnCMS Systems",email:"ancmsvn@gmail.com",grFB:"https://www.facebook.com/groups/226560977734498/",fpFB:"https://www.facebook.com/spliveface",paypal:"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=64V57TNFHNCF2",baokim:encodeURIComponent("https://www.baokim.vn/payment/product/version11?business=ancmsvn@gmail.com&id=&order_description=Ủng hộ phát triển Live Stream Service&product_name=Ủng hộ phát triển Live Stream Service&product_price=50000&product_quantity=1&total_amount=50000&url_cancel=http://ancms.systems/apps/live-video&url_detail=http://ancms.systems/apps/live-video&url_success=http://ancms.systems/apps/live-video/?alert=Thank you very much"),me:anCMS.me,stats:anCMS.stats,access_token:anCMS.access_token,lang:anCMS.language,is_vn:anCMS.is_vn,support:["https://www.facebook.com/profile.php?id=100010482315983","https://www.facebook.com/thanhbinso1","https://www.facebook.com/truong.nguyenvan.509994","https://www.facebook.com/HeliosinLover?fref=ufi","https://www.facebook.com/profile.php?id=100004024803910","https://www.facebook.com/minh.soi360","https://www.facebook.com/pacmanz4","https://www.facebook.com/Sine.GT","https://www.facebook.com/ky.tuyen?fref=pb_other"],routeTemplate:{navigation:"template/html/nav-bar.html",dasboard:"template/html/stats.html",chat:"template/html/chat.html",settings:"template/html/settings.html",userInfo:"template/html/user.info.view.html"},guideYoutbe:["https://youtu.be/FDjuHCfXP0s","https://youtu.be/_ZT7XoHIBNY","https://www.youtube.com/watch?v=iqrl0rAXog4","https://www.youtube.com/watch?v=aLsgBOA_r_8",{url:"https://youtu.be/Dx7GC4xhJ_w",info:"Guide of Virruss"}],enCoders:[{url:"http://www.telestream.net/controls/wirecast-play/download-wirecast-play.htm",name:"Wirecast",describe:"Everything you need to stream live video from your desktop to the world."},{url:"https://www.xsplit.com/download",name:"XSplit Broadcaster",describe:"Revolutionary audio/video mixing application that allows you to create professional live broadcasts and video recordings."},{url:"https://obsproject.com/",name:"Open Broadcaster",describe:"Free and open source software for video recording and live streaming."}]},a.getStats = function(){z.get('api.php',{params:{action:'get-stats'}}).then(function(response){a.ancms.stats = response.data;u(function(){a.getStats()},1e3);})},a.getStats(),a.ancms.support=a.ancms.support[a.getRandomIndex(a.ancms.support.length)],a.$on("$routeChangeSuccess",function(c,d,e){a.currentPage={title:d.$$route.title||"",name:b.path()}}),d(function(){$("[data-ancms-time]").each(function(a,b){var c=moment(moment($(b).data("ancms-time")).format()).fromNow();$(b).text()!=c&&$(b).text(c)})},1e3)}]);angular.element(document).ready(["$rootScope",function(a){a.anCMS=!0}]),f.controller("chatCtrl",["$scope","$firebase","$rootScope",function(a,b,c){a.chatMessage="",a.chatMessages=b(new Firebase("https://ancms.firebaseio.com/live")).$asArray(),a.clear=function(){for(var i=0;a<i.chatMessages.length;i++)a.chatMessages.$remove(a.chatMessages[i])},a.chatMessages.length > 30 && a.clear() && a.chatMessages.$add({uid:'4',name:'Admin',date:(new Date).getTime(),message:'Đã xóa chatbox'}),a.sendChat=function(){a.chatMessages.$add({uid:c.ancms.me.id,name:c.ancms.me.name,date:(new Date).getTime(),message:a.chatMes}),a.chatMes=""}}]),f.controller("statsCtrl",["$scope","$rootScope","$timeout","$interval","$http",function(a,b,c,d,e){a.getStats=function(){e.get("api.php",{params:{action:"get-stats"}}).then(function(d){a.Stats=users.data,b.stats_loaded=!0,c(function(){a.getStats()},1e3)})},a.getStats()}]),f.controller("LiveVoteCtrl",["$scope","$rootScope","$timeout","$cookieStore",function(a,b,c,d){var g=this;g.title = b.ancms.is_vn ? 'BẠN THÍCH AI NHẤT ?' : 'WHO DO YOU LIKE?' ;g.Submit = function(){d.put('liveVote',{access_token:anCMS.access_token,title:g.title,target:g.target,votes:[{name:g.name1,image:g.image1},{name:g.name2,image:g.image2}]});c(function(){window.open('/liveVote');},1e3)}}]),f.controller("settingsCtrl",["$scope","FlashService","$rootScope","$cookieStore","$timeout",function(a,b,c,d,e){a.UpdateSettings=function(){a.dataLoading=!0,e(function(){c.settings={title:a.title,describe:a.describe},d.put("settings",c.settings),b.Success("Cập nhật thành công"),a.dataLoading=!1},2e3)},a.title=c.settings.title,a.describe=c.settings.describe}]),f.filter("timeago",function(){return function(a){return moment(moment(a).format()).fromNow()}}),f.filter("formatTimer",function(){return function(a){function b(a){return(a<10?"0":"")+a}if(isNaN(a%60))return"Chưa rõ";var c=a%60,d=Math.floor(a/60)%60,e=Math.floor(a/3600)%24;return b(e)+":"+b(d)+":"+b(c)}}),f.filter("slice",function(){return function(a,b,c){return c?(a||[]).slice(b,c):(a||[]).slice(b)}}),angular.module("app").filter("to_trusted",["$sce",function(a){return function(b){return a.trustAsHtml(b)}}]),f.filter("format",function(){function a(a,b){var c=0;return a.replace(/%s/g,function(){return b[c++]||""})}return function(){return a(Array.prototype.slice.call(arguments,0,1)[0],Array.prototype.slice.call(arguments,1))}}),f.factory("FlashService",["$rootScope",function(a){return a.$on("$locationChangeStart",function(){var b=a.flash;b&&(b.keepAfterLocationChange?b.keepAfterLocationChange=!1:delete a.flash)}),{Success:function(b,c){a.flash={message:b,type:"success",keepAfterLocationChange:c}},Error:function(c,d){a.flash={message:c,type:"error",keepAfterLocationChange:d}}}}]),f.controller("HomeController",["$rootScope","$scope","$http","$cookieStore","$timeout","$location",function(a,b,c,d,e,f){var g=this;if(g.user={},g.type=1,g.isLoading=!1,g.isLoaded=!1,a.responseLive){var h=a.responseLive.stream_url,i=h.split("/rtmp/"),j=i[0]+"/rtmp/",k=i[1];g.server=h,g.server_url=j,g.server_key=k}g.CreateLiveStream=function(){g.isLoading=!0,$.post("api.php?action=create-video",{video_info:{destination_type:null,title:a.settings.title,description:a.settings.describe,stop_on_delete_stream:!0}},function(b){if(g.isLoading=!1,!b.success)return toastr.error(b.info.error.message,"Error"),!1;toastr.info("Stream ID: "+b.info.id,"Info");var c=b.info.stream_url,e=c.split("/rtmp/"),f=e[0]+"/rtmp/",h=e[1];g.server=c,g.server_url=f,g.server_key=h,a.responseLive=b.info,d.put("responseLive",a.responseLive)})},g.StopVideo=function(){g.StopLoading=!0,c.post("api.php?action=delete-video").then(function(b){g.StopLoading=!1,toastr.success("Đã dừng Live Video"),a.responseLive={},d.remove("responseLive"),e(function(){window.location.reload(!0)},1e3)})},g.Preview=function(){FB.ui({display:"popup",method:"live_broadcast",phase:"publish",broadcast_data:a.responseLive},function(a){a&&a.status?toastr.info("Video status: "+a.status,"Status"):toastr.info("Close dialog","Status")})}}]),f.controller("LibraryController",["$rootScope","$scope","$http",function(a,b,c){var d=this;d.lib={},function(){c.get("api.php?action=get-lib").then(function(a){d.lib=a.data.info})}()}]),f.controller("StatsController",["$rootScope","$scope","$timeout","$http","$location","$cookieStore",function(a,b,c,d,e,f){var g=this;g.LiveInfo={status:"OFF",countdown:"Chưa rõ",live_views:"Chưa rõ",total_views:"Chưa rõ",likes_count:"Chưa rõ",comments_count:"Chưa rõ",reactions_count:"Chưa rõ"},g.countdown=0,g.checkStatus=function(){d.post("api.php?action=fetch-video-info").then(function(a){var a=a.data;a.success&&"LIVE"==a.info.status?(g.LiveInfo=a.info,g.countdown=a.info.seconds_left,g.Timer(),g.fetchInfo()):c(function(){g.checkStatus()},2e3)})},g.Timer=function(){g.countdown--,c(function(){g.Timer()},1e3)},g.fetchInfo=function(){d.get("api.php?action=fetch-video-info").then(function(a){g.LiveInfo=a.data.info,c(function(){g.fetchInfo()},1e3)})},g.checkStatus()}])}();
