/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

document.addEventListener('DOMContentLoaded', function() {
	selectStates();
	occupationOther();
	redirect();

	var ourForm = document.getElementById('signup');
	ourForm.addEventListener('submit', onSubmit);
});

function selectStates() {
	usStates.forEach(function(currentState) {
			var option = document.createElement('option');
			option.innerHTML = currentState.name;
			option.value = currentState.code;
			document.getElementsByName('state')[0].appendChild(option);
	});
}

function occupationOther() {
	document.getElementById('occupation').addEventListener('change', function() {
		if (document.getElementById('occupation').value == 'other') {
			document.getElementsByName('occupationOther')[0].style.display = 'inline';
		} else {
			document.getElementsByName('occupationOther')[0].style.display = 'none';
		}
	});
}

function redirect() {
	document.getElementById('cancelButton').addEventListener('click', function() {
		var wantsToLeave = window.confirm("Are you sure you want to leave?");
		if (wantsToLeave) {
			window.location.replace("http://google.com");
		}
	});	
}

//validation

function onSubmit(evt) {
	var valid = true;

	try {
		valid = validate(this);
	} catch(exception) {
		console.log(exception);
		valid = false; //stop form submission to see error
	}

	if (!valid && evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = valid; //for older browsers
	return valid;
}

function validate(form) {
	var valid = true;
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];

	if (document.getElementsByName('occupationOther')[0].style.display == 'inline') {
		requiredFields.push('occupationOther');
	}

	requiredFields.forEach(function(currentField) {
		if (!validateFields(currentField)) {
			valid = false;
		}
	});
	return valid;
}

function validateFields(field) {
	var valid = true; 
	var currentInput = document.getElementsByName(field)[0];

	if (field == 'birthdate') {
		var dob = new Date(currentInput.value);
		var today = new Date();
		if (currentInput.value == "") {
			currentInput.className = 'form-control invalid-field';
			valid = false;
		} else if (!(today.getFullYear() - 13 >= dob.getFullYear() && today.getMonth() <= dob.getMonth() && today.getDay() <= dob.getDay())) {
			document.getElementById('birthdateMessage').innerHTML = "You must be at least 13 years of age!";
			document.getElementById('birthdateMessage').className = 'alert alert-danger';
			currentInput.className = 'form-control invalid-field';
			valid = false;
		} else {
			document.getElementById('birthdateMessage').innerHTML = "";
			document.getElementById('birthdateMessage').className = "";
			currentInput.className = 'form-control';
		}
	} else if (field == 'zip') {
		var zipRegExp = new RegExp('^\\d{5}$');
		if (!zipRegExp.test(currentInput.value)) {
			currentInput.className = 'form-control invalid-field';
			valid = false;
		} else {
			currentInput.className = 'form-control';
		}
	} else {
		if (currentInput.value.trim() == "") {
			currentInput.className = 'form-control invalid-field';
			valid = false;
		} else {
			currentInput.className = 'form-control';
		}
	}

	return valid;
}
