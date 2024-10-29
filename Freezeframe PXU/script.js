/* freezeframes with pixelunion photosets bc fuck tumblr */
/* does not work with infinite scroll, stay tuned for future adjustments */

$(document).ready(function() {
	var ff = [], i=0; // initialise new array
	$(".photo-slideshow").each(function(){
		/* call pixelunion photoset function */
		$(this).pxuPhotoset({ 
			lightbox: true,
			rounded: "corners",
			borderRadius: "3px",
			gutter: "0px",
			photoset: ".photo-slideshow",
			photoWrap: ".photo-data",
			photo: ".pxu-photo"
		},
		/* 
		the callback of the pxu function is the freezeframes function
		since you only wanna have this after all the photosets have loaded 
		*/
		function(){
			ff[i] = $(this).find(".pxu-photo img").freezeframe(); // initialise freezeframe on photoset and save to variable (for later targeting)
			i++; // increment counter variable
			var pIndex; // declare new variable for tracking
			$(".photo-slideshow").hover(function(){ // on photo hover
				var currentPhotoset = $(this); // check what's the photoset being hovered on
				pIndex = $(".photo-slideshow").index(currentPhotoset); // get the index of the photoset... ties in with its index in the array from the earlier loop
				ff[pIndex].trigger(); // trigger the gifs' animations
			}, function(){
				ff[pIndex].release(); // stop the gifs' animations
			});
			
			/* masonry: delete if you don't need it */
			$("body").masonry(); // recall the masonry after loading the pxus
		});
	});
	
	/* masonry (irrelevant, but you should only call after all images are loaded) */
	$("body").imagesLoaded(function(){
		$(".photo-slideshow").each(function(){
			ff[i] = $(this).find(".pxu-photo img").freezeframe(); 
			i++; 
			$("body").masonry(); 
		});
	});
	
	$(window).resize(function(){
		$(".photo-slideshow").each(function(){
			ff[i] = $(this).find(".pxu-photo img").freezeframe(); 
			i++; 
			$("body").masonry(); 
		});
	});
});

/* Thanks to Bev's computing professor for instructions on scoping */
