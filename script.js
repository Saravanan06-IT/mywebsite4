/**
 * TOM Learning Platform - Unified Master Client-Side Controller
 * Manages cross-page routing, multi-parameter search indexing, and graduation verification state metrics.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. MASTER REPOSITORY DATA MATRIX (Curated 10-Domain Course Catalog)
    // ==========================================================================
    const courseDatabase = [
        // Domain 1: AI & Machine Learning
        { title: "Machine Learning Specialization by Andrew Ng", category: "Artificial Intelligence (AI) & Machine Learning (ML)", level: "Beginner", budget: "Free", link: "https://www.coursera.org" },
        { title: "IBM AI Engineering Professional Certificate", category: "Artificial Intelligence (AI) & Machine Learning (ML)", level: "Beginner", budget: "Paid", link: "https://www.coursera.org" },
        { title: "Stanford Professional Certificate in Artificial Intelligence", category: "Artificial Intelligence (AI) & Machine Learning (ML)", level: "Advanced", budget: "University", link: "https://online.stanford.edu" },
        
        // Domain 2: Generative AI & Prompt Engineering
        { title: "AI Python for Beginners by DeepLearning.AI", category: "Generative AI & Prompt Engineering", level: "Beginner", budget: "Free", link: "https://www.coursera.org" },
        { title: "Vanderbilt University Prompt Engineering Specialization", category: "Generative AI & Prompt Engineering", level: "Beginner", budget: "Paid", link: "https://www.coursera.org" },
        { title: "Generative AI for Leaders and Engineers", category: "Generative AI & Prompt Engineering", level: "Advanced", budget: "University", link: "https://www.deeplearning.ai" },

        // Domain 3: Cloud Computing (AWS / Azure / GCP)
        { title: "Google Cloud Computing Foundations", category: "Cloud Computing (AWS / Azure / GCP)", level: "Beginner", budget: "Free", link: "https://cloud.google.com" },
        { title: "AWS Certified Cloud Practitioner Training", category: "Cloud Computing (AWS / Azure / GCP)", level: "Beginner", budget: "Paid", link: "https://aws.amazon.com" },
        { title: "Certified Cloud Security Professional (CCSP) Training", category: "Cloud Computing (AWS / Azure / GCP)", level: "Advanced", budget: "University", link: "https://www.isc2.org" },

        // Domain 4: Cybersecurity & Ethical Hacking
        { title: "Google Cybersecurity Certificate (Free Audit Route)", category: "Cybersecurity & Ethical Hacking", level: "Beginner", budget: "Free", link: "https://www.coursera.org" },
        { title: "CompTIA Security+ (SY0-701) Prep Course", category: "Cybersecurity & Ethical Hacking", level: "Beginner", budget: "Paid", link: "https://www.infosecinstitute.com" },
        { title: "Advanced IIT Madras Cybersecurity Program with Campus Immersion", category: "Cybersecurity & Ethical Hacking", level: "Advanced", budget: "University", link: "https://www.iitm.ac.in" },

        // Domain 5: Data Science & Business Analytics
        { title: "IBM Data Science Professional Certificate (Individual Modules)", category: "Data Science & Business Analytics", level: "Beginner", budget: "Free", link: "https://www.coursera.org" },
        { title: "Google Advanced Data Analytics Certificate", category: "Data Science & Business Analytics", level: "Beginner", budget: "Paid", link: "https://www.coursera.org" },
        { title: "Master of Science in Data Science from Top Global Universities", category: "Data Science & Business Analytics", level: "Advanced", budget: "University", link: "https://www.edx.org" },

        // Domain 6: DevOps & CI/CD Engineering
        { title: "Introduction to DevOps and Software Engineering by IBM", category: "DevOps & CI/CD Engineering", level: "Beginner", budget: "Free", link: "https://www.coursera.org" },
        { title: "DevOps on AWS Professional Certificate", category: "DevOps & CI/CD Engineering", level: "Beginner", budget: "Paid", link: "https://aws.amazon.com" },
        { title: "Udacity DevOps Engineer Nanodegree Program", category: "DevOps & CI/CD Engineering", level: "Advanced", budget: "University", link: "https://www.udacity.com" },

        // Domain 7: Full-Stack Web Development
        { title: "Programming with JavaScript by Meta / The Odin Project", category: "Full-Stack Web Development", level: "Beginner", budget: "Free", link: "https://www.theodinproject.com" },
        { title: "Meta Full-Stack Developer Professional Certificate", category: "Full-Stack Web Development", level: "Beginner", budget: "Paid", link: "https://www.coursera.org" },
        { title: "Full Stack Web Development with React Specialization by HKUST", category: "Full-Stack Web Development", level: "Advanced", budget: "University", link: "https://www.coursera.org" },

        // Domain 8: Blockchain Technology
        { title: "Bitcoin and Cryptocurrency Technologies by Princeton University", category: "Blockchain Technology", level: "Beginner", budget: "Free", link: "https://www.coursera.org" },
        { title: "Blockchain Specialization by University at Buffalo", category: "Blockchain Technology", level: "Beginner", budget: "Paid", link: "https://www.coursera.org" },
        { title: "Certified Blockchain Solutions Architect (CBSA)", category: "Blockchain Technology", level: "Advanced", budget: "University", link: "https://blockchaintrainingalliance.com" },

        // Domain 9: IT Support & Systems Administration
        { title: "Google IT Support Professional Certificate", category: "IT Support & Systems Administration", level: "Beginner", budget: "Free", link: "https://grow.google" },
        { title: "CompTIA IT Fundamentals+ (FC0-U61) Specialization", category: "IT Support & Systems Administration", level: "Beginner", budget: "Paid", link: "https://www.coursera.org" },
        { title: "Google Cloud Engineering Certificate Architecture Model", category: "IT Support & Systems Administration", level: "Advanced", budget: "University", link: "https://www.coursera.org" },

        // Domain 10: Software Testing & Quality Assurance (QA)
        { title: "Introduction to Software Engineering Core Principles by IBM", category: "Software Testing & Quality Assurance (QA)", level: "Beginner", budget: "Free", link: "https://www.coursera.org" },
        { title: "Automated Software Testing Specialization by University of Minnesota", category: "Software Testing & Quality Assurance (QA)", level: "Beginner", budget: "Paid", link: "https://www.coursera.org" },
        { title: "ISTQB Advanced Level Test Automation Engineer Certification", category: "Software Testing & Quality Assurance (QA)", level: "Advanced", budget: "University", link: "https://www.istqb.org" }
    ];

    // ==========================================================================
    // 2. DOM ELEMENT UI REFERENCES
    // ==========================================================================
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const exploreBtn = document.getElementById('exploreBtn');
    
    // Search Page Elements
    const courseResultsContainer = document.getElementById('courseResultsContainer');
    const searchQueryHeading = document.getElementById('searchQueryHeading');
    const resultsCount = document.getElementById('resultsCount');
    
    // Account Form Elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    /* ==========================================================================
       3. GLOBAL NAVBAR NAVIGATION ROUTING
       ========================================================================== */
    if (searchBtn && searchInput) {
        const handleSearchRouting = () => {
            const rawInputValue = searchInput.value.trim();
            if (rawInputValue) {
                // Pass text parameter targets inside URL variables across local window paths
                window.location.href = `results.html?q=${encodeURIComponent(rawInputValue)}`;
            } else {
                alert("Please enter a subject matter keyword to search (e.g. 'Python', 'AI', 'Security').");
                searchInput.focus();
            }
        };

        searchBtn.addEventListener('click', handleSearchRouting);
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') handleSearchRouting();
        });
    }

    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            alert('Opening Course Index Grid Canvas... Merging active directory components.');
        });
    }

    /* ==========================================================================
       4. DYNAMIC SEARCH ENGINE CONTROLLER & CHECKBOX FILTER PIPELINE
       ========================================================================== */
    if (courseResultsContainer) {
        // Parse incoming text query structures directly from URL window variables
        const urlParams = new URLSearchParams(window.location.search);
        let activeQueryString = urlParams.get('q') ? urlParams.get('q').trim().toLowerCase() : "";

        // Synchronize input fields text content across views automatically
        if (searchInput && activeQueryString) {
            searchInput.value = urlParams.get('q');
        }

        /**
         * Reads input checkboxes configurations to output targeted layout items matching constraints
         */
        const processAndRenderCatalog = () => {
            // Read arrays of currently checked levels and budgets
            const selectedLevels = Array.from(document.querySelectorAll('.filter-level:checked')).map(box => box.value);
            const selectedBudgets = Array.from(document.querySelectorAll('.filter-budget:checked')).map(box => box.value);

            // Mutate layout display titles depending on input criteria status
            if (searchQueryHeading) {
                searchQueryHeading.textContent = activeQueryString 
                    ? `Showing Results for "${urlParams.get('q')}"` 
                    : "Explore All Curated Programs";
            }

            // Deep array filtering validation logic loops
            const finalizedCatalogData = courseDatabase.filter(course => {
                const passesTextFilter = activeQueryString === "" || 
                                         course.title.toLowerCase().includes(activeQueryString) || 
                                         course.category.toLowerCase().includes(activeQueryString);

                const passesLevelFilter = selectedLevels.length === 0 || selectedLevels.includes(course.level);
                const passesBudgetFilter = selectedBudgets.length === 0 || selectedBudgets.includes(course.budget);

                return passesTextFilter && passesLevelFilter && passesBudgetFilter;
            });

            // Update user notification counts string parameters
            if (resultsCount) {
                resultsCount.textContent = `${finalizedCatalogData.length} course${finalizedCatalogData.length === 1 ? '' : 's'} available matching criteria`;
            }

            // Clean previous cards container to avoid visual duplication
            courseResultsContainer.innerHTML = "";

            // Evaluate zero-match empty boundaries cleanly
            if (finalizedCatalogData.length === 0) {
                courseResultsContainer.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; color: #636363;">
                        <i class="fas fa-folder-open" style="font-size: 44px; margin-bottom: 16px; display:block; color: #757575;"></i>
                        <p style="font-size: 16px;">No learning tracks found matching that exact combination. Try expanding checkboxes.</p>
                    </div>`;
                return;
            }

            // Build structural display cards layouts template structures
            finalizedCatalogData.forEach(course => {
                const cardNode = document.createElement('div');
                cardNode.className = 'course-display-card';
                
                const renderBudgetBadgeText = course.budget === 'Paid' ? "Paid Certificate" : 
                                              course.budget === 'University' ? "University Credential" : "Free Tutorial";

                cardNode.innerHTML = `
                    <div>
                        <span class="card-meta-category">${course.category}</span>
                        <h4>${course.title}</h4>
                        <div class="badge-row">
                            <span class="badge-item badge-level">${course.level}</span>
                            <span class="badge-item badge-budget">${renderBudgetBadgeText}</span>
                        </div>
                    </div>
                    <a href="course-detail.html?courseName=${encodeURIComponent(course.title)}" class="btn-view-course">View Course Materials</a>
                `;
                courseResultsContainer.appendChild(cardNode);
            });
        };

        // Attach layout processing event callbacks seamlessly onto checkboxes
        document.querySelectorAll('.filter-checkbox').forEach(box => {
            box.addEventListener('change', processAndRenderCatalog);
        });

        // Initialize execution path rendering sequence automatically on page entry
        processAndRenderCatalog();
    }

    /* ==========================================================================
       5. DETAILED SPECIFICATION SHOWCASE CARD CONTROLLER
       ========================================================================== */
    if (window.location.pathname.includes('course-detail.html')) {
        const detailUrlParams = new URLSearchParams(window.location.search);
        const activeDescriptionTitle = detailUrlParams.get('courseName');
        
        if (activeDescriptionTitle) {
            const courseMainTitleHeading = document.getElementById('courseMainTitle');
            if (courseMainTitleHeading) {
                courseMainTitleHeading.textContent = activeDescriptionTitle;
            }
            // Update browser document top title header properties
            document.title = `TOM | ${activeDescriptionTitle}`;
        }
    }

    /* ==========================================================================
       6. INTEGRATED SPLIT LEARNING INTERFACE WORKSPACE CONTROLLER
       ========================================================================== */
    
    // A. Track details view button hooks to jump into dynamic workspaces
    const enrollBannerBtn = document.querySelector('.btn-action-banner');
    if (enrollBannerBtn) {
        enrollBannerBtn.addEventListener('click', () => {
            const activeCourseHeading = document.getElementById('courseMainTitle').textContent;
            window.location.href = `course-content.html?courseName=${encodeURIComponent(activeCourseHeading)}`;
        });
    }

    // B. Learning Portal Layout Workspace Context Controller
    const workspaceLayoutCheck = document.querySelector('.workspace-layout');
    if (workspaceLayoutCheck) {
        const workspaceUrlVars = new URLSearchParams(window.location.search);
        const dynamicWorkspaceTitle = workspaceUrlVars.get('courseName') || "AI Engineering Professional Certificate";
        
        // Synchronize workspace metadata strings labels
        document.getElementById('workspaceCourseTitle').textContent = dynamicWorkspaceTitle;

        // Syllabus Curriculum Lecture Switching playlist triggers
        const videoViewport = document.getElementById('videoPlayer');
        const curriculumTracks = document.querySelectorAll('.lecture-item');

        curriculumTracks.forEach(trackItem => {
            trackItem.addEventListener('click', () => {
                // Clear and toggle active selector highlights
                document.querySelector('.lecture-item.item-active')?.classList.remove('item-active');
                trackItem.classList.add('item-active');

                // Re-inject target video source path property securely
                const updatedVideoUrl = trackItem.getAttribute('data-video');
                if (videoViewport && updatedVideoUrl) {
                    videoViewport.src = updatedVideoUrl;
                }
            });
        });

        // Modal Component Dialog Triggers
        const quizModal = document.getElementById('quizModal');
        const openQuizBtn = document.getElementById('openQuizBtn');
        const closeQuizBtn = document.getElementById('closeQuizBtn');
        const quizForm = document.getElementById('evaluationQuizForm');

        if (openQuizBtn && closeQuizBtn && quizModal) {
            openQuizBtn.addEventListener('click', () => quizModal.style.display = 'flex');
            closeQuizBtn.addEventListener('click', () => quizModal.style.display = 'none');
        }

        // Handle form evaluation validation answer flags matches
        if (quizForm) {
            quizForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const checkedRadioSelection = document.querySelector('input[name="q1"]:checked');

                if (checkedRadioSelection && checkedRadioSelection.value === 'correct') {
                    alert("Evaluation pass confirmation confirmed. Opening verification badge constructor...");
                    
                    // Call browser tracking windows initialization names prompts strings
                    let capturedRecipient = prompt("Please confirm your official full name for certificate endorsement:", "Saravanan TS");
                    if (!capturedRecipient) capturedRecipient = "Saravanan TS";

                    // Save values locally to bridge pages without backend architectures
                    localStorage.setItem('graduatedStudent', capturedRecipient);
                    localStorage.setItem('graduatedCourse', dynamicWorkspaceTitle);

                    // Forward client to print rendering canvas viewport layout page
                    window.location.href = 'certificate.html';
                } else {
                    alert("Score evaluation failed. Review the curriculum technical nodes and retry.");
                }
            });
        }
    }

    // C. Dynamic Certificate Canvas Initialization Sync
    const certificateCanvasBlock = document.querySelector('.certificate-canvas');
    if (certificateCanvasBlock) {
        // Read stored data inputs back out of native client memory cache arrays
        const structuralVerifiedName = localStorage.getItem('graduatedStudent') || "Saravanan TS";
        const structuralVerifiedCourse = localStorage.getItem('graduatedCourse') || "AI Engineering Professional Certificate";

        // Write directly inside graphic content node containers strings fields
        document.getElementById('certStudentName').textContent = structuralVerifiedName;
        document.getElementById('certCourseTitle').textContent = `"${structuralVerifiedCourse}"`;

        // Inject secure mock verification hash string identifiers footprint tags
        const uniqueHexStamp = `Verification ID: ${Math.random().toString(16).substring(2, 10)}-d5a3-4c2a-9e7f-${Math.random().toString(16).substring(2, 14)}`;
        document.getElementById('certHashString').textContent = uniqueHexStamp;
    }

    /* ==========================================================================
       7. IDENTITY CONTROL FORM ROUTING INJECTIONS
       ========================================================================== */
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });
    }
});