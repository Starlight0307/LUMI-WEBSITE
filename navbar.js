document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================================
     * navbar.js — LUMI 공통 상단 네비게이션 바 동적 주입 스크립트
     * ===================================================================== */

    const navbarHTML = `
    <header class="top-navbar" id="top-navbar">
        <div class="nav-container">

            <a class="nav-logo" href="index.html">LUMI</a>

            <nav class="nav-menu" id="nav-menu">
                <a class="nav-item" id="nav-index"     href="index.html">LUMI 소개</a>
                <a class="nav-item" id="nav-installer" href="installer.html">설치 파일 다운로드</a>
                <a class="nav-item" id="nav-git"       href="git.html">Git에서 다운로드</a>
            </nav>

            <div class="nav-right">
                <a href="auth.html" class="btn-login">로그인</a>
            </div>

            <div class="nav-mobile-actions">
                <a href="auth.html" class="btn-login-mobile">로그인</a>
                <div class="menu-toggle" id="mobile-menu-btn">☰</div>
            </div>

        </div>
    </header>
    `;

    /* STEP 1: HTML 주입 */
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;
    navbarContainer.innerHTML = navbarHTML;

    /* STEP 2: 주입 직후 요소 참조 — innerHTML 완료 후이므로 안전 */
    const navbar        = document.getElementById('top-navbar');
    const navMenu       = document.getElementById('nav-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    /* STEP 3: 현재 페이지 active 처리 */
    const page = window.location.pathname.split("/").pop();
    let targetId = "nav-index";
    if (page === "installer.html") targetId = "nav-installer";
    else if (page === "git.html")  targetId = "nav-git";
    const activeItem = document.getElementById(targetId);
    if (activeItem) activeItem.classList.add("active");

    /* STEP 4: 모바일 햄버거 토글 */
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    /* STEP 5: 스크롤 감지
       - index.html  : 투명 시작 → 80px 스크롤 시 .scrolled
       - 나머지 페이지: 즉시 .scrolled 고정 (항상 불투명)          */
    if (!navbar) return;

    const isIndex = (page === '' || page === 'index.html');

    if (!isIndex) {
        navbar.classList.add('scrolled');
    } else {
        function onScroll() {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); /* 새로고침 후 현재 스크롤 위치 즉시 반영 */
    }
}); 