function main() {

    adjust_window();
    setTimeout(main, 1000 / FPS);
}


function setup() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    setup_field();
    adjust_window();
    main();
}

function setup_field() {
    var c_width = document.documentElement.clientWidth;
    var c_height = document.documentElement.clientHeight;

    // Trying to find correct cells rectangle, so that the amount of bacterias
    // and the window aspect ratio is not distorted very much.
    var coeff = Math.sqrt(c_width * c_height) / Math.sqrt(BACTERIA_AMOUNT);
    CELLS_W = Math.floor(c_width / coeff);
    CELLS_H = Math.floor(c_height / coeff);

    // Resizing canvas
    canvas.width = CELLS_W * BACTERIA_RADIUS;
    canvas.height = CELLS_H * BACTERIA_RADIUS;
}

function adjust_window() {
    var c_width = document.documentElement.clientWidth;
    var c_height = document.documentElement.clientHeight;
    if (c_width / c_height > CELLS_W / CELLS_H) {
        document.getElementById("canvas").style = "height: " + c_height + "px";
    } else {
        document.getElementById("canvas").style = "width: " + c_width + "px";
    }
}
