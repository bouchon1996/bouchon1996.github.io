// Artwork data (add titles/descriptions for ALL images)
const artworkData = [
  {
    path: 'images/assets/artphotos/FullSizeRender-1.jpg',
    title: 'Artwork Title 1',
    description: 'Description 1: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-2.jpg',
    title: 'Artwork Title 2',
    description: 'Description 2: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-3.jpg',
    title: 'Artwork Title 3',
    description: 'Description 3: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-4.jpg',
    title: 'Artwork Title 4',
    description: 'Description 4: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-5.jpg',
    title: 'Artwork Title 5',
    description: 'Description 5: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-6.jpg',
    title: 'Artwork Title 6',
    description: 'Description 6: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-7.jpg',
    title: 'Artwork Title 7',
    description: 'Description 7: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-8.jpg',
    title: 'Artwork Title 8',
    description: 'Description 8: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-9.jpg',
    title: 'Artwork Title 9',
    description: 'Description 9: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-10.jpg',
    title: 'Artwork Title 10',
    description: 'Description 10: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-11.jpg',
    title: 'Artwork Title 11',
    description: 'Description 11: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-12.jpg',
    title: 'Artwork Title 12',
    description: 'Description 12: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-13.jpg',
    title: 'Artwork Title 13',
    description: 'Description 13: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-14.jpg',
    title: 'Artwork Title 14',
    description: 'Description 14: Medium, size, inspiration, etc.'
  },
  {
    path: 'images/assets/artphotos/FullSizeRender-15.jpg',
    title: 'Artwork Title 15',
    description: 'Description 15: Medium, size, inspiration, etc.'
  }
];

let currentIndex = 0;

// Lightbox Functions
function handleLightboxClick(event) {
  if (event.target === document.getElementById('lightbox')) {
    closeLightbox();
  }
}

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const artwork = artworkData[index];
  currentIndex = index;
  
  document.getElementById('lightbox-image').src = artwork.path;
  document.getElementById('artwork-title').textContent = artwork.title;
  document.getElementById('artwork-desc').textContent = artwork.description;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function navigate(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = artworkData.length - 1;
  if (currentIndex >= artworkData.length) currentIndex = 0;
  openLightbox(currentIndex);
}

// Gallery Initialization
function initGallery() {
  const gallery = document.getElementById('gallery-container');
  gallery.innerHTML = '';
  
  artworkData.forEach((artwork, index) => {
    gallery.innerHTML += `
      <div class="art-item">
        <img src="${artwork.path}" alt="${artwork.title}" 
             onclick="openLightbox(${index})">
      </div>
    `;
  });
}

// Arrow Visibility Control
let arrowTimeout;

function showArrows() {
  clearTimeout(arrowTimeout);
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.style.opacity = '1';
  });
  arrowTimeout = setTimeout(hideArrows, 2000);
}

function hideArrows() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.style.opacity = '0';
  });
}

// Scroll Animations with GSAP
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse",
        markers: false // Set to true for debugging
      }
    });
  });
}

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initScrollAnimations();
  
  // Lightbox event listeners
  document.getElementById('lightbox').addEventListener('mousemove', showArrows);
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    }
  });
});