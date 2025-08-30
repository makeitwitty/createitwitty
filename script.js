document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const artifactCards = document.querySelectorAll('.artifact-card');
    
    tabButtons.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            artifactCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'slideIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    const purchaseButtons = document.querySelectorAll('.artifact-actions .btn-primary');
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const artifactCard = this.closest('.artifact-card');
            const artifactName = artifactCard.querySelector('.artifact-name').textContent;
            const artifactPrice = artifactCard.querySelector('.artifact-price').textContent;
            
            const confirmed = confirm(`Acquire ${artifactName} for ${artifactPrice}?`);
            if (confirmed) {
                this.textContent = 'Acquired!';
                this.style.background = 'rgba(0, 0, 0, 0.5)';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = 'Acquire Artifact';
                    this.style.background = '';
                    this.disabled = false;
                }, 3000);
            }
        });
    });
    
    const storyButtons = document.querySelectorAll('.artifact-actions .btn:not(.btn-primary):not([href])');
    storyButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Story')) {
                const artifactCard = this.closest('.artifact-card');
                const artifactName = artifactCard.querySelector('.artifact-name').textContent;
                alert(`The story behind ${artifactName} would be displayed here.`);
            }
        });
    });
    
    // Navigation functionality removed - links now work directly
    
    // Remove balance functionality as it's not relevant for Create it Witty
    
    document.addEventListener('keydown', function(e) {
        if (e.key === '1') tabButtons[0].click();
        if (e.key === '2') tabButtons[1].click();
        if (e.key === '3') tabButtons[2].click();
        if (e.key === '4') tabButtons[3].click();
        if (e.key === '5') tabButtons[4].click();
        if (e.key === '6') tabButtons[5].click();
    });
    
    const artifactImages = document.querySelectorAll('.artifact-silhouette');
    artifactImages.forEach(svg => {
        svg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        svg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    const statBars = document.querySelectorAll('.stat-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    statBars.forEach(bar => observer.observe(bar));
});

const mainStyle = document.createElement('style');
mainStyle.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .artifact-card {
        transition: all 0.3s ease, border 0.2s ease;
    }
    
    .artifact-silhouette {
        transition: all 0.3s ease;
    }
    
    .stat-fill {
        transition: width 0.8s ease-out;
    }
`;
document.head.appendChild(mainStyle);