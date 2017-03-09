function main() {
    update_field();
    recalc_values();

    draw_field();
    adjust_window();
    setTimeout(main, 1000 / FPS);
}

function setup() {
    document.body.style.backgroundColor = BACKGROUND_COLOR;

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    setup_field();
    field = generate_field();

    main();
}

function setup_field() {
    var client_w = document.documentElement.clientWidth;
    var client_h = document.documentElement.clientHeight;

    // Trying to fill the screen with a specific amount of cells.
    // x_change, y_change - distances between cell's centers.
    var x_change = Math.cos(Math.PI / 6) * CELL_RADIUS * 2;
    var y_change = Math.sin(Math.PI / 6) * CELL_RADIUS + CELL_RADIUS;
    CELLS_W = client_w / x_change;
    CELLS_H = (client_h - CELL_RADIUS * 2) / y_change + 1;
    var coeff = Math.sqrt(CELL_AMOUNT) / Math.sqrt(CELLS_W * CELLS_H);
    CELLS_W = Math.floor(CELLS_W * coeff);
    CELLS_H = Math.floor(CELLS_H * coeff);

    // Resizing the canvas.
    canvas.width = CELLS_W * x_change;
    canvas.height = (CELLS_H - 1) * y_change + CELL_RADIUS * 2;

    // Adding offset.
    GLOBAL_OFFSET = x_change / 2;
    canvas.width += GLOBAL_OFFSET;
    canvas.height += GLOBAL_OFFSET;
}

function generate_field() {
    var field = [];
    for (var y = 0; y < CELLS_H; y++) {
        field[y] = [];
        for (var x = 0; x < CELLS_W - (y % 2); x++) {
            field[y][x] = new Cell(x, y, 
                ['dead', 'alive_1', 'alive_2'][randint(0, 2)]);
        }
    }
    return field;
}

function draw_field() {
    for (var y = 0; y < field.length; y++) {
        for (var x = 0; x < field[y].length; x++) {
            field[y][x].draw(GLOBAL_OFFSET / 2);
        }
    }
}

function update_field() {
    for (var y = 0; y < field.length; y++) {
        for (var x = 0; x < field[y].length; x++) {
            field[y][x].state = field[y][x].new_state;
        }
    }
}

function recalc_values() {
    for (var y = 0; y < field.length; y++) {
        for (var x = 0; x < field[y].length; x++) {
            field[y][x].recalc_value();
        }
    }
}

function adjust_window() {
    var c_w = document.documentElement.clientWidth;
    var c_h = document.documentElement.clientHeight;
    if (c_w / c_h > canvas.width / canvas.height) {
        document.getElementById("canvas").style = "height: " + c_h + "px";
    } else {
        document.getElementById("canvas").style = "width: " + c_w + "px";
    }
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
