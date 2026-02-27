document.addEventListener('DOMContentLoaded', function() {
    // 1. Floating Top Button Logic
    const topBtn = document.querySelector('.floating-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. Automatic TOC Generation (for Article Pages)
    const tocContainer = document.querySelector('.toc-content');
    if (tocContainer) {
        const articleBody = document.querySelector('.article-content');
        const headers = articleBody.querySelectorAll('h2, h3');
        
        if (headers.length > 0) {
            const tocList = document.createElement('ul');
            tocList.className = 'list-unstyled mb-0';
            
            headers.forEach((header, index) => {
                const id = 'heading-' + index;
                header.setAttribute('id', id);
                
                const listItem = document.createElement('li');
                listItem.className = header.tagName === 'H3' ? 'ms-4 mb-2' : 'mb-2';
                
                const link = document.createElement('a');
                link.href = '#' + id;
                link.textContent = header.textContent;
                link.className = 'text-decoration-none text-dark';
                link.style.fontWeight = header.tagName === 'H2' ? '600' : '400';
                
                listItem.appendChild(link);
                tocList.appendChild(listItem);
            });
            
            tocContainer.appendChild(tocList);
        }
    }

    // TOC Toggle Logic
    const findTocTitle = document.querySelector('.toc-title');
    if (findTocTitle) {
        findTocTitle.addEventListener('click', () => {
            const content = document.querySelector('.toc-content');
            const icon = findTocTitle.querySelector('i');
            if (content.style.display === 'block') {
                content.style.display = 'none';
                icon.className = 'bi bi-chevron-down';
            } else {
                content.style.display = 'block';
                icon.className = 'bi bi-chevron-up';
            }
        });
    }

    // 3. Social Share Logic
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl = '';

            if (btn.classList.contains('wa')) {
                shareUrl = `https://api.whatsapp.com/send?text=${title} - ${url}`;
            } else if (btn.classList.contains('fb')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (btn.classList.contains('tw')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            }

            if (shareUrl) window.open(shareUrl, '_blank');
        });
    });

    // 4. Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
