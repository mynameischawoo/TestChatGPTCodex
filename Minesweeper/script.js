const boardElement = document.getElementById('board');
const mineCounterElement = document.getElementById('mineCounter');
const timerElement = document.getElementById('timer');
const statusEmoji = document.getElementById('statusEmoji');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const minesInput = document.getElementById('minesInput');
const newGameButton = document.getElementById('newGameButton');

let board = [];
let width = 10;
let height = 10;
let mineCount = 15;
let firstReveal = true;
let revealedTiles = 0;
let flaggedTiles = 0;
let timerId = null;
let startTimestamp = null;

function clampMines(value, maxCells) {
    return Math.max(1, Math.min(value, Math.floor(maxCells * 0.6)));
}

function setupGame() {
    width = Number(widthInput.value) || 10;
    height = Number(heightInput.value) || 10;
    mineCount = clampMines(Number(minesInput.value) || 10, width * height);
    minesInput.value = mineCount;

    board = createEmptyBoard(width, height);
    boardElement.style.gridTemplateColumns = `repeat(${width}, var(--grid-size))`;
    boardElement.innerHTML = '';

    board.forEach((row, y) => {
        row.forEach((tile, x) => {
            const tileElement = document.createElement('button');
            tileElement.className = 'tile hidden';
            tileElement.dataset.x = String(x);
            tileElement.dataset.y = String(y);
            tile.element = tileElement;
            boardElement.appendChild(tileElement);
        });
    });

    resetGameState();
}

function resetGameState() {
    firstReveal = true;
    revealedTiles = 0;
    flaggedTiles = 0;
    startTimestamp = null;
    clearInterval(timerId);
    timerId = null;
    timerElement.textContent = '0';
    mineCounterElement.textContent = String(mineCount - flaggedTiles);
    updateStatus('😊');
}

function createEmptyBoard(width, height) {
    return Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => ({
            x,
            y,
            hasMine: false,
            revealed: false,
            flagged: false,
            adjacentMines: 0,
            element: null,
        }))
    );
}

function placeMines(excludeX, excludeY) {
    const cells = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (x === excludeX && y === excludeY) continue;
            cells.push(board[y][x]);
        }
    }

    shuffle(cells);

    cells.slice(0, mineCount).forEach((tile) => {
        tile.hasMine = true;
    });

    board.forEach((row) => {
        row.forEach((tile) => {
            tile.adjacentMines = getNeighbors(tile).filter((neighbor) => neighbor.hasMine).length;
        });
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getNeighbors(tile) {
    const neighbors = [];
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = tile.x + dx;
            const ny = tile.y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                neighbors.push(board[ny][nx]);
            }
        }
    }
    return neighbors;
}

function startTimer() {
    if (timerId) return;
    startTimestamp = Date.now();
    timerId = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTimestamp) / 1000);
        timerElement.textContent = String(seconds);
    }, 1000);
}

function revealTile(tileElement) {
    const x = Number(tileElement.dataset.x);
    const y = Number(tileElement.dataset.y);
    const tile = board[y][x];

    if (tile.revealed || tile.flagged) return;

    if (firstReveal) {
        placeMines(tile.x, tile.y);
        firstReveal = false;
        startTimer();
    }

    if (tile.hasMine) {
        handleGameOver(tile);
        return;
    }

    floodReveal(tile);
    checkWinCondition();
}

function floodReveal(startTile) {
    const stack = [startTile];
    while (stack.length > 0) {
        const tile = stack.pop();
        if (tile.revealed || tile.flagged) continue;
        tile.revealed = true;
        revealedTiles += 1;
        tile.element.classList.remove('hidden');
        tile.element.classList.add('revealed');
        tile.element.disabled = true;

        if (tile.adjacentMines > 0) {
            tile.element.dataset.number = tile.adjacentMines;
            tile.element.textContent = tile.adjacentMines;
        } else {
            tile.element.dataset.number = '0';
            getNeighbors(tile).forEach((neighbor) => {
                if (!neighbor.revealed && !neighbor.flagged && !neighbor.hasMine) {
                    stack.push(neighbor);
                }
            });
        }
    }
}

function toggleFlag(tileElement) {
    const x = Number(tileElement.dataset.x);
    const y = Number(tileElement.dataset.y);
    const tile = board[y][x];

    if (tile.revealed) return;

    tile.flagged = !tile.flagged;
    tileElement.classList.toggle('flagged', tile.flagged);
    flaggedTiles += tile.flagged ? 1 : -1;
    mineCounterElement.textContent = String(mineCount - flaggedTiles);
}

function handleGameOver(triggeredTile) {
    stopTimer();
    updateStatus('😵');

    board.forEach((row) => {
        row.forEach((tile) => {
            tile.element.disabled = true;
            if (tile.hasMine) {
                tile.element.classList.add('mine');
            }
        });
    });

    triggeredTile.element.classList.add('mine');
}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function checkWinCondition() {
    if (revealedTiles === width * height - mineCount) {
        updateStatus('😎');
        stopTimer();
        board.forEach((row) =>
            row.forEach((tile) => {
                if (!tile.revealed) {
                    tile.flagged = tile.hasMine;
                    tile.element.classList.toggle('flagged', tile.hasMine);
                }
                tile.element.disabled = true;
            })
        );
    }
}

function updateStatus(emoji) {
    statusEmoji.textContent = emoji;
}

function handlePointerDown(event) {
    const tileElement = event.target.closest('.tile');
    if (!tileElement) return;

    if (event.pointerType === 'touch') {
        event.preventDefault();
        let longPressTriggered = false;
        const pointerId = event.pointerId;
        const longPressTimeout = setTimeout(() => {
            toggleFlag(tileElement);
            longPressTriggered = true;
        }, 500);

        const pointerUp = (upEvent) => {
            if (upEvent.pointerId !== pointerId) {
                return;
            }
            clearTimeout(longPressTimeout);
            window.removeEventListener('pointerup', pointerUp, true);
            window.removeEventListener('pointercancel', pointerUp, true);
            if (!longPressTriggered && upEvent.target.closest('.tile') === tileElement) {
                revealTile(tileElement);
            }
        };

        window.addEventListener('pointerup', pointerUp, true);
        window.addEventListener('pointercancel', pointerUp, true);
    } else {
        if (event.button === 2 || event.ctrlKey) {
            toggleFlag(tileElement);
        } else if (event.button === 0) {
            revealTile(tileElement);
        }
    }
}

boardElement.addEventListener('contextmenu', (event) => event.preventDefault());
boardElement.addEventListener('pointerdown', handlePointerDown);
newGameButton.addEventListener('click', () => setupGame());

setupGame();
