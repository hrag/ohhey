var ohHey = function(type, str) {
	// Types: urgent, notice, confirm
	// This won't work without one of these three.

	var options = {
		timing: 10000
	}

	function closeUtil() {
		// Define ohhey
		var $ohHey = $('.ohhey');

		// Stop the automatic close function from firing
		if ($ohHey.length > 0) clearTimeout(timerClose);

		// Set notice height again, in case window was resized
		var noticeHeight = $ohHey.outerHeight();
		$ohHey.css({top: -noticeHeight});

		// Hide ohhey from view
		$ohHey.removeClass('ohhey-showing');

		// Remove the ohhey element from the DOM
		setTimeout(function() {
			$ohHey.remove();
		}, 250);
	}


	// If no arguments, close the notification & abort the function
	if (arguments.length == 0) {
		closeUtil();
		return;

	// If no types match, then abort the function
	} else if ((type != 'urgent') && (type != 'notice') && (type != 'confirm')) {
		return;

	// If either arguments aren't defined, then abort the function
	} else if ((typeof type === 'undefined') || (typeof str === 'undefined')) {
		return;

	// If the ohhey element exists already, then abort the function
	} else if ($('.ohhey').length > 0) {
		return;
	}

	// Append elements
	$('body').prepend('<div class="ohhey"><div class="ohhey-timer"></div><div><span><div class="ohhey-icon"></div><span class="ohhey-text"></span></span></div><div class="ohhey-close"></div></div>');

	// Register the new DOM elements
	var $ohHey = $('.ohhey');
	var $ohHeyText = $('.ohhey-text');
	var $ohHeyClose = $('.ohhey-close');

	// Bind close button
	$ohHeyClose.click(closeUtil);

	// populate
	$ohHeyText.text(str);

	// Measure height
	var noticeHeight = $ohHey.outerHeight();

	// Position properly above view
	$ohHey.css({top: -noticeHeight});

	// Position it to 0 from the top, show ohhey immediately after stuff
	setTimeout(function() {
		$ohHey.addClass('ohhey-showing ohhey-'+type);
	});

	// Automatically close the notification
	timerClose = setTimeout(function() {
		closeUtil();
	}, options.timing);

}
