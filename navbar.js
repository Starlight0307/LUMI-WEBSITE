document.addEventListener("DOMContentLoaded", function () {

    /*
     * =====================================================================
     * navbar.js — LUMI 공통 상단 네비게이션 바 동적 주입 스크립트
     * =====================================================================
     * [수정사항]
     * - 모바일(768px 이하)에서 로그인 버튼이 햄버거 버튼 바로 옆(좌측)에 표시
     * - 로그인 버튼 클릭 시 auth.html 로그인 페이지로 이동
     * =====================================================================
     */

    // ─────────────────────────────────────────────────────────────────────
    // STEP 1. 상단바 HTML 구조 정의
    // ─────────────────────────────────────────────────────────────────────
    //
    // 레이아웃 (desktop): grid 3열
    //  [nav-logo(1fr)] | [nav-menu(auto, 중앙)] | [nav-right(1fr, 우측)]
    //
    // 레이아웃 (mobile ≤768px): flex
    //  [nav-logo(flex-grow)] | [nav-mobile-actions] → [btn-login-mobile] [menu-toggle]
    //
    // 모바일에서 nav-right는 숨기고, nav-mobile-actions 안에
    // 로그인 버튼(btn-login-mobile)과 햄버거(menu-toggle)를 나란히 배치합니다.

    const navbarHTML = `
    <header class="top-navbar">
        <div class="nav-container">

            <!-- 로고 -->
            <a class="nav-logo" href="index.html">LUMI</a>

            <!-- 중앙 네비게이션 메뉴 (desktop) -->
            <nav class="nav-menu" id="nav-menu">
                <a class="nav-item" id="nav-index"     href="index.html">LUMI 소개</a>
                <a class="nav-item" id="nav-installer" href="installer.html">설치 파일 다운로드</a>
                <a class="nav-item" id="nav-git"       href="git.html">Git에서 다운로드</a>
            </nav>

            <!-- 우측 로그인 버튼 (desktop 전용) -->
            <div class="nav-right">
                <a href="auth.html" class="btn-login">로그인</a>
            </div>

            <!-- 모바일 전용: 로그인 버튼 + 햄버거 묶음
                 display:none → @media(≤768px)에서 display:flex로 전환 -->
            <div class="nav-mobile-actions">
                <a href="auth.html" class="btn-login-mobile">로그인</a>
                <div class="menu-toggle" id="mobile-menu-btn">☰</div>
            </div>

        </div>
    </header>
    `;

    // ─────────────────────────────────────────────────────────────────────
    // STEP 2. HTML 주입
    // ─────────────────────────────────────────────────────────────────────
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;
    }

    // ─────────────────────────────────────────────────────────────────────
    // STEP 3. 현재 페이지 active 처리
    // ─────────────────────────────────────────────────────────────────────
    const path = window.location.pathname;
    const page = path.split("/").pop();

    let targetId = "nav-index";
    if (page === "installer.html") targetId = "nav-installer";
    else if (page === "git.html")  targetId = "nav-git";

    const activeItem = document.getElementById(targetId);
    if (activeItem) activeItem.classList.add("active");

    // ─────────────────────────────────────────────────────────────────────
    // STEP 4. 모바일 햄버거 토글
    // ─────────────────────────────────────────────────────────────────────
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu       = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // 열릴 때 ☰ → ✕, 닫힐 때 ✕ → ☰
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }
});
