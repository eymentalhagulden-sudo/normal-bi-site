// sinematik aktifse oyuncu kontrolünü kilitle, sahneyi ilerlet
if(CINE.active){
  CINE.t+=dt;
  cinePose(CINE.seq[CINE.idx],CINE.idx);
  var camCue=cineCamera(CINE.seq[CINE.idx],CINE.idx,CINE.seq.length);
  if(camCue){
    camera.position.lerp(camCue.pos,Math.min(1,dt*2));
    camLook.lerp(camCue.look,Math.min(1,dt*2));
    camera.lookAt(camLook);
  }
  // her 4 saniyede bir sonraki repliğe geç
  if(CINE.t>4.0){cineNext()}
  // render ve devam
  npcUpdate(dt,tt);
  clubAnim.tiles.forEach(function(t2){var h=(tt*0.12+t2.p*0.09)%1,pul=0.35+0.65*Math.max(0,Math.sin(tt*4.5+t2.p*1.7));hsl.setHSL(h,0.95,0.5);t2.m.emissive.copy(hsl);t2.m.emissiveIntensity=pul*1.1});
  clubAnim.beams.forEach(function(b2){b2.pv.rotation.z=Math.sin(tt*1.1+b2.i*1.3)*0.7;b2.pv.rotation.x=Math.cos(tt*0.9+b2.i*0.9)*0.55});
  if(clubAnim.ball)clubAnim.ball.rotation.y=tt*0.7;
  clubAnim.dancers.forEach(function(d){var p=d.p,ph=d.ph;if(d.type==='dance'){var bt=Math.abs(Math.sin(tt*4.5+ph));p.g.position.y=d.base+bt*0.12;p.arms[0].rotation.z=-0.5-bt*1.4;p.arms[1].rotation.z=0.5+bt*1.4;p.arms[0].rotation.x=Math.sin(tt*4.5+ph)*0.4;p.arms[1].rotation.x=-Math.sin(tt*4.5+ph)*0.4;p.elbows[0].rotation.x=-0.5-bt*0.8;p.elbows[1].rotation.x=-0.5-bt*0.8;p.legs[0].rotation.x=Math.sin(tt*4.5+ph)*0.25;p.legs[1].rotation.x=-Math.sin(tt*4.5+ph)*0.25}else if(d.type==='singer'){p.g.position.y=d.base+Math.abs(Math.sin(tt*2.2))*0.04;p.arms[1].rotation.x=-0.9+Math.sin(tt*2.2)*0.05;p.elbows[1].rotation.x=-1.6;p.arms[0].rotation.z=-0.2-Math.abs(Math.sin(tt*1.1))*0.7;p.g.rotation.y=Math.sin(tt*0.6)*0.25}else if(d.type==='bar'){p.arms[0].rotation.x=-0.5+Math.sin(tt*3)*0.3;p.arms[1].rotation.x=-0.3+Math.cos(tt*3)*0.2;p.elbows[0].rotation.x=-1.0;p.elbows[1].rotation.x=-0.9}});
  // zaman ve ihtiyaçlar da işlemeye devam etsin
  S.min+=dt*0.8;
  S.mood=clamp(S.mood-dt*0.11,0,100);S.sup=clamp(S.sup-dt*0.13,0,100);S.fun=clamp(S.fun-dt*0.09,0,100);
  hud();
  renderer.render(scene,camera);
  requestAnimationFrame(frame);
  return;
}