document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons
    feather.replace();

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Smooth Scrolling for anchor links on the same page ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu on link click
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formStatus = document.getElementById('form-status');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'text-blue-600 mt-4 text-center';

            try {
                // Save the message to Firestore
                // These Firebase functions are made available from the script in index.html
                await window.addDoc(window.collection(window.db, "contact_messages"), {
                    name: contactForm.name.value,
                    email: contactForm.email.value,
                    message: contactForm.message.value,
                    sentAt: window.serverTimestamp()
                });

                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.className = 'text-green-600 mt-4 text-center';
                contactForm.reset();
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);

            } catch (error) {
                console.error("Error sending message: ", error);
                formStatus.textContent = 'Sorry, there was an error. Please try again.';
                formStatus.className = 'text-red-600 mt-4 text-center';
            }
        });
    }
});