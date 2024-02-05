const CANVAS_WIDTH = 327;
const CANVAS_HEIGHT = 450;

const CardCanvas = () => {
    let _canvas, _context;
    const image = new Image();

    const init = (canvas) => {
        _canvas = canvas;
        _context = _canvas.getContext('2d');
    }

    const setImage = (src) => {
        image.src = src;
    };

    const drawImage = () => {
        _context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    return {
        init,
        setImage,
        drawImage,
    }
};

export default CardCanvas;
