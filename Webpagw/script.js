document.addEventListener('DOMContentLoaded', () => {
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadSection = document.getElementById('uploadSection');
    const uploadForm = document.getElementById('uploadForm');
    const mediaInput = document.getElementById('mediaInput');
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.querySelector('.close');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Toggle upload section
    uploadBtn.addEventListener('click', () => {
        uploadSection.style.display = uploadSection.style.display === 'none' ? 'block' : 'none';
    });

    // Handle file upload
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const files = mediaInput.files;
        
        for (let file of files) {
            const reader = new FileReader();
            const mediaItem = document.createElement('div');
            mediaItem.className = 'media-item';
            
            reader.onload = (e) => {
                if (file.type.startsWith('image/')) {
                    mediaItem.innerHTML = `<img src="${e.target.result}" alt="${file.name}">`;
                    mediaItem.dataset.type = 'photos';
                } else if (file.type.startsWith('video/')) {
                    mediaItem.innerHTML = `
                        <video>
                            <source src="${e.target.result}" type="${file.type}">
                        </video>`;
                    mediaItem.dataset.type = 'videos';
                }
                
                gallery.appendChild(mediaItem);
                
                // Add click event to open modal
                mediaItem.addEventListener('click', () => {
                    const media = mediaItem.querySelector('img, video');
                    if (media.tagName === 'IMG') {
                        modalImage.src = media.src;
                        modalImage.style.display = 'block';
                        modalVideo.style.display = 'none';
                    } else {
                        modalVideo.querySelector('source').src = media.querySelector('source').src;
                        modalVideo.style.display = 'block';
                        modalImage.style.display = 'none';
                    }
                    modal.style.display = 'block';
                });
            };
            
            reader.readAsDataURL(file);
        }
        
        // Reset form
        uploadForm.reset();
        uploadSection.style.display = 'none';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalVideo.pause();
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalVideo.pause();
        }
    });

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const mediaItems = document.querySelectorAll('.media-item');
            
            mediaItems.forEach(item => {
                if (filter === 'all' || item.dataset.type === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}); 