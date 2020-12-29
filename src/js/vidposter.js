(function () {
  let vidContainers = Array.prototype.slice.apply(document.querySelectorAll('.vidcontainer')),
    allVids = Array.prototype.slice.apply(document.querySelectorAll('video-js'));
  
    const pauseExistingVideo = () => {
      // pause any running video before starting the next one
      allVids.forEach(vjs => {
        let id = vjs.id;
        if (!videojs(id).pause()) {
          let container = vjs.parentElement,
            currVidloop = container.querySelector('.vidloop'),
            currMain = container.querySelector('.mainvideo'),
            resumeBtn = container.querySelector('.pausePlay');
          videojs(id).pause();
          currVidloop.style.opacity ="1";
          resumeBtn.style.opacity = "1";
          currMain.style.opacity = "0";
        }
      });
    }

  vidContainers.forEach(vid => {
    let ppBtn = vid.querySelector('.pausePlay'),
      btnText = ppBtn.querySelector('.btnText'),
      vidoverlay = vid.querySelector('.vidoverlay'),
      vidloop = vid.querySelector('.vidloop'),
      mainvid = vid.querySelector('.mainvideo'),
      vidID = vid.querySelector('video-js').id,
      player = videojs(vidID);
    

    vidoverlay.addEventListener('click', () => {
      if (player.paused()) {
        pauseExistingVideo();
        // start this video
        player.play();
        
        mainvid.style.opacity = "1";
        ppBtn.style.opacity = "0";
        vidloop.style.opacity = "0";
        btnText.innerText = "Resume video";

        let ctrls = mainvid.querySelector('.vjs-control-bar'),
          pauseBtn = ctrls.querySelector('.vjs-playing');
        
        
        pauseBtn.addEventListener('click', () => {
          mainvid.style.opacity = "0";
          ppBtn.style.opacity = "1";
          vidloop.style.opacity = "1";
          // pauseBtn.classList.remove('vjs-playing');
          // pauseBtn.classList.add('vjs-paused');
        });
  
      } else {
        player.pause();
        mainvid.style.opacity = "0";
        ppBtn.style.opacity = "1";
        vidloop.style.opacity = "1";

        // let ctrls = mainvid.querySelector('.vjs-control-bar'),
        //   pauseBtn = ctrls.querySelector('.vjs-paused');
        
        // pauseBtn.classList.remove('.vjs-paused');
        // pauseBtn.classList.add('.vjs-playing');
        
      }
    });
  });

})();