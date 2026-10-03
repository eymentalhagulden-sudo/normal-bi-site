/* ---------- +18 SİNEMATİK SAHNELER ---------- */
var SCENES={
  house_talk:[
    {who:'Elif',text:'Kapıyı yavaşça kapattın. Elif mutfaktan çıktı, elinde iki bardak çay.'},
    {who:'Elif',text:'"Bugün çok yoruldun, usta. Otur şöyle." Koltuğa bıraktı kendini, başını omzuna yasladı.'},
    {who:'',text:'Çayın buharı yükseliyor. Elif\'in saçı boynuna değiyor. Nefesi yavaş, sıcak.'},
    {who:'Elif',text:'"Bebeği hissettin mi bugün?" Elini karnına götürdü, senin elini üstüne koydu.'},
    {who:'',text:'Avucunun altında küçük bir hareket. Elif gülümsedi, gözleri doldu.'},
    {who:'Elif',text:'"Sen varsın ya... hiç korkmuyorum."'}
  ],
  house_intimate:[
    {who:'',text:'Elif elini tuttu, yatak odasına çekti. Kapı arkasından kapandı.'},
    {who:'Elif',text:'"Bugün benim sıram," dedi. Geceliğinin askısı omzundan kaydı.'},
    {who:'',text:'Tenin tenine değdi. Nefesi boynunda, elleri sırtında geziniyor.'},
    {who:'Elif',text:'"Yavaş... bebek var." Gülümsedi, kalçasını sana bastırdı.'},
    {who:'',text:'Yatağın kenarına oturdu, bacaklarını beline doladı. Odada sadece nefes sesleri.'},
    {who:'Elif',text:'"Seni seviyorum, usta." Fısıltı halinde, kulağının içine.'},
    {who:'',text:'Sabaha kadar uyumadınız.'}
  ],
  house_sleep:[
    {who:'',text:'Elif yatağa uzandı. Sen de yanına. Sırtını sana döndü, kolunu beline doladın.'},
    {who:'Elif',text:'"İyi geceler." Saçından öptün. Işığı kapattın.'}
  ],
  club_drink:[
    {who:'',text:'Bara yaklaştın. Barmen bir şey uzattı, buzların sesi müziğe karıştı.'},
    {who:'Barmen',text:'"Bu gece ilk senin, usta." Göz kırptı, şişeyi tezgâha vurdu.'},
    {who:'',text:'Işıklar döndü. Sahnede şarkıcı belirdi, mikrofonu dudağına götürdü.'},
    {who:'Şarkıcı',text:'"Bu şarkı senin için." Sesi kalabalığın üstünde yükseldi.'},
    {who:'',text:'İki saat müziğin içinde kayboldun. Saat geç oldu.'}
  ],
  club_vip:[
    {who:'',text:'Görevli seni VIP locaya aldı. Kapı arkasından kapandı.'},
    {who:'Dansçı',text:'"Sınır yok burada," dedi. Dizlerine oturdu, elbisesi omzundan kaydı.'},
    {who:'',text:'Parfümü ve ter kokusu karıştı. Kalçası ritmle seninkine değiyor.'},
    {who:'Dansçı',text:'"Sadece bu gece," diye fısıldadı. Dudağı kulağında, eli göğsünde.'},
    {who:'',text:'Işıklar kısıldı. Duvardaki neon seninkine vurdu.'}
  ],
  club_dance:[
    {who:'',text:'Pistin ortasına yürüdün. Işıklar seninle döndü.'},
    {who:'',text:'Bedenin ritme bıraktı kendini. Etrafındaki kalabalık seninle hareket etti.'},
    {who:'',text:'Ter, ışık, bas. Saatler geçti, hiç fark etmedin.'}
  ]
};

/* Sinematik kamera konumları — sahneye göre */
function cineCamera(step,idx,total){
  var p=CINE.seq;
  // sahne kimliğine göre kamera hedefi
  if(p===SCENES.house_talk||p===SCENES.house_sleep){
    var prog=idx/(total-1||1);
    var camPos=new THREE.Vector3(-22.5+prog*0.5,1.7+prog*0.2,-8.5+prog*1.2);
    var look=new THREE.Vector3(W.g.position.x,1.5,W.g.position.z);
    return {pos:camPos,look:look};
  }
  if(p===SCENES.house_intimate){
    var prog=idx/(total-1||1);
    var camPos=new THREE.Vector3(
      W.g.position.x+Math.cos(prog*Math.PI)*2.2,
      1.4+Math.sin(prog*Math.PI)*0.6,
      W.g.position.z+2.5-prog*1.5
    );
    var look=new THREE.Vector3(W.g.position.x,1.2,W.g.position.z);
    return {pos:camPos,look:look};
  }
  if(p===SCENES.club_drink||p===SCENES.club_dance){
    var t=tt*0.3;
    var camPos=new THREE.Vector3(15+Math.sin(t)*3,2.4+Math.sin(t*1.7)*0.4,-4+Math.cos(t)*2);
    var look=new THREE.Vector3(15,1.2,-7);
    return {pos:camPos,look:look};
  }
  if(p===SCENES.club_vip){
    var prog=idx/(total-1||1);
    var camPos=new THREE.Vector3(CLUB.x1+3.5,2.0+prog*0.3,-9.2+prog*1.5);
    var look=new THREE.Vector3(CLUB.x1+0.6,1.0,-9.2);
    return {pos:camPos,look:look};
  }
  return null;
}

/* Sinematik poz animasyonu — Elif/dansçı hareketleri */
function cinePose(step,idx){
  var p=CINE.seq;
  if(p===SCENES.house_intimate){
    var k=idx/6;
    W.g.rotation.y=Math.sin(k*Math.PI)*0.8;
    W.arms[0].rotation.x=-0.3-k*0.5;W.arms[1].rotation.x=-0.3-k*0.5;
    W.elbows[0].rotation.x=-1.3+k*0.4;W.elbows[1].rotation.x=-1.3+k*0.4;
    W.g.position.y=FY+Math.sin(k*Math.PI)*0.05;
  }
  if(p===SCENES.club_vip&&clubSinger){
    clubSinger.g.rotation.y=Math.sin(idx*0.7)*0.6;
    clubSinger.arms[0].rotation.z=-0.4-Math.sin(idx*1.3)*0.4;
    clubSinger.arms[1].rotation.z=0.4+Math.sin(idx*1.3)*0.4;
  }
}