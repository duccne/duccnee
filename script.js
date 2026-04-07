const farmElement = document.getElementById('farm');
const tools = document.querySelectorAll('.tool');
let currentAction = 'seed';

// Mảng chứa dữ liệu của 9 ô đất
let farmData = Array.from({ length: 9 }, () => ({
    planted: false,
    water: 0,      // Mức nước (0 - 100)
    growth: 0      // Mức sinh trưởng (0 - 100)
}));

// Xử lý chọn công cụ
tools.forEach(tool => {
    tool.addEventListener('click', () => {
        document.querySelector('.tool.active').classList.remove('active');
        tool.classList.add('active');
        currentAction = tool.getAttribute('data-action');
    });
});

// Khởi tạo 9 ô đất trên giao diện
function initFarm() {
    farmElement.innerHTML = '';
    farmData.forEach((patch, index) => {
        const patchDiv = document.createElement('div');
        patchDiv.className = 'patch dry';
        patchDiv.setAttribute('data-index', index);
        
        // Thẻ chứa hình ảnh cây
        const plantDiv = document.createElement('div');
        plantDiv.className = 'plant';
        
        // Thanh nước
        const waterBarBg = document.createElement('div');
        waterBarBg.className = 'water-bar-bg';
        const waterLevel = document.createElement('div');
        waterLevel.className = 'water-level';
        waterBarBg.appendChild(waterLevel);

        patchDiv.appendChild(plantDiv);
        patchDiv.appendChild(waterBarBg);
        
        // Bắt sự kiện click vào ô đất
        patchDiv.addEventListener('click', () => handleInteract(index));
        
        farmElement.appendChild(patchDiv);
    });
}

// Xử lý khi click vào ô đất bằng các công cụ khác nhau
function handleInteract(index) {
    let patch = farmData[index];

    if (currentAction === 'seed' && !patch.planted) {
        // Gieo hạt
        patch.planted = true;
        patch.growth = 0;
        patch.water = 20; // Đất có sẵn tí nước khi gieo
    } 
    else if (currentAction === 'water' && patch.planted) {
        // Tưới nước
        patch.water += 40;
        if (patch.water > 100) patch.water = 100;
    } 
    else if (currentAction === 'fertilizer' && patch.planted) {
        // Bón phân (Cây lớn nhanh ngay lập tức)
        patch.growth += 30;
        if (patch.growth > 100) patch.growth = 100;
    } 
    else if (currentAction === 'harvest' && patch.growth >= 100) {
        // Thu hoạch cây đã lớn tối đa
        patch.planted = false;
        patch.growth = 0;
        patch.water = 0;
    }

    updateUI();
}

// Hàm cập nhật Giao diện dựa trên Dữ liệu (State)
function updateUI() {
    const patchDivs = document.querySelectorAll('.patch');
    
    farmData.forEach((patch, index) => {
        const div = patchDivs[index];
        const plantDiv = div.querySelector('.plant');
        const waterBg = div.querySelector('.water-bar-bg');
        const waterLvl = div.querySelector('.water-level');

        // Cập nhật màu đất (khô/ẩm)
        if (patch.water > 0) div.classList.remove('dry');
        else div.classList.add('dry');

        if (patch.planted) {
            waterBg.style.display = 'block';
            waterLvl.style.width = patch.water + '%';

            // Đổi hình dáng cây theo phần trăm sinh trưởng
            if (patch.growth < 20) plantDiv.innerText = '🌱'; // Mầm
            else if (patch.growth < 60) plantDiv.innerText = '🌿'; // Cây non
            else if (patch.growth < 100) plantDiv.innerText = '🪴'; // Nụ
            else plantDiv.innerText = '🌻'; // Hoa
            
            // Nếu thiếu nước quá lâu, cây hơi héo (mờ đi)
            if (patch.water === 0 && patch.growth < 100) {
                plantDiv.style.opacity = '0.5';
            } else {
                plantDiv.style.opacity = '1';
            }
        } else {
            waterBg.style.display = 'none';
            plantDiv.innerText = '';
        }
    });
}

// GAME LOOP: Vòng lặp thời gian (Chạy mỗi 1 giây)
setInterval(() => {
    farmData.forEach(patch => {
        if (patch.planted) {
            // Nước bốc hơi dần theo thời gian
            patch.water -= 5;
            if (patch.water < 0) patch.water = 0;

            // Nếu cây chưa lớn hẳn và đất đang có nước -> Cây lớn lên
            if (patch.growth < 100 && patch.water > 0) {
                patch.growth += 5; 
                if (patch.growth > 100) patch.growth = 100;
            }
        }
    });
    
    updateUI(); // Cập nhật lại màn hình sau mỗi giây
}, 1000);

// Chạy lần đầu tiên
initFarm();
updateUI();
