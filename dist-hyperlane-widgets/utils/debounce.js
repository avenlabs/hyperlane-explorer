import { useEffect, useState } from 'react';
// Based on https://usehooks.com/useDebounce
export function useDebounce(value, delayMs = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delayMs);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delayMs]);
    return debouncedValue;
}
//# sourceMappingURL=debounce.js.map