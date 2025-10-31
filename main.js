(function(){
  const STORAGE_KEY = 'panzz_chant_playing';

  document.addEventListener('DOMContentLoaded', () => {
    const audio = document.querySelector('#chant');
    const bio = document.querySelector('.bio');
    if(!audio || !bio) return;

    const ctrl = document.createElement('button');
    ctrl.className = 'btn';
    ctrl.style.marginLeft = '12px';
    ctrl.textContent = 'Play Chant';

    const pref = localStorage.getItem(STORAGE_KEY);
    let playingPref = pref === '1';

    function updateButton(){
      ctrl.textContent = audio.paused ? 'Play Chant' : 'Pause Chant';
    }

    ctrl.addEventListener('click', async () => {
      if(audio.paused){
        try{ await audio.play(); playingPref = true; localStorage.setItem(STORAGE_KEY,'1'); }
        catch(e){ console.warn('Play failed:', e); }
      } else {
        audio.pause(); playingPref = false; localStorage.setItem(STORAGE_KEY,'0');
      }
      updateButton();
    });

    bio.appendChild(ctrl);

    (async function tryAutoplay(){
      try{
        if(playingPref){ await audio.play(); }
      } catch(err){
        console.log('Autoplay diblokir:', err);
      } finally{ updateButton(); }
    })();

    document.addEventListener('keydown', (e)=>{
      if(e.key.toLowerCase()==='m'){
        audio.muted = !audio.muted;
        const note = document.createElement('div');
        note.textContent = audio.muted ? 'Audio muted' : 'Audio unmuted';
        note.style.position='fixed';
        note.style.right='16px';
        note.style.bottom='16px';
        note.style.padding='10px 14px';
        note.style.background='rgba(0,0,0,0.6)';
        note.style.borderRadius='8px';
        document.body.appendChild(note);
        setTimeout(()=> note.remove(), 1200);
      }
    });
  });
})();
