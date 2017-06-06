$(function() {
	$('.errorHint').text('').hide();
	$('input:not(.signinButton)').blur(function() {
		if (validator.isFieldValid(this.id, $(this).val())) {
			$(this).parent().find('.errorHint').text('').hide();
		} else {
			$(this).parent().find('.errorHint').text(validator.form[this.id].errorMessage).show();
		}
	});

	$('#register').click(function() {
		$('input:not(.signinButton)').blur();
		if (!validator.isFormValid() && this.type == 'submit') return false;
	})

	$('#reset').click(function() {
		$('.errorHint').text('').hide();
		$("#username").val("");
		$('#password').val("");
		$('#repeatPassword').val("");
		$("#sid").val("");
		$("#email").val("");
		$("#phone").val("");
	})

	$('#toSignin').click(function() {
		window.location.href='/signin';
	})
});