$(function() {
	$('.errorHint').text('').hide();

	$('#signinpost').click(function() {
		$('input:not(.signinButton)').blur();
		var errorHints = $(".errorHint");
		if (errorHints.text() != '') return false;
	})

	$('#username').blur(function() {
		if ($("#username").val() == '') {
			$(this).parent().find('.errorHint').text('请输入用户名').show();
		} else {
			$('.errorHint').text('').hide();
		}
	});

	$('#password').blur(function() {
		if ($("#password").val() == '') {
			$(this).parent().find('.errorHint').text('请输入密码').show();
		} else {
			$('#errorHint').text('').hide();
		}
	});

	$('#reset').click(function() {
		$('.errorHint').text('').hide();
		$("#username").val("");
		$('#password').val("");
	})

	$('#toSignup').click(function() {
		window.location.href='/signup';
	})
});