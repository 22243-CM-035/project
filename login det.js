    // Simulated user data (for educational purposes only)
    const users = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
        // Add more users as needed
      ];
  
      document.getElementById('loginForm').addEventListener('submit', function(event) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
  
        // Simulated login check
        const user = users.find(user => user.username === username && user.password === password);
  
        if (!user) {
          alert('Invalid username or password.');
          event.preventDefault();
        } else {
          alert('Login Success.');
          // Redirect to another page on the same site
          window.location.href = 'details.html'; // Change 'success.html' to your desired success page
          // Prevent form submission
          event.preventDefault();
        }
      });