/*******************************************************************************
 jquery.mb.components
 Copyright (c) 2001-2010. Matteo Bicocchi (Pupunzi); Open lab srl, Firenze - Italy
 email: info@pupunzi.com
 site: http://pupunzi.com
 Licences: MIT, GPL
 ******************************************************************************/

/*
 * mb.javascript
 *© Matteo Bicocchi. 2009
 * http://pupunzi.com
 */

var IE7=$.browser.msie && $.browser.version<=7;
var totImg=18;
var actualImg=0;
// init js calls

String.prototype.asId = function () {
  return this.replace(/[^a-zA-Z0-9_]+/g, '');
};

var __initedComponents= new Object();
function initialize(url,includeAsScript){
  var normUrl=url.asId();
  if (!__initedComponents[normUrl]){
    //alert(url+" -- "+normUrl+" -- "+__initedComponents[normUrl]);
    if (!includeAsScript){
      $.ajax({
        type: "POST",
        url: url+"?",
        dataType: "html",
        async:false,
        cache:false,
        success:function(html){$("body").before(html);}
      });


    } else{
      $.ajax({
        type: "POST",
        url: url,
        dataType: "script",
        async:false,
        cache:false
      });
    }
    __initedComponents[normUrl]="1";
  }
}
// string tools

String.prototype.beginsWith = function(t, i) {
  if (!i) {
    return (t == this.substring(0, t.length));
  } else {
    return (t.toLowerCase() == this.substring(0, t.length).toLowerCase());
  }
};

String.prototype.endsWith = function(t, i) {
  if (!i) {
    return (t == this.substring(this.length - t.length));
  } else {
    return (t.toLowerCase() == this.substring(this.length - t.length).toLowerCase()); }
};

function pageload(hash) {
  $("#mbiframe").remove();
  if(hash) {
    $("#mbScreen").slideUp(100,function(){$("#mbScreen").remove(); $("#siteWrapper").fadeIn(500);});
    $.ajax({
      type: "POST",
      url: hash+"?RND="+ new Date().getMilliseconds(),
      success: function(html){
        var content=$(html).css("display","none");

        if($.browser.msie && $.browser.version<=7){
          $("#siteContent .dinaContent").fadeOut(400,function(){
            $("#news").fadeOut("slow");
            $("#siteContent .dinaContent").remove();
            $("#siteContent").append(content);
            content.initContent();
            content.fadeIn(400,function(){
              $("#news").remove();
              $("#highLights").bringToFront();
            });
          });
        }else{
          $("#siteContent .dinaContent").slideUp(400,function(){
            $("#news").slideUp("slow");
            $("#siteContent .dinaContent").remove();
            $("#siteContent").append(content);
            content.initContent();
            content.slideDown(400,function(){
              $("#news").remove();
              $("#highLights").bringToFront();
            });

          });
        }

        $(".mbretweet").updateRetweet();
      },
      error:function(){
        pageload("error.html");
      }
    });
  }
  else {
    self.location.href= self.location.href.split("#")[0];
  }
}

(function($){
  $.loadHighLight=function(){
    $.ajax({
      type: "POST",
      url: "highLight.html?rnd="+ new Date().getMilliseconds(),
      success:function(html){
        $("body").append(html);
      }
    });
  };

  $.fn.initContent=function(){
    var a=$(this).find("a.ajax");
    a.each (function(){
      var url=$(this).attr("href");
      $(this).attr("href","#"+url);
      $(this).bind("click", function(){
        var hash = $(this).attr("href");
        hash = hash.replace(/^.*#/, '');
        $.history.load(hash);
      });
    });
    var aext=$(this).find("a.external");
    aext.each ($(this).setExternalUrl);
    var ademo=$(this).find("a.demo");
    ademo.each ($(this).setDemoUrl);
  };

  $.fn.setExternalUrl=function(){
    var url=$(this).attr("href");
    $(this).attr("href","javascript:void(0)");
    $(this).bind("click", function(){
      $("#siteWrapper").fadeTo(800,.2,function(){
        var p= $.browser.msie && $.browser.version<8?"absolute":"fixed";
        var mbScreen= $("<div id='mbScreen'></div>").css({position:p, width:"90%",height:"98%",background:"white",top:"0",left:"5%",opacity:0.95}).hide().bringToFront();

        $("body").append(mbScreen);
        $("#mbScreen").append("<iframe id='mbIfrm' style='position:absolute;bottom:0;left:0;width:100%;height:100%;border:none;display:none; background:transparent'  src='javascript:void(0)'> </iframe> ");
        if($.browser.msie) $("#mbIfrm").attr("src",url);
        var mb_Close_button=$("<div id='mb_button'>back to mb.ideas.repository</div>").css({position:p,top:"100px",left:"10px",cursor:"pointer", background:"black",color:"white",padding:"10px",width:180});
        var mb_newWin_site=$("<div id='mb_newWin'>open this in a new window</div>").css({position:p,top:"150px",left:"10px",cursor:"pointer", background:"#F9CA0C",color:"white",padding:"10px",width:180});
        $("#mbScreen").append(mb_Close_button);
        $("#mbScreen").append(mb_newWin_site);
        $("#mb_button, #site").bind("click",function(){
          $("#mbScreen").fadeOut(800,function(){$("#mbScreen").remove(); $("#siteWrapper").fadeTo(800,1); $("#site").css({overflow:""});});
          $("#site").css({overflow:""});
        });
        $("#mb_newWin").bind("click",function(){
          window.open(url,"siteWin");
          $("#mbScreen").fadeOut(800,function(){$("#mbScreen").remove(); $("#siteWrapper").fadeTo(800,1); $("#site").css({overflow:""});});
          $("#site").css({overflow:""});
        });
        $("#site").css({overflow:"hidden"});
        $("#mbScreen").fadeIn(800,function(){$("#mbIfrm").attr("src",url).fadeIn(500);});
      });
    });
  };

  $.fn.setDemoUrl=function(){
    if ($.browser.msie) {
      $(this).attr("target","_blank");
      return;
    }
    var url=$(this).attr("href");
    $(this).attr("href","javascript:void(0)");
    $(this).bind("click", function(){
      if ($("#mbScreen"))$("#mbScreen").remove();
      var demoLogo=$("#siteLogo").clone();
      $("#siteWrapper").fadeOut(500,function(){
        var p= $.browser.msie && $.browser.version<8?"absolute":"fixed";
        $("#mbScreen").remove();
        var mbScreen= $("<div id='mbScreen'></div>");
        mbScreen.css({position:p,paddingTop:40, width:"100%",height:"100%",top:0,opacity:.98}).hide();
        $("body").append(mbScreen);
        $("#mbScreen").bringToFront();
        var containmentDiv=$("<div id='demoPage'/>");
        $("#mbScreen").append(containmentDiv);
        var demoHeader=$("<div id='demoHeader'/>");
        containmentDiv.append(demoHeader);
        demoHeader.append(demoLogo);
        var demo_Close_button=$("<div id='demoClose'>close</div>");
        var cl= {};
        var demo_newWin_button=$("<div id='mb_newWin'>open in a new window</div>").css(cl).one("click",function(){window.open(url,'newWin');});
        var btnBar =$("<div id='demoBtnBar'/>");
        btnBar.append(demo_Close_button);
        btnBar.append(demo_newWin_button);
        containmentDiv.append(btnBar);
        var ifr=$("<iframe id='mbIfrm' style='border:none; background:transparent; overflow:auto' src='javascript:void(0)'/>").hide();
        containmentDiv.append(ifr);
        demo_Close_button.bringToFront();
        $("#demoClose, #mbScreen").one("click",function(){
          $("#mbScreen").fadeOut(400,function(){
            $("#mbScreen").remove();
            $("#siteWrapper").fadeIn(500);
          });
          $("#site").css({overflow:"auto"});
        });

        $("#mbScreen").fadeIn(500,function(){
          $("#site").css({overflow:"hidden"});
          $("#demoPage").addClass("shadowed");
          ifr.attr("src",url).css({overflow:"hidden"});
          ifr.css({width:"100%", height:"100%"}).show();
        });
      });
    });
  };

  function rndImg(){
    var img=1+Math.floor(Math.random()*totImg);
    if (img==actualImg){
      img=rndImg();
    }
    return img;
  }

  function preloadImg(el,url) {
    $("#loader").fadeIn();
    $("<img/>").attr("src", url).load(
            function(){
              changeBgnd(el,url);
            });
  }

  function changeBgnd(el,url){
    el.css("background","url('"+url+"') fixed center center");
    setTimeout(function(){el.fadeIn(800); $("#loader").fadeOut();},800);
  };


  $.fn.loadBgnd=function(url){
    $("body").css({background: $(this).css("background"), backgroundPosition:"center center", backgroundAttachment:"fixed"});
    var el=$(this);
    if(!url){
      var img=rndImg();
      actualImg=img;
      url="images/bgnds/default/"+(img<10?"0":"")+img.toString()+".jpg";
    }
    el.fadeOut(200);
    setTimeout(function(){
      preloadImg(el,url);
    },1000);
  };

  $.fn.bringToFront= function(el){
    if (!el) el="*";
    var zi=0;
    $(el).each(function() {
      if($(this).css("position")=="absolute"){
        var cur = parseInt($(this).css('zIndex'));
        zi = cur > zi ? parseInt($(this).css('zIndex')) : zi;
      }
    });
    $(this).css('zIndex',zi+=1);
    return $(this);
  };

  jQuery.preloadBgnds = function() {
    var counter=0;
    for (var i = 1; i <= totImg; i++) {
      var n=i;
      if (i<10) n="0"+i;
      $("<img>").attr("src", "images/bgnds/default/"+n+".jpg").load(function(){
        counter++;
      });
    }
    for (var a = 1; a <= 11; a++) {
      $("<img>").attr("src", "images/bgnds/creativity/"+a+".jpg");
    }
  };

})(jQuery);

$(function(){
  $("#site").fadeIn(1000,function(){
    setTimeout(function(){
      $("#extruderTop").buildMbExtruder({
        width:300,
        onClose:function(){$("#extruderTop").closeAllOptionsPanel();},
        onContentLoad: function(){
          $(".voice").initContent();
        }
      });
    },1000);
    $("#siteLogo").hoverIntent(
            function(){
              $(this).attr("src","images/logoHover.png");
            },
            function(){
              $(this).attr("src","images/logo.png");
            });
    $.loadHighLight();
  });
  $("body").initContent();
  $.history.init(pageload);//,"welcome.html"
});



