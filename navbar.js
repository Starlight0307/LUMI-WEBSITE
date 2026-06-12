document.addEventListener("DOMContentLoaded", function () {

    const navbarHTML = `
    <header class="top-navbar" id="top-navbar">
        <div class="nav-container">

            <a class="nav-logo" href="index.html">LUMI</a>

            <nav class="nav-menu" id="nav-menu">
                <button class="nav-item nav-mega-trigger" id="nav-lumi-btn">LUMI 소개</button>

                <button class="nav-item nav-mega-trigger" id="nav-dl-btn">다운로드</button>

                <button class="nav-item nav-mega-trigger" id="nav-support-btn">고객지원</button>
            </nav>

            <!-- 메가 메뉴 패널 (navbar 전체 너비) -->
            <div class="nav-mega-panel" id="nav-mega-panel">
                <div class="mega-inner">

                    <div class="mega-group">
                        <p class="mega-group-title">LUMI 소개</p>
                        <a class="mega-item" id="nav-about" href="about.html">
                            <span class="mega-icon">💡</span>
                            <span class="mega-text">
                                <strong>LUMI 소개</strong>
                                <em>프로젝트 개요 · 기능 · 비교</em>
                            </span>
                        </a>
                        <a class="mega-item" id="nav-team" href="team.html">
                            <span class="mega-icon">👥</span>
                            <span class="mega-text">
                                <strong>팀 소개</strong>
                                <em>Team Build It 멤버</em>
                            </span>
                        </a>
                    </div>

                    <div class="mega-divider"></div>

                    <div class="mega-group">
                        <p class="mega-group-title">다운로드</p>
                        <a class="mega-item" id="nav-installer" href="installer.html">
                            <span class="mega-icon">📦</span>
                            <span class="mega-text">
                                <strong>설치 파일 다운로드</strong>
                                <em>Windows · macOS · Linux</em>
                            </span>
                        </a>
                        <a class="mega-item" id="nav-git" href="git.html">
                            <span class="mega-icon">🐙</span>
                            <span class="mega-text">
                                <strong>Git에서 다운로드</strong>
                                <em>소스코드 클론 · 빌드</em>
                            </span>
                        </a>
                    </div>

                    <div class="mega-divider"></div>

                    <div class="mega-group">
                        <p class="mega-group-title">고객지원</p>
                        <a class="mega-item" id="nav-reviews" href="support.html#tab-reviews">
                            <span class="mega-icon">⭐</span>
                            <span class="mega-text">
                                <strong>사용자 후기</strong>
                                <em>평점 · 리뷰 작성</em>
                            </span>
                        </a>
                        <a class="mega-item" id="nav-qa" href="support.html#tab-qa">
                            <span class="mega-icon">❓</span>
                            <span class="mega-text">
                                <strong>Q / A</strong>
                                <em>자주 묻는 질문</em>
                            </span>
                        </a>
                        <a class="mega-item" id="nav-contact" href="support.html#tab-contact">
                            <span class="mega-icon">📧</span>
                            <span class="mega-text">
                                <strong>고객센터</strong>
                                <em>문의 · 버그 리포트</em>
                            </span>
                        </a>
                    </div>

                </div>
            </div>

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

    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;
    navbarContainer.innerHTML = navbarHTML;

    const navbar        = document.getElementById('top-navbar');
    const navMenu       = document.getElementById('nav-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const megaPanel     = document.getElementById('nav-mega-panel');
    const megaTriggers  = document.querySelectorAll('.nav-mega-trigger');

    /* ── 현재 페이지 active 처리 ── */
    const page = window.location.pathname.split("/").pop();
    const pageMap = {
        'about.html':     ['nav-about',    'nav-lumi-btn'],
        'team.html':      ['nav-team',     'nav-lumi-btn'],
        'installer.html': ['nav-installer','nav-dl-btn'],
        'git.html':       ['nav-git',      'nav-dl-btn'],
    };

    const supportHashMap = {
        '#tab-reviews': 'nav-reviews',
        '#tab-qa':      'nav-qa',
        '#tab-contact': 'nav-contact',
    };

    function setActiveIds(ids) {
        document.querySelectorAll('.mega-item.active, .nav-item.active')
            .forEach(el => el.classList.remove('active'));
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('active');
        });
    }

    if (page === 'support.html') {
        /* 초기 로드 시 해시 기반 active */
        const hashItem = supportHashMap[window.location.hash] || 'nav-reviews';
        setActiveIds([hashItem, 'nav-support-btn']);
    } else {
        setActiveIds(pageMap[page] || []);
    }

    /* ── 메가 메뉴: 호버로 열고 닫기 ── */
    let closeTimer;

    function openMega() {
        clearTimeout(closeTimer);
        megaPanel.classList.add('open');
        megaTriggers.forEach(t => t.classList.add('mega-open'));
    }
    function closeMega() {
        closeTimer = setTimeout(() => {
            megaPanel.classList.remove('open');
            megaTriggers.forEach(t => t.classList.remove('mega-open'));
        }, 150);
    }

    megaTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', openMega);
        trigger.addEventListener('mouseleave', closeMega);
    });
    megaPanel.addEventListener('mouseenter', openMega);
    megaPanel.addEventListener('mouseleave', closeMega);

    /* 모바일: 클릭으로 토글 */
    megaTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            if (window.innerWidth > 768) return;
            megaPanel.classList.toggle('open');
        });
    });

    /* 외부 클릭 시 닫기 */
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-mega-trigger') && !e.target.closest('.nav-mega-panel')) {
            megaPanel.classList.remove('open');
            megaTriggers.forEach(t => t.classList.remove('mega-open'));
        }
    });

    /* ── 모바일 햄버거 토글 ── */
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    /* ── 스크롤 감지 ── */
    if (!navbar) return;
    const isIndex = (page === '' || page === 'index.html');

    if (!isIndex) {
        navbar.classList.add('scrolled');
    } else {
        function onScroll() {
            navbar.classList.toggle('scrolled', window.scrollY > 80);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
});
