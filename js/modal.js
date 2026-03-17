const ModalModule = (() => {
  const overlay   = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');

  function open(post) {
    const tags = (post.tags || [])
      .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
      .join('');

    const likes    = post.reactions?.likes    ?? post.reactions ?? 0;
    const dislikes = post.reactions?.dislikes ?? 0;

    modalBody.innerHTML = `
      <p class="modal-post-number">POST #${post.id}</p>
      <h2 class="modal-post-title">${escapeHtml(post.title)}</h2>
      <p class="modal-post-body">${escapeHtml(post.body)}</p>
      ${tags ? `<div class="modal-post-tags">${tags}</div>` : ''}
      <div class="modal-stats">
        <span class="modal-stat">👍 ${likes} likes</span>
        ${dislikes ? `<span class="modal-stat">👎 ${dislikes} dislikes</span>` : ''}
        <span class="modal-stat">👁 ${post.views ?? '—'} vistas</span>
      </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  return { open, close };
})();