// document.addEventListener('DOMContentLoaded', function() {
//     const editButton = document.getElementById('editTrip');
//     const inputFields = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
//     const dateInput = document.getElementById('dateInput');
//     const datePlaceholder = document.getElementById('datePlaceholder');
//     const timeInput = document.getElementById('timeInput');
//     const timePlaceholder = document.getElementById('timePlaceholder');
//
//     // Event listener for the Edit button
//     editButton.addEventListener('click', function() {
//         // Toggle the disabled attribute of each input field
//         inputFields.forEach(function(input) {
//             input.disabled = !input.disabled;
//         });
//
//         // Toggle between displaying placeholder text and input fields for date
//         if (dateInput.style.display === 'none') {
//             dateInput.style.display = 'inline';
//             datePlaceholder.style.display = 'none';
//         } else {
//             dateInput.style.display = 'none';
//             datePlaceholder.style.display = 'inline';
//         }
//
//         // Toggle between displaying placeholder text and input fields for time
//         if (timeInput.style.display === 'none') {
//             timeInput.style.display = 'inline';
//             timePlaceholder.style.display = 'none';
//         } else {
//             timeInput.style.display = 'none';
//             timePlaceholder.style.display = 'inline';
//         }
//
//         // Change the button text based on edit mode
//         if (editButton.value === 'Edit') {
//             editButton.value = 'Save'; // Change text to 'Save' when enabling editing
//         } else {
//             editButton.value = 'Edit'; // Change text back to 'Edit' when saving changes
//         }
//     });
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('editTrip');
    const tripForm = document.getElementById('tripForm');
    const inputFields = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
    const dateInput = document.getElementById('dateInput');
    const datePlaceholder = document.getElementById('datePlaceholder');
    const timeInput = document.getElementById('timeInput');
    const timePlaceholder = document.getElementById('timePlaceholder');

    let edit_mode = false; // Initially set edit mode to false

    // Event listener for the Edit button
    editButton.addEventListener('click', function() {
        // Toggle the edit mode
        edit_mode = !edit_mode;

        // Toggle the disabled attribute of each input field
        inputFields.forEach(function(input) {
            input.disabled = !input.disabled;
        });

        // Toggle between displaying placeholder text and input fields for date
        if (dateInput.style.display === 'none') {
            dateInput.style.display = 'inline';
            datePlaceholder.style.display = 'none';
        } else {
            dateInput.style.display = 'none';
            datePlaceholder.style.display = 'inline';
        }

        // Toggle between displaying placeholder text and input fields for time
        if (timeInput.style.display === 'none') {
            timeInput.style.display = 'inline';
            timePlaceholder.style.display = 'none';
        } else {
            timeInput.style.display = 'none';
            timePlaceholder.style.display = 'inline';
        }

        // Change the button text based on edit mode
        if (edit_mode) {
            editButton.innerText = 'Save'; // Change text to 'Save' when enabling editing
        } else {
            editButton.innerText = 'Edit'; // Change text back to 'Edit' when saving changes
            tripForm.submit(); // Submit the form when saving changes
            console.log('i submit in showTravel.js')
        }
    });
});
// document.addEventListener('DOMContentLoaded', function() {
//     const editButton = document.getElementById('editTrip');
//     const saveButton = document.getElementById('saveTrip'); // Add this line to get the save button
//     const inputFields = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
//     const dateInput = document.getElementById('dateInput');
//     const datePlaceholder = document.getElementById('datePlaceholder');
//     const timeInput = document.getElementById('timeInput');
//     const timePlaceholder = document.getElementById('timePlaceholder');
//
//     // Function to toggle button text
//     function toggleButtonText() {
//         if (editButton.textContent === 'Edit') {
//             editButton.textContent = 'Save';
//         } else {
//             editButton.textContent = 'Edit';
//         }
//     }
//
//     // Function to submit the form
//     function submitForm() {
//         document.getElementById('tripForm').submit();
//     }
//
//     // Event listener for the Edit button
//     editButton.addEventListener('click', function() {
//         // Toggle the disabled attribute of each input field
//         inputFields.forEach(function(input) {
//             input.disabled = !input.disabled;
//         });
//
//         // Toggle between displaying placeholder text and input fields for date
//         if (dateInput.style.display === 'none') {
//             dateInput.style.display = 'inline';
//             datePlaceholder.style.display = 'none';
//         } else {
//             dateInput.style.display = 'none';
//             datePlaceholder.style.display = 'inline';
//         }
//
//         // Toggle between displaying placeholder text and input fields for time
//         if (timeInput.style.display === 'none') {
//             timeInput.style.display = 'inline';
//             timePlaceholder.style.display = 'none';
//         } else {
//             timeInput.style.display = 'none';
//             timePlaceholder.style.display = 'inline';
//         }
//
//         // Change the button text based on edit mode
//         toggleButtonText();
//     });
//
//     // Event listener for the Save button
//     saveButton.addEventListener('click', function() {
//         submitForm();
//     });
// });
//
