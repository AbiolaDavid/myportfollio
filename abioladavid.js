// Particle Background Initialization
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#00d4ff' }, // Cyan to match theme
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: '#00d4ff', opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: { grab: { distance: 200, line_linked: { opacity: 0.7 } }, push: { particles_nb: 4 } }
  },
  retina_detect: true
});

// Navigation
const hamburger = document.querySelector('.hamburger');
const navContent = document.querySelector('.nav-content');
const navLinks = document.querySelectorAll('.nav-button');

hamburger.addEventListener('click', () => {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  navContent.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (!link.hasAttribute('download') && !link.hasAttribute('target')) {
      e.preventDefault();
      const sectionId = link.getAttribute('href').substring(1);
      const section = document.getElementById(sectionId);
      
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      document.querySelectorAll('.content-section').forEach(s => {
        s.classList.remove('active');
        s.setAttribute('aria-hidden', 'true');
      });
      section.classList.add('active');
      section.setAttribute('aria-hidden', 'false');
      
      section.scrollIntoView({ behavior: 'smooth' });
      
      if (navContent.classList.contains('active')) {
        navContent.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Certificate Modal
const certificateModal = document.getElementById('certificate-modal');
const certificateImage = document.getElementById('certificate-image');
const certificateTitle = document.getElementById('certificate-title');
const closeButton = document.querySelector('.close-button');

function openModal(imageSrc, title) {
  certificateImage.src = imageSrc;
  certificateTitle.textContent = title;
  certificateModal.style.display = 'flex';
}

closeButton.addEventListener('click', () => {
  certificateModal.style.display = 'none';
});

// Project Gallery Modal
const projectGallery = document.getElementById('project-gallery');
const galleryImage = document.getElementById('gallery-image');
const galleryCaption = document.getElementById('gallery-caption');
const galleryClose = document.querySelector('.modal-close');
const prevButton = document.querySelector('.gallery-prev');
const nextButton = document.querySelector('.gallery-next');

const projectImages = {
  email_automation: [
    { src: 'Import_excel.png', caption: 'Importing Excel' },
    { src: 'Dependencies_content.png', caption: 'Dependencies and Contents' },
    { src: 'Automation_system.png', caption: 'Automation System' },
  ],
  annotation_pipeline: [
    { src: 'Before_annotation.jpg', caption: 'Before Annotation' },
    { src: 'After_annotation.png', caption: 'After Annotation' },
    {src: 'Label_name.png', caption: 'Label Name'},
    {src: 'ValidationProcess.png', caption: 'Validate Process'}, 
  ],
  prompt_library: [
    { src: 'prompt_engineering.jpg', caption: 'Prompt Template Library' },
    { src: 'GenerativeAI.png', caption: 'LLM Prompt API' },
    { src: 'CodeFor_gen_img.png', caption: 'Code For Generating Images' },
    { src: 'TextGenAI.png', caption: 'Code Text Output' },
  ],

  Data_Analytics: [
    { src: 'Clean_data.png', caption: 'Clean Data' },
    { src: 'analysis.png', caption: 'Analysis' },
    { src: 'chart.png', caption: 'Data Chart' },
  ],
};

let currentProject = null;
let currentImageIndex = 0;

function openProjectGallery(projectKey) {
  currentProject = projectKey;
  currentImageIndex = 0;
  updateGallery();
  projectGallery.style.display = 'flex';
}

function updateGallery() {
  const images = projectImages[currentProject];
  galleryImage.src = images[currentImageIndex].src;
  galleryCaption.textContent = images[currentImageIndex].caption;
}

prevButton.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + projectImages[currentProject].length) % projectImages[currentProject].length;
  updateGallery();
});

nextButton.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % projectImages[currentProject].length;
  updateGallery();
});

galleryClose.addEventListener('click', () => {
  projectGallery.style.display = 'none';
});

// Close modals on outside click
window.addEventListener('click', (e) => {
  if (e.target === certificateModal) certificateModal.style.display = 'none';
  if (e.target === projectGallery) projectGallery.style.display = 'none';
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form submitted! (This is a placeholder - implement actual form submission logic)');
  e.target.reset();
});

// Intersection Observer for Section Animations
const sections = document.querySelectorAll('.content-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          link.classList.toggle('active', href.substring(1) === entry.target.id);
        }
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

// Initialize
document.querySelector('#home').classList.add('active');