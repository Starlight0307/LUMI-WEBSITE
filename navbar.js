document.addEventListener("DOMContentLoaded", function() {
    // 1. 공통으로 들어갈 상단바 HTML 코드 정의
    const navbarHTML = `
    <header class="top-navbar">
        <div class="nav-container">
            <a class="nav-logo" href="index.html">LUMI</a>
            <div class="menu-toggle" id="mobile-menu-btn">☰</div>
            <nav class="nav-menu" id="nav-menu">
                <a class="nav-item" id="nav-index" href="index.html">LUMI 소개</a>
                <a class="nav-item" id="nav-installer" href="installer.html">설치 파일 다운로드</a>
                <a class="nav-item" id="nav-git" href="git.html">Git에서 다운로드</a>
            </nav>
        </div>
    </header>
    `;

    // 2. HTML 문서 내에 id="navbar-container"인 영역에 상단바 주입
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;
    }

    // 3. 현재 열려있는 페이지의 URL을 확인하여 알맞은 메뉴에 하이라이트(active) 처리
    const path = window.location.pathname;
    const page = path.split("/").pop(); // 파일명만 추출 (예: index.html)
    
    let targetId = "nav-index"; // 기본적으로 홈 메뉴를 활성화
    
    if (page === "installer.html") {
        targetId = "nav-installer";
    } else if (page === "git.html") {
        targetId = "nav-git";
    }

    const activeItem = document.getElementById(targetId);
    if (activeItem) {
        activeItem.classList.add("active");
    }

    // 4. 모바일 화면에서 햄버거 메뉴 버튼 동작 연결
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});