  document.addEventListener('DOMContentLoaded', function() {
    // Get the current URL path
    const currentPath = window.location.pathname;

    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      // Get the href attribute of each link
      const linkPath = new URL(link.href).pathname;

      // Check if the href matches the current path
      if (linkPath === currentPath) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active'); // Optional: add a class for styling
      }
    });
  });
