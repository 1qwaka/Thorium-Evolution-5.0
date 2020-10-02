const teshaders = require ("teshaders");

var colors = [
  Color.valueOf("EB6868FF"),
  Color.valueOf("EFB0B0FF"),
  Color.valueOf("EDDADAFF")
];

const dischargeChargeBegin = newEffect(50,e=>{
  Draw.color(colors[0]);
  Fill.circle(e.x,e.y,6.5*e.fin());
  Draw.color(colors[1]);
  Fill.circle(e.x,e.y,1+3.5*e.fin());
  Draw.color(colors[2]);
  Fill.circle(e.x,e.y,1.5+e.fin()*1.5);
});

const dischargeCharge = newEffect(18,e=>{
  Draw.color(colors[0],colors[2],e.fin());
  Angles.randLenVectors(e.id,3,5+30*e.fout(),e.rotation,120,floatc2((x,y)=>{
    Draw.rect("circle",e.x+x,e.y+y,7*e.fout()+1,0.5+3*e.fin(),Mathf.angle(x,y));
  }));
});

const dischargeHit = newEffect(28,e=>{
  Draw.color(colors[0]);
  Lines.stroke(2+e.fout());
  for(var i = 0; i<3;i++){
    Lines.swirl(e.x,e.y,22,e.fout()*1/3,120*i+60*e.fin()+(e.id%6)*60);
  }
  for(i = 1; i<3;i++){
    Lines.swirl(e.x,e.y,12,e.fout()*0.5,180*i+90*e.fin()+(e.id%6)*60);
  }
});

const dischargeShot = newEffect(18,e=>{
  Draw.color(colors[0]);
  Draw.rect("circle",e.x,e.y,e.fout(),8+2*e.fout(),e.rotation);
});

const dischargeSphere = extend(BasicBulletType,{
  hit(b){
    Damage.damage(b.getTeam(),b.x,b.y,22,150);
    Effects.effect(this.hitEffect,b);
    Effects.shake(8,16,b);
    for(var i = 0; i < 8; i++){
      Lightning.create(b.getTeam(),Color.valueOf("#e06262"),Mathf.random(180,250),b.x,b.y,Mathf.random(360), Mathf.random(5,25));
    }
  },
  despawned(b){
    this.hit(b);
  },
  draw(b){
    Draw.color(colors[0]);
    Fill.circle(b.x,b.y,6.5);
    Draw.color(colors[1]);
    Fill.circle(b.x,b.y,4.5+Mathf.range(0.5));
    Draw.color(colors[2]);
    Fill.circle(b.x,b.y,3);
  }
});
dischargeSphere.lifetime = 50;
dischargeSphere.damage = 300;
dischargeSphere.speed = 6;
dischargeSphere.hitEffect = dischargeHit;
//dischargeSphere

const tedischarge = extendContent (ChargeTurret,"tedischarge",{
  load(){
    this.super$load();
    this.baseRegion = Core.atlas.find(mn+"block-6");
  },
  setStats(){
    this.super$setStats();
    this.stats.remove(BlockStat.damage);
    this.stats.add(BlockStat.damage,"~3000","");
  },
  generateIcons (){
    return [Core.atlas.find(mn+"block-6"),
    Core.atlas.find(this.name)];
  }
});
tedischarge.shootType = dischargeSphere;
tedischarge.chargeBeginEffect = dischargeChargeBegin;
tedischarge.chargeEffect = dischargeCharge;