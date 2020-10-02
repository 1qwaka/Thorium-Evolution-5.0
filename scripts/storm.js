var rand = new Rand()
var vec = new Vec2()

const stormEffect = newEffect (24,e=>{
  Draw.color(Color.valueOf("#3d45a9"),Color.valueOf("#688dea"),e.fin())
  f = new Floatc2({get: function (x,y){
    Fill.circle(e.x+x,e.y+y,1+e.data)
  }})
  Angles.randLenVectors(e.id,3,11*e.fin()+e.data*3,e.rotation,25,f)
})

const stormEffect2 = newEffect (28,e=>{
  Draw.color(Color.valueOf("#3d45a9"),Color.valueOf("#688dea"),e.fin())
  rand.setSeed(e.id)
  var a = rand.random(4,8)
  for(i=0;i<a;i++){
    vec.trns(e.fin()*((360/a)*i)+e.id%180,2+10*e.fin())
    Fill.circle(e.x+vec.x,e.y+vec.y,1.5+rand.random(2,4)*e.fout())
  }
})

const stormstorm = extend(BasicBulletType,{
  update(b){
    this.super$update(b)
    if(Mathf.chance(0.1)) Effects.effect(stormEffect,b.x,b.y,b.rot(),Mathf.random(0.5,2))
    if(Mathf.chance(0.1)) Effects.effect(stormEffect2,b.x,b.y,b.rot(),Mathf.random(1,3))
  },
  draw(b){
    Draw.color(Color.valueOf("#3d45a9"))
    Fill.circle(b.x,b.y,3)
  }
})
stormstorm.speed = 4.5;
stormstorm.lifetime = 45;
stormstorm.hitEffect = stormEffect;
stormstorm.despawnEffect = stormEffect;
stormstorm.homingPower = 0.001;
stormstorm.homingRange = 200;
stormstorm.damage = 250

const stormBulletHit = newEffect(20,e=>{
  Draw.color(Color.valueOf("#3d45a9"),Color.valueOf("#688dea"),e.fin())
  for(i=0;i<4;i++){
    Fill.circle(e.x+Mathf.range(4),e.y+Mathf.range(4),3*e.fout())
  }
})

const stormBulletShot = newEffect(12,e=>{
  Draw.color(Color.valueOf("#3d45a9"),Color.valueOf("#688dea"),e.fin())
  Fill.circle(e.x,e.y,3*e.fout())
})

const stormBulletDespawn = newEffect (24,e=>{
  Draw.color(Color.valueOf("#3d45a9"),Color.valueOf("#688dea"),e.fin())
  f = new Floatc2({get: function (x,y){
    Fill.circle(e.x+x,e.y+y,3*e.fout())
  }})
  Angles.randLenVectors(e.id,6,11*e.fin(),f)
})

const stormBullet = extend(BasicBulletType,{
  draw(b){
    
  }
})
stormBullet.speed = 8;
stormBullet.lifetime = 30; 
stormBullet.damage = 35;
stormBullet.hitEffect = stormBulletHit
stormBullet.despawnEffect = stormBulletDespawn
stormBullet.smokeEffect = Fx.none
stormBullet.shootEffect = stormBulletShot;

const stormEquip = extendContent (Weapon,"storm-equip",{});
stormEquip.reload = 30;
stormEquip.bullet = stormBullet;
stormEquip.alternate = true;


const storm = extendContent (Mech,"storm",{
  updateAlt(player){
    if(player.velocity().len()>2){
      if(Mathf.chance(0.02*Time.delta())){
        Call.createBullet(stormstorm, player.getTeam(),player.x,player.y,player.velocity().angle(),1,Mathf.random(0.6,1.4))
      }
    }
  },
  drawStats(player){
    health = player.healthf();
    Draw.color(Color.black, player.getTeam().color, health + Mathf.absin(Time.time(), health * 5, 1 - health));
    Draw.rect(Core.atlas.find(this.name+"-cell"),
        player.x + Angles.trnsx(player.rotation, this.cellTrnsY, 0),
        player.y + Angles.trnsy(player.rotation, this.cellTrnsY, 0),
        player.rotation - 90);
    Draw.reset();
    this.super$drawStats(player)
  }
})
storm.drawCell = false;
storm.weapon = stormEquip;
storm.flying = true;
storm.speed = 2.2;
storm.health = 330;
storm.mineSpeed = 2;
storm.drillPower = 4;
storm.buildPower = 2;
storm.itemCapacity = 50;
storm.engineColor = Pal.lancerLaser
storm.drag = 0.18

const stormPad = extendContent(MechPad,"storm-pad",{})
stormPad.mech = storm