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

// 🔍 실시간 선수 검색 필터
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("player-search");
    const players = document.querySelectorAll("#player_container .player_intro");

    // 이 스크립트는 소개 페이지와 설문 페이지 둘 다에서 불리기 때문에
    // 검색창이 없는 페이지에서는 그냥 종료
    if (!searchInput) return;

    // keyup 이벤트: 키를 뗄 때마다 실행
    searchInput.addEventListener("keyup", () => {
        const keyword = searchInput.value.toLowerCase();  // 입력값(소문자)

        players.forEach(player => {
            const nameTag = player.querySelector("p");     // 첫 번째 p = 선수 이름
            const nameText = nameTag ? nameTag.textContent.toLowerCase() : "";

            if (nameText.includes(keyword)) {
                // 검색어가 이름에 포함되면 보이게
                player.style.display = "flex"; // 원래 .player_intro가 flex라서 flex로 복원
            } else {
                // 포함되지 않으면 숨김
                player.style.display = "none";
            }
        });
    });
});