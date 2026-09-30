import { createCursorEngine } from "./cursorEngine";

// Pass in the pupil elements selected in the component.
export function attachEyeTracking(pupils) {
    const eyes = Array.from(pupils)
        .map((pupil) => ({ eye: pupil.parentElement, pupil }))
        .filter(({ eye }) => eye !== null);

    if (eyes.length === 0) return;

    const cursor = createCursorEngine();

    cursor.subscribe(({ targetX, targetY, dt, idle }) => {
        // The initial subscription is synchronous; wait for the first animation frame.
        if (dt === 0) return;

        const positions = eyes.map(({ eye, pupil }) => {
            const bounds = eye.getBoundingClientRect();
            const dx = targetX - (bounds.left + bounds.width / 2);
            const dy = targetY - (bounds.top + bounds.height / 2);
            const distance = Math.hypot(dx, dy);

            // Leave room for the whole pupil inside the circular eye.
            const radius = Math.max(0, Math.min(
                (bounds.width - pupil.offsetWidth) / 2,
                (bounds.height - pupil.offsetHeight) / 2,
            ));
            const scale = distance > 0 ? Math.min(1, radius / distance) : 0;
            return { pupil, x: dx * scale, y: dy * scale };
        });

        // Read all eye measurements before writing styles to avoid repeated layout work.
        for (const { pupil, x, y } of positions) {
            pupil.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        }

        if (idle) cursor.requestStop();
    });

    return () => cursor.destroy();
}
