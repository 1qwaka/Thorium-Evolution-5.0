
var vec = new Vec2();

const thoriumBreakerHit1 = newEffect(12,e=>{
  Draw.color(Items.thorium.color);
  Lines.stroke(e.fout());
  Angles.randLenVectors(e.id,4,15*e.fin(),floatc2((x,y)=>{
    var angle = Mathf.angle(x,y);
    Lines.lineAngle(e.x+x,e.y+y,angle,1+3*e.fout());
  }));
});

const thoTrail = newEffect(12,e=>{
  Draw.color(Color.valueOf("BC6ABEFF"),Items.thorium.color,e.fin())
  //Lines.lineAngle(e.x,e.y,e.rotation,5*e.fout())
  Fill.square(e.x,e.y,3*e.fout(),45+e.rotation)
})

const thoLaserEffect = newEffect(14,e=>{
  Draw.color(Items.thorium.color,Color.valueOf("9b54bc"),e.fin())
  Lines.stroke(e.fout())
  var f = new Floatc2({get: function (x,y){
    Lines.lineAngle(e.x+x,e.y+y,Mathf.angle(x,y),1+3*e.fout())
  }})
  Angles.randLenVectors(e.id,2,25*e.fin(),f)
})

const thoLaserEffect2 = newEffect(16,e=>{
  Draw.color(Items.thorium.color,Color.valueOf("9b54bc"),e.fin())
  Lines.stroke(e.fout())
  for(i=0;i<4;i++){
    vec.trns(e.rotation+90*i,25*e.fin())
    Lines.lineAngle(e.x+vec.x,e.y+vec.y,e.rotation+90*i,3)
  }
})


const thoLaser = extend(BasicBulletType,{
  update(b){
    if(b.timer.get(6)){
      Effects.effect(thoLaserEffect,b)
      for(i=0;i<3;i++){
        Effects.effect(thoLaserEffect2,b.x+Mathf.range(2),b.y+Mathf.range(2),45)
      }
      Damage.collideLine(b,b.getTeam(),Fx.none,/*4.47=√(40/2)*/b.x-4.47,b.y-4.47,45,40)
      Damage.collideLine(b,b.getTeam(),Fx.none,b.x-4.47,b.y-4.47,135,40)
    }
  },
  draw(b){
    Draw.color(Items.thorium.color)
    Draw.rect("circle",b.x,b.y,40,b.fout()*2,45)
    Draw.rect("circle",b.x,b.y,40,b.fout()*2,135)
  }
})
thoLaser.damage = 55;
thoLaser.speed = 0;
thoLaser.lifetime = 25;
thoLaser.pierce = true;
thoLaser.collides = false;
thoLaser.collidesTiles = false;
thoLaser.hitEffect = thoriumBreakerHit1;
thoLaser.despawnEffect = Fx.none



const thoriumBreakerTho = extend(BasicBulletType,{
  update(b){
    if(b.fin()<0.7){
      if(b.timer.get(5))Effects.effect(thoTrail,b.x,b.y,b.rot())
    }
  },
  hit(b){
    Call.createBullet(thoLaser,b.getTeam(),b.x,b.y,0,1,1)
  },
  despawned(b){
    Call.createBullet(thoLaser,b.getTeam(),b.x,b.y,0,1,1)
  },
  draw(b){
    Draw.color(Color.valueOf("BC6ABEFF"))
    Fill.square(b.x,b.y,3+2*b.fin(),b.rot()+45+Time.time()*3)
    Draw.color(Color.valueOf("A253A4FF"))
    Fill.square(b.x,b.y,2+2*b.fin(),b.rot()+45)
  }
})
thoriumBreakerTho.speed = 4;
thoriumBreakerTho.lifetime = 60
thoriumBreakerTho.damage = 50


const thoriumBreakerHit2 = newEffect(12,e=>{
  Draw.color(Color.valueOf("527970FF"));
  Lines.stroke(e.fout());
  Angles.randLenVectors(e.id,4,18*e.fin(),floatc2((x,y)=>{
    var angle = Mathf.angle(x,y);
    Lines.lineAngle(e.x+x,e.y+y,angle,1+3*e.fout());
  }));
});

const radTrail = newEffect(12,e=>{
  Draw.color(Color.valueOf("527970FF"),Color.valueOf("8FB9AFFF"),e.fin())
  //Lines.lineAngle(e.x,e.y,e.rotation,5*e.fout())
  Fill.square(e.x,e.y,4.3*e.fout(),45+e.rotation)
})

const radLaserEffect = newEffect(14,e=>{
  Draw.color(Color.valueOf("8FB9AFFF"),Color.valueOf("527970FF"),e.fin())
  Lines.stroke(e.fout()*2)
  var f = new Floatc2({get: function (x,y){
    Lines.lineAngle(e.x+x,e.y+y,Mathf.angle(x,y),1+3*e.fout())
  }})
  Angles.randLenVectors(e.id,2,25*e.fin(),f)
})

const radLaserEffect2 = newEffect(16,e=>{
  Draw.color(Color.valueOf("527970FF"),Color.valueOf("8FB9AFFF"),e.fin())
  Lines.stroke(e.fout())
  for(i=0;i<4;i++){
    vec.trns(e.rotation+90*i,40*e.fin())
    Lines.lineAngle(e.x+vec.x,e.y+vec.y,e.rotation+90*i,4)
  }
})

const radLaser = extend(BasicBulletType,{
  update(b){
    if(b.timer.get(6)){
      Effects.effect(radLaserEffect,b)
      for(i=0;i<3;i++){
        Effects.effect(radLaserEffect2,b.x+Mathf.range(4),b.y+Mathf.range(4),45)
      }
      Damage.collideLine(b,b.getTeam(),Fx.none,b.x-5.74,b.y-5.74,45,66)
      Damage.collideLine(b,b.getTeam(),Fx.none,b.x-5.74,b.y-5.74,135,66)
    }
  },
  draw(b){
    Draw.color(Color.valueOf("527970FF"))
    Draw.rect("circle",b.x,b.y,66,b.fout()*3,45)
    Draw.rect("circle",b.x,b.y,66,b.fout()*3,135)
  }
})
radLaser.damage = 100;
radLaser.speed = 0;
radLaser.lifetime = 28;
radLaser.pierce = true;
radLaser.collides = false;
radLaser.collidesTiles = false;
radLaser.hitEffect = thoriumBreakerHit2;
radLaser.despawnEffect = Fx.none

const thoriumBreakerRad = extend(BasicBulletType,{
  update(b){
    if(b.fin()<0.7){
      if(b.timer.get(5))Effects.effect(radTrail,b.x,b.y,b.rot())
    }
  },
  hit(b){
    Call.createBullet(radLaser,b.getTeam(),b.x,b.y,0,1,1)
  },
  despawned(b){
    Call.createBullet(radLaser,b.getTeam(),b.x,b.y,0,1,1)
  },
  draw(b){
    Draw.color(Color.valueOf("8FB9AFFF"))
    Fill.square(b.x,b.y,4+3*b.fin(),b.rot()+45+Time.time()*3)
    Draw.color(Color.valueOf("527970FF"))
    Fill.square(b.x,b.y,3+2.5*b.fin(),b.rot()+45)
  }
})
thoriumBreakerRad.speed = 4.5;
thoriumBreakerRad.lifetime = 60
thoriumBreakerRad.damage = 100;


const thoriumBreakerHit3 = newEffect(12,e=>{
  Draw.color(Color.valueOf("B4BF70FF"));
  Lines.stroke(e.fout());
  Angles.randLenVectors(e.id,4,20*e.fin(),floatc2((x,y)=>{
    var angle = Mathf.angle(x,y);
    Lines.lineAngle(e.x+x,e.y+y,angle,1+3*e.fout());
  }));
});

const surgeTrail = newEffect(12,e=>{
  Draw.color(Color.valueOf("B4BF70FF"),Color.valueOf("D4E56FFF"),e.fin())
  //Lines.lineAngle(e.x,e.y,e.rotation,5*e.fout())
  Fill.square(e.x,e.y,4.5*e.fout(),45+e.rotation)
})

const surgeLaserEffect = newEffect(14,e=>{
  Draw.color(Color.valueOf("B4BF70FF"),Color.valueOf("D4E56FFF"),e.fin())
  Lines.stroke(e.fout()*2)
  var f = new Floatc2({get: function (x,y){
    Lines.lineAngle(e.x+x,e.y+y,Mathf.angle(x,y),1+3*e.fout())
  }})
  Angles.randLenVectors(e.id,2,30*e.fin(),f)
})

const surgeLaserEffect2 = newEffect(16,e=>{
  Draw.color(Color.valueOf("D4E56FFF"),Color.valueOf("B4BF70FF"),e.fin())
  Lines.stroke(e.fout())
  for(i=0;i<4;i++){
    vec.trns(e.rotation+90*i,50*e.fin())
    Lines.lineAngle(e.x+vec.x,e.y+vec.y,e.rotation+90*i,4)
  }
})

const surgeLaser = extend(BasicBulletType,{
  update(b){
    if(b.timer.get(6)){
      Effects.effect(surgeLaserEffect,b)
      for(i=0;i<3;i++){
        Effects.effect(surgeLaserEffect2,b.x+Mathf.range(5),b.y+Mathf.range(5),45)
      }
      Damage.collideLine(b,b.getTeam(),Fx.none,b.x-6.08,b.y-6.08,45,74)
      Damage.collideLine(b,b.getTeam(),Fx.none,b.x-6.08,b.y-6.08,135,74)
    }
  },
  draw(b){
    Draw.color(Color.valueOf("D4E56FFF"))
    Draw.rect("circle",b.x,b.y,74,b.fout()*3,45)
    Draw.rect("circle",b.x,b.y,74,b.fout()*3,135)
  }
})
surgeLaser.damage = 120;
surgeLaser.speed = 0;
surgeLaser.lifetime = 28;
surgeLaser.pierce = true;
surgeLaser.collides = false;
surgeLaser.collidesTiles = false;
surgeLaser.hitEffect = thoriumBreakerHit3;
surgeLaser.despawnEffect = Fx.none

const thoriumBreakerSurge = extend(BasicBulletType,{
  update(b){
    if(b.fin()<0.7){
      if(b.timer.get(5))Effects.effect(surgeTrail,b.x,b.y,b.rot())
    }
  },
  hit(b){
    Call.createBullet(surgeLaser,b.getTeam(),b.x,b.y,0,1,1)
  },
  despawned(b){
    Call.createBullet(surgeLaser,b.getTeam(),b.x,b.y,0,1,1)
  },
  draw(b){
    Draw.color(Color.valueOf("D4E56FFF"))
    Fill.square(b.x,b.y,4+3.5*b.fin(),b.rot()+45+Time.time()*3)
    Draw.color(Color.valueOf("B4BF70FF"))
    Fill.square(b.x,b.y,3+3*b.fin(),b.rot()+45)
  }
})
thoriumBreakerSurge.speed = 4.5;
thoriumBreakerSurge.lifetime = 60
thoriumBreakerSurge.damage = 120;



const thoriumBreaker = extendContent (ItemTurret,"thorium-breaker",{
  init(){
    this.ammo(Items.thorium,thoriumBreakerTho,
    itm("radium"),thoriumBreakerRad,
    Items.surgealloy,thoriumBreakerSurge)
    this.super$init()
  },
  load(){
    this.super$load()
    this.baseRegion = Core.atlas.find(mn+"block-5")
  },
  generateIcons(){
    return [Core.atlas.find(mn+"block-5"),Core.atlas.find(this.name)]
  }
})

