import { useState, useEffect } from 'react';

export default function useWindowSize() {
    const [winSize, setWinSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

    const resizeFn = (e) => {
        const { target } = e;
        changeSize(target);
    };

    const changeSize = (target) => {
        setWinSize({
            w: target.innerWidth,
            h: target.innerHeight,
        });
    };

    useEffect(() => {
        changeSize(window);

        window.addEventListener('resize', resizeFn);

        // return window.removeEventListener('resize', resizeFn);
    }, []);

    return winSize;
}
