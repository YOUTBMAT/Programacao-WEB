document.addEventListener('DOMContentLoaded', () => {
    const mapa = document.querySelector('.mapa');
    const links = Array.from(document.querySelectorAll('.mapa-link'));
    const canvasData = new Map();


    links.forEach(link => {
        const img = link.querySelector('img');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const tempImg = new Image();
        tempImg.crossOrigin = 'Anonymous';
        tempImg.src = img.src;

        tempImg.onload = () => {
            canvas.width = tempImg.naturalWidth;
            canvas.height = tempImg.naturalHeight;
            ctx.drawImage(tempImg, 0, 0);
            canvasData.set(link, { canvas, ctx });
        };
    });


    mapa.addEventListener('mousemove', (e) => {
        const rect = mapa.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        for (let i = links.length - 1; i >= 0; i--) {
            const link = links[i];
            const data = canvasData.get(link);

            if (!data) continue;

            const scaleX = data.canvas.width / rect.width;
            const scaleY = data.canvas.height / rect.height;

            const pixelX = Math.floor(mouseX * scaleX);
            const pixelY = Math.floor(mouseY * scaleY);

            const alpha = data.ctx.getImageData(pixelX, pixelY, 1, 1).data[3];

            // Se não for transparente (alpha > 10), ativa a região sob o cursor
            if (alpha > 10) {
                links.forEach(l => {
                    l.classList.remove('active-hover');
                    l.style.pointerEvents = 'none';
                });
                link.classList.add('active-hover');
                link.style.pointerEvents = 'auto';
                return;
            }
        }


        links.forEach(l => {
            l.classList.remove('active-hover');
            l.style.pointerEvents = 'none';
        });
    });
});