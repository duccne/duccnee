const garden = document.getElementById('garden');
const seedButtons = document.querySelectorAll('.seed');
const clearBtn = document.getElementById('clear-btn');
const themeBtn = document.getElementById('theme-btn');

let currentFlower = '🌻';

// Xử lý chọn loại hoa
seedButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.seed.active').classList.remove('active');
        button.classList.add('active');
        currentFlower = button.getAttribute('data-flower');
    });
});

// Xử lý sự kiện trồng hoa (Click vào khu vườn)
garden.addEventListener('mousedown', function(event) {
    const x = event.clientX;
    const y = event.clientY - garden.getBoundingClientRect().top;

    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.innerText = currentFlower;

    // Căn giữa hoa vào đầu mũi tên chuột
    flower.style.left = (x - 20) + 'px';
    flower.style.top = (y - 40) + 'px'; 

    // Kích thước ngẫu nhiên tự nhiên
    const randomScale = 0.8 + Math.random() * 0.5;
    flower.style.fontSize = (40 * randomScale) + 'px';

    garden.appendChild(flower);
});

// Xử lý dọn vườn
clearBtn.addEventListener('click', () => {
    garden.innerHTML = ''; 
});

// Xử lý chuyển chế độ Ngày/Đêm
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
    if (document.body.classList.contains('night-mode')) {
        themeBtn.innerText = 'Đón Nắng ☀️';
    } else {
        themeBtn.innerText = 'Ngắm Trăng 🌙';
    }
});
