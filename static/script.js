  (function initParallax() {
    const bg = document.getElementById('bg');
    const eren = document.getElementById('eren');
    const title = document.querySelector('.parallax-content h1');
    if (!bg || !eren) return;
    function apply(x, y) {
      requestAnimationFrame(() => {
        bg.style.transform = `translate(${x * 0.45}px, ${y * 0.45}px) scale(1.1)`;
        eren.style.transform = `translate(calc(-50% + ${-x * 1.3}px), ${-y * 1.0}px)`;
        if (title) title.style.transform = `translate(${x * 0.65}px, ${y * 0.65}px)`;
      });
    }
    window.addEventListener('mousemove', (e) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const x = (window.innerWidth / 2 - e.pageX) / 55;
      const y = (window.innerHeight / 2 - e.pageY) / 55;
      apply(x, y);
    });
    function onOrient(event) {
      let x = event.gamma, y = event.beta;
      x = Math.max(Math.min(x, 25), -25) / 1.6;
      y = Math.max(Math.min(y - 45, 25), -25) / 1.6;
      apply(-x, -y);
    }
    function requestAccess() {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(s => { if (s === 'granted') window.addEventListener('deviceorientation', onOrient); })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', onOrient);
      }
    }
    window.addEventListener('click', requestAccess, { once: true });
  })();

  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));

  // Skill bars animation
  const bars = document.querySelectorAll('.bar-fill');
  const barIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w;
        barIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.35 });
  bars.forEach(b => barIo.observe(b));

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navLinks');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => { if (window.innerWidth <= 640) nav.classList.remove('open'); });
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.project-card').forEach(card => {
        if (f === 'all' || card.dataset.category === f) card.classList.remove('hidden');
        else card.classList.add('hidden');
      });
    });
  });