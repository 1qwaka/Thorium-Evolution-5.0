var v = new Vec2()
var v2 = new Vec2()

const edgeColor = Color.valueOf("#8774e9")

const edgeTrail = newEffect(18,e=>{
  Draw.color(edgeColor)
  Draw.alpha(e.fout())
  Draw.rect("thorium-evolution-razor",e.x,e.y,14+5*e.fout(),14+5*e.fout(),e.rotation)
})
const edgeDespawn = newEffect(18,e=>{
  Draw.color(edgeColor)
  Draw.alpha(e.fout())
  Draw.rect("thorium-evolution-razor",e.x,e.y,14+5*e.fout(),19*e.fout(),e.rotation-90)
})
const edgeHit = newEffect(18,e=>{
  v.x = 0; v.y = 0;
  Draw.color(edgeColor)
  var f = new Floatc2({get: function (x,y){
    Fill.circle(e.x+x+v.x,e.y+y+v.y,2*e.fout())
  }})
  Angles.randLenVectors(e.id,3,10*e.fin(),e.rotation,30,f)
  v.trns(e.rotation+90,4)
  Angles.randLenVectors(e.id+851,3,10*e.fin(),e.rotation,30,f)
  v.trns(e.rotation-90,4)
  Angles.randLenVectors(e.id+13,3,10*e.fin(),e.rotation,30,f)
})
const edgeSmoke = newEffect(18,e=>{
  v2.x = 0; v2.y = 0;
  Draw.color(edgeColor)
  var f = new Floatc2({get: function (x,y){
    Fill.square(e.x+v2.x+x,e.y+v2.y+y,2.5*e.fout(),45+e.rotation)
  }})
  Angles.randLenVectors(e.id,3,15*e.fin(),e.rotation,30,f)
  v2.trns(e.rotation+90,6)
  Angles.randLenVectors(e.id+739,3,15*e.fin(),e.rotation,30,f)
  v2.trns(e.rotation-90,6)
  Angles.randLenVectors(e.id+132,3,15*e.fin(),e.rotation,30,f)
})

const edgeBullet = extend(BasicBulletType,{
  update(b){
    if(b.timer.get(3)) Effects.effect(edgeTrail,b.x,b.y,b.rot()-90)
  },
  hit(b){
    if(b.owner!=null){
      vec = new Vec2()
      for(i=-1;i<2;i++){
        vec.trns(b.rot()+20*i,15)
        Call.createBullet(this,b.getTeam(),b.x+vec.x,b.y+vec.y,b.rot()+20*i,Mathf.random(0.4,0.6),Mathf.random(0.7,0.9))
      }
    }
    Effects.effect(edgeHit,b.x,b.y,b.rot())
  },
  draw(b){
    Draw.color(edgeColor)
    Draw.rect("thorium-evolution-razor",b.x,b.y,14+5*b.fout(),14+5*b.fout(),b.rot()-90)
  }
})
edgeBullet.hitSize = 5.5;
edgeBullet.lifetime = 53;
edgeBullet.speed = 3.8;
edgeBullet.despawnEffect = edgeDespawn
edgeBullet.hitEffect = edgeHit
edgeBullet.smokeEffect = edgeSmoke;
edgeBullet.damage = 125


const edge = extendContent (PowerTurret,"edge",{
  
})
edge.shootType = edgeBullet;