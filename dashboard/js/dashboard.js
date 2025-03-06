document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    // Select Elements
    const subjectInput = document.querySelector(".subject");
    const storeSubjectBtn = document.querySelector(".subject-btn");
    const subjectList = document.querySelector(".visible-subject");
    const subjectSelect = document.getElementById("subject-select");
    const questionUpdateSubjectSelect = document.getElementById("question-update-subject-select");
    const storeQuestionBtn = document.querySelector(".store-question-btn");
    const questionInput = document.querySelector(".question-input");
    const optionInputs = document.querySelectorAll(".option-input");
    const correctAnswerInput = document.querySelector(".correct-answer");
    const questionsList = document.getElementById("questions-list");

    // Load Data from localStorage
    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    let questions = JSON.parse(localStorage.getItem("questions")) || {};

    function saveSubjectsToLocalStorage() {
        localStorage.setItem("subjects", JSON.stringify(subjects));
    }

    function saveQuestionsToLocalStorage() {
        localStorage.setItem("questions", JSON.stringify(questions));
    }

    // Store a Subject
    function storeSubject() {
        const subjectName = subjectInput.value.trim();
        if (!subjectName) {
            alert("Please enter a subject name!");
            return;
        }
        
        if (subjects.includes(subjectName)) {
            alert("This subject already exists!");
            return;
        }
        
        subjects.push(subjectName);
        saveSubjectsToLocalStorage();
        updateSubjectsUI();
        alert("Subject stored successfully!");
        subjectInput.value = "";
    }
    
    if (storeSubjectBtn) {
        storeSubjectBtn.addEventListener("click", storeSubject);
    }

    function updateSubjectsUI() {
        subjectList.innerHTML = "";
        subjectSelect.innerHTML = '<option value="">Select a Subject</option>';
        questionUpdateSubjectSelect.innerHTML = '<option value="">Select a Subject</option>';

        subjects.forEach((subject, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span>${subject}</span>
                <div>
                    <button class="btn btn-sm btn-warning edit-subject" data-id="${index}">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-subject" data-id="${index}">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            `;
            subjectList.appendChild(li);

            const option = document.createElement("option");
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
            questionUpdateSubjectSelect.appendChild(option.cloneNode(true));
        });

        attachSubjectEventListeners();
    }

    function attachSubjectEventListeners() {
        document.querySelectorAll(".edit-subject").forEach(btn => {
            btn.addEventListener("click", function () {
                let subjectIndex = this.getAttribute("data-id");
                let newName = prompt("Enter new subject name:", subjects[subjectIndex]);
                if (newName && newName.trim() !== "") {
                    subjects[subjectIndex] = newName.trim();
                    saveSubjectsToLocalStorage();
                    updateSubjectsUI();
                }
            });
        });

        document.querySelectorAll(".delete-subject").forEach(btn => {
            btn.addEventListener("click", function () {
                let subjectIndex = this.getAttribute("data-id");
                if (confirm(`Are you sure you want to delete "${subjects[subjectIndex]}"?`)) {
                    subjects.splice(subjectIndex, 1);
                    saveSubjectsToLocalStorage();
                    updateSubjectsUI();
                }
            });
        });
    }

    function storeQuestion() {
        const selectedSubject = subjectSelect.value;
        if (!selectedSubject) {
            alert("Please select a subject first!");
            return;
        }

        const questionText = questionInput.value.trim();
        if (!questionText) {
            alert("Please enter a question!");
            return;
        }

        const questionOptions = [];
        let correctAnswer = correctAnswerInput.value.trim();

        optionInputs.forEach(input => {
            const optionValue = input.value.trim();
            if (optionValue) {
                questionOptions.push(optionValue);
            }
        });

        if (questionOptions.length < 2) {
            alert("Please provide at least two options!");
            return;
        }

        if (!correctAnswer || !questionOptions.includes(correctAnswer)) {
            alert("Please select a correct answer from the options!");
            return;
        }

        const newQuestion = {
            question: questionText,
            options: questionOptions,
            correctAnswer: correctAnswer
        };

        if (!questions[selectedSubject]) {
            questions[selectedSubject] = [];
        }

        questions[selectedSubject].push(newQuestion);
        saveQuestionsToLocalStorage();
        updateQuestionsUI();
        alert("Question stored successfully!");

        questionInput.value = "";
        optionInputs.forEach(input => input.value = "");
        correctAnswerInput.value = "";
    }

    if (storeQuestionBtn) {
        storeQuestionBtn.addEventListener("click", storeQuestion);
    }

    function updateQuestionsUI() {
        if (!questionsList) return;
        questionsList.innerHTML = "";
        const selectedSubject = subjectSelect.value;

        if (!selectedSubject || !questions[selectedSubject] || questions[selectedSubject].length === 0) {
            const noDataMessage = document.createElement("div");
            noDataMessage.className = "text-center text-muted";
            noDataMessage.textContent = "No questions stored for this subject.";
            questionsList.appendChild(noDataMessage);
            return;
        }

        questions[selectedSubject].forEach((question, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = "question-item mb-3 p-3 border rounded";
            questionDiv.setAttribute("data-index", index);
            
            questionDiv.innerHTML = `
                <div class="question-content">
                    <div class="question-text fw-bold">${index + 1}) ${question.question}</div>
                    <div class="question-options">
                        ${question.options.map((opt, i) => `
                            <div class="question-option ${opt === question.correctAnswer ? 'text-success' : ''}">
                                ${String.fromCharCode(97 + i)}) ${opt}
                            </div>
                        `).join("")}
                    </div>
                </div>
                <div class="correct-answer text-success mt-2">✓ Correct Answer: ${question.correctAnswer}</div>
                <div class="action-buttons mt-2">
                    <button class="btn btn-sm btn-warning me-2 edit-question-btn">
                        <i class="fa fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger delete-question-btn">
                        <i class="fa fa-trash"></i> Delete
                    </button>
                </div>
            `;

            questionsList.appendChild(questionDiv);
        });

        attachQuestionEventListeners();
    }

    function attachQuestionEventListeners() {
        questionsList.addEventListener("click", function (e) {
            const target = e.target.closest(".edit-question-btn, .delete-question-btn");
            if (!target) return;
            
            const subjectName = subjectSelect.value;
            const index = parseInt(target.closest(".question-item").getAttribute("data-index"));

            if (target.classList.contains("edit-question-btn")) {
                const question = questions[subjectName][index];
                questionInput.value = question.question;
                correctAnswerInput.value = question.correctAnswer;
                optionInputs.forEach((input, idx) => {
                    input.value = question.options[idx] || "";
                });

                questions[subjectName].splice(index, 1);
                saveQuestionsToLocalStorage();
                updateQuestionsUI();
            }

            if (target.classList.contains("delete-question-btn")) {
                if (confirm("Are you sure you want to delete this question?")) {
                    questions[subjectName].splice(index, 1);
                    saveQuestionsToLocalStorage();
                    updateQuestionsUI();
                }
            }
        });
    }

    updateSubjectsUI();
    updateQuestionsUI();

    if (subjectSelect) {
        subjectSelect.addEventListener("change", updateQuestionsUI);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Toggle Registration Form
    const registrationFormContainer = document.getElementById('registrationFormContainer');
    const toggleFormBar = document.querySelector('.gradient-bar');
    const toggleIcon = document.getElementById('toggleIcon');

    // Toggle Form Function
    function toggleForm() {
        registrationFormContainer.classList.toggle('d-none');
        
        // Update toggle icon
        toggleIcon.textContent = registrationFormContainer.classList.contains('d-none') ? '˅' : '˄';
    }

    // Add click event listener to toggle bar
    if (toggleFormBar) {
        toggleFormBar.addEventListener('click', toggleForm);
    }

    // Registration Form Submission
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Collect form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                mobile: document.getElementById('mobile').value.trim(),
                fathersName: document.getElementById('fathersName').value.trim(),
                enrollment: document.getElementById('enrollment').value.trim(),
                dob: document.getElementById('dob').value,
                password: document.getElementById('password').value,
                userType: document.getElementById('userType').value,
                address: document.getElementById('address').value.trim()
            };

            // Validation
            const validationErrors = [];

            if (formData.name.length < 2) {
                validationErrors.push("Name must be at least 2 characters long.");
            }

            if (!/^\d{10}$/.test(formData.mobile)) {
                validationErrors.push("Mobile number must be 10 digits.");
            }

            if (formData.enrollment.length < 5) {
                validationErrors.push("Enrollment must be at least 5 characters long.");
            }

            if (formData.password.length < 6) {
                validationErrors.push("Password must be at least 6 characters long.");
            }

            if (validationErrors.length > 0) {
                // Display validation errors
                swal({
                    title: "Registration Error",
                    text: validationErrors.join("\n"),
                    icon: "error"
                });
                return;
            }

            // Store data in localStorage (simulating backend storage)
            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            
            // Check if enrollment already exists
            const existingUser = users.find(user => user.enrollment === formData.enrollment);
            if (existingUser) {
                swal({
                    title: "Registration Error",
                    text: "Enrollment number already exists!",
                    icon: "error"
                });
                return;
            }

            // Add new user
            users.push(formData);
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            // Success message
            swal({
                title: "Registration Successful!",
                text: `Welcome, ${formData.name}!`,
                icon: "success"
            }).then(() => {
                // Reset form
                registrationForm.reset();
                
                // Update user data table
                updateUserDataTable();
            });
        });
    }

    // Function to update user data table
    function updateUserDataTable() {
        const userTableBody = document.querySelector('#userDataCollapse tbody');
        if (!userTableBody) return;

        // Clear existing rows
        userTableBody.innerHTML = '';

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Populate table
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    <img src="path/to/default-profile.png" class="rounded-circle" width="30" height="30" alt="Profile">
                </td>
                <td>${user.name}</td>
                <td>${user.fathersName}</td>
                <td>${user.dob}</td>
                <td>${user.mobile}</td>
                <td>${user.userType}</td>
                <td>${user.enrollment}</td>
                <td>********</td>
                <td>${user.address}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1 edit-user" data-index="${index}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-user" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            userTableBody.appendChild(row);
        });

        // Add event listeners for edit and delete
        addUserTableEventListeners();
    }

    // Function to add event listeners to user table actions
    function addUserTableEventListeners() {
        const userTableBody = document.querySelector('#userDataCollapse tbody');
        
        // Edit user
        userTableBody.querySelectorAll('.edit-user').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                const user = users[index];

                // Populate edit modal
                const editModal = document.getElementById('edit-modal');
                const editForm = document.getElementById('edit-form');

                editForm.querySelector('input[name="name"]').value = user.name;
                editForm.querySelector('input[name="father-name"]').value = user.fathersName;
                editForm.querySelector('input[name="dob"]').value = user.dob;
                editForm.querySelector('select[name="user-type"]').value = user.userType;
                editForm.querySelector('input[name="mobile"]').value = user.mobile;
                editForm.querySelector('input[name="enrollment"]').value = user.enrollment;
                editForm.querySelector('textarea[name="address"]').value = user.address;

                // Show modal
                editModal.style.display = 'block';

                // Handle form submission
                editForm.onsubmit = function(e) {
                    e.preventDefault();
                    
                    // Update user data
                    users[index] = {
                        name: editForm.querySelector('input[name="name"]').value,
                        fathersName: editForm.querySelector('input[name="father-name"]').value,
                        dob: editForm.querySelector('input[name="dob"]').value,
                        userType: editForm.querySelector('select[name="user-type"]').value,
                        mobile: editForm.querySelector('input[name="mobile"]').value,
                        enrollment: editForm.querySelector('input[name="enrollment"]').value,
                        password: user.password, // Keep existing password
                        address: editForm.querySelector('textarea[name="address"]').value
                    };

                    localStorage.setItem('registeredUsers', JSON.stringify(users));
                    updateUserDataTable();
                    
                    // Close modal
                    editModal.style.display = 'none';

                    swal({
                        title: "Update Successful",
                        text: "User profile updated!",
                        icon: "success"
                    });
                };
            });
        });

        // Delete user
        userTableBody.querySelectorAll('.delete-user').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this user!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                        users.splice(index, 1);
                        localStorage.setItem('registeredUsers', JSON.stringify(users));
                        
                        updateUserDataTable();
                        
                        swal({
                            title: "User Deleted",
                            text: "User has been deleted successfully!",
                            icon: "success"
                        });
                    }
                });
            });
        });

        // Close modal functionality
        const closeBtn = document.querySelector('.close-btn');
        const editModal = document.getElementById('edit-modal');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                editModal.style.display = 'none';
            });
        }
    }

    // Initial load of user data table
    updateUserDataTable();
});
document.addEventListener('DOMContentLoaded', function() {
    // Get profile elements
    const editProfileBtn = document.getElementById('editProfileBtn');
    const profileName = document.getElementById('profileName');
    const profileDescription = document.getElementById('profileDescription');
    const currentDate = document.getElementById('currentDate');

    // Profile detail elements
    const detailElements = {
        name: document.getElementById('nameValue'),
        fatherName: document.getElementById('fatherNameValue'),
        dob: document.getElementById('dobValue'),
        userType: document.getElementById('userTypeValue'),
        mobile: document.getElementById('mobileValue'),
        enrollment: document.getElementById('enrollmentValue'),
        address: document.getElementById('addressValue')
    };

    // Update current date
    function updateCurrentDate() {
        const now = new Date();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
        currentDate.textContent = `${months[now.getMonth()]} ${now.getDate()}`;
    }
    updateCurrentDate();

    // Edit profile functionality
    editProfileBtn.addEventListener('click', function() {
        // Create edit modal dynamically
        const modalHtml = `
            <div class="edit-modal" id="editModal">
                <div class="edit-modal-content">
                    <h2>Edit Profile</h2>
                    <form id="editProfileForm">
                        <input type="text" name="name" placeholder="Name" value="${detailElements.name.textContent}">
                        <input type="text" name="fatherName" placeholder="Father's Name" value="${detailElements.fatherName.textContent}">
                        <input type="date" name="dob" value="${detailElements.dob.textContent}">
                        <select name="userType">
                            <option value="student" ${detailElements.userType.textContent === 'student' ? 'selected' : ''}>Student</option>
                            <option value="teacher" ${detailElements.userType.textContent === 'teacher' ? 'selected' : ''}>Teacher</option>
                        </select>
                        <input type="tel" name="mobile" placeholder="Mobile" value="${detailElements.mobile.textContent}">
                        <input type="text" name="enrollment" placeholder="Enrollment" value="${detailElements.enrollment.textContent}">
                        <textarea name="address" placeholder="Address">${detailElements.address.textContent}</textarea>
                        <div class="edit-modal-actions">
                            <button type="submit" class="save-btn">Save</button>
                            <button type="button" id="cancelEdit" class="cancel-btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        const editModal = document.getElementById('editModal');
        const editForm = document.getElementById('editProfileForm');
        const cancelBtn = document.getElementById('cancelEdit');

        // Form submission
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Update profile details
            Object.keys(detailElements).forEach(key => {
                const formValue = editForm[key].value;
                detailElements[key].textContent = formValue || '-';
            });

            // Remove modal
            editModal.remove();
        });

        // Cancel button
        cancelBtn.addEventListener('click', function() {
            editModal.remove();
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Select all edit buttons in the table
    const editButtons = document.querySelectorAll('.edit-profile-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the row data
            const row = this.closest('tr');
            const profileData = {
                name: row.querySelector('td:nth-child(2)').textContent,
                fatherName: row.querySelector('td:nth-child(3)').textContent,
                dob: row.querySelector('td:nth-child(4)').textContent,
                mobile: row.querySelector('td:nth-child(5)').textContent,
                userType: row.querySelector('td:nth-child(6)').textContent,
                enrollment: row.querySelector('td:nth-child(7)').textContent,
                address: row.querySelector('td:nth-child(9)').textContent
            };

            // Update the profile card
            updateProfileCard(profileData);

            // Change edit icon to view icon
            this.innerHTML = '<i class="fas fa-eye view-profile-btn"></i>';
            
            // Add event listener to view button
            this.querySelector('.view-profile-btn').addEventListener('click', function() {
                // Show the modal with full details
                showProfileModal(profileData);
            });
        });
    });

    function updateProfileCard(data) {
        const profileCard = document.querySelector('.profile-container');
        
        // Update profile card details
        profileCard.querySelector('.profile-header h5').textContent = data.name;
        profileCard.querySelector('.profile-header p').textContent = data.userType;
        
        // Update details
        const detailItems = profileCard.querySelectorAll('.detail-item');
        detailItems[0].querySelector('.detail-value').textContent = data.name;
        detailItems[1].querySelector('.detail-value').textContent = data.fatherName;
        detailItems[2].querySelector('.detail-value').textContent = data.dob;
        detailItems[3].querySelector('.detail-value').textContent = data.userType;
        detailItems[4].querySelector('.detail-value').textContent = data.mobile;
        detailItems[5].querySelector('.detail-value').textContent = data.enrollment;
        detailItems[6].querySelector('.detail-value').textContent = data.address;
    }

    function showProfileModal(data) {
        // Create modal dynamically
        const modalHtml = `
            <div class="edit-modal" id="profileModal">
                <div class="edit-modal-content">
                    <h2>Profile Details</h2>
                    <div class="profile-details">
                        <div class="detail-item">
                            <span class="detail-label">Name:</span>
                            <span class="detail-value">${data.name}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Father's Name:</span>
                            <span class="detail-value">${data.fatherName}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Date of Birth:</span>
                            <span class="detail-value">${data.dob}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">User Type:</span>
                            <span class="detail-value">${data.userType}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Mobile:</span>
                            <span class="detail-value">${data.mobile}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Enrollment:</span>
                            <span class="detail-value">${data.enrollment}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Address:</span>
                            <span class="detail-value">${data.address}</span>
                        </div>
                    </div>
                    <div class="edit-modal-actions">
                        <button class="cancel-btn" id="closeModal">Close</button>
                    </div>
                </div>
            </div>
        `;

        // Append modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Close modal functionality
        const modal = document.getElementById('profileModal');
        const closeBtn = document.getElementById('closeModal');
        
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const eyeIcon = document.querySelector(".eye-icon"); // Eye icon
    const modal = document.getElementById("edit-modal"); // Modal
    const closeModal = document.querySelector(".close-btn"); // Close button
    const editForm = document.getElementById("edit-form"); // Edit Form
    const detailItems = document.querySelectorAll(".detail-item .detail-value"); // Profile details

    // KEEP ACCORDION OPEN
    const userDataCollapse = document.getElementById("userDataCollapse");
    userDataCollapse.classList.add("show"); // Keeps data visible

    // Show modal when eye icon is clicked
    eyeIcon.addEventListener("click", function () {
        modal.style.display = "flex"; // Show modal

        // Fill form with existing profile data
        let inputs = editForm.querySelectorAll("input, select, textarea");
        inputs.forEach((input, index) => {
            input.value = detailItems[index].textContent === "-" ? "" : detailItems[index].textContent;
        });
    });

    // Close modal when clicking outside or on close button
    closeModal.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.style.display = "none";
    });

    // Save edited details and update profile
    editForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        let inputs = editForm.querySelectorAll("input, select, textarea");
        inputs.forEach((input, index) => {
            detailItems[index].textContent = input.value || "-"; // Update profile data
        });

        modal.style.display = "none"; // Hide modal after saving
    });
});
