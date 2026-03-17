const FormModule = (() => {
  const titleInput    = document.getElementById('postTitle');
  const bodyInput     = document.getElementById('postBody');
  const tagsInput     = document.getElementById('postTags');
  const titleCount    = document.getElementById('titleCount');
  const bodyCount     = document.getElementById('bodyCount');
  const tagsPreview   = document.getElementById('tagsPreview');
  const formFeedback  = document.getElementById('formFeedback');
  const submitBtn     = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const submitBtnLoader= document.getElementById('submitBtnLoader');
  const previewSection = document.getElementById('previewSection');
  const previewCard   = document.getElementById('previewCard');

  function initCounters() {
    titleInput.addEventListener('input', () => {
      const len = titleInput.value.length;
      titleCount.textContent = `${len}/120`;
      titleCount.classList.toggle('warn', len > 100);
      updatePreview();
    });

    bodyInput.addEventListener('input', () => {
      const len = bodyInput.value.length;
      bodyCount.textContent = `${len}/1000`;
      bodyCount.classList.toggle('warn', len > 900);
      updatePreview();
    });

    tagsInput.addEventListener('input', () => {
      renderTagsPreview();
      updatePreview();
    });
  }

  function renderTagsPreview() {
    const tags = parseTags();
    tagsPreview.innerHTML = tags
      .map(t => `<span class="tag">${escapeHtml(t)}</span>`)
      .join('');
  }

  function parseTags() {
    return tagsInput.value
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);
  }

  function updatePreview() {
    const title = titleInput.value.trim();
    const body  = bodyInput.value.trim();

    if (!title && !body) {
      previewSection.setAttribute('hidden', '');
      return;
    }

    previewSection.removeAttribute('hidden');
    const tags = parseTags().map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');

    previewCard.innerHTML = `
      <span class="card-number">PREVIEW</span>
      <h3 class="card-title">${escapeHtml(title) || '<em style="opacity:.4">Sin título</em>'}</h3>
      <p class="card-body">${escapeHtml(body) || '<em style="opacity:.4">Sin contenido</em>'}</p>
      ${tags ? `<div class="card-tags">${tags}</div>` : ''}
      <div class="card-footer">
        <div class="card-reactions">
          <span class="card-reaction">👍 0</span>
        </div>
        <span>👁 0</span>
      </div>
    `;
  }

  function validate() {
    let valid = true;

    titleInput.classList.remove('error');
    bodyInput.classList.remove('error');

    if (!titleInput.value.trim()) {
      titleInput.classList.add('error');
      titleInput.focus();
      valid = false;
    }

    if (!bodyInput.value.trim()) {
      bodyInput.classList.add('error');
      if (valid) bodyInput.focus();
      valid = false;
    }

    return valid;
  }

  function showFeedback(type, message) {
    formFeedback.removeAttribute('hidden');
    formFeedback.className = type;
    formFeedback.innerHTML = `
      <span>${type === 'success' ? '✓' : '✕'}</span>
      <span>${message}</span>
    `;
  }

  function hideFeedback() {
    formFeedback.setAttribute('hidden', '');
    formFeedback.className = '';
  }

  function setSubmitting(loading) {
    submitBtn.disabled = loading;
    submitBtnText.textContent = loading ? 'Publicando' : 'Publicar';
    if (loading) {
      submitBtnLoader.removeAttribute('hidden');
    } else {
      submitBtnLoader.setAttribute('hidden', '');
    }
  }

  async function submitPost() {
    hideFeedback();

    if (!validate()) {
      showFeedback('error', 'Por favor completa los campos obligatorios.');
      return;
    }

    const postData = {
      title:  titleInput.value.trim(),
      body:   bodyInput.value.trim(),
      tags:   parseTags(),
      userId: 1,
    };

    setSubmitting(true);

    try {
      const newPost = await API.createPost(postData);

      showFeedback('success', `Post "${newPost.title}" publicado con ID #${newPost.id}`);
      Toast.show('¡Post publicado con éxito! 🎉', 'success');

      PostsModule.prependPost(newPost);

      setTimeout(() => {
        resetForm();
        hideFeedback();
        App.navigate('home');
      }, 2200);

    } catch (err) {
      showFeedback('error', err.message || 'Error al publicar el post.');
      Toast.show('Error al publicar el post', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    titleInput.value = '';
    bodyInput.value  = '';
    tagsInput.value  = '';
    titleCount.textContent = '0/120';
    bodyCount.textContent  = '0/1000';
    titleCount.classList.remove('warn');
    bodyCount.classList.remove('warn');
    titleInput.classList.remove('error');
    bodyInput.classList.remove('error');
    tagsPreview.innerHTML  = '';
    previewSection.setAttribute('hidden', '');
    hideFeedback();
  }

  function init() {
    initCounters();
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  return { init, submitPost, resetForm };
})();