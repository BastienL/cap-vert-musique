jQuery(document).ready(function () {
	jQuery("#nivoslider").nivoSlider({
		effect: "random",
		slices: 15,
		boxCols: 8,
		boxRows: 4,
		animSpeed: 500 * 3,
		pauseTime: 5000,
		startSlide: 0,
		directionNav: true,
		controlNav: true,
		controlNavThumbs: false,
		pauseOnHover: true,
		manualAdvance: false
	});
	$(".slider-wrapper").css("min-height", "auto");
	$(".nivoSlider").css("min-height", "auto");
});
