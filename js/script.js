/* Author: Simon George

*/


$(function () {
	
	$('header h1').closeShadow({
		'depth': 40,
		'dark-shadow': '#002d4c',
		'light-shadow': '#004c80'
	});
	$('header h2').closeShadow({
		'depth': 20
	});
	$('header h3').closeShadow({
		'depth': 10
	});
	$('#main h3:not(#noMove, #garish)').closeShadow();
	$('#main h3#noMove').closeShadow({
		'follow': false
	});
	$('#garish').closeShadow({
		'dark-shadow': 'fuchsia',
		'light-shadow': '#00f2ff'
	});
	$('#face').closeShadow({
		'depth': 80
	});
	
});













