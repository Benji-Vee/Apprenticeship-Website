// RTO data
const rtos = [
    {
        id: 1,
        name: "Australia Training Institute",
        location: "Melbourne, VIC",
        courses: ["Certificate III in Plumbing", "Certificate IV in Building"],
        phone: "1300 XXX XXX",
        email: "info@ati.edu.au"
    },
    {
        id: 2,
        name: "Sydney Skills Academy",
        location: "Sydney, NSW",
        courses: ["Diploma of Business", "Certificate III in Commercial Cookery"],
        phone: "1300 YYY YYY",
        email: "info@sydneyskills.edu.au"
    }
];

// Top skills data
const topSkills = [
    {
        title: "Electrician",
        averageSalary: 85000,
        qualificationTime: "4 years",
        courseCost: "$5,000 - $15,000",
        demandLevel: "High"
    },
    {
        title: "Plumber",
        averageSalary: 82000,
        qualificationTime: "4 years",
        courseCost: "$4,000 - $12,000",
        demandLevel: "High"
    },
    {
        title: "Heavy Diesel Mechanic",
        averageSalary: 78000,
        qualificationTime: "4 years",
        courseCost: "$3,500 - $14,000",
        demandLevel: "High"
    },
    {
        title: "HVAC Technician",
        averageSalary: 75000,
        qualificationTime: "3 years",
        courseCost: "$4,500 - $13,000",
        demandLevel: "Medium"
    },
    {
        title: "Commercial Cook",
        averageSalary: 65000,
        qualificationTime: "3 years",
        courseCost: "$3,000 - $10,000",
        demandLevel: "High"
    },
    {
        title: "Carpenter",
        averageSalary: 72000,
        qualificationTime: "4 years",
        courseCost: "$4,000 - $12,000",
        demandLevel: "High"
    },
    {
        title: "Metal Fabricator",
        averageSalary: 70000,
        qualificationTime: "4 years",
        courseCost: "$4,500 - $13,000",
        demandLevel: "Medium"
    },
    {
        title: "Automotive Mechanic",
        averageSalary: 68000,
        qualificationTime: "4 years",
        courseCost: "$4,000 - $12,000",
        demandLevel: "High"
    },
    {
        title: "Hair Stylist",
        averageSalary: 60000,
        qualificationTime: "3 years",
        courseCost: "$3,000 - $10,000",
        demandLevel: "Medium"
    },
    {
        title: "Landscape Gardener",
        averageSalary: 62000,
        qualificationTime: "3 years",
        courseCost: "$3,500 - $11,000",
        demandLevel: "Medium"
    }
];

// Function to display RTOs
function displayRTOs(searchTerm = '') {
    const rtoList = document.getElementById('rtoList');
    rtoList.innerHTML = ''; // Clear current list

    rtos.forEach(rto => {
        if (rto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rto.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()))) {
            
            const rtoCard = document.createElement('div');
            rtoCard.className = 'rto-card';
            rtoCard.innerHTML = `
                <h2>${rto.name}</h2>
                <p><strong>Location:</strong> ${rto.location}</p>
                <p><strong>Phone:</strong> ${rto.phone}</p>
                <p><strong>Email:</strong> ${rto.email}</p>
                <h3>Available Courses:</h3>
                <ul class="course-list">
                    ${rto.courses.map(course => `
                        <li class="course-item">
                            <span>${course}</span>
                            <button 
                                class="inquire-button"
                                onclick="openInquiryForm('${rto.name}', '${course}')"
                            >
                                Inquire
                            </button>
                        </li>
                    `).join('')}
                </ul>
            `;
            rtoList.appendChild(rtoCard);
        }
    });
}

// Modal handling functions
function openInquiryForm(rtoName, courseName) {
    const modal = document.getElementById('inquiryModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('inquiryModal');
    modal.style.display = 'none';
}

// Add event listeners for modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('inquiryModal');
    const closeButton = document.querySelector('.close-button');
    
    // Close modal when clicking the X
    closeButton.onclick = closeModal;
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };

    // Handle form submission
    const inquiryForm = document.getElementById('inquiryForm');
    inquiryForm.onsubmit = function(e) {
        e.preventDefault();
        // Here you would normally send the form data to a server
        console.log('Form submitted:', {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        });
        closeModal();
        this.reset();
    };
});

// Function to display top skills
function displayTopSkills() {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = ''; // Clear existing content
    
    // Remove any existing show more buttons
    const existingButtons = document.querySelectorAll('.show-more-btn');
    existingButtons.forEach(button => button.remove());
    
    // Only show first 4 skills initially
    const initialDisplay = 4;
    const visibleSkills = topSkills.slice(0, initialDisplay);
    
    // Display initial skills
    visibleSkills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        
        skillCard.innerHTML = `
            <div class="skill-title">
                <h3>${skill.title}</h3>
            </div>
            <div class="salary">$${skill.averageSalary.toLocaleString()}</div>
            <div class="skill-details">
                <p>${skill.qualificationTime}</p>
            </div>
            <div class="skill-details">
                <p>${skill.courseCost}</p>
            </div>
            <div class="skill-details">
                <p>Demand: ${skill.demandLevel}</p>
            </div>
        `;
        
        skillsList.appendChild(skillCard);
    });

    // Add "Show More" button if there are more skills
    if (topSkills.length > initialDisplay) {
        const showMoreButton = document.createElement('button');
        showMoreButton.className = 'show-more-btn';
        showMoreButton.innerHTML = `
            Show More Skills
            <span class="arrow-down">▼</span>
        `;
        
        showMoreButton.addEventListener('click', function() {
            if (this.classList.contains('expanded')) {
                // Show less
                displayTopSkills(); // Reset to initial view
            } else {
                // Show all
                skillsList.innerHTML = ''; // Clear current list
                topSkills.forEach(skill => {
                    const skillCard = document.createElement('div');
                    skillCard.className = 'skill-card';
                    skillCard.innerHTML = `
                        <div class="skill-title">
                            <h3>${skill.title}</h3>
                        </div>
                        <div class="salary">$${skill.averageSalary.toLocaleString()}</div>
                        <div class="skill-details">
                            <p>${skill.qualificationTime}</p>
                        </div>
                        <div class="skill-details">
                            <p>${skill.courseCost}</p>
                        </div>
                        <div class="skill-details">
                            <p>Demand: ${skill.demandLevel}</p>
                        </div>
                    `;
                    skillsList.appendChild(skillCard);
                });
                this.classList.add('expanded');
                this.innerHTML = `
                    Show Less
                    <span class="arrow-up">▲</span>
                `;
            }
        });
        
        // Add the button after the skills list
        document.querySelector('.skills-container').after(showMoreButton);
    }
}

// Search functionality
document.getElementById('searchBox').addEventListener('input', (e) => {
    displayRTOs(e.target.value);
});


// Initialize both features when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayTopSkills();
    displayRTOs();
});