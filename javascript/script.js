const bootMessages = [
            "[  OK  ]\tMounting file systems",
            "[  OK  ]\tLoading kernel modules",
            "[  OK  ]\tStarting system services",
            "[  OK  ]\tInitializing network",
            "[  OK  ]\tStarting login service",
            "[  OK  ]\tLoading user profile",
            "[  OK  ]\tWelcome to Arch Linux (Portfolio Edition)",
            "[  OK  ]\tInitializing memory management",
            "[  OK  ]\tSetting up CPU scheduler",
            "[  OK  ]\tConfiguring hardware devices",
            "[  OK  ]\tLoading device drivers",
            "[  OK  ]\tMounting root filesystem",
            "[  OK  ]\tStarting udev daemon",
            "[  OK  ]\tConfiguring network interfaces",
            "[  OK  ]\tStarting system logger",
            "[  OK  ]\tInitializing random number generator",
            "[  OK  ]\tSetting hostname to 'terminal-portfolio'",
            "[ 极   ]\tChecking filesystems",
            "[ 整   ]\tLoading security policies",
            "[ 极   ]\tStarting cron daemon",
            "[ 整   ]\tInitializing swap space",
            "[  OK  ]\tSetting up console",
            "[  OK  ]\tStarting getty on tty1",
            "[  OK  ]\tInitializing virtual terminals",
            "[  OK  ]\tStarting dbus system bus",
            "[  OK  ]\tSystem time synchronized",
            "[  OK  ]\tPortfolio terminal ready"
        ];

        const bootScreen = document.getElementById('boot-screen');
        const terminal = document.getElementById('terminal');
        const output = document.getElementById('output');
        const matrixCanvas = document.getElementById('matrix-canvas');
        let commandMode = 'normal';
        let isMatrixActive = false;
        let isAnimatingOutput = false;

        const letters = 'アァカサタナハマヤャラワがざどばぱöüäÜÄÖßÁÀÂÆBCËÊÈĒÉÈEÊエÈËÊÉĘÉÊËĖẼĒÊĒĔĖĘĚĒĔĕĔĒĖĖÊẼỀḔḖḘḚṲṴᚡᙀᚠ极ᚢᚣᇋᐅᐂᐁᐆᐃᙎᘖᚤᚦᚷᛏᛐᛞᚻᛈᚼ';
        const fontSize = 14;
        let raindrops = [];
        let raindrops2 = [];
        let matrixInterval;

        function initMatrixRain() {
            if (!isMatrixActive) return;
            
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            const ctx = matrixCanvas.getContext('2d');
            
            const columns = matrixCanvas.width / fontSize;
            raindrops = [];
            raindrops2 = [];
            
            for (let i = 0; i < columns; i++) {
                raindrops.push(1);
                raindrops2.push(Math.floor(Math.random() * 50) + 1);
            }

            clearInterval(matrixInterval);
            matrixInterval = setInterval(() => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
                ctx.fillStyle = '#00FF00';
                ctx.font = `${fontSize}px monospace`;
                
                for (let i = 0; i < columns; i++) {
                    if (raindrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                        raindrops[i] = 0;
                    }
                    if (raindrops2[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                        raindrops2[i] = 0;
                    }
                    
                    const randomChar = letters[Math.floor(Math.random() * letters.length)];
                    ctx.fillText(randomChar, i * fontSize, raindrops[i] * fontSize);
                    ctx.fillText(randomChar, i * fontSize, raindrops2[i] * fontSize);
                    raindrops[i]++;
                    raindrops2[i]++;
                }
            }, 40);
        }

        const commands = {
            help: 'Available commands: help, about, projects, contact, clear, ls, whoami, su',
            about: 'Full-stack developer specializing in Linux systems and open-source technologies.\n\nSkills:\n- JavaScript/TypeScript\n- Python\n- C/C++\n- Linux Administration\n- Network Security',
            projects: '1. Kernel module analyzer\n   - Real-time analysis of Linux kernel modules\n\n2. Network security toolkit\n   - Automated penetration testing framework\n\n3. Package manager optimizer\n   - AI-powered optimization for Linux package managers',
            contact: 'Email: abduloski.h@gmail.com\nGitHub: github.com/X-Haris\nLinkedIn: linkedin.com/in/haris-abduloski',
            ls: 'about.txt  contact.txt  help.txt  projects.txt  su.txt',
            whoami: 'guest',
            su: 'Enter password to gain super-user access'
        };

        const asciiArt = {
            probes: [
                "         ______",
                "      .-'      '-.",
                "     /            \\",
                "    |              |",
                "    |,  .-.  .-.  ,|",
                "    | )(_o/  \\o_)( |",
                "    |/     /\\     \\|",
                "    (_     ^^     _)",
                "     \\__|IIIIII|__/",
                "      | \\IIIIII/ |",
                "      \\          /",
                "       `--------`",
                "     QUANTUM SIGNAL DETECTOR ACTIVE    "
            ].join('\n'),
            
            crypto: [
                "╔═══════╗ ╔═══════╗ ╔═══════╗ ╔═══════╗",
                "║ █ █ █ ║ ║ █ ░ █ ║ ║ ░ █ ░ ║ ║ █ █ ░ ║",
                "║ ░ █ ░ ║ ║ ░ ░ ░ ║ ║ █ ░ █ ║ ║ ░ █ ░ ║",
                "╚═══════╝ ╚═══════╝ ╚═══════╝ ╚═══════╝",
                "       C Y B E R   W I R E S"
            ].join('\n'),
            
            breach: [
                "      .--------.",
                "     / .------. \\",
                "    / /        \\ \\",
                "    | |        | |",
                "   _| |________| |_",
                " .' |_|        |_| '.",
                " '._____ ____ _____.'  ",
                " |     .'____'.     |  ",
                " '.__.'.'    '.'.__.'",
                " '.__  | LOCK |  __.'",
                " |   '.'.____.'.'   |",
                " '._   `/.  \\´   _.'",
                "    `'.  \\__/  .'`",
                "       '------'  ",
    
                "           PENETRATION SEQUENCE INITIATED      "
            ].join('\n'),
            
            satellite: [
                "       ┌─────────────────────────────┐",
                "      │  ░▓▒░░▒▓░▒▓▒▓░░▒▓▒▓▒▓░▒▓▒  │",
                "      │  ▒▓▒▓░░▒▓▒▓▒▓░▒▓▒▓░▓▒▓░▒  │",
                "      │  ░▒▓▒▓░░▒▓░▒▓▒▓░▓▒▓░▒▓▒▓  │",
                "      │  ▒▓▒▓░▒▓▒▓░▒▓▒▓░▒▓▒▓░▒▓▒  │",
                "      │  ░▓▒░░▒▓░▒▓▒▓░░▒▓▒▓▒▓░▒▓▒  │",
                "       └─────────────────────────────┘",
                "                 ||||||||||||",
                "                 ||||||||||||",
                "                 ||||||||||||",
                "                 ||||||||||||",
                "                 ||||||||||||",
                "     ORBITAL SURVEILLANCE ONLINE      "
            ].join('\n'),
            
            quantum: [
                "             .==-.                   .-==.",
                "            //\\(( '))               (( '))\\\\",
                "           ((  \\\\\\\\// __ \\\\\\\\//  ))",
                "            \\\\ //   /   \\ /   \\   \\\\ // ",
                "             ``     \\___/ \\___/     ``",
                "           .==-.    //\\(( '))\\\\    .-==.",
                "          (( '))   ((  \\\\\\\\//  ))   (( '))",
                "           \\\\//     \\\\ //   \\\\\\\\// \\\\\\\\//",
                "            ``       ``      ``",
                "         QUANTUM DECRYPTION ENGINE ACTIVE         "
            ].join('\n')
        };

        const secretCommands = {
            probes: async (args, responseElement) => {
                const asciiElement = document.createElement('div');
                asciiElement.className = 'ascii-art';
                asciiElement.textContent = asciiArt.probes;
                responseElement.appendChild(asciiElement);
                scrollOutput();
                
                await animateLineByLine([
                    "> probes: Starting quantum receiver array...",
                    "> Initializing multispectral scanning system...",
                    "",
                    "{progress}",
                    "",
                    "> Scanning deep space frequencies...",
                    "  - Detected signal from Gliese 581 system",
                    "  - Signal strength: 94.7 ZW",
                    "  - Frequency: 1420.405 MHz",
                    "  - Natural range: -77dB",
                    "",
                    "  Signal analysis complete:",
                    "    Origin: Distributed intelligence class IV",
                    "    Message: OBSERVE AND REPORT",
                    "    Encryption: Type IX quantum entanglement",
                    "",
                    "> Scan completed: 12 candidates identified"
                ], responseElement);
            },
            crypto: async (args, responseElement) => {
                const asciiElement = document.createElement('div');
                asciiElement.className = 'ascii-art';
                asciiElement.textContent = asciiArt.crypto;
                responseElement.appendChild(asciiElement);
                scrollOutput();
                
                const walletAddr = '1HsEJZ' + Array(10).fill().map(() => Math.random().toString(36).substring(2,4)).join('') + 'sGhQo';
                const amount = (Math.random()*40+10).toFixed(6);
                const date = new Date().toISOString().replace('T', ' ').substring(0, 19);
                
                await animateLineByLine([
                    `> crypto --recover --wallet=${walletAddr}`,
                    "Accessing ETH blockchain...",
                    "Verifying wallet keys...",
                    "Found encrypted partition: 1.3 TB",
                    "",
                    "{progress}",
                    "",
                    "> Recovery audit:",
                    "  - BTC: 12.592173",
                    "  - ETH: 0.000000",
                    "  - XMR: 0.000000",
                    "",
                    "Decrypted transactions:",
                    `  ${date} | RECV | ${amount} BTC`,
                    `  ${date} | SEND | 0.000351 BTC`,
                    `  ${date} | FEE  | 0.000001 BTC`,
                    "",
                    `> Total recovered: ${amount} BTC`
                ], responseElement);
            },
            breach: async (args, responseElement) => {
                const asciiElement = document.createElement('div');
                asciiElement.className = 'ascii-art';
                asciiElement.textContent = asciiArt.breach;
                responseElement.appendChild(asciiElement);
                scrollOutput();
                
                const target = args[0] || 'Aperture Labs';
                
                await animateLineByLine([
                    `> breach --verbose ${target}`,
                    "Attempting SSH connection via TOR...",
                    "Building IP obfuscation layers...",
                    "",
                    "{progress}",
                    "",
                    `Found 3 open ports on ${target}:`,
                    "  22: Strong defense (SSH-2.0-OpenSSH_8.9)",
                    "  80: Vulnerable HTTP server (Apache/2.4.52)",
                    "  443: Self-signed cert (SHA-1)",
                    "",
                    "> Exploiting CVE-2023-29490...",
                    "User: sysadmin",
                    "Password: ********",
                    "Authenticated via SSH",
                    "",
                    "Access granted",
                    `root@${target}:~# ls /data/classified`,
                    "Project_Cobalt.pdf",
                    "Genesis_Protocol.zip",
                    "Zero_Day_Exploits.tar.gz"
                ], responseElement);
            },
            satellite: async (args, responseElement) => {
                const asciiElement = document.createElement('div');
                asciiElement.className = 'ascii-art';
                asciiElement.textContent = asciiArt.satellite;
                responseElement.appendChild(asciiElement);
                scrollOutput();
                
                const satellite = args[0] || 'GALILEO-12';
                
                await animateLineByLine([
                    `> satellitectl --connect ${satellite}`,
                    "Establishing secure SATCOM link...",
                    "Establishing quantum encryption channel...",
                    "",
                    "{progress}",
                    "",
                    "Handshake complete | Key: 0xFE34D2A1",
                    "",
                    `> ${satellite} Status:`,
                    "  Orbit: 23,222 km (Medium Earth)",
                    "  Inclination: 56.0°",
                    "  Velocity: 3.64 km/s",
                    "  Power: 98% solar / 87% battery",
                    "  Uplink: 12642 MHz",
                    "  Downlink: 15476 MHz",
                    "",
                    "> Capture mode activated",
                    "Targeting: 40.7128° N, 74.0060° W",
                    "Resolution: 30 cm/pixel",
                    "Orbit time: 7:42:16 UTC"
                ], responseElement);
            },
            quantum: async (args, responseElement) => {
                const asciiElement = document.createElement('div');
                asciiElement.className = 'ascii-art';
                asciiElement.textContent = asciiArt.quantum;
                responseElement.appendChild(asciiElement);
                scrollOutput();
                
                await animateLineByLine([
                    "> quantum --decrypt --algorithm shor",
                    "Initializing photonic processor...",
                    "Calibrating quantum decoherence filters...",
                    "",
                    "{progress}",
                    "",
                    "Calibrating qubits: 13/512 entangled",
                    "",
                    "Quantum factors found:",
                    "  - Factor 1: 0x62D9CA",
                    "  - Factor 2: 0x5F7D93",
                    "",
                    "Decrypted message:",
                    '"The universe is a poem written in the language of mathematics"',
                    "",
                    "Computational time: 174μs",
                    "Error probability: 1.8e-10"
                ], responseElement);
            }
        };

        function createProgressBar() {
            const container = document.createElement('div');
            container.className = 'progress-container';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            
            const progressText = document.createElement('div');
            progressText.className = 'progress-text';
            progressText.textContent = '0%';
            
            progressBar.appendChild(progressText);
            container.appendChild(progressBar);
            
            return container;
        }

        function animateProgressBar(barContainer) {
            return new Promise((resolve) => {
                const progressBar = barContainer.querySelector('.progress-bar');
                const progressText = barContainer.querySelector('.progress-text');
                let width = 0;
                
                barContainer.getBoundingClientRect();
                barContainer.style.height = '20px';
                
                const interval = setInterval(() => {
                    width += 2;
                    if (width > 100) {
                        width = 100;
                        clearInterval(interval);
                        
                        progressText.textContent = 'COMPLETE';
                        progressText.className = 'progress-text progress-text-final';
                        
                        setTimeout(() => {
                            resolve();
                        }, 700);
                    } else {
                        progressBar.style.width = `${width}%`;
                        progressText.textContent = `${width}%`;
                    }
                    scrollOutput();
                }, 30);
            });
        }
        
        // Function to scroll output to bottom
        function scrollOutput() {
            output.scrollTop = output.scrollHeight;
        }

        async function animateLineByLine(lines, parentElement, delay = 50) {
            isAnimatingOutput = true;
            
            for (const line of lines) {
                if (line === "{progress}") {
                    const barContainer = createProgressBar();
                    parentElement.appendChild(barContainer);
                    scrollOutput();
                    await animateProgressBar(barContainer);
                    continue;
                }
                
                const lineElement = document.createElement('div');
                lineElement.className = 'output-line';
                lineElement.textContent = line;
                parentElement.appendChild(lineElement);
                
                // Force reflow to enable transition
                void lineElement.offsetHeight;
                
                lineElement.classList.add('visible-line');
                scrollOutput();
                
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            
            isAnimatingOutput = false;
        }

        output.addEventListener('keydown', async (e) => {
            if (e.target.classList.contains('command-input') && e.key === 'Enter') {
                const input = e.target;
                const fullCommand = input.value.trim();
                const cmd = fullCommand.split(/\s+/)[0].toLowerCase();
                const args = fullCommand.split(/\s+/).slice(1);
                const parentLine = input.parentElement;
                input.disabled = isAnimatingOutput;

                const outputLine = document.createElement('div');
                if (commandMode === 'su') {
                    outputLine.innerHTML = `<span class="su-prompt">Password:</span> ${fullCommand}`;
                } else if (commandMode === 'su-active') {
                    outputLine.innerHTML = `<span class="su-active-prompt">root@portfolio:~#</span> ${fullCommand}`;
                } else {
                    outputLine.innerHTML = `<span class="prompt">guest@portfolio:~$</span> ${fullCommand}`;
                }
                parentLine.after(outputLine);
                scrollOutput();

                if (cmd === 'clear') {
                    output.innerHTML = `
                        <div class="help-text">Type 'help' to see available commands</div>
                        <div class="input-line">
                            <span class="prompt">guest@portfolio:~$</span>
                            <input class="command-input" autofocus>
                        </div>
                    `;
                } else if (commandMode === 'su' && cmd === 'matrix') {
                    commandMode = 'su-active';
                    isMatrixActive = true;
                    initMatrixRain();
                    document.body.classList.add('matrix-theme');
                    const response = document.createElement('div');
                    response.innerHTML = '<span class="matrix-success">Success! Matrix simulation activated.</span>';
                    outputLine.after(response);
                    scrollOutput();
                } else if (isMatrixActive && cmd === 'exit') {
                    clearInterval(matrixInterval);
                    isMatrixActive = false;
                    matrixCanvas.getContext('2d').clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
                    document.body.classList.remove('matrix-theme');
                    const response = document.createElement('div');
                    response.textContent = 'Matrix simulation deactivated.';
                    response.className = 'exit-message';
                    outputLine.after(response);
                    scrollOutput();
                } else if (isMatrixActive && secretCommands[cmd]) {
                    const response = document.createElement('div');
                    response.className = 'command-output';
                    outputLine.after(response);
                    await secretCommands[cmd](args, response);
                    scrollOutput();
                } else if (commandMode === 'su' && cmd !== 'matrix') {
                    const response = document.createElement('div');
                    if (fullCommand === 'password') {
                        commandMode = 'su-active';
                        response.textContent = 'Authentication successful. Super user mode active.';
                        response.className = 'su-command-output';
                    } else {
                        response.textContent = 'Access denied. Password incorrect';
                        response.className = 'error';
                    }
                    outputLine.after(response);
                    scrollOutput();
                } else if (commands[cmd]) {
                    if (cmd === 'su') {
                        commandMode = 'su';
                        const response = document.createElement('div');
                        response.textContent = 'Enter password:';
                        outputLine.after(response);
                        scrollOutput();
                    } else {
                        const response = document.createElement('div');
                        response.classList.add('command-output');
                        
                        // Format multi-line output
                        const lines = commands[cmd].split('\n');
                        lines.forEach((line, i) => {
                            if (i > 0) response.appendChild(document.createElement('br'));
                            response.appendChild(document.createTextNode(line));
                        });
                        
                        outputLine.after(response);
                        scrollOutput();
                    }
                } else if (fullCommand) {
                    const error = document.createElement('div');
                    if (isMatrixActive) {
                        error.innerHTML = `Command not found: ${fullCommand}`;
                    } else {
                        error.textContent = `Command not found: ${fullCommand}`;
                    }
                    error.className = 'error';
                    outputLine.after(error);
                    scrollOutput();
                }

                if (cmd !== 'clear') {
                    const newInputLine = document.createElement('div');
                    newInputLine.className = 'input-line';
                    
                    if (commandMode === 'su') {
                        newInputLine.innerHTML = `
                            <span class="su-prompt">Password:</span>
                            <input type="password" class="command-input" autofocus ${isAnimatingOutput ? 'disabled' : ''}>
                        `;
                    } else if (commandMode === 'su-active') {
                        newInputLine.innerHTML = `
                            <span class="su-active-prompt">root@portfolio:~#</span>
                            <input type="text" class="command-input" autofocus ${isAnimatingOutput ? 'disabled' : ''}>
                        `;
                    } else {
                        newInputLine.innerHTML = `
                            <span class="prompt">guest@portfolio:~$</span>
                            <input type="text" class="command-input" autofocus ${isAnimatingOutput ? 'disabled' : ''}>
                        `;
                    }
                    
                    output.appendChild(newInputLine);
                    scrollOutput();
                    
                    if (!isAnimatingOutput) {
                        newInputLine.querySelector('input').focus();
                    }
                }

                parentLine.remove();
                scrollOutput();
            }
        });

        window.addEventListener('resize', () => {
            if (matrixInterval) {
                initMatrixRain();
            }
        });

        let delay = 100;
        bootMessages.forEach((msg, index) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.innerHTML = msg.replace(/\[  OK  \]/, '<span class="ok">[  OK  ]</span>')
                                .replace(/\[  极   \]/, '<span class="ok">[  极   ]</span>')
                                .replace(/\[  整   \]/, '<span class="ok">[  整   ]</span>');
                bootScreen.appendChild(line);
                bootScreen.scrollTop = bootScreen.scrollHeight;

                if (index === bootMessages.length - 1) {
                    setTimeout(() => {
                        bootScreen.style.opacity = '0';
                        setTimeout(() => {
                            bootScreen.style.display = 'none';
                            terminal.style.display = 'flex';
                            document.querySelector('.command-input').focus();
                        }, 1000);
                    }, 1000);
                }
            }, delay);
            delay += 100;
        });

        document.addEventListener('click', () => {
            const inputs = document.querySelectorAll('.command-input:not([disabled])');
            if (inputs.length > 0 && !isAnimatingOutput) {
                inputs[inputs.length - 1].focus();
            }
        });