# Hexagonal Game of Life
Everybody knows the famous Conway's Game of Life. It is a simple cellular automaton with a few simple rules, which say when a cell must be born, or when it must die. These rules are enough to make cells do lots of interesting things like still lifes, oscillators or even moving gliders and spaseships *(you can see the simulation <a href="https://alexfsmirnov.github.io/GoL/">here</a>)*.

It uses a simple square grid that is not very interesting. So, <a href="https://alexfsmirnov.github.io/hex-gol/">here</a> you can see the Game of Life on the hexagonal grid.

## Rules
In this game, unlike the original one, each cell has 3 states - dead *(grey)*, half_dead *(dark orange)* and alive *(bright orange)*. I used the <a href="https://www.gamedev.net/blog/1389/entry-2261919-is-there-a-hexagonal-analog-of-conways-game-of-life/">rules</a> created by <a href="http://jwezorek.com/">**jwezorek**</a>, which say:
- Take the sum S of the 6-cell neighborhood where dead = 0, half_dead = 1, and alive = 2.
- If the cell is currently dead it comes to life as half_dead if S is exactly 4.
- If the cell is half_dead it goes to alive if S is 1 to 4 inclusive or is exactly 6.
- If the cell is alive it stays alive if S is 1 or 2 and goes to half_dead if S is 4.
- Otherwise it is dead in the next generation.
