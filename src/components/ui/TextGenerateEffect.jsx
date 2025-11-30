import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

/**
 * Componente TextGenerateEffect - Muestra texto con efecto de escritura animada
 * @param {string} words - Texto a mostrar
 * @param {string} className - Clases CSS adicionales
 * @param {number} duration - Duración de la animación por carácter (en segundos)
 */
export const TextGenerateEffect = ({ words, className, duration = 0.1 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + words[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, duration * 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, words, duration]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [words]);

  return (
    <motion.span
      className={cn('inline-block', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
      {currentIndex < words.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-current ml-1"
        />
      )}
    </motion.span>
  );
};

