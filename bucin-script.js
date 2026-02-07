document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const heartsContainer = document.getElementById('hearts-container');
    const lovePercent = document.getElementById('lovePercent');
    const meterFill = document.getElementById('meterFill');
    const boostLoveBtn = document.getElementById('boostLove');
    const messageBox = document.getElementById('messageBox');
    const newMessageBtn = document.getElementById('newMessage');
    const copyMessageBtn = document.getElementById('copyMessage');
    const sendMessageBtn = document.getElementById('sendMessage');
    const toolBtns = document.querySelectorAll('.tool-btn');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownDateInput = document.getElementById('countdownDate');
    const setCountdownBtn = document.getElementById('setCountdown');
    const resetCountdownBtn = document.getElementById('resetCountdown');
    const addMemoryBtn = document.getElementById('addMemory');
    const secretCodeInput = document.getElementById('secretCode');
    const decodeBtn = document.getElementById('decodeBtn');
    const codeOutput = document.getElementById('codeOutput');
    const generateCodeBtn = document.getElementById('generateCode');
    const musicTitle = document.getElementById('musicTitle');
    const musicArtist = document.getElementById('musicArtist');
    const musicProgress = document.getElementById('musicProgress');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseResult = document.getElementById('surpriseResult');
    const resetAllBtn = document.getElementById('resetAll');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const bgMusic = document.getElementById('bgMusic');
    const soundClick = document.getElementById('soundClick');
    const soundSuccess = document.getElementById('soundSuccess');
    
    // State
    let loveLevel = 100;
    let countdownDate = localStorage.getItem('countdownDate') || '2024-12-31';
    let currentSong = 1;
    let isPlaying = false;
    let isMuted = false;
    
    // Initialize
    initHearts();
    updateLoveMeter();
    setCountdown();
    startCountdown();
    updateMusicInfo();
    
    // Set default countdown date (next month)
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    countdownDateInput.value = nextMonth.toISOString().split('T')[0];
    
    // Background Hearts Animation
    function initHearts() {
        for (let i = 0; i < 50; i++) {
            createHeart();
        }
        setInterval(createHeart, 500);
    }
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }
    
    // Love Meter Functions
    function updateLoveMeter() {
        meterFill.style.width = loveLevel + '%';
        lovePercent.textContent = loveLevel + '%';
        
        if (loveLevel > 100) loveLevel = 100;
        if (loveLevel < 0) loveLevel = 0;
        
        // Color change based on level
        if (loveLevel > 70) {
            meterFill.style.background = 'linear-gradient(90deg, #ff4081, #ff80ab)';
        } else if (loveLevel > 30) {
            meterFill.style.background = 'linear-gradient(90deg, #ff9800, #ffb74d)';
        } else {
            meterFill.style.background = 'linear-gradient(90deg, #f44336, #ef5350)';
        }
    }
    
    boostLoveBtn.addEventListener('click', function() {
        playSound(soundClick);
        loveLevel += Math.floor(Math.random() * 10) + 5;
        updateLoveMeter();
        
        // Add floating heart
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.fontSize = '30px';
        heart.style.left = boostLoveBtn.getBoundingClientRect().left + 'px';
        heart.style.top = boostLoveBtn.getBoundingClientRect().top + 'px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        document.body.appendChild(heart);
        
        // Animate
        animateFloat(heart);
        
        showNotification('Love boosted! 💝', 'success');
    });
    
    function animateFloat(element) {
        let posY = parseFloat(element.style.top);
        let opacity = 1;
        
        const floatInterval = setInterval(() => {
            posY -= 2;
            opacity -= 0.02;
            element.style.top = posY + 'px';
            element.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(floatInterval);
                element.remove();
            }
        }, 20);
    }
    
    // Love Messages
    const loveMessages = [
        "Kamu adalah mimpi indah yang tak ingin kubangunkan.",
        "Jika cinta itu bisa diukur, milikku padamu tak terhingga.",
        "Dunia ini lebih berwarna sejak kamu hadir di hidupku.",
        "Setiap detik bersamamu adalah halaman terindah dalam buku hidupku.",
        "Kamu bukan hanya cinta, kamu adalah rumah bagi jiwaku.",
        "Matahari saja iri dengan senyummu yang cerah.",
        "Jika aku harus memilih antara kamu dan oksigen, aku akan mengambil napas terakhirku sambil menyebut namamu.",
        "Cintaku padamu seperti matematika: kompleks, tak terbatas, dan tak terbantahkan.",
        "Kamu adalah alasan mengapa aku percaya pada takdir.",
        "Bahkan algoritma tercanggih tak bisa menghitung seberapa besar cintaku padamu.",
        "Kamu seperti WiFi: tak terlihat tapi membuat hidupku terhubung dengan kebahagiaan.",
        "Aku tak butuh bintang di langit, karena aku sudah punya kamu sebagai bintang di hidupku.",
        "Cintaku padamu lebih kuat dari kode terenkripsi manapun.",
        "Kamu adalah bug yang tak pernah ingin kuperbaiki.",
        "Seandainya aku bisa koding cinta, aku akan buat infinite loop yang selalu kembali padamu."
    ];
    
    function getRandomMessage() {
        return loveMessages[Math.floor(Math.random() * loveMessages.length)];
    }
    
    newMessageBtn.addEventListener('click', function() {
        playSound(soundClick);
        messageBox.textContent = '"' + getRandomMessage() + '"';
        messageBox.style.animation = 'none';
        setTimeout(() => {
            messageBox.style.animation = 'fadeIn 0.5s';
        }, 10);
    });
    
    copyMessageBtn.addEventListener('click', function() {
        playSound(soundClick);
        navigator.clipboard.writeText(messageBox.textContent)
            .then(() => {
                showNotification('Pesan disalin! 📋', 'success');
            })
            .catch(err => {
                showNotification('Gagal menyalin', 'error');
            });
    });
    
    sendMessageBtn.addEventListener('click', function() {
        playSound(soundSuccess);
        const message = messageBox.textContent;
        const url = `https://wa.me/?text=${encodeURIComponent(message + " ❤️")}`;
        
        // Try to open WhatsApp
        window.open(url, '_blank');
        showNotification('Membuka WhatsApp... 📱', 'info');
    });
    
    // Tool Buttons
    toolBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            playSound(soundClick);
            const tool = this.getAttribute('data-tool');
            
            switch(tool) {
                case 'surat':
                    showModal('💌 Surat Cinta', generateLoveLetter());
                    break;
                case 'puisi':
                    showModal('📜 Puisi Cinta', generatePoem());
                    break;
                case 'foto':
                    showModal('📸 Album Foto Virtual', generateGallery());
                    break;
                case 'musik':
                    toggleMusic();
                    break;
                case 'kode':
                    showModal('🔐 Kode Rahasia', generateSecretCodeInfo());
                    break;
                case 'quiz':
                    startLoveQuiz();
                    break;
            }
        });
    });
    
    function generateLoveLetter() {
        const templates = [
            `Sayangku tersayang,<br><br>
            Hari ini, seperti setiap hari, aku terbangun dengan senyuman karena memikirkanmu. 
            Kamu adalah matahari yang menyinari hari-hariku, bulan yang menerangi malamku, 
            dan bintang yang menuntun langkahku.<br><br>
            Aku berjanji akan selalu ada untukmu, dalam suka dan duka. 
            Cintaku padamu takkan pernah pudar oleh waktu.<br><br>
            Dengan cinta yang tak terhingga,<br>
            <i>Yang selalu mencintaimu</i>`,
            
            `Untuk kekasihku,<br><br>
            Jika cinta adalah bahasa, maka aku ingin fasih berbicara tentangmu. 
            Jika cinta adalah musik, maka aku ingin menyanyikan symphony untukmu. 
            Jika cinta adalah seni, maka aku ingin melukis masterpiece tentangmu.<br><br>
            Kamu adalah segalanya yang tak pernah kuduga tapi selalu kuharapkan.<br><br>
            Selamanya milikmu,<br>
            <i>Pujaan hatimu</i>`
        ];
        
        return templates[Math.floor(Math.random() * templates.length)];
    }
    
    function generatePoem() {
        const poems = [
            `Di antara bintang-bintang yang bertebaran<br>
            Hanya namamu yang terus berkedipan<br>
            Seperti kode dalam program kehidupan<br>
            Kamu adalah fungsi paling sempurna<br><br>
            <em>- Untukmu, kekasihku</em>`,
            
            `Cinta itu seperti binary<br>
            Hanya ada 0 dan 1<br>
            0 tanpamu<br>
            1 bersamamu<br>
            Dan aku memilih 1 selamanya<br><br>
            <em>- Algorithm of Love</em>`
        ];
        
        return poems[Math.floor(Math.random() * poems.length)];
    }
    
    function generateGallery() {
        return `
            <div style="text-align: center;">
                <h3>Kenangan Virtual Kita 💖</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
                    <div style="background: #ffcccc; padding: 20px; border-radius: 10px;">
                        <i class="fas fa-heart" style="font-size: 2rem; color: #ff4081;"></i>
                        <p>Pertama Jadian</p>
                    </div>
                    <div style="background: #ccffcc; padding: 20px; border-radius: 10px;">
                        <i class="fas fa-star" style="font-size: 2rem; color: #ffd700;"></i>
                        <p>Date Spesial</p>
                    </div>
                    <div style="background: #ccccff; padding: 20px; border-radius: 10px;">
                        <i class="fas fa-gift" style="font-size: 2rem; color: #7e57c2;"></i>
                        <p>Hadiah Pertama</p>
                    </div>
                    <div style="background: #ffffcc; padding: 20px; border-radius: 10px;">
                        <i class="fas fa-umbrella-beach" style="font-size: 2rem; color: #00bcd4;"></i>
                        <p>Liburan Impian</p>
                    </div>
                </div>
                <button id="addPhotoBtn" style="padding: 10px 20px; background: #ff4081; color: white; border: none; border-radius: 10px; cursor: pointer;">
                    <i class="fas fa-plus"></i> Tambah Foto Kenangan
                </button>
            </div>
        `;
    }
    
    // Countdown Timer
    function setCountdown() {
        countdownDateInput.value = countdownDate;
    }
    
    function startCountdown() {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    function updateCountdown() {
        const targetDate = new Date(countdownDate + 'T23:59:59').getTime();
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    setCountdownBtn.addEventListener('click', function() {
        playSound(soundClick);
        if (countdownDateInput.value) {
            countdownDate = countdownDateInput.value;
            localStorage.setItem('countdownDate', countdownDate);
            showNotification('Countdown diperbarui! 🗓️', 'success');
            updateCountdown();
        }
    });
    
    resetCountdownBtn.addEventListener('click', function() {
        playSound(soundClick);
        countdownDateInput.value = '';
        countdownDate = new Date().toISOString().split('T')[0];
        localStorage.removeItem('countdownDate');
        showNotification('Countdown direset! ⏰', 'info');
    });
    
    // Add Memory
    addMemoryBtn.addEventListener('click', function() {
        playSound(soundClick);
        const memories = [
            "Pertama kali kita video call",
            "Saat kamu membuatkan aku makanan",
            "Ketika kita jalan-jalan tengah malam",
            "Momen kita foto bersama pertama kali",
            "Saat kamu memberikan kejutan"
        ];
        
        const randomMemory = memories[Math.floor(Math.random() * memories.length)];
        showNotification(`Kenangan ditambahkan: "${randomMemory}" 📸`, 'success');
    });
    
    // Secret Code
    const secretCodes = {
        'CINTA123': '💖 Pesan rahasia: Aku selalu memikirkanmu setiap detik!',
        'AKUCINTAKAMU': '❤️ Kejutan: Check your WhatsApp for special message!',
        'RNYYLOVE': '✨ Special: You are the most beautiful person in my world!',
        'BUCIN2024': '🎁 Bonus: Love level +20%!',
        'TERIMAKASIH': '🙏 Kamu adalah berkah terbesar dalam hidupku.'
    };
    
    decodeBtn.addEventListener('click', function() {
        playSound(soundClick);
        const code = secretCodeInput.value.trim().toUpperCase();
        
        if (secretCodes[code]) {
            codeOutput.innerHTML = `<span style="color: #ff4081; font-weight: bold;">${secretCodes[code]}</span>`;
            if (code === 'BUCIN2024') {
                loveLevel += 20;
                updateLoveMeter();
            }
            showNotification('Kode berhasil di-decode! 🔓', 'success');
        } else {
            codeOutput.textContent = 'Kode tidak valid. Coba: CINTA123, AKUCINTAKAMU, RNYYLOVE';
            showNotification('Kode salah! ❌', 'error');
        }
    });
    
    generateCodeBtn.addEventListener('click', function() {
        playSound(soundClick);
        const code = generateRandomCode();
        codeOutput.innerHTML = `Kode cintamu: <span style="color: #ff4081; font-weight: bold; font-family: monospace;">${code}</span><br>
                                Berikan kode ini ke pacarmu!`;
        showNotification('Kode cinta dibuat! 🔐', 'success');
    });
    
    function generateRandomCode() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let code = '';
        
        for (let i = 0; i < 6; i++) {
            code += letters[Math.floor(Math.random() * letters.length)];
        }
        for (let i = 0; i < 3; i++) {
            code += numbers[Math.floor(Math.random() * numbers.length)];
        }
        
        return code;
    }
    
    // Music Player
    const songs = [
        { title: 'My Love - Untuk Kamu', artist: 'Sound of Heart', color: '#ff4081' },
        { title: 'Bintang - Romeo & Juliet', artist: 'Orchestra Cinta', color: '#7e57c2' },
        { title: 'Bulan - Soundtrack Cinta', artist: 'Melody Romantis', color: '#2196f3' }
    ];
    
    function updateMusicInfo() {
        const song = songs[currentSong - 1];
        musicTitle.textContent = song.title;
        musicArtist.textContent = song.artist;
        document.querySelector('.music-cover').style.background = `linear-gradient(135deg, ${song.color}, ${song.color}99)`;
        
        // Update playlist active state
        playlistItems.forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.getAttribute('data-song')) === currentSong) {
                item.classList.add('active');
            }
        });
    }
    
    function toggleMusic() {
        playSound(soundClick);
        if (isPlaying) {
            bgMusic.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            showNotification('Music paused ⏸️', 'info');
        } else {
            bgMusic.play().catch(e => {
                showNotification('Click play button to start music ▶️', 'info');
            });
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            showNotification('Playing romantic music 🎵', 'success');
        }
        isPlaying = !isPlaying;
    }
    
    playBtn.addEventListener('click', toggleMusic);
    
    prevBtn.addEventListener('click', function() {
        playSound(soundClick);
        currentSong = currentSong > 1 ? currentSong - 1 : songs.length;
        updateMusicInfo();
        showNotification(`Now playing: ${songs[currentSong - 1].title} ⏮️`, 'info');
    });
    
    nextBtn.addEventListener('click', function() {
        playSound(soundClick);
        currentSong = currentSong < songs.length ? currentSong + 1 : 1;
        updateMusicInfo();
        showNotification(`Now playing: ${songs[currentSong - 1].title} ⏭️`, 'info');
    });
    
    volumeBtn.addEventListener('click', function() {
        playSound(soundClick);
        isMuted = !isMuted;
        bgMusic.volume = isMuted ? 0 : 1;
        this.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        showNotification(isMuted ? 'Sound muted 🔇' : 'Sound on 🔊', 'info');
    });
    
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            playSound(soundClick);
            currentSong = parseInt(this.getAttribute('data-song'));
            updateMusicInfo();
            showNotification(`Selected: ${songs[currentSong - 1].title} 🎶`, 'info');
        });
    });
    
    // Simulate music progress
    setInterval(() => {
        if (isPlaying) {
            const progress = Math.random() * 100;
            musicProgress.style.width = progress + '%';
        }
    }, 1000);
    
    // Surprise Button
    const surprises = [
        "💖 Kamu mendapatkan virtual hug dari pacarmu!",
        "🎁 Ada hadiah spesial menunggumu besok!",
        "✨ Kamu adalah orang terbaik di dunia ini!",
        "🌟 Bintang-bintang malam ini bersinar untukmu!",
        "💌 Cek emailmu, ada surat cinta virtual!",
        "📱 Pacarmu sedang memikirkanmu saat ini!",
        "🌸 Musim semi akan datang lebih awal untukmu!",
        "🍫 Virtual chocolate telah dikirimkan!",
        "🎵 Lagu cinta spesial sedang dibuat untukmu!",
        "💫 Kejutan nyata sedang dipersiapkan!"
    ];
    
    surpriseBtn.addEventListener('click', function() {
        playSound(soundSuccess);
        
        // Button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Generate random surprise
        const surprise = surprises[Math.floor(Math.random() * surprises.length)];
        surpriseResult.innerHTML = `
            <div style="animation: fadeIn 0.5s;">
                <h3 style="color: #ff4081;">🎊 KEJUTAN! 🎊</h3>
                <p style="font-size: 1.3rem; margin: 20px 0;">${surprise}</p>
                <div style="font-size: 3rem; margin: 20px 0;">
                    ${['💖', '🎁', '✨', '🌟', '🎉'][Math.floor(Math.random() * 5)]}
                </div>
            </div>
        `;
        
        // Add sparkle effects
        for (let i = 0; i < 10; i++) {
            createSparkle();
        }
        
        showNotification('Kejutan telah dibuka! 🎊', 'success');
    });
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.width = '10px';
        sparkle.style.height = '10px';
        sparkle.style.background = 'white';
        sparkle.style.borderRadius = '50%';
        sparkle.style.boxShadow = '0 0 10px #ff4081';
        sparkle.style.zIndex = '1000';
        sparkle.style.pointerEvents = 'none';
        
        document.body.appendChild(sparkle);
        
        // Animate
        let size = 0;
        const grow = setInterval(() => {
            size += 0.5;
            sparkle.style.transform = `scale(${size})`;
            sparkle.style.opacity = 1 - (size / 10);
            
            if (size >= 10) {
                clearInterval(grow);
                sparkle.remove();
            }
        }, 20);
    }
    
    // Reset All
    resetAllBtn.addEventListener('click', function() {
        playSound(soundClick);
        if (confirm('Reset semua ke pengaturan awal?')) {
            loveLevel = 100;
            updateLoveMeter();
            messageBox.textContent = '"Kamu adalah mimpi indah yang tak ingin kubangunkan."';
            countdownDate = new Date().toISOString().split('T')[0];
            localStorage.removeItem('countdownDate');
            setCountdown();
            secretCodeInput.value = '';
            codeOutput.textContent = 'Masukkan kode "CINTA123" untuk kejutan!';
            surpriseResult.innerHTML = '';
            
            if (isPlaying) {
                bgMusic.pause();
                isPlaying = false;
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
            
            showNotification('Semua telah direset! 🔄', 'success');
        }
    });
    
    // Modal Functions
    function showModal(title, content) {
        modalTitle.innerHTML = title;
        modalBody.innerHTML = content;
        modal.style.display = 'flex';
        playSound(soundClick);
    }
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Love Quiz
    function startLoveQuiz() {
        const quizHTML = `
            <div style="text-align: center;">
                <h3 style="color: #ff4081;">Quiz Cinta 💘</h3>
                <p>Berapa lama kita sudah bersama?</p>
                <div style="display: flex; flex-direction: column; gap: 10px; margin: 20px 0;">
                    <button class="quiz-option" data-points="10">Kurang dari 1 tahun</button>
                    <button class="quiz-option" data-points="20">1-2 tahun</button>
                    <button class="quiz-option" data-points="30">Lebih dari 2 tahun</button>
                    <button class="quiz-option" data-points="40">Selamanya!</button>
                </div>
                <div id="quizResult" style="margin-top: 20px;"></div>
            </div>
        `;
        
        showModal('💝 Quiz Cinta', quizHTML);
        
        // Add event listeners to quiz buttons
        setTimeout(() => {
            document.querySelectorAll('.quiz-option').forEach(btn => {
                btn.addEventListener('click', function() {
                    const points = parseInt(this.getAttribute('data-points'));
                    const result = `Skor cintamu: ${points}/40! ${points > 20 ? '💖 Hubungan yang kuat!' : '💕 Masih dalam tahap berkembang!'}`;
                    document.getElementById('quizResult').innerHTML = `
                        <div style="background: #ffe6f0; padding: 15px; border-radius: 10px;">
                            <h4 style="color: #ff4081;">Hasil Quiz:</h4>
                            <p>${result}</p>
                            <p>Terus jaga cinta kalian! 🌟</p>
                        </div>
                    `;
                    playSound(soundSuccess);
                });
            });
        }, 100);
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 1.5rem;">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </div>
                <div>${message}</div>
            </div>
        `;
        
        // Style
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = type === 'success' ? '#e8f5e9' : 
                                      type === 'error' ? '#ffebee' : '#e3f2fd';
        notification.style.color = type === 'success' ? '#2e7d32' : 
                                  type === 'error' ? '#c62828' : '#1565c0';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '10px';
        notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        notification.style.zIndex = '10000';
        notification.style.borderLeft = `5px solid ${
            type === 'success' ? '#4caf50' : 
            type === 'error' ? '#f44336' : '#2196f3'
        }`;
        notification.style.animation = 'slideIn 0.3s, slideOut 0.3s 2.7s';
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Add CSS for notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Sound functions
    function playSound(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Initialize random message
    messageBox.textContent = '"' + getRandomMessage() + '"';
    
    // Auto play music (optional)
    setTimeout(() => {
        // bgMusic.volume = 0.3;
        // bgMusic.play().catch(e => console.log("Auto-play prevented"));
    }, 3000);
});