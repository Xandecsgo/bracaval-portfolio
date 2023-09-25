import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/ProcessusSlider.module.scss';

const ProcessusSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Ajoutez un état pour stocker la position de défilement horizontale actuelle
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mettez à jour la position de défilement horizontale actuelle lorsque le composant est monté
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const newScrollLeft = sliderRef.current.scrollLeft;
        setScrollLeft(newScrollLeft);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calcul de la diapositive actuelle en fonction de la position de défilement horizontale
  useEffect(() => {
    const slideWidth = sliderRef.current.clientWidth;
    const newSlide = Math.floor((scrollLeft + slideWidth / 2) / slideWidth);
    setCurrentSlide(newSlide);
  }, [scrollLeft]);

  const nextSlide = () => {
    const next = currentSlide + 1;
    setCurrentSlide(next >= slides.length ? 0 : next);
  };

  const prevSlide = () => {
    const prev = currentSlide - 1;
    setCurrentSlide(prev < 0 ? slides.length - 1 : prev);
  };

  return (
    <div className={styles.processusSlider}>
      <div
        className={styles.slidesContainer}
        ref={sliderRef}
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          scrollSnapType: 'x mandatory', // Ajoutez cette ligne pour activer le défilement horizontal fluide
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.textColumn}>
                <span className={styles.slideIndex}>{index + 1}</span>
              <h4>{slide.title}</h4>
              <p>{slide.description}</p>
            </div>
            <div className={styles.imageColumn}>
              <img src={slide.imageSrc} alt={slide.title} />
            </div>
          </div>
        ))}
      </div>
      <button className={styles.prevButton} onClick={prevSlide}>
        Précédent
      </button>
      <button className={styles.nextButton} onClick={nextSlide}>
        Suivant
      </button>
    </div>
  );
};

export default ProcessusSlider;
