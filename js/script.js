const themeSelector = document.getElementById('theme-selector');
window.addEventListener('load', function() {
  lazyLoadInstance.update();

  // Update theme selector with saved theme
  if ('theme' in localStorage) {
    if (localStorage.theme === 'light') {
      themeSelector.value = 'light';
    } else if (localStorage.theme === 'dark') {
      themeSelector.value = 'dark';
    }
  }

  // Force @2x header
  window.setTimeout(function() {
    let header = document.querySelector('header > div.lazy');
    header.classList.remove('blur-sm');
  }, 500);

  // Open external links in new tab
  [].forEach.call(document.querySelectorAll('a'), function(link) {
    if (link.getAttribute('href').charAt(0) === '#') return;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  });

  // Fetch recent blog posts
  const postsContainer = document.getElementById('posts');
  const parser = new DOMParser();
  fetch('https://thoughts-json.jareddantis.workers.dev')
    .then(response => response.json())
    .then(data => {
      const posts = data.rss.channel.item;

      // Display 3 recent posts
      for (let i = 0; i < 3; i++) {
        const post = posts[i];
        const title = post.title;
        const link = post.link;

        // Parse snippet HTML into string
        let snippet = post.description;
        const snippetHTML = parser.parseFromString(snippet, 'text/html');
        snippet = snippetHTML.body.textContent || snippetHTML.body.innerText || '';

        // Limit snippet to 90 characters
        if (snippet.length > 90) {
          snippet = snippet.substring(0, 87) + '...';
        }

        // Adjust date to local timezone
        const dateObject = new Date(post.pubDate);
        dateObject.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset());

        // Create post container
        const postContainer = document.createElement('a');
        postContainer.classList.add('card');
        postContainer.setAttribute('href', link);
        postContainer.setAttribute('target', '_blank');
        postContainer.setAttribute('rel', 'noopener');

        const postTitle = document.createElement('h3');
        postTitle.innerHTML = title;

        const postSnippet = document.createElement('p');
        postSnippet.innerHTML = snippet;

        const postDate = document.createElement('p');
        postDate.classList.add('text-sm');
        postDate.classList.add('mt-4');
        postDate.innerHTML = dateObject.toLocaleString();

        postContainer.appendChild(postTitle);
        postContainer.appendChild(postSnippet);
        postContainer.appendChild(postDate);
        postsContainer.appendChild(postContainer);
      }

      // Remove placeholder
      const placeholder = document.getElementById('placeholder');
      placeholder.remove();
    })
    .catch(err => {
      // Set placeholder text to error
      const placeholder = document.querySelector('#placeholder p');
      placeholder.innerHTML = 'Error fetching posts: ' + err;
    });
});

// Listen to theme change
themeSelector.addEventListener('change', function() {
  // Save new theme
  const newTheme = themeSelector.value;
  if (newTheme === 'auto') {
    localStorage.removeItem('theme');
  } else if (newTheme === 'light') {
    localStorage.theme = 'light';
  } else {
    localStorage.theme = 'dark';
  }

  // Reload page
  window.location.reload();
});
