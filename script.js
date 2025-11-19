document.addEventListener("DOMContentLoaded", () => {
    // 0) 응답 인사말: 현재 시간에 따라 인사말 표시
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
        const now = new Date();
        const hour = now.getHours();   // 0 ~ 23

        let message = "";

        if (hour < 12) {
            message = "좋은 아침입니다! NBA 페이지에 오신 걸 환영합니다.";
        } else if (hour < 18) {
            message = "좋은 오후입니다! NBA와 함께 즐거운 시간 보내세요.";
        } else {
            message = "좋은 저녁입니다! 오늘도 NBA 이야기 함께해요.";
        }

        greetingEl.textContent = message;
    }

     // 1) 테마 토글
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            themeBtn.textContent = document.body.classList.contains("dark-theme")
                ? "☀️ 라이트 모드"
                : "🌙 다크 모드";
        });
    }

    // 2) 설문조사 페이지용: 응답 목록 추가 ======
    const surveyForm = document.querySelector("main form");
    const responseList = document.getElementById("response-list");

    if (surveyForm && responseList) {
        // ====== 입력 과정 상호작용 1: 아이디 길이 실시간 체크 ======
        const userIdInput = document.getElementById("userid");
        const userIdMsg = document.getElementById("userid-msg");

        if (userIdInput && userIdMsg) {
            userIdInput.addEventListener("input", () => {
                const len = userIdInput.value.trim().length;

                userIdMsg.classList.remove("ok", "error");

                if (len === 0) {
                    userIdMsg.textContent = "아이디를 입력해주세요.";
                    userIdMsg.classList.add("error");
                } else if (len < 4) {
                    userIdMsg.textContent = `현재 ${len}글자 (4글자 이상 필요)`;
                    userIdMsg.classList.add("error");
                } else {
                    userIdMsg.textContent = "사용 가능한 길이입니다.";
                    userIdMsg.classList.add("ok");
                }
            });
        }

        // ====== 입력 과정 상호작용 2: 비밀번호 길이 실시간 체크 ======
        const userPwInput = document.getElementById("userpw");
        const userPwMsg = document.getElementById("userpw-msg");

        if (userPwInput && userPwMsg) {
            userPwInput.addEventListener("input", () => {
                const len = userPwInput.value.trim().length;

                userPwMsg.classList.remove("ok", "error");

                if (len === 0) {
                    userPwMsg.textContent = "비밀번호를 입력해주세요.";
                    userPwMsg.classList.add("error");
                } else if (len < 5) {
                    userPwMsg.textContent = `현재 ${len}글자 (5글자 이상 필요)`;
                    userPwMsg.classList.add("error");
                } else {
                    userPwMsg.textContent = "안전한 길이입니다.";
                    userPwMsg.classList.add("ok");
                }
            });
        }
        // ====== 입력 과정 상호작용 4: 슬라이더 값 실시간 표시 ======
        function attachScoreDisplay(rangeId) {
            const input = document.getElementById(rangeId);
            if (!input) return;

            // range 바로 다음 요소(label 또는 span)에 현재 점수 표시
            const display = input.nextElementSibling;
            if (!display) return;

            const update = () => {
                display.textContent = `현재 점수: ${input.value}점`;
            };

            update(); // 초기값 표시
            input.addEventListener("input", update);
        }

        attachScoreDisplay("score_pass");
        attachScoreDisplay("score_steal");
        attachScoreDisplay("score_fadeaway");
        attachScoreDisplay("score_drivein");
        
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

    // 3) 선수 검색
    const searchInput = document.getElementById("player-search");
    const players = document.querySelectorAll("#player_container .player_intro");
    if (searchInput && players.length > 0) {
        searchInput.addEventListener("keyup", () => {
            const keyword = searchInput.value.toLowerCase();
            players.forEach(player => {
                const nameTag = player.querySelector("p");
                const nameText = nameTag ? nameTag.textContent.toLowerCase() : "";
                player.style.display = nameText.includes(keyword) ? "flex" : "none";
            });
        });
    }

    // 4) 홈 페이지용: 선수 카드 호버 효과
    const playerItems = document.querySelectorAll("#player_container .player_intro");

    // playerItems가 없으면(설문 페이지 등) 그냥 아무 것도 안 하고 넘어감
    playerItems.forEach((item) => {
        // 마우스를 올렸을 때(mouseover)
        item.addEventListener("mouseover", () => {
            item.classList.add("hovered");
        });

        // 마우스를 뺐을 때(mouseout)
        item.addEventListener("mouseout", () => {
            item.classList.remove("hovered");
        });
    });

    // 5) 접을 수 있는 섹션 기능
    const collapsibleSections = document.querySelectorAll("main section.collapsible");

    collapsibleSections.forEach((section) => {
        const header = section.querySelector("h2");
        if (!header) return;  // h2가 없으면 스킵

        header.addEventListener("click", () => {
            section.classList.toggle("collapsed");
        });
    });
    // ====== 6) 슬라이드쇼 기능 ======
    const images = [
        { src: "magic.jpg", caption: "매직 존슨" },
        { src: "bird.jpg", caption: "래리 버드" },
        { src: "MJ.jpg", caption: "마이클 조던" },
        { src: "Bron.jpg", caption: "르브론 제임스" },
        { src: "ha.jpeg", caption: "하승진" }
    ];

    let index = 0;

    const slideImg = document.getElementById("slide-img");
    const slideCaption = document.getElementById("slide-caption");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    function updateSlide() {
        slideImg.src = images[index].src;
        slideCaption.textContent = images[index].caption;
    }

    if (slideImg && slideCaption && prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            index = (index - 1 + images.length) % images.length;
            updateSlide();
        });

        nextBtn.addEventListener("click", () => {
            index = (index + 1) % images.length;
            updateSlide();
        });
    }
});