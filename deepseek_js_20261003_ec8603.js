/* ---------- SİNEMATİK SAHNE MOTORU ---------- */
var CINE={active:false,seq:null,idx:0,t:0,on:false};
var cinemaEl=$('cinema'),cineTextEl=$('cineText'),cineHintEl=$('cineHint');
function cineStart(seq){
  CINE.active=true;CINE.seq=seq;CINE.idx=0;CINE.t=0;CINE.on=true;
  cinemaEl.classList.add('on');cineHintEl.classList.add('on');
  document.exitPointerLock&&document.exitPointerLock();
  cineShow();
}
function cineShow(){
  var step=CINE.seq[CINE.idx];
  if(!step){cineEnd();return}
  CINE.t=0;
  cineTextEl.innerHTML='<small>'+(step.who||'')+'</small>'+step.text;
  cineTextEl.classList.add('on');
}
function cineNext(){
  CINE.idx++;
  if(CINE.idx>=CINE.seq.length){cineEnd();return}
  cineShow();
}
function cineEnd(){
  CINE.active=false;CINE.on=false;CINE.seq=null;
  cinemaEl.classList.remove('on');cineTextEl.classList.remove('on');cineHintEl.classList.remove('on');
  W.g.position.set(wifeHome.x,FY,wifeHome.z);
  if(clubSinger){clubSinger.g.position.set(15,FY+0.45,zB_SINGER);clubSinger.g.rotation.set(0,0,0)}
  P.g.visible=true;
}
// Eski nesne referansları için global tut
var zB_SINGER=ZF-CLUB.d+T+1.8;
var clubSinger=null;