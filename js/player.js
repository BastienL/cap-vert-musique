var audio_id = document.getElementById("cs_audio");
audio_vol = audio_id.volume;
audio_id.volume = 0.6;

try {
  var measuredTime = new Date(null);
  measuredTime.setSeconds(audio_id.duration);
  var MHSTime = measuredTime.toISOString().substr(11, 8);
  var a = MHSTime.split(':');
  var minutes = (+a[0]) * 60 + (+a[1]);
  document.getElementById("cs_audio_duration").innerHTML =  minutes+":"+((+a[2]) % 60);
}
catch(err) {
  audio_id.addEventListener('loadedmetadata', function() {
    var measuredTime = new Date(null);
    measuredTime.setSeconds(audio_id.duration);
    var MHSTime = measuredTime.toISOString().substr(11, 8);
    document.getElementById("cs_audio_duration").innerHTML = MHSTime;

    var a = MHSTime.split(':');

    var minutes = (+a[0]) * 60 + (+a[1]);
    document.getElementById("cs_audio_duration").innerHTML = minutes+":"+((+a[2]) % 60);
  });
}

audio_id.ontimeupdate = function() {
  if (audio_id.paused) {
    document.getElementById("cs_audio_play").style.display = "inline-block";
    document.getElementById("cs_audio_pause").style.display = "none";
  }
  else  {
    document.getElementById("cs_audio_pause").style.display = "inline-block";
    document.getElementById("cs_audio_play").style.display = "none";
  }
};

function playPause() {
  if (audio_id.paused) {
    audio_id.play();
  }
  else {
    audio_id.pause();
  }
}

document.getElementById("cs_audio_play").addEventListener("click", function(){
  audio_id.play();
});

document.getElementById("cs_audio_pause").addEventListener("click", function(){
  audio_id.pause();
});

document.onkeydown = function(event) {
  switch (event.keyCode) {
  case 37:
    event.preventDefault();
    audio_currentTime = audio_id.currentTime;
    audio_id.currentTime = audio_currentTime - 5;
    break;
  case 38:
    event.preventDefault();
    audio_vol = audio_id.volume;
    if (audio_vol!=1) {
      try {
          audio_id.volume = audio_vol + 0.02;
      }
      catch(err) {
          audio_id.volume = 1;
      }
    }
    break;
  case 39:
    event.preventDefault();
    audio_currentTime = audio_id.currentTime;
    audio_id.currentTime = audio_currentTime + 5;
    break;
  case 40:
    event.preventDefault();
    audio_vol = audio_id.volume;
    if (audio_vol!=0) {
      try {
          audio_id.volume = audio_vol - 0.02;
      }
      catch(err) {
          audio_id.volume = 0;
      }
    }
    break;
  case 32:
    event.preventDefault();
    playPause();
    break;
  }
};

audio_id.addEventListener('progress', function() {
  var ranges = [];
  var totaltime = audio_id.duration;
  for(var i = 0; i < audio_id.buffered.length; i ++) {
    ranges.push([
      buffTimestart = audio_id.buffered.start(i),
      buffTimeend = audio_id.buffered.end(i),
      buffpercentage = (buffTimeend/totaltime)*100,
      document.getElementsByClassName("cs_audio_bar_loaded")[0].style.width = buffpercentage+"%"
    ]);
  }
}, false);

document.getElementsByClassName("cs_audio_bar")[0].addEventListener("click", vCurrentBarFun);

function vCurrentBarFun(event) {
  vCurrentBarWidth = event.clientX - document.getElementsByClassName("cs_audio_bar")[0].offsetLeft;
  document.getElementsByClassName("cs_audio_bar_now")[0].style.width = vCurrentBarWidth+"px";
  audio_id.currentTime = (((vCurrentBarWidth / document.getElementsByClassName("cs_audio_bar")[0].offsetWidth)*100)/100) * audio_id.duration;
}

if (audio_id.paused) {
  document.getElementById("cs_audio_pause").style.display = "none";
}
else  {
  document.getElementById("cs_audio_play").style.display = "none";
}
