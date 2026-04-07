// Trỏ tới các thành phần HTML
const gameWindow = document.getElementById('game-window');
const gameFrame = document.getElementById('game-frame');
const windowName = document.getElementById('window-name');
const windowIcon = document.getElementById('window-icon');
const taskbarApps = document.getElementById('taskbar-apps');

// Hàm Mở Cửa Sổ Game
function openGame(name, url, icon) {
    // 1. Cập nhật tiêu đề cửa sổ
    windowName.innerText = name;
    windowIcon.innerText = icon;
    
    // 2. Tải file game vào iframe
    gameFrame.src = url;
    
    // 3. Hiển thị cửa sổ
    gameWindow.classList.remove('hidden');
    
    // 4. Báo hiệu trên thanh Taskbar
    taskbarApps.innerHTML = `<div class="active-app">${icon} ${name}</div>`;
}

// Hàm Đóng Cửa Sổ Game
function closeGame() {
    // 1. Ẩn cửa sổ
    gameWindow.classList.add('hidden');
    
    // 2. Xóa iframe (tránh game vẫn phát nhạc hoặc chạy ngầm gây lag)
    gameFrame.src = ''; 
    
    // 3. Xóa thông báo trên Taskbar
    taskbarApps.innerHTML = ''; 
}

// --- TẠO ĐỒNG HỒ CHO TASKBAR ---
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // Chuyển sang định dạng 12 giờ (AM/PM)
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Nếu giờ là 0 thì đổi thành 12
    
    // Thêm số 0 đằng trước nếu phút bé hơn 10 (vd: 09)
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    document.getElementById('clock').innerText = `${hours}:${minutes} ${ampm}`;
}

// Cho đồng hồ chạy mỗi 1 giây (1000 milliseconds)
setInterval(updateClock, 1000);

// Gọi hàm lần đầu để hiện giờ ngay lập tức
updateClock();
