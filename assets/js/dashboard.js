document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/api/get_user');
        if (response.ok) {
            const data = await response.json();
            document.getElementById('username').textContent = data.username;
            sessionStorage.setItem('username', data.username);
        } else {
            const username = sessionStorage.getItem('username') || 'Agent Alpha';
            document.getElementById('username').textContent = username;
        }
    } catch (err) {
        const username = sessionStorage.getItem('username') || 'Agent Alpha';
        document.getElementById('username').textContent = username;
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
               
                return;
            }
           
            e.preventDefault();
        });
    });
}); 

async function logout() {
    if (confirm('Are you sure you want to logout from Cyber Defense HQ?')) {
        try {
            await fetch('/api/logout', { method: 'POST' });
        } catch (err) {
            console.error('Logout error:', err);
        }
        
        sessionStorage.clear();
        window.location.href = '/';
    }
}