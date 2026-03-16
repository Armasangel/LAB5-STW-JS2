const App = (() => {

  //Views
  const views = {
    home:   document.getElementById('view-home'),
    create: document.getElementById('view-create'),
  };

  const navBtns = document.querySelectorAll('.nav-btn');

  //Navigate between views
  function navigate(viewName) {
    //Hide all views
    Object.values(views).forEach(v => v.setAttribute('hidden', ''));

    //Show target
    const target = views[viewName];
    if (target) {
      target.removeAttribute('hidden');
    }

    //Update nav buttons
    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    //Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  //Set header date
  function setHeaderDate() {
    const el = document.getElementById('headerDate');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleDateString('es-GT', {
      day: '2-digit', month: 'short', year: 'numeric'
    }).toUpperCase();
  }

  //Init app
  function init() {
    setHeaderDate();
    PostsModule.init();
    FormModule.init();

    // Auto-load posts on start
    PostsModule.loadPosts(1);
  }

  document.addEventListener('DOMContentLoaded', init);

  return { navigate };
})();