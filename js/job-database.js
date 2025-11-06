// Job Database - Simulated job listings
const jobDatabase = [
    {
        id: 1,
        title: "Senior Software Developer",
        company: "TechCorp Solutions",
        location: "Mumbai, Maharashtra",
        type: "Full-time",
        experience: "5+ years",
        salary: "₹8,00,000 - ₹12,00,000",
        category: "technology",
        description: "We are seeking a talented Senior Software Developer to join our dynamic team.",
        skills: ["JavaScript", "React", "Node.js", "Python"],
        posted: "2 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "WebTech Inc",
        location: "Bangalore, Karnataka",
        type: "Full-time",
        experience: "3+ years",
        salary: "₹6,00,000 - ₹8,00,000",
        category: "technology",
        description: "Join our team to build amazing user interfaces and web experiences.",
        skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js"],
        posted: "1 day ago",
        logo: "images/jobicon.png"
    },
    {
        id: 3,
        title: "Data Scientist",
        company: "DataFlow Analytics",
        location: "Hyderabad, Telangana",
        type: "Full-time",
        experience: "4+ years",
        salary: "₹9,00,000 - ₹13,00,000",
        category: "technology",
        description: "Analyze complex data sets and build predictive models.",
        skills: ["Python", "R", "Machine Learning", "SQL"],
        posted: "3 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 4,
        title: "Marketing Manager",
        company: "BrandBoost Agency",
        location: "Delhi, NCR",
        type: "Full-time",
        experience: "5+ years",
        salary: "₹7,00,000 - ₹9,50,000",
        category: "marketing",
        description: "Lead marketing campaigns and drive brand growth.",
        skills: ["Digital Marketing", "SEO", "Content Strategy"],
        posted: "1 day ago",
        logo: "images/jobicon.png"
    },
    {
        id: 5,
        title: "UX/UI Designer",
        company: "DesignStudio Pro",
        location: "Pune, Maharashtra",
        type: "Full-time",
        experience: "3+ years",
        salary: "₹6,50,000 - ₹8,50,000",
        category: "creative",
        description: "Create intuitive and beautiful user experiences.",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        posted: "2 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 6,
        title: "DevOps Engineer",
        company: "CloudTech Systems",
        location: "Chennai, Tamil Nadu",
        type: "Full-time",
        experience: "4+ years",
        salary: "₹8,50,000 - ₹11,50,000",
        category: "technology",
        description: "Manage cloud infrastructure and deployment pipelines.",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        posted: "4 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 7,
        title: "Product Manager",
        company: "InnovateTech",
        location: "Gurgaon, Haryana",
        type: "Full-time",
        experience: "5+ years",
        salary: "₹9,50,000 - ₹12,50,000",
        category: "technology",
        description: "Drive product strategy and work with cross-functional teams.",
        skills: ["Product Strategy", "Agile", "Analytics"],
        posted: "1 day ago",
        logo: "images/jobicon.png"
    },
    {
        id: 8,
        title: "Sales Representative",
        company: "SalesForce Pro",
        location: "Noida, Uttar Pradesh",
        type: "Full-time",
        experience: "2+ years",
        salary: "₹5,00,000 - ₹7,00,000",
        category: "sales",
        description: "Build relationships and drive sales growth.",
        skills: ["CRM", "Lead Generation", "Communication"],
        posted: "3 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 9,
        title: "Registered Nurse",
        company: "HealthCare Plus",
        location: "Kolkata, West Bengal",
        type: "Full-time",
        experience: "2+ years",
        salary: "₹6,00,000 - ₹7,50,000",
        category: "healthcare",
        description: "Provide quality patient care in our modern facility.",
        skills: ["Patient Care", "Medical Records", "CPR"],
        posted: "2 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 10,
        title: "Financial Analyst",
        company: "FinanceWorks Corp",
        location: "Mumbai, Maharashtra",
        type: "Full-time",
        experience: "3+ years",
        salary: "₹6,50,000 - ₹8,50,000",
        category: "finance",
        description: "Analyze financial data and prepare reports.",
        skills: ["Excel", "Financial Modeling", "SQL"],
        posted: "1 day ago",
        logo: "images/jobicon.png"
    },
    {
        id: 11,
        title: "Software Engineer",
        company: "StartupXYZ",
        location: "Bangalore, Karnataka",
        type: "Full-time",
        experience: "2+ years",
        salary: "₹7,00,000 - ₹9,00,000",
        category: "technology",
        description: "Build scalable applications in a fast-paced startup environment.",
        skills: ["Java", "Spring Boot", "MySQL"],
        posted: "5 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 12,
        title: "Content Writer",
        company: "ContentCraft Media",
        location: "Remote (India)",
        type: "Full-time",
        experience: "2+ years",
        salary: "₹4,50,000 - ₹6,00,000",
        category: "creative",
        description: "Create engaging content for various digital platforms.",
        skills: ["Writing", "SEO", "Content Strategy"],
        posted: "3 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 13,
        title: "Project Manager",
        company: "BuildRight Construction",
        location: "Ahmedabad, Gujarat",
        type: "Full-time",
        experience: "5+ years",
        salary: "₹7,50,000 - ₹9,50,000",
        category: "engineering",
        description: "Manage construction projects from start to finish.",
        skills: ["Project Management", "AutoCAD", "Scheduling"],
        posted: "2 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 14,
        title: "HR Specialist",
        company: "PeopleFirst HR",
        location: "Jaipur, Rajasthan",
        type: "Full-time",
        experience: "3+ years",
        salary: "₹5,50,000 - ₹7,00,000",
        category: "hr",
        description: "Support HR operations and employee relations.",
        skills: ["Recruitment", "Employee Relations", "HRIS"],
        posted: "4 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 15,
        title: "Cybersecurity Analyst",
        company: "SecureNet Solutions",
        location: "Kochi, Kerala",
        type: "Full-time",
        experience: "4+ years",
        salary: "₹8,00,000 - ₹10,50,000",
        category: "technology",
        description: "Protect our systems from cyber threats and vulnerabilities.",
        skills: ["Network Security", "Penetration Testing", "SIEM"],
        posted: "1 day ago",
        logo: "images/jobicon.png"
    },
    {
        id: 16,
        title: "Backend Developer",
        company: "CodeCraft Technologies",
        location: "Bangalore, Karnataka",
        type: "Full-time",
        experience: "3+ years",
        salary: "₹7,50,000 - ₹10,00,000",
        category: "technology",
        description: "Build robust server-side applications and APIs.",
        skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
        posted: "2 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 17,
        title: "Mobile App Developer",
        company: "AppVenture Studios",
        location: "Mumbai, Maharashtra",
        type: "Full-time",
        experience: "4+ years",
        salary: "₹8,00,000 - ₹11,00,000",
        category: "technology",
        description: "Develop cross-platform mobile applications.",
        skills: ["React Native", "Flutter", "iOS", "Android"],
        posted: "1 day ago",
        logo: "images/jobicon.png"
    },
    {
        id: 18,
        title: "Machine Learning Engineer",
        company: "AI Innovations Lab",
        location: "Hyderabad, Telangana",
        type: "Full-time",
        experience: "5+ years",
        salary: "₹12,00,000 - ₹18,00,000",
        category: "technology",
        description: "Design and implement ML models for production systems.",
        skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
        posted: "3 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 19,
        title: "Cloud Architect",
        company: "CloudFirst Solutions",
        location: "Pune, Maharashtra",
        type: "Full-time",
        experience: "6+ years",
        salary: "₹15,00,000 - ₹22,00,000",
        category: "technology",
        description: "Design scalable cloud infrastructure and solutions.",
        skills: ["AWS", "Azure", "GCP", "Terraform"],
        posted: "2 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 20,
        title: "Database Administrator",
        company: "DataSecure Systems",
        location: "Chennai, Tamil Nadu",
        type: "Full-time",
        experience: "4+ years",
        salary: "₹7,00,000 - ₹9,50,000",
        category: "technology",
        description: "Manage and optimize database systems for performance.",
        skills: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
        posted: "4 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 21,
        title: "QA Automation Engineer",
        company: "TestPro Technologies",
        location: "Gurgaon, Haryana",
        type: "Full-time",
        experience: "3+ years",
        salary: "₹6,50,000 - ₹8,50,000",
        category: "technology",
        description: "Automate testing processes and ensure software quality.",
        skills: ["Selenium", "Cypress", "Jest", "API Testing"],
        posted: "1 day ago",
        logo: "images/jobicon.png"
    },
    {
        id: 22,
        title: "Blockchain Developer",
        company: "CryptoTech Innovations",
        location: "Bangalore, Karnataka",
        type: "Full-time",
        experience: "3+ years",
        salary: "₹10,00,000 - ₹14,00,000",
        category: "technology",
        description: "Develop decentralized applications and smart contracts.",
        skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts"],
        posted: "2 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 23,
        title: "Game Developer",
        company: "GameStorm Studios",
        location: "Mumbai, Maharashtra",
        type: "Full-time",
        experience: "4+ years",
        salary: "₹8,50,000 - ₹12,00,000",
        category: "technology",
        description: "Create engaging games for mobile and web platforms.",
        skills: ["Unity", "C#", "Unreal Engine", "Game Design"],
        posted: "3 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 24,
        title: "System Administrator",
        company: "TechOps Solutions",
        location: "Delhi, NCR",
        type: "Full-time",
        experience: "3+ years",
        salary: "₹5,50,000 - ₹7,50,000",
        category: "technology",
        description: "Maintain and monitor IT infrastructure and systems.",
        skills: ["Linux", "Windows Server", "Networking", "Scripting"],
        posted: "2 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 25,
        title: "AI Research Scientist",
        company: "FutureAI Labs",
        location: "Hyderabad, Telangana",
        type: "Full-time",
        experience: "6+ years",
        salary: "₹18,00,000 - ₹25,00,000",
        category: "technology",
        description: "Research and develop cutting-edge AI algorithms.",
        skills: ["Deep Learning", "NLP", "Computer Vision", "Research"],
        posted: "1 day ago",
        logo: "images/jobicon.png"
    },
    {
        id: 26,
        title: "Network Engineer",
        company: "NetSecure Systems",
        location: "Chennai, Tamil Nadu",
        type: "Full-time",
        experience: "4+ years",
        salary: "₹6,00,000 - ₹8,00,000",
        category: "technology",
        description: "Design and maintain network infrastructure.",
        skills: ["Cisco", "Routing", "Switching", "Network Security"],
        posted: "3 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 27,
        title: "Software Architect",
        company: "ArchTech Solutions",
        location: "Pune, Maharashtra",
        type: "Full-time",
        experience: "8+ years",
        salary: "₹20,00,000 - ₹28,00,000",
        category: "technology",
        description: "Design high-level software architecture and technical solutions.",
        skills: ["System Design", "Microservices", "Architecture Patterns", "Leadership"],
        posted: "2 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 28,
        title: "IoT Developer",
        company: "SmartTech Innovations",
        location: "Bangalore, Karnataka",
        type: "Full-time",
        experience: "3+ years",
        salary: "₹7,00,000 - ₹9,50,000",
        category: "technology",
        description: "Develop IoT solutions and embedded systems.",
        skills: ["Arduino", "Raspberry Pi", "C++", "IoT Protocols"],
        posted: "4 days ago",
        logo: "images/jobicon.png"
    },
    {
        id: 29,
        title: "Technical Writer",
        company: "DocuTech Solutions",
        location: "Remote (India)",
        type: "Full-time",
        experience: "2+ years",
        salary: "₹5,00,000 - ₹7,00,000",
        category: "technology",
        description: "Create technical documentation and user guides.",
        skills: ["Technical Writing", "API Documentation", "Markdown", "Git"],
        posted: "1 day ago",
        logo: "images/jobicon.png"
    },
    {
        id: 30,
        title: "Site Reliability Engineer",
        company: "ReliableTech Systems",
        location: "Mumbai, Maharashtra",
        type: "Full-time",
        experience: "5+ years",
        salary: "₹12,00,000 - ₹16,00,000",
        category: "technology",
        description: "Ensure system reliability, scalability, and performance.",
        skills: ["SRE", "Monitoring", "Incident Management", "Automation"],
        posted: "2 days ago",
        logo: "images/jobicon.png"
    }
];

// Search and filter functions
function searchJobs(query, location, category = '') {
    let results = jobDatabase;
    
    // Filter by job title/company if query provided
    if (query && query.trim() !== '') {
        const searchTerm = query.toLowerCase();
        results = results.filter(job => {
            const titleMatch = job.title.toLowerCase().includes(searchTerm);
            const companyMatch = job.company.toLowerCase().includes(searchTerm);
            const skillMatch = job.skills.some(skill => skill.toLowerCase().includes(searchTerm));
            const categoryMatch = job.category.toLowerCase() === searchTerm;
            
            return titleMatch || companyMatch || skillMatch || categoryMatch;
        });
    }
    
    // Filter by location if provided
    if (location && location.trim() !== '') {
        const locationTerm = location.toLowerCase();
        results = results.filter(job => 
            job.location.toLowerCase().includes(locationTerm)
        );
    }
    
    // Filter by category if provided
    if (category && category.trim() !== '') {
        results = results.filter(job => 
            job.category === category.toLowerCase()
        );
    }
    
    return results;
}

function getJobById(id) {
    return jobDatabase.find(job => job.id === parseInt(id));
}

function getJobsByCategory(category) {
    return jobDatabase.filter(job => job.category === category.toLowerCase());
}

function getAllJobs() {
    return jobDatabase;
}

function getJobCountByCategory(category) {
    return jobDatabase.filter(job => job.category === category.toLowerCase()).length;
}

function updateJobCounts() {
    const techCount = getJobCountByCategory('technology');
    const salesCount = getJobCountByCategory('sales');
    const healthCount = getJobCountByCategory('healthcare');
    const hrCount = getJobCountByCategory('hr');
    
    return {
        technology: techCount,
        sales: salesCount,
        healthcare: healthCount,
        hr: hrCount
    };
}