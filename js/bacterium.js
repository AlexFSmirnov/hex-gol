class Bacterium {
    constructor(x, y, race) {
        this.x = x;
        this.y = y;
        this.race = race;
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
        draw_hexagon(x, y, CELL_RADIUS / 10 * 9, races[this.race]);
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
}

function draw_hexagon(x, y, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    for (var i = 1; i <= 7; i++) {  // i <= 7: fix of the small gap on the top.
        var angle = ((90 - i * 60 + 360) % 360) / 180 * Math.PI;
        ctx.lineTo(x + Math.cos(angle) * radius, y - Math.sin(angle) * radius);
    }
    ctx.closePath();

    ctx.lineWidth = radius / 10;
    ctx.strokeStyle = BACKGROUND_COLOR;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.fill();
}

// Colors for races.
var races = {
    'dead': "#222",
    'red': "#F00",
    'green': "#0F0",
    'blue': "#00F",
    'cyan': "#0FF",
    'magenta':"#F0F",
    'yellow': "#FF0",
    'orange': "#FFA500",
};
