let nameEl = document.getElementById('name');
let emailEl = document.getElementById('email');
let messageEl = document.getElementById('message');
formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    let errors = [];
    if(nameEl.value.trim() === '') {
        errors.push('Name is required.');
    }
    if(emailEl.value.trim() === '') {
        errors.push('Email is required.');
    } else if(!validateEmail(emailEl.value.trim())) {
        errors.push('Email is not valid.');
    }
    if(messageEl.value.trim() === '') {
        errors.push('Message is required.');
    }
});

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

