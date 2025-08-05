    // Loading Screen
    window.addEventListener('load', function() {
      const loading = document.querySelector('.loading');
      if (loading) {
        loading.classList.add('fade-out');
        setTimeout(() => loading.remove(), 500);
      }
    });

    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
      observer.observe(el);
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // Skills tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });

    // Enhanced Contact Form with EmailJS
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // Initialize EmailJS (replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key)
    // Get your keys from: https://www.emailjs.com/
    (function() {
      emailjs.init('KrFsarkpmEdLcLTr1'); // Replace with your EmailJS public key
    })();

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Hide previous messages
      formMessage.style.display = 'none';
      
      // Get form data
      const formData = new FormData(contactForm);
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        to_email: 'pvashisht761@gmail.com' // Your email
      };
      
      // Send email using EmailJS
      emailjs.send('service_6sfslzi', 'template_h3qm3vl', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          showMessage('Thank you! Your message has been sent successfully.', 'success');
          contactForm.reset();
        })
        .catch(function(error) {
          console.log('FAILED...', error);
          showMessage('Sorry, something went wrong. Please try again later.', 'error');
        })
        .finally(function() {
          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });

    function showMessage(message, type) {
      formMessage.textContent = message;
      formMessage.className = `form-message ${type}`;
      formMessage.style.display = 'block';
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }

    // Fallback contact form (without EmailJS)
    // Uncomment this if you don't want to use EmailJS
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      // Create mailto link
      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
      const mailtoLink = `mailto:pvashisht761@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      showMessage('Your email client will open. Please send the email to complete your message.', 'success');
      contactForm.reset();
    });

    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02) rotateX(5deg)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateX(0)';
      });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const hero = document.getElementById('hero');
      const shapes = document.querySelectorAll('.shape');
      
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
      
      shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
      });
    });