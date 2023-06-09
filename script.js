let nada = document.querySelectorAll('.nada span');
// function nada pas jalan
function nadaJalan(){
    for(let i = 0; i < nada.length; i++){
        nada[i].style.background = 'linear-gradient(to bottom, #0096FF, #5800FF)';
        nada[i].style.boxShadow = '0 0 10px #5800FF';
        nada[0].style.animation = 'nada 1.2s linear infinite';
        nada[1].style.animation = 'nada 1s linear infinite';
        nada[2].style.animation = 'nada 1.2s linear infinite';
    };
}

// function nada pas berhenti
function nadaBerhenti(){
    for(let i = 0; i < nada.length; i++){
        nada[0].style.animation = 'none';
        nada[1].style.animation = 'none';
        nada[2].style.animation = 'none';
        nada[i].style.background = 'rgba(255, 255, 255, .2)';
        nada[i].style.boxShadow = 'none';
    };
}

let container = document.querySelector('.container');
container.addEventListener('click', (e) => {
    // bagian tombol play
    if( e.target.className == 'startAll' ){
        // dari Nodelist di ubah jadi Array
        let audioIndex = 0;
        let audioList = Array.from(document.querySelectorAll('audio'));
        let audioElement = audioList[audioIndex];
        audioElement.play();

        audioElement.addEventListener('ended', () => {
            audioIndex++

            // kasih kondisi jika indexnya lebih kecil dari index listnya 
            // maka update isi audioElementnya dengan index yang baru saja di ++
            if( audioIndex <= audioList.length ){
                audioElement = audioList[audioIndex];
                audioElement.play();
            }else{
                audioElement.pause();
            }
        });
        console.log(audioElement);
    }


    // bagian tombol play
    let noToggle = e.target.classList == 'play-icon' || e.target.classList == 'icon';
    let yesToggle = e.target.classList == 'play-icon cek-mulai' || e.target.classList == 'icon cek-mulai';
    if( ( noToggle ) || ( yesToggle ) ){
        console.log(e.target);
        // dikasih toggle biar ada pengecekan pas di klik lebih dari 1 area yg sama
        e.target.classList.toggle('cek-mulai');
        // ini pengecekan ifnya, gw taro di variabel aja biar gk pusing liatnya
        let yesToggle = e.target.classList == 'play-icon cek-mulai' || e.target.classList == 'icon cek-mulai';
        if( yesToggle ){
            let audio = e.target.parentElement.parentElement.parentElement.querySelector('audio');
            audio.addEventListener('ended', () => {
                // icon pausenya berubah jadi play
                let playIcon = e.target;
                playIcon.src = 'img/play.svg';
                playIcon.width = 18;
                
                // biar nada nya berhenti beranimasi pas lagunya selesai
                nadaBerhenti();
            });

            // biar pas di klik covernya muncul sesuai cover music masing"
            let cover = document.querySelector('.hero');
            let thsCover = e.target.id;
            cover.style.backgroundImage = `url('img/${thsCover}.jpeg')`;
            
            // biar nada nya beranimasi pas di pencet
            nadaJalan();

            // ini di cek klo yg di klik icon segitiganya, maka jalankan ini
            if( e.target.classList == 'icon cek-mulai' ){
                // ini biar judul am artist lagunya ke ganti
                let judul = cover.querySelector('.sdw h1');
                judul.innerHTML = e.target.parentElement.parentElement.parentElement.querySelector('h3').className;
                document.querySelector('.artist p').innerHTML = e.target.parentElement.parentElement.parentElement.querySelector('h3 p').className;

                // audionya nyala
                audio.play();
                audio.setAttribute('autoloop', '');
                
                let pauseIcon = e.target;
                pauseIcon.src = 'img/pause.svg';
                pauseIcon.width = 13;
                
            }else{ // ini sebaliknya jika yg di klik bukan yg segitiga maka jalankan yg ini
                let audio = e.target.parentElement.parentElement.querySelector('audio');
                audio.play();
                
                let pauseIcon = e.target.querySelector('.icon');
                pauseIcon.src = 'img/pause.svg';
                pauseIcon.width = 13;
            }
        }else{
            // biar nada nya berhenti beranimasi pas di pause
            nadaBerhenti();

            if(e.target.classList == 'icon' ){
                let audio = e.target.parentElement.parentElement.parentElement.querySelector('audio');
                audio.pause();
                
                let playIcon = e.target;
                playIcon.src = 'img/play.svg';
                playIcon.width = 18;
                
            }else{
                let audio = e.target.parentElement.parentElement.querySelector('audio');
                audio.pause();
                
                let playIcon = e.target.querySelector('.icon');
                playIcon.src = 'img/play.svg';
                playIcon.width = 18;
            }
        }
    }
});
