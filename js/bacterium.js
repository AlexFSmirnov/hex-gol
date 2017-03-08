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
