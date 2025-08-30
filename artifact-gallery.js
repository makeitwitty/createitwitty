document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery script loading...');
    
    const mediaItems = document.querySelectorAll('.media-item');
    const modal = document.getElementById('mediaModal');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalMediaContainer = document.getElementById('modalMediaContainer');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    console.log('Found elements:', {
        mediaItems: mediaItems.length,
        modal: !!modal,
        modalClose: !!modalClose,
        modalBackdrop: !!modalBackdrop
    });
    
    // Media descriptions mapping
    const mediaDescriptions = {
        'wood-selection.jpg': 'Choosing walnut pieces with interesting grain patterns for each bell box. The wood selection process is crucial as each piece\'s grain affects both the visual character and acoustic properties of the final artifact.',
        'carving.jpg': 'Hollowing the bell chambers with precision using hand tools. Each chamber is carefully carved to exact specifications to ensure proper resonance and harmonic intervals between the bells.',
        'bell-tuning.mp4': 'Fine-tuning each brass bell for harmonic intervals. This delicate process involves adjusting the bell\'s shape and thickness to achieve the desired tone and ensure all three bells work together harmoniously.',
        'oil-finish.jpg': 'Hand-rubbing natural oil into the carved walnut. The finishing process enhances the wood\'s natural beauty while providing protection. Multiple coats are applied and hand-rubbed to achieve a smooth, tactile surface.',
        'complete-series.jpg': 'All 15 pieces of the collection showing unique grain variations. Despite following the same design, each piece develops its own character through the natural variations in wood grain and the handcrafting process.',
        'sound-demo.mp4': 'Demonstrating different bell tones and combinations. This video shows the various ways to interact with the artifact - from single bell strikes to flowing sequences that create meditative soundscapes.'
    };
    
    // Open modal function
    function openModal(src, type, title) {
        console.log('openModal called with:', { src, type, title });
        
        if (!modal) {
            console.error('Modal element not found!');
            return;
        }
        
        const filename = src.split('/').pop();
        const description = mediaDescriptions[filename] || 'A glimpse into the making process of this unique artifact.';
        
        console.log('Setting modal content:', { filename, description });
        
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalMediaContainer.innerHTML = '';
        
        if (type === 'image') {
            console.log('Creating image element');
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.className = 'modal-image';
            img.onload = () => console.log('Image loaded successfully');
            img.onerror = () => console.error('Image failed to load:', src);
            modalMediaContainer.appendChild(img);
        } else if (type === 'video') {
            console.log('Creating video element');
            const video = document.createElement('video');
            video.src = src;
            video.className = 'modal-video';
            video.controls = true;
            video.autoplay = true;
            video.muted = false;
            video.onloadeddata = () => console.log('Video loaded successfully');
            video.onerror = () => console.error('Video failed to load:', src);
            modalMediaContainer.appendChild(video);
        }
        
        console.log('Adding active class to modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log('Modal should now be visible:', modal.classList.contains('active'));
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Stop any playing video
        const video = modalMediaContainer.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }
    
    // Gallery media item click handlers
    mediaItems.forEach((item, index) => {
        console.log(`Setting up click handler for item ${index}:`, {
            type: item.dataset.type,
            src: item.dataset.src,
            hasOverlay: !!item.querySelector('.overlay-label')
        });
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Media item clicked:', this);
            
            const type = this.dataset.type;
            const src = this.dataset.src;
            const title = this.querySelector('.overlay-label')?.textContent || 'Untitled';
            
            console.log('Opening modal with:', { type, src, title });
            openModal(src, type, title);
        });
        
        // Add visual feedback
        item.style.cursor = 'pointer';
    });
    
    // Modal close handlers
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
        console.log('Close button handler added');
    } else {
        console.error('Modal close button not found');
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
        console.log('Backdrop click handler added');
    } else {
        console.error('Modal backdrop not found');
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Prevent modal content clicks from closing modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        console.log('Modal content click prevention added');
    } else {
        console.error('Modal content not found');
    }
    
    // Initialize gallery with staggered animation
    function initializeGallery() {
        mediaItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.animation = 'fadeInUp 0.5s ease forwards';
        });
    }
    
    // Initialize the gallery
    initializeGallery();
});

// Add CSS animations via JavaScript
const galleryStyle = document.createElement('style');
galleryStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .media-item {
        opacity: 0;
    }
    
    .media-item[style*="animation"] {
        opacity: 1;
    }
    
`;
document.head.appendChild(galleryStyle);