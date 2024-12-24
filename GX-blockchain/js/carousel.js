document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const carousel = document.querySelector('.shop-carousel');
    const carouselContainer = document.querySelector('.carousel-container');
    
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });
    class Carousel {
        constructor(container) {
            this.track = container.querySelector('.carousel-track');
            this.items = Array.from(container.querySelectorAll('.carousel-item'));
            this.currentIndex = 0;
            this.itemWidth = this.items[0].clientWidth;
            
            this.track.insertBefore(this.items[this.items.length - 1].cloneNode(true), this.items[0]);
            this.track.appendChild(this.items[0].cloneNode(true));
            
            this.updateTrackPosition();
        }
        updateTrackPosition() {
            const offset = -(this.currentIndex + 1) * this.itemWidth;
            this.track.style.transform = `translateX(${offset}px)`;
        }
        next() {
            this.currentIndex++;
            this.updateTrackPosition();
            if (this.currentIndex === this.items.length) {
                setTimeout(() => {
                    this.currentIndex = 0;
                    this.track.style.transition = 'none';
                    this.updateTrackPosition();                  
                    setTimeout(() => {
                        this.track.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        }
        prev() {
            this.currentIndex--;           
            this.updateTrackPosition();
            if (this.currentIndex === -1) {
                setTimeout(() => {
                    this.currentIndex = this.items.length - 1;
                    this.track.style.transition = 'none';
                    this.updateTrackPosition();                   
                    setTimeout(() => {
                        this.track.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        }
    }
prevButton.addEventListener('click', () => {
    carousel.prev();
});
nextButton.addEventListener('click', () => {
    carousel.next();
});
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = new Carousel(carouselContainer);

    // Example controls (you can customize these)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') carousel.next();
        if (e.key === 'ArrowLeft') carousel.prev();
    });
