ACTIONS.house={name:'Ev · Elif',acts:[
  {k:'E',t:'Elif ile vakit geçir',f:function(){
    S.mood=clamp(S.mood+18,0,100);S.fun=clamp(S.fun+6,0,100);S.min+=45;
    // sinematik başlat
    P.g.position.set(W.g.position.x+0.8,FY,W.g.position.z+0.5);
    cineStart(SCENES.house_talk);
  }},
  {k:'F',t:'Elif ile yakınlaş',f:function(){
    if(S.mood<40){toast('Elif\'in morali buna hazır değil.');return}
    S.mood=clamp(S.mood+22,0,100);S.fun=clamp(S.fun+14,0,100);S.min+=90;
    P.g.position.set(W.g.position.x+0.6,FY,W.g.position.z+0.8);
    cineStart(SCENES.house_intimate);
  }},
  {k:'Q',t:'Uyu (gün geçer)',f:function(){
    S.mood=clamp(S.mood+10,0,100);S.sup=clamp(S.sup-25,0,100);S.fun=clamp(S.fun+5,0,100);S.min+=8*60;
    toast('Uyudun. Yeni bir gün.');
  }},
  {k:'R',t:'Market alışverişi (−₺200)',f:function(){
    if(S.money<200){toast('Yeterli paran yok.');return}
    S.money-=200;S.sup=clamp(S.sup+40,0,100);S.mood=clamp(S.mood+4,0,100);S.min+=30;toast('Buzdolabını doldurdun.');
  }}
]};

ACTIONS.club={name:'Gece Kulübü',acts:[
  {k:'E',t:'Bir şeyler iç (−₺300)',f:function(){
    if(S.money<300){toast('Cebinde yeterli para yok.');return}
    S.money-=300;S.fun=clamp(S.fun+28,0,100);S.mood=clamp(S.mood-12,0,100);S.min+=150;
    cineStart(SCENES.club_drink);
  }},
  {k:'F',t:'Piste çık (−₺100)',f:function(){
    if(S.money<100){toast('Para yetersiz.');return}
    S.money-=100;S.fun=clamp(S.fun+22,0,100);S.min+=90;
    cineStart(SCENES.club_dance);
  }},
  {k:'Q',t:'VIP loca (−₺800)',f:function(){
    if(S.money<800){toast('VIP için paran yetmiyor.');return}
    if(S.mood<30){toast('Kafan burada değil.');return}
    S.money-=800;S.fun=clamp(S.fun+34,0,100);S.mood=clamp(S.mood-18,0,100);S.min+=120;
    cineStart(SCENES.club_vip);
  }}
]};