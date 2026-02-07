document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 150, density: { enable: true, value_area: 800 } },
            color: { value: "#00ffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#0ff",
                opacity: 0.2,
                width: 1
            },
            move: { enable: true, speed: 3 }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });

    // Elements
    const loginForm = document.getElementById('loginForm');
    const eyeToggle = document.getElementById('eyeToggle');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const terminalLine = document.getElementById('outputLine');
    const soundToggle = document.getElementById('soundToggle');
    const forgotLink = document.getElementById('forgotLink');

    // Toggle password visibility
    eyeToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Sound toggle
    let soundEnabled = false;
    const clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
    
    soundToggle.addEventListener('click', function() {
        soundEnabled = !soundEnabled;
        this.innerHTML = soundEnabled ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        this.style.color = soundEnabled ? '#f0f' : '#0ff';
        if (soundEnabled) clickSound.play();
    });

    // Forgot link effect
    forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        terminalLine.innerHTML = `> [SYSTEM] Access recovery protocol initiated...`;
        terminalLine.style.color = '#ff0';
        
        if (soundEnabled) {
            const beep = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
            beep.play();
        }
        
        // Simulate hacking effect
        const glitchText = ['Decrypting security layers...', 'Bypassing firewall...', 'Generating temporary key...', 'Access granted to recovery console.'];
        let i = 0;
        const glitchInterval = setInterval(() => {
            if (i < glitchText.length) {
                terminalLine.innerHTML = `> [${new Date().toLocaleTimeString()}] ${glitchText[i]}`;
                i++;
            } else {
                clearInterval(glitchInterval);
                setTimeout(() => {
                    terminalLine.innerHTML = `> Recovery link sent to encrypted email.`;
                    terminalLine.style.color = '#0f0';
                }, 1000);
            }
        }, 800);
    });

    // Form submission with advanced effects
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = passwordInput.value;
        const stealth = document.getElementById('stealthMode').checked;
        const biometric = document.getElementById('biometric').checked;

        // Terminal output
        terminalLine.innerHTML = `> Authenticating user: ${username || 'UNKNOWN'}`;
        terminalLine.style.color = '#0ff';

        // Show progress bar
        progressContainer.style.display = 'block';
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fas fa-cog fa-spin"></i> PROCESSING...';

        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
            
            if (progress >= 25) {
                terminalLine.innerHTML = `> [${Math.round(progress)}%] Validating credentials...`;
            }
            if (progress >= 50) {
                terminalLine.innerHTML = `> [${Math.round(progress)}%] Checking security flags...`;
            }
            if (progress >= 75) {
                terminalLine.innerHTML = `> [${Math.round(progress)}%] ${stealth ? 'Stealth mode activated' : 'Standard protocol'}`;
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Success or failure
                const success = username && password.length >= 6;
                
                setTimeout(() => {
                    if (success) {
                        terminalLine.innerHTML = `> [SUCCESS] Access granted. Welcome, ${username}.`;
                        terminalLine.style.color = '#0f0';
                        loginBtn.innerHTML = '<i class="fas fa-check"></i> ACCESS GRANTED';
                        loginBtn.style.background = 'linear-gradient(90deg, #001122, #006600)';
                        
                        // Particle explosion effect
                        createParticles(loginBtn);
                        
                        // Redirect simulation
                        setTimeout(() => {
                            window.location.href = 'https://github.com';
                        }, 2000);
                    } else {
                        terminalLine.innerHTML = `> [FAILURE] Invalid credentials or security breach detected.`;
                        terminalLine.style.color = '#f00';
                        loginBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ACCESS DENIED';
                        loginBtn.style.background = 'linear-gradient(90deg, #001122, #660000)';
                        
                        // Reset after 3 seconds
                        setTimeout(() => {
                            loginBtn.disabled = false;
                            loginBtn.innerHTML = '<i class="fas fa-fingerprint"></i> INITIATE ACCESS';
                            loginBtn.style.background = '';
                            progressContainer.style.display = 'none';
                            progressFill.style.width = '0%';
                            progressText.textContent = '0%';
                        }, 3000);
                    }
                }, 500);
            }
        }, 100);
    });

    // Alternative buttons
    document.querySelectorAll('.alt-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.classList.contains('neural') ? 'Neural Link' :
                        this.classList.contains('crypto') ? 'Crypto Wallet' : 'Quantum Tunnel';
            
            terminalLine.innerHTML = `> [INFO] ${type} connection requested...`;
            terminalLine.style.color = '#8af';
            
            // Button pulse effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 200);
        });
    });

    // Input focus effects
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.borderColor = '#0ff';
            this.parentElement.style.boxShadow = '0 0 15px #0ff';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '#1a3f5a';
            this.parentElement.style.boxShadow = 'none';
        });
    });

    // Create particle explosion
    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#0ff';
            particle.style.borderRadius = '50%';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.zIndex = '1000';
            particle.style.pointerEvents = 'none';
            
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            let posX = x;
            let posY = y;
            
            const animate = () => {
                posX += vx;
                posY += vy;
                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
                
                if (parseFloat(particle.style.opacity) > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    // Auto-type terminal effect
    const terminalLines = [
        "> System integrity check: PASSED",
        "> Firewall status: ACTIVE",
        "> Encryption level: AES-256",
        "> Last login: 02:47:19 UTC",
        "> Ready for authentication sequence."
    ];
    
    let lineIndex = 0;
    const terminalBody = document.querySelector('.terminal-body');
    
    function typeLine(line, element, speed = 50) {
        let i = 0;
        const typeInterval = setInterval(() => {
            element.innerHTML += line.charAt(i);
            i++;
            if (i > line.length) {
                clearInterval(typeInterval);
                element.innerHTML += '<br>';
                lineIndex++;
                if (lineIndex < terminalLines.length) {
                    setTimeout(() => {
                        const newLine = document.createElement('div');
                        newLine.className = 'terminal-line';
                        terminalBody.appendChild(newLine);
                        typeLine(terminalLines[lineIndex], newLine);
                    }, 500);
                }
            }
        }, speed);
    }
    
    // Start terminal animation
    setTimeout(() => {
        const firstLine = document.createElement('div');
        firstLine.className = 'terminal-line';
        terminalBody.appendChild(firstLine);
        typeLine(terminalLines[0], firstLine);
    }, 1000);

    // Console message
    console.log('%c ᖫ⦉RNY-Y PORTAL⦊ᖭ ', 'background: #000; color: #0ff; font-size: 18px; padding: 10px;');
    console.log('%c Secure Login Interface v3.0 Activated', 'color: #0f0;');
    console.log('%c Warning: Unauthorized access is prohibited.', 'color: #f00; font-weight: bold;');
});