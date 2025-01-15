document.addEventListener('DOMContentLoaded', function() {
    const tagButtons = document.querySelectorAll('.tag-btn');
    const posts = document.querySelectorAll('.archive-posts li');
    
    tagButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const tag = button.getAttribute('href').replace('#', '');
        
        tagButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        posts.forEach(post => {
          if (tag === '') {
            post.style.display = 'block';
          } else {
            const postTags = Array.from(post.querySelectorAll('.tag'))
              .map(t => t.textContent);
            post.style.display = postTags.includes(tag) ? 'block' : 'none';
          }
        });
      });
    });
  });