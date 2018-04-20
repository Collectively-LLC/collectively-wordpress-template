/***** Themeans Core JavaScript *****/
/*eslint no-unused-vars: off*/ 

window.Themeans = window.Themeans || {};

// ToC:
// Normalize Element Heights
// NEEDS REVISION // Is Element in Viewport?
// Focus on Bootstrap Carousel on Slide
// Map Escape key to Click
// Carousel on Viewport
// Rolling Counter (Odometer)
// Stop all Videos

// Normalize Element Heights //////////////////////////////////////////////////
window.Themeans.normalizeHeights = function(container=".carousel",elements=".carousel-item",addon=0) {
	// Check for elements within the container and add min-heights
	function normalizeHeightsFunc() {
		// Declare variables
		var items = jQuery(container).find(elements), //grab all slides
			heights = [], //create empty array to store height values
			tallest; //create variable to make note of the tallest slide
		// Foreach post, clear min-height and check true height
		items.each(function() { //add heights to array
			jQuery(this).css('min-height','0');
			heights.push(jQuery(this).height()); 
		});
		// ID the tallest
    tallest = Math.max.apply(null, heights)+1+addon; //cache largest value + 1 to round up
    // Set min-heights to match the tallest
    items.each(function() {
        jQuery(this).css('min-height',tallest + 'px');
    });
    console.log('normalizeHeights: '+container+' '+elements+' to '+tallest+'px')
	}
	jQuery(container).ready(setTimeout(normalizeHeightsFunc,100));
	jQuery(window).on('resize orientationchange', normalizeHeightsFunc);
}
// jQuery(document).ready(normalizeHeights('.main','.post'));


// Is Element in Viewport? //////////////////////////////////////////////////
/* jQuery-viewport-checker - v1.8.8 - 2017-09-25
 * https://github.com/dirkgroenen/jQuery-viewport-checker
 * Copyright (c) 2017 Dirk Groenen
 *//* jshint ignore:start */
window.Themeans.viewportChecker = !function(a){a.fn.viewportChecker=function(b){var c={classToAdd:"visible",classToRemove:"invisible",classToAddForFullView:"full-visible",removeClassAfterAnimation:!1,offset:100,repeat:!1,invertBottomOffset:!0,callbackFunction:function(a,b){},scrollHorizontal:!1,scrollBox:window};a.extend(c,b);var d=this,e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()};return this.checkElements=function(){var b,f;c.scrollHorizontal?(b=Math.max(a("html").scrollLeft(),a("body").scrollLeft(),a(window).scrollLeft()),f=b+e.width):(b=Math.max(a("html").scrollTop(),a("body").scrollTop(),a(window).scrollTop()),f=b+e.height),d.each(function(){var d=a(this),g={},h={};if(d.data("vp-add-class")&&(h.classToAdd=d.data("vp-add-class")),d.data("vp-remove-class")&&(h.classToRemove=d.data("vp-remove-class")),d.data("vp-add-class-full-view")&&(h.classToAddForFullView=d.data("vp-add-class-full-view")),d.data("vp-keep-add-class")&&(h.removeClassAfterAnimation=d.data("vp-remove-after-animation")),d.data("vp-offset")&&(h.offset=d.data("vp-offset")),d.data("vp-repeat")&&(h.repeat=d.data("vp-repeat")),d.data("vp-scrollHorizontal")&&(h.scrollHorizontal=d.data("vp-scrollHorizontal")),d.data("vp-invertBottomOffset")&&(h.scrollHorizontal=d.data("vp-invertBottomOffset")),a.extend(g,c),a.extend(g,h),!d.data("vp-animated")||g.repeat){String(g.offset).indexOf("%")>0&&(g.offset=parseInt(g.offset)/100*e.height);var i=g.scrollHorizontal?d.offset().left:d.offset().top,j=g.scrollHorizontal?i+d.width():i+d.height(),k=Math.round(i)+g.offset,l=g.scrollHorizontal?k+d.width():k+d.height();g.invertBottomOffset&&(l-=2*g.offset),k<f&&l>b?(d.removeClass(g.classToRemove),d.addClass(g.classToAdd),g.callbackFunction(d,"add"),j<=f&&i>=b?d.addClass(g.classToAddForFullView):d.removeClass(g.classToAddForFullView),d.data("vp-animated",!0),g.removeClassAfterAnimation&&d.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){d.removeClass(g.classToAdd)})):d.hasClass(g.classToAdd)&&g.repeat&&(d.removeClass(g.classToAdd+" "+g.classToAddForFullView),g.callbackFunction(d,"remove"),d.data("vp-animated",!1))}})},("ontouchstart"in window||"onmsgesturechange"in window)&&a(document).bind("touchmove MSPointerMove pointermove",this.checkElements),a(c.scrollBox).bind("load scroll",this.checkElements),a(window).resize(function(b){e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()},d.checkElements()}),this.checkElements(),this}}(jQuery);
/* jshint ignore:end */


// Focus on Bootstrap Carousel on Slide //////////////////////////////////////////////////
window.Themeans.bscarouselFocusOnSlide = function(carousel=".carousel") { // ie: '.show .carousel'
	jQuery(carousel).on("slid.bs.carousel", "", jQuery(this).attr("tabindex",-1).focus());
}


// Map Escape Key to Click //////////////////////////////////////////////////
window.Themeans.escClick = function(target=".close") {
	jQuery(document).keyup(function(e) { if (e.keyCode === 27) { jQuery(target).click(); } });
}

 
// Carousel on Viewport //////////////////////////////////////////////////
window.Themeans.carouselOnViewport = function(carousel=".carousel") {
  jQuery(carousel).carousel('pause'); // load with carousel paused
  jQuery(carousel).each( function() { 
    var thiscarousel = jQuery(this).attr('id');
    jQuery(this).viewportChecker({
      offset: 200,                  // wait for the first 200 pixel of the element to enter in the viewport
      callbackFunction: function(elem){
          setTimeout(function(){
              jQuery('#'+thiscarousel).carousel(); // remove pause
          },500);
      },
    });
  });
}

// Rolling Counter (Odometer) //////////////////////////////////////////////////
window.Themeans.numCounter = function(counter=".counter",duration=2000) {
  jQuery(counter).each(function() {
    var $this = jQuery(this),
        countTo = $this.text();
    $this.text('0');
    jQuery(window).on("load resize scroll",function(e){ 
      if ( $this.viewportChecker() && $this.text()==='0' ) {
        jQuery({ countNum: $this.text()}).animate({
          countNum: countTo,
        },
        {
          duration: 2000,
          easing:'linear',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          },
        });  
      }
    });
  });
}


// Stop all Videos //////////////////////////////////////////////////
window.Themeans.stopVideos = function(container="body") {
  jQuery(container).find('iframe').each(function() { // stop iframes by reloading; common: YouTube
    var iframeSrc = jQuery(this).attr('src');
    jQuery(this).attr('src',iframeSrc);
  });
  jQuery(container).find('video').each(function() { // stop embedded videos via pause; common: Vimeo
    jQuery(this).pause();
  });
}


// AutoResize Text to Fit //////////////////////////////////////////////////
// https://coderwall.com/p/_8jxgw/autoresize-text-to-fit-into-a-div-width-height
window.Themeans.fittext = function(target='.fittext') {
  jQuery(window).on('load resize orientationchange', function() {
    var elements = jQuery(target);
    if(elements.length < 0) {
      return;
    }
    elements.each(function(i, element) {
      var ogFontSize = jQuery(this).attr('data-og-font-size');
      if(element.scrollWidth <= element.offsetWidth || element.scrollHeight <= element.offsetHeight) {
        jQuery(element).css('font-size', ogFontSize); // set to og font
      }
      while(element.scrollWidth > element.offsetWidth || element.scrollHeight > element.offsetHeight) {
        if(!jQuery(this).attr('data-og-font-size')) {
          jQuery(this).attr('data-og-font-size',jQuery(this).css('font-size'));
        }
        var newFontSize = (parseFloat(jQuery(element).css('font-size').slice(0, -2)) * 0.95) + 'px';
        jQuery(element).css('font-size', newFontSize);
      }
    });
  })
}



/***** end Themeans Core JavaScript *****/