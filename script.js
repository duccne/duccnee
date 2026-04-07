const homeScreen = document.getElementById('home-screen');
const appScreen = document.getElementById('app-screen');
const gameFrame = document.getElementById('game-frame');

// Hàm mở ứng dụng
function openApp(gameUrl) {
    // Đặt đường dẫn file game vào iframe
    gameFrame.src = gameUrl;
    
    // Thêm class 'active' cho màn hình App, gỡ khỏi màn hình Home
    homeScreen.classList.remove('active');
    appScreen.classList.add('active');
}

// Hàm đóng ứng dụng (Quay về trang chủ)
function closeApp() {
    // Trở về Home
    appScreen.classList.remove('active');
    homeScreen.classList.add('active');
    
    // Dọn dẹp iframe để game dừng chạy ngầm (tiết kiệm tài nguyên)
    setTimeout(() => {
        gameFrame.src = ''; 
    }, 400); // Chờ hiệu ứng CSS mờ đi rồi mới xóa src
}
