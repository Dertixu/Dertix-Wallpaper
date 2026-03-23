        function toggleMenu() {
            document.getElementById('sideMenu').classList.toggle('open');
        }

        function copyToClipboard() {
            navigator.clipboard.writeText("dertixu").then(() => {
                const alertBox = document.getElementById("copyAlert");
                alertBox.style.display = "block";
                setTimeout(() => { alertBox.style.display = "none"; }, 2000);
            });
        }