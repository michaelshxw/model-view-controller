// logout event handler

const logout = async () => {
    const response = await fetch('/routes/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
};

// logout event listener

document.querySelector('#logout').addEventListener('click', logout);
