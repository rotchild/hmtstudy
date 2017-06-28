/**
 * Created by fyb on 2014/6/26.
 */

var SoundPlayer = (function () {
    function SoundPlayer(opt) {
        this.sounds = opt;
        for (var sound in opt){
            var audio = document.createElement("audio");
            audio.src=opt[sound];
            document.body.appendChild(audio);
            this.sounds[sound]=audio;
        }

    }
    SoundPlayer.prototype.play = function (name) {
        this.sounds[name].play();
    };
    return SoundPlayer;
})();
