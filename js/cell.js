class Cell {
    constructor(x, y, state) {
        this.x = x;
        this.y = y;
        this.state = state;
        this.recalc_value();
    }

    recalc_value() {
        this.value = {'dead': 0, 'alive_1': 1, 'alive_2': 2}[this.state];
    }

    draw(grid_offset) {
        // Distance between centers of hexagons on the grid.
        var x_change = Math.sin(Math.PI / 3) * CELL_RADIUS * 2;
        var y_change = Math.cos(Math.PI / 3) * CELL_RADIUS + CELL_RADIUS;
        // Offset from borders.
        var x_offset = (this.y % 2) ? x_change : x_change / 2;
        var y_offset = CELL_RADIUS;
        var x = x_offset + this.x * x_change + grid_offset;
        var y = y_offset + this.y * y_change + grid_offset;
        draw_hexagon(x, y, CELL_RADIUS * 0.9, STATES[this.state]);
    }

    get neighbours() {
        var x = this.x;
        var y = this.y;
        var neighbours = [  // + (y % 2): because of different lengths of rows.
            [x - 1 + (y % 2), y - 1],
            [x + (y % 2), y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1 + (y % 2), y + 1],
            [x + (y % 2), y + 1],
        ]
        // Puting coords into range. (e.g. CELLS_W -> 0, -1 -> CELLS_W - 1)
        for (var i = 0; i < 6; i++) {
            var cur_x = neighbours[i][0];
            var cur_y = neighbours[i][1];
            var cur_width = CELLS_W - ((cur_y + 2) % 2);  // y+2: fix -1 -> 1
            var cur_height = CELLS_H;
            neighbours[i][0] = (cur_x + cur_width) % cur_width; 
            neighbours[i][1] = (cur_y + cur_height) % cur_height;
        }
        return neighbours;
    }

    get sum() {
        var neighbours = this.neighbours;
        var sum = 0;
        for (var i = 0; i < neighbours.length; i++) {
            var x = neighbours[i][0];
            var y = neighbours[i][1];
            sum += field[y][x].value;
        }
        return sum;
    }

    get new_state() {
        var sum = this.sum;
        if (this.state == 'dead' && sum == 4) {
            return 'alive_1';
        } else if (this.state == 'alive_1' && 
            ((sum >= 1 && sum <= 4) || sum == 6)) {
            return 'alive_2';
        } else if (this.state == 'alive_2' && (sum == 1 || sum == 2)) {
            return 'alive_2';
        } else if (this.state == 'alive_2' && sum == 4) {
            return 'alive_1';
        } else {
            return 'dead';
        }
    }
}

function draw_hexagon(x, y, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x, y - radius);      // Going to the top point.
    for (var i = 1; i <= 7; i++) {  // i <= 7: fix of the small gap on the top.
        var angle = ((90 - i * 60 + 360) % 360) / 180 * Math.PI;
        ctx.lineTo(x + Math.cos(angle) * radius, y - Math.sin(angle) * radius);
    }
    ctx.closePath();

    // Idk why, but this makes hexagons look smoother.
    ctx.lineWidth = radius * 0.1;
    ctx.strokeStyle = BACKGROUND_COLOR;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.fill();
}
