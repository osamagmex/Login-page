function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const requirements = document.getElementById('requirements');
    
    let strength = 0;
    const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    Object.values(checks).forEach(check => {
        if (check) strength++;
    });
    
    const allValid = Object.values(checks).every(check => check);
    
    if (allValid) {
        requirements.className = 'requirements valid';
    } else if (password.length > 0) {
        requirements.className = 'requirements invalid';
    } else {
        requirements.className = 'requirements';
    }
    
    strengthFill.className = 'strength-fill';
    if (strength < 3) {
        strengthFill.classList.add('weak');
        strengthText.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 5px;"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>Weak Security Level';
    } else if (strength < 5) {
        strengthFill.classList.add('medium');
        strengthText.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 5px;"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>Moderate Security Level';
    } else {
        strengthFill.classList.add('strong');
        strengthText.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 5px;"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>Strong Security Level';
    }
}

function toggleForms() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('signupForm').classList.toggle('hidden');
    clearMessages();
}

function showMessage(elementId, message, isError) {
    const msgElement = document.getElementById(elementId);
    const icon = isError 
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 5px;"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 5px;"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>';
    msgElement.innerHTML = icon + message;
    msgElement.className = 'message ' + (isError ? 'error' : 'success');
    msgElement.style.display = 'block';
}

function clearMessages() {
    document.getElementById('loginMessage').style.display = 'none';
    document.getElementById('signupMessage').style.display = 'none';
}

function validatePassword(password) {
    const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    return Object.values(checks).every(check => check);
}

async function handleSignup(e) {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!validatePassword(password)) {
        showMessage('signupMessage', 'Password does not meet security requirements', true);
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('signupMessage', 'Passwords do not match', true);
        return;
    }
    
    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage('signupMessage', 'Account created successfully! Redirecting to login...', false);
            setTimeout(() => {
                toggleForms();
                document.getElementById('signupForm').reset();
                document.getElementById('strengthFill').className = 'strength-fill';
                document.getElementById('strengthText').textContent = '';
                document.getElementById('requirements').className = 'requirements';
            }, 2000);
        } else {
            showMessage('signupMessage', result.error, true);
        }
    } catch (err) {
        showMessage('signupMessage', 'Connection to server failed', true);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage('loginMessage', 'Authentication successful! Loading secure dashboard...', false);
            if (result.username) {
                sessionStorage.setItem('username', result.username);
            }
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } else {
            showMessage('loginMessage', result.error, true);
        }
    } catch (err) {
        showMessage('loginMessage', 'Connection to server failed', true);
    }
}