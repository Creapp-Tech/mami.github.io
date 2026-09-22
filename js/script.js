(function(){
  var gate = document.getElementById('gate');
  var card = document.getElementById('card');
  var openBtn = document.getElementById('openBtn');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Música: "A Thousand Years" (Christina Perri) ----------
  var musicToggle = document.getElementById('musicToggle');
  var soundtrack = document.getElementById('soundtrack');
  var musicMuted = false;
  var musicStarted = false;
  var embedMode = false;

  function embedURL(){
    return 'https://www.youtube.com/embed/85zr83teaug?autoplay=1'
      + '&mute=' + (musicMuted ? 1 : 0)
      + '&controls=0&disablekb=1&playsinline=1&loop=1&playlist=85zr83teaug&rel=0';
  }

  // Respaldo: si no está el archivo de audio local, reproduce vía YouTube.
  function startEmbed(){
    embedMode = true;
    var holder = document.getElementById('music-player');
    holder.innerHTML = '';
    var iframe = document.createElement('iframe');
    iframe.src = embedURL();
    iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('title', 'A Thousand Years');
    holder.appendChild(iframe);
  }

  function startMusic(){
    if(musicStarted) return;
    musicStarted = true;
    musicToggle.classList.remove('is-hidden');

    if(embedMode || !soundtrack){
      startEmbed();
      return;
    }

    soundtrack.volume = 0.7;
    soundtrack.muted = musicMuted;
    var p = soundtrack.play();
    if(p && p.catch){ p.catch(startEmbed); }
  }

  soundtrack.addEventListener('error', function(){
    if(embedMode) return;
    embedMode = true;
    if(musicStarted){ startEmbed(); }
  });

  musicToggle.addEventListener('click', function(){
    musicMuted = !musicMuted;
    if(embedMode){
      startEmbed();
    } else if(soundtrack){
      soundtrack.muted = musicMuted;
    }
    musicToggle.classList.toggle('is-muted', musicMuted);
    musicToggle.setAttribute('aria-pressed', String(musicMuted));
    musicToggle.setAttribute('aria-label', musicMuted ? 'Activar sonido' : 'Silenciar música');
  });

  function openCard(){
    gate.classList.add('hidden');
    card.classList.add('revealed');
    card.removeAttribute('aria-hidden');
    if(!reduceMotion){ launchPetals(); }
    startMusic();
  }

  openBtn.addEventListener('click', openCard);

  // ---------- Tabs ----------
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.letter');

  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      var target = tab.getAttribute('data-tab');

      tabs.forEach(function(t){
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(function(p){
        p.classList.remove('active');
        if(p.getAttribute('data-panel') === target){
          p.classList.add('active');
        }
      });
    });
  });

  // ---------- Pétalos (un solo momento orquestado) ----------
  function launchPetals(){
    var canvas = document.getElementById('petals-canvas');
    var ctx = canvas.getContext('2d');
    var DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize(){
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    resize();

    var colors = ['#D9BD86', '#B5695F', '#8E74B5', '#C77B8C'];
    var particles = [];
    var W = window.innerWidth;
    var count = W < 600 ? 26 : 42;

    for(var i=0;i<count;i++){
      particles.push({
        x: Math.random()*W,
        y: -20 - Math.random()*200,
        size: 5 + Math.random()*6,
        speedY: 1 + Math.random()*1.6,
        speedX: (Math.random()-0.5)*0.6,
        sway: Math.random()*Math.PI*2,
        swaySpeed: 0.01 + Math.random()*0.02,
        rotation: Math.random()*Math.PI,
        rotationSpeed: (Math.random()-0.5)*0.03,
        color: colors[Math.floor(Math.random()*colors.length)],
        opacity: 0.75 + Math.random()*0.25,
        life: 1
      });
    }

    var start = Date.now();
    var duration = 4200;

    function drawPetal(p){
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity * p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size*0.55, p.size, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }

    function frame(){
      var elapsed = Date.now() - start;
      ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

      var fadeStart = duration - 900;

      particles.forEach(function(p){
        p.sway += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.sway)*0.5;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if(elapsed > fadeStart){
          p.life = Math.max(0, 1 - (elapsed - fadeStart)/900);
        }

        drawPetal(p);
      });

      if(elapsed < duration){
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
      }
    }

    requestAnimationFrame(frame);

    window.addEventListener('resize', resize);
  }
})();
