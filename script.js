document.addEventListener("DOMContentLoaded", () => {
    // ====== 1) 설문조사 페이지용: 응답 목록 추가 ======
    const surveyForm = document.querySelector("main form");
    const responseList = document.getElementById("response-list");

    if (surveyForm && responseList) {
        surveyForm.addEventListener("submit", (event) => {
            event.preventDefault(); // 기본 제출(새로고침) 막기

            // 폼 전체 유효성 검사 (HTML의 required, minlength 등을 그대로 활용)
            if (!surveyForm.checkValidity()) {
                alert("입력 항목을 다시 확인해주세요.");
                return;
            }

            // 사용자가 입력한 값들 가져오기
            const userId = document.getElementById("userid").value.trim();
            const age = document.getElementById("age").value.trim();

            // 체크된 선수들
            const checkedPlayers = Array.from(
                document.querySelectorAll("input[name='player']:checked")
            ).map((input) => {
                const label = surveyForm.querySelector(`label[for='${input.id}']`);
                return label ? label.textContent : input.value;
            });

            // 선택된 좋아하는 기술 (radio)
            const checkedTech = surveyForm.querySelector("input[name='tech']:checked");
            const techLabel = checkedTech
                ? surveyForm.querySelector(`label[for='${checkedTech.id}']`).textContent
                : "선택 안 함";

            // 확인 메시지
            const ok = confirm(
                `다음 내용으로 응답을 추가할까요?\n\n` +
                `아이디: ${userId}\n` +
                `나이: ${age || "미입력"}\n` +
                `알고 있는 선수: ${checkedPlayers.length ? checkedPlayers.join(", ") : "없음"}\n` +
                `좋아하는 기술: ${techLabel}`
            );

            if (!ok) return; // 취소하면 아무것도 하지 않음

            // <li> 생성해서 응답 목록에 추가
            const li = document.createElement("li");
            li.innerHTML =
                `<strong>${userId}</strong> (${age || "나이 미입력"}) - ` +
                `선수: ${checkedPlayers.length ? checkedPlayers.join(", ") : "없음"} / ` +
                `좋아하는 기술: ${techLabel}`;

            responseList.appendChild(li);

            // 폼 초기화
            surveyForm.reset();
        });
    }

    // ====== 2) (필요하다면 여기에 다크 모드 토글, 검색 필터 코드도 같이 넣으면 됩니다) ======
});

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