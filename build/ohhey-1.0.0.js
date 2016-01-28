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

	function setWidth() {
		$ohHeyTextSubwrapper.css({'width': 'auto'});
		$ohHeyTextSubwrapper.css({'width': $ohHeyText.outerWidth()});
	}

	function lineTweak() {
		if ($ohHeyText.outerHeight() <= 18) {
			$ohHeyText.css({'top': '6px'});
		} else {
			$ohHeyText.css({'top': 0});
		}
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
	$('body').prepend('<div class="ohhey"><div class="ohhey-timer"></div><div class="ohhey-text-wrapper"><div class="ohhey-text-subwrapper"><div class="ohhey-icon"></div><span class="ohhey-text"></span></div></div><div class="ohhey-close"></div></div>');

	// Register the new DOM elements
	var $ohHey = $('.ohhey');
	var $ohHeyText = $('.ohhey-text');
	var $ohHeyClose = $('.ohhey-close');
	var $ohHeyTextSubwrapper = $('.ohhey-text-subwrapper');

	// Bind close button
	$ohHeyClose.click(closeUtil);

	// Populate with message
	$ohHeyText.text(str);

	// Get width of message & set it to the subwrapper
	setWidth();

	// Measure height
	var noticeHeight = $ohHey.outerHeight();

	// Position properly above view
	$ohHey.css({top: -noticeHeight});

	// Position it to 0 from the top, show ohhey immediately after stuff
	setTimeout(function() {
		$ohHey.addClass('ohhey-showing ohhey-'+type);
	});

	// Tweak some top spacing to make the message look nicer if it's just 1 line
	lineTweak();

	// Bind a few things on resizing of the window
	$(window).resize(function() {
		setWidth();
		lineTweak();
	});

	// Automatically close the notification
	timerClose = setTimeout(function() {
		closeUtil();
	}, options.timing);

}
