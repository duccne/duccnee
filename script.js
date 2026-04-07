const boardElement = document.getElementById('board');
const playerDisplay = document.getElementById('current-player');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

let board = ['', '', '', '', '', '', '', '', '']; // Mảng 9 phần tử lưu trạng thái bàn cờ
let currentPlayer = 'X';
let gameActive = true;

// Các trường hợp chiến thắng (theo chỉ số của mảng 0-8)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Hàng ngang
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Hàng dọc
    [0, 4, 8], [2, 4, 6]             // Chéo
];

// Khởi tạo bàn cờ
function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-index', index);
        cellElement.addEventListener('click', handleCellClick);
        boardElement.appendChild(cellElement);
    });
}

// Xử lý khi người chơi click vào 1 ô
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // Bỏ qua nếu ô đã được đánh hoặc game đã kết thúc
    if (board[index] !== '' || !gameActive) return;

    // Cập nhật dữ liệu
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkWin();
}

// Thuật toán kiểm tra thắng/thua
function checkWin() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `🎉 Người chơi <span style="color: ${currentPlayer === 'X' ? '#3498db' : '#e74c3c'}">${currentPlayer}</span> chiến thắng!`;
        gameActive = false;
        return;
    }

    // Kiểm tra hòa
    if (!board.includes('')) {
        statusDisplay.innerHTML = "🤝 Trò chơi hòa!";
        gameActive = false;
        return;
    }

    // Đổi lượt chơi
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.style.color = currentPlayer === 'X' ? '#3498db' : '#e74c3c';
}

// Chức năng reset game
resetBtn.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.innerHTML = 'Lượt của: <span id="current-player" style="color: #3498db">X</span>';
    playerDisplay.innerText = currentPlayer;
    createBoard();
});

// Chạy hàm tạo bàn cờ lần đầu tiên
createBoard();
