// 테마 토글 기능
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const btn = document.getElementById("theme-toggle");

    if (document.body.classList.contains("dark-theme")) {
        btn.textContent = "☀️ 라이트 모드";
    } else {
        btn.textContent = "🌙 다크 모드";
    }
});