function main() {
    draw_field();

    adjust_window();
    setTimeout(main, 1000 / FPS);
}

function setup() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    setup_field();
    field = generate_field();

    main();
}

function setup_field() {
    var c_width = document.documentElement.clientWidth;
    var c_height = document.documentElement.clientHeight;

    // Trying to find correct cells rectangle, so that the amount of bacterias
    // and the window aspect ratio is not distorted very much.
    var coeff = Math.sqrt(c_width * c_height) / Math.sqrt(CELL_AMOUNT);
    CELLS_W = Math.floor(c_width / coeff);
    CELLS_H = Math.floor(c_height / coeff);

    // Resizing canvas
    var x_change = Math.sin(Math.PI / 3) * CELL_RADIUS * 2;
    var y_change = Math.cos(Math.PI / 3) * CELL_RADIUS + CELL_RADIUS;
    canvas.width = CELLS_W * x_change;
    canvas.height = (CELLS_H - 1) * y_change + CELL_RADIUS * 2;

    // Adding offset.
    canvas.width += GRID_OFFSET * 2;
    canvas.height += GRID_OFFSET * 2;
}

function generate_field() {
    var field = [];
    for (var y = 0; y < CELLS_H; y++) {
        field[y] = [];
        for (var x = 0; x < CELLS_W - (y % 2); x++) {
            field[y][x] = new Bacterium(x, y, 'dead');
        }
    }
    return field;
}

function draw_field() {
    for (var y = 0; y < field.length; y++) {
        for (var x = 0; x < field[y].length; x++) {
            field[y][x].draw(GRID_OFFSET);
        }
    }
}

function adjust_window() {
    var c_w = document.documentElement.clientWidth;
    var c_h = document.documentElement.clientHeight;
    if (c_w / c_h > CELLS_W / CELLS_H) {
        document.getElementById("canvas").style = "height: " + (c_h - 10) + "px";
    } else {
        document.getElementById("canvas").style = "width: " + (c_w - 10) + "px";
    }
}
