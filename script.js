document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil Elemen DOM
    const colorDisplay = document.getElementById("colorDisplay");
    const optionsContainer = document.getElementById("optionsContainer");
    const messageDisplay = document.getElementById("message");
    const scoreDisplay = document.getElementById("score");
    const highScoreDisplay = document.getElementById("highScore");
    const btnReset = document.getElementById("btnReset");

    // Variabel Status Permainan
    let targetColor = "";
    let score = 0;
    let highScore = localStorage.getItem("hexGameHighScore") || 0;

    highScoreDisplay.textContent = highScore;

    // 2. Fungsi Pembantu (Helper): Generasi Warna Hex Acak
    function getRandomHexColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // 3. Inisialisasi/Mulai Ronde Baru
    function startNewRound() {
        optionsContainer.innerHTML = "";
        messageDisplay.textContent = "Pilih salah satu kode warna di bawah!";
        messageDisplay.style.color = "#94a3b8";

        // Generate 4 warna acak
        const colors = [];
        for (let i = 0; i < 4; i++) {
            colors.push(getRandomHexColor());
        }

        // Pilih 1 warna sebagai jawaban yang benar
        targetColor = colors[Math.floor(Math.random() * colors.length)];
        colorDisplay.style.backgroundColor = targetColor;

        // Buat tombol untuk setiap opsi warna
        colors.forEach(color => {
            const button = document.createElement("button");
            button.classList.add("btn-option");
            button.textContent = color;
            button.addEventListener("click", () => checkAnswer(color, button));
            optionsContainer.appendChild(button);
        });
    }

    // 4. Logika Pengecekan Jawaban
    function checkAnswer(selectedColor, clickedButton) {
        const buttons = optionsContainer.querySelectorAll(".btn-option");

        if (selectedColor === targetColor) {
            // Jawaban Benar
            messageDisplay.textContent = "Tepat Sekali! 🎉";
            messageDisplay.style.color = "#4ade80";
            
            score++;
            scoreDisplay.textContent = score;

            // Update Rekor Terbaik
            if (score > highScore) {
                highScore = score;
                highScoreDisplay.textContent = highScore;
                localStorage.setItem("hexGameHighScore", highScore);
            }

            // Nonaktifkan tombol dan siapkan ronde berikutnya
            buttons.forEach(btn => btn.disabled = true);
            setTimeout(startNewRound, 1200);
        } else {
            // Jawaban Salah
            messageDisplay.textContent = "Salah! Coba lagi.";
            messageDisplay.style.color = "#f87171";
            
            clickedButton.disabled = true;
            score = 0; // Reset skor jika salah
            scoreDisplay.textContent = score;
        }
    }

    // Event Listener
    btnReset.addEventListener("click", () => {
        score = 0;
        scoreDisplay.textContent = score;
        startNewRound();
    });

    // Jalankan game pertama kali
    startNewRound();
});
