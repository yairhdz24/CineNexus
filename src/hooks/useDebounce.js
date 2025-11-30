import { useState, useEffect } from 'react';

/**
 * Hook personalizado para implementar debounce en valores
 * Retrasa la actualización del valor hasta que no haya cambios durante el tiempo especificado
 * Útil para optimizar búsquedas y evitar múltiples llamadas a la API
 * @param {any} value - Valor a aplicar debounce
 * @param {number} delay - Tiempo de espera en milisegundos
 * @returns {any} Valor con debounce aplicado
 */
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
