class Bacterium {
    constructor(x, y, race) {
        this.x = x;
        this.y = y;
        this.race = race;
    }

    draw(grid_offset) {
        var x_offset = (this.y % 2) ? x_change : x_change / 2;
        var y_offset = CELL_RADIUS;
        var x = x_offset + this.x * x_change + grid_offset;
        var y = y_offset + this.y * y_change + grid_offset;
        draw_hexagon(x, y, CELL_RADIUS, CELL_RADIUS / 5, 
            races[this.race]['fill_color'],
            races[this.race]['outline_color']);
    }
}

function draw_hexagon(x, y, radius, line_width, fill_c, outline_c) {
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    for (var i = 1; i <= 7; i++) {  // i <= 7: fix of the small gap on the top.
        var angle = ((90 - i * 60 + 360) % 360) / 180 * Math.PI;
        ctx.lineTo(x + Math.cos(angle) * radius, y - Math.sin(angle) * radius);
    }
    ctx.closePath();

    ctx.lineWidth = line_width;
    ctx.fillStyle = fill_c;
    ctx.fill();
    ctx.strokeStyle = outline_c;
    ctx.stroke();
}

// Distance between centers of hexagons on the grid.
x_change = Math.sin(Math.PI / 3) * CELL_RADIUS * 2;
y_change = Math.cos(Math.PI / 3) * CELL_RADIUS + CELL_RADIUS;

// Colors for races.
var races = {
    'dead': {
        'outline_color': "#202020",
        'fill_color': "#101010"
    },
    'red': {
        'outline_color': "#FF0000",
        'fill_color': "#880000"
    }
};