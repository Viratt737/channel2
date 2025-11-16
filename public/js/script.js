// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()



// For Home page

// Get all box elements
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    // Mouse enter event
    box.addEventListener('mouseenter', () => {
        // Add 'active' class to the hovered box
        box.classList.add('active');
        
        // Add 'inactive' class to all other boxes
        boxes.forEach(otherBox => {
            if (otherBox !== box) {
                otherBox.classList.add('inactive');
            }
        });
    });

    // Mouse leave event
    box.addEventListener('mouseleave', () => {
        // Remove 'active' class from the hovered box
        box.classList.remove('active');
        
        // Remove 'inactive' class from all other boxes
        boxes.forEach(otherBox => {
            otherBox.classList.remove('inactive');
        });
    });
});

// Navbar
const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  // Toggle dropdown visibility
  dropdownButton.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "none" ? "block" : "none";
  });

  // Hide dropdown on outside click
  window.addEventListener("click", (event) => {
    if (!dropdownButton.contains(event.target)) {
      dropdownMenu.style.display = "none";
    }
  });