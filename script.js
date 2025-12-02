// ===== Sample Jobs Database =====
let jobsDatabase = [
    {
        id: 1,
        title: "Senior React Developer",
        company: "Tech Solutions Inc.",
        location: "Bangalore, India",
        category: "Web Development",
        type: "Full-time",
        salaryMin: 8,
        salaryMax: 12,
        experience: 3,
        description: "Looking for a senior React developer with experience in building scalable web applications. You'll work with a team of passionate developers to create innovative solutions.",
        skills: ["React", "JavaScript", "Node.js", "MongoDB", "Redux"],
        postedBy: "John Doe",
        contactEmail: "john@techsolutions.com",
        postedDate: new Date()
    },
    {
        id: 2,
        title: "Full Stack Developer",
        company: "StartUp Innovations",
        location: "Mumbai, India",
        category: "Web Development",
        type: "Full-time",
        salaryMin: 5,
        salaryMax: 8,
        experience: 2,
        description: "We're seeking a full stack developer with experience in MERN stack. You'll be responsible for developing and maintaining our web applications.",
        skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
        postedBy: "Sarah Smith",
        contactEmail: "sarah@startupinnovations.com",
        postedDate: new Date()
    },
    {
        id: 3,
        title: "Android Developer",
        company: "Mobile Apps Co.",
        location: "Hyderabad, India",
        category: "Mobile Development",
        type: "Full-time",
        salaryMin: 4,
        salaryMax: 7,
        experience: 1,
        description: "Develop and maintain Android applications. Experience with Kotlin and Java required. Join our dynamic team and work on exciting projects.",
        skills: ["Kotlin", "Java", "Android SDK", "Firebase", "Git"],
        postedBy: "Mike Johnson",
        contactEmail: "mike@mobileapps.com",
        postedDate: new Date()
    },
    {
        id: 4,
        title: "Data Scientist",
        company: "AI Analytics Ltd",
        location: "Pune, India",
        category: "Data Science",
        type: "Full-time",
        salaryMin: 6,
        salaryMax: 10,
        experience: 2,
        description: "Join our data science team and work on machine learning projects. You'll analyze complex datasets and build predictive models.",
        skills: ["Python", "Machine Learning", "TensorFlow", "Pandas", "SQL"],
        postedBy: "Emily Davis",
        contactEmail: "emily@aianalytics.com",
        postedDate: new Date()
    },
    {
        id: 5,
        title: "UI/UX Designer",
        company: "Design Studio Pro",
        location: "Gurgaon, India",
        category: "UI/UX Design",
        type: "Full-time",
        salaryMin: 3,
        salaryMax: 6,
        experience: 1,
        description: "Create beautiful and user-friendly interfaces. Work with our product team to design engaging digital experiences.",
        skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research"],
        postedBy: "Lisa Anderson",
        contactEmail: "lisa@designstudio.com",
        postedDate: new Date()
    },
    {
        id: 6,
        title: "DevOps Engineer",
        company: "Cloud Systems Inc.",
        location: "Chennai, India",
        category: "DevOps",
        type: "Full-time",
        salaryMin: 7,
        salaryMax: 11,
        experience: 2,
        description: "Manage cloud infrastructure and deployment pipelines. Experience with Docker, Kubernetes, and CI/CD required.",
        skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
        postedBy: "Robert Wilson",
        contactEmail: "robert@cloudsystems.com",
        postedDate: new Date()
    }
];

// Keep track of unique IDs
let nextJobId = 7;

// ===== Page Navigation =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.dataset.page;
        navigateTo(page);
    });
});

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Remove active class from nav links
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    
    // Show selected page
    const pageElement = document.getElementById(`${page}-page`);
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // Add active class to nav link
    event.target.classList.add('active');
    
    // Update page-specific content
    if (page === 'browse') {
        displayJobs(jobsDatabase);
    } else if (page === 'dashboard') {
        updateDashboard();
    }
}

// ===== Display Jobs ===== 
function displayJobs(jobs) {
    const container = document.getElementById('jobs-container');
    const noResults = document.getElementById('no-results');
    
    if (jobs.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    container.innerHTML = jobs.map(job => `
        <div class="job-card" onclick="openJobModal(${job.id})">
            <div class="job-card-header">
                <div>
                    <h3 class="job-title">${escapeHtml(job.title)}</h3>
                    <p class="company-name">${escapeHtml(job.company)}</p>
                </div>
            </div>
            
            <div class="job-meta">
                <span class="badge badge-category">${escapeHtml(job.category)}</span>
                <span class="badge badge-type">${escapeHtml(job.type)}</span>
                <span class="badge badge-experience">${job.experience}+ Years</span>
            </div>
            
            <div class="salary-box">₹${job.salaryMin} - ${job.salaryMax} LPA</div>
            
            <p class="job-description">${escapeHtml(job.description)}</p>
            
            <p class="job-location">📍 ${escapeHtml(job.location)}</p>
            
            <div class="job-skills">
                <strong>Skills:</strong>
                ${job.skills.map(skill => `<span class="skill-tag">${escapeHtml(skill)}</span>`).join('')}
            </div>
            
            <div class="job-footer">
                <button class="btn-view-details" onclick="event.stopPropagation(); openJobModal(${job.id})">View Details</button>
                <button class="btn-apply" onclick="event.stopPropagation(); applyJob(${job.id})">Apply Now</button>
            </div>
        </div>
    `).join('');
}

// ===== Filter & Search Functionality =====
document.getElementById('search-input').addEventListener('keyup', filterJobs);
document.getElementById('category-filter').addEventListener('change', filterJobs);
document.getElementById('salary-filter').addEventListener('change', filterJobs);
document.getElementById('experience-filter').addEventListener('change', filterJobs);

function filterJobs() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const salaryFilter = document.getElementById('salary-filter').value;
    const experienceFilter = document.getElementById('experience-filter').value;
    
    let filtered = jobsDatabase.filter(job => {
        // Search filter
        const matchesSearch = !searchTerm || 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        
        // Category filter
        const matchesCategory = !categoryFilter || job.category === categoryFilter;
        
        // Salary filter
        let matchesSalary = true;
        if (salaryFilter) {
            const [min, max] = salaryFilter.split('-').map(s => parseInt(s) || Infinity);
            matchesSalary = job.salaryMin >= min && (max === Infinity || job.salaryMax <= max);
        }
        
        // Experience filter
        const matchesExperience = !experienceFilter || job.experience >= parseInt(experienceFilter);
        
        return matchesSearch && matchesCategory && matchesSalary && matchesExperience;
    });
    
    displayJobs(filtered);
}

// Reset filters
document.getElementById('reset-filters').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('salary-filter').value = '';
    document.getElementById('experience-filter').value = '';
    displayJobs(jobsDatabase);
});

// ===== Job Modal =====
function openJobModal(jobId) {
    const job = jobsDatabase.find(j => j.id === jobId);
    if (!job) return;
    
    const modal = document.getElementById('job-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2 class="modal-job-title">${escapeHtml(job.title)}</h2>
        <p class="modal-company">${escapeHtml(job.company)}</p>
        
        <div class="modal-details">
            <div class="modal-detail-item">
                <span class="modal-detail-label">Location</span>
                <span class="modal-detail-value">📍 ${escapeHtml(job.location)}</span>
            </div>
            <div class="modal-detail-item">
                <span class="modal-detail-label">Job Type</span>
                <span class="modal-detail-value">${escapeHtml(job.type)}</span>
            </div>
            <div class="modal-detail-item">
                <span class="modal-detail-label">Experience</span>
                <span class="modal-detail-value">${job.experience}+ Years</span>
            </div>
            <div class="modal-detail-item">
                <span class="modal-detail-label">Salary</span>
                <span class="modal-detail-value">₹${job.salaryMin} - ${job.salaryMax} LPA</span>
            </div>
        </div>
        
        <div class="modal-description">
            <h4>About the Role</h4>
            <p>${escapeHtml(job.description)}</p>
        </div>
        
        <div class="modal-skills">
            <h4>Required Skills</h4>
            <div class="modal-skill-list">
                ${job.skills.map(skill => `<span class="modal-skill">${escapeHtml(skill)}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-contact">
            <p><strong>Posted By:</strong> ${escapeHtml(job.postedBy)}</p>
            <p><strong>Contact:</strong> <a href="mailto:${escapeHtml(job.contactEmail)}">${escapeHtml(job.contactEmail)}</a></p>
            <p><strong>Posted:</strong> ${job.postedDate.toLocaleDateString()}</p>
        </div>
        
        <div class="modal-actions">
            <button class="btn-primary" onclick="applyJob(${job.id})">Apply Now</button>
            <button class="btn-secondary" onclick="closeJobModal()">Close</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeJobModal() {
    document.getElementById('job-modal').classList.remove('active');
}

document.querySelector('.close-modal').addEventListener('click', closeJobModal);
document.getElementById('job-modal').addEventListener('click', (e) => {
    if (e.target.id === 'job-modal') closeJobModal();
});

// ===== Apply for Job =====
function applyJob(jobId) {
    const job = jobsDatabase.find(j => j.id === jobId);
    if (job) {
        alert(`Thank you for applying to "${job.title}" at ${job.company}!\n\nPlease expect to hear from us within 5-7 business days.\n\nYou can also reach out to: ${job.contactEmail}`);
        closeJobModal();
    }
}

// ===== Post Job Form =====
document.getElementById('job-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newJob = {
        id: nextJobId++,
        title: document.getElementById('job-title').value,
        company: document.getElementById('company-name').value,
        location: document.getElementById('company-location').value,
        category: document.getElementById('job-category').value,
        type: document.getElementById('job-type').value,
        salaryMin: parseInt(document.getElementById('salary-min').value),
        salaryMax: parseInt(document.getElementById('salary-max').value),
        experience: parseInt(document.getElementById('experience-required').value),
        description: document.getElementById('job-description').value,
        skills: document.getElementById('required-skills').value.split(',').map(s => s.trim()),
        postedBy: document.getElementById('posted-by').value,
        contactEmail: document.getElementById('contact-email').value,
        postedDate: new Date()
    };
    
    // Add to database
    jobsDatabase.push(newJob);
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    
    // Reset form
    document.getElementById('job-form').reset();
    
    // Hide success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
    
    // Update dashboard
    updateDashboard();
});

// ===== Dashboard =====
function updateDashboard() {
    // Calculate stats
    const totalJobs = jobsDatabase.length;
    const categories = new Set(jobsDatabase.map(j => j.category)).size;
    const avgSalary = (jobsDatabase.reduce((sum, j) => sum + (j.salaryMin + j.salaryMax) / 2, 0) / totalJobs).toFixed(1);
    const fresherPositions = jobsDatabase.filter(j => j.experience === 0).length;
    
    // Update stat cards
    document.getElementById('total-jobs').textContent = totalJobs;
    document.getElementById('total-categories').textContent = categories;
    document.getElementById('avg-salary').textContent = avgSalary;
    document.getElementById('fresh-positions').textContent = fresherPositions;
    
    // Display posted jobs
    const postedJobsList = document.getElementById('posted-jobs-list');
    const noPostedJobs = document.getElementById('no-posted-jobs');
    
    if (jobsDatabase.length === 0) {
        postedJobsList.innerHTML = '';
        noPostedJobs.style.display = 'block';
        return;
    }
    
    noPostedJobs.style.display = 'none';
    postedJobsList.innerHTML = jobsDatabase.map(job => `
        <div class="posted-job-item">
            <div class="posted-job-info">
                <h4>${escapeHtml(job.title)}</h4>
                <p>${escapeHtml(job.company)} | ${escapeHtml(job.location)} | ₹${job.salaryMin}-${job.salaryMax} LPA</p>
                <p>Posted: ${job.postedDate.toLocaleDateString()}</p>
            </div>
            <div class="posted-job-actions">
                <button class="btn-primary btn-small" onclick="openJobModal(${job.id})">View</button>
                <button class="btn-danger btn-small" onclick="deleteJob(${job.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Delete job
function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job posting?')) {
        jobsDatabase = jobsDatabase.filter(j => j.id !== jobId);
        updateDashboard();
        displayJobs(jobsDatabase);
    }
}

// ===== Utility Function: Escape HTML =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    displayJobs(jobsDatabase);
});