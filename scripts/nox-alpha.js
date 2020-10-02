
const noxAlphaBulletTrail = newEffect(12,e=>{
  Draw.color(Color.valueOf("615FD8FF"))
  Fill.circle(e.x+3,e.y,2*e.fout())
  Fill.circle(e.x-3,e.y,2*e.fout())
  Fill.circle(e.x,e.y-3,2*e.fout())
  Fill.circle(e.x,e.y+3,2*e.fout())
})

const noxAlphaHit = newEffect(14,e=>{
  Draw.color(Color.valueOf("615FD8FF"))
  Lines.stroke(2.5*e.fout())
  Lines.circle(e.x,e.y,5*e.fin())
})

const noxAlphaDespawn = newEffect(11,e=>{
  Draw.color(Color.valueOf("615FD8FF"))
  Lines.stroke(e.fout())
  f = new Floatc2({get: function (x,y){
    Lines.lineAngle(e.x+x,e.y+y,Mathf.angle(x,y),3*e.fout())
  }})
  Angles.randLenVectors(e.id,5,13*e.fin(),f)
}) 

const noxAlpha = extendContent (UnitType,"nox-alpha",{
  
})

const noxAlphaBullet = extend(BasicBulletType,{
  update(b){
    if(b.timer.get(5)) Effects.effect(noxAlphaBulletTrail,b)
    this.super$update(b)
  },
  draw(b){
    Draw.color(Color.valueOf("615FD8FF"))
    Draw.rect("thorium-evolution-nox-alpha-bullet",b.x,b.y,4+6*b.fin(),4+6*b.fin(),360*b.fin())
  }
})
noxAlphaBullet.homingPower = 0.001;
noxAlphaBullet.homingRange = 80;
noxAlphaBullet.splashDamage = 25;
noxAlphaBullet.splashDamageRadius = 24
noxAlphaBullet.lifetime = 50;
noxAlphaBullet.speed = 3.7;
noxAlphaBullet.shootEffect = Fx.none;
noxAlphaBullet.smokeEffect = Fx.none;
noxAlphaBullet.hitEffect = noxAlphaHit;
noxAlphaBullet.despawnEffect = noxAlphaDespawn;

const noxAlphaWeapon = extendContent(Weapon,"nox-alhpa-equip",{
  
})
noxAlphaWeapon.bullet = noxAlphaBullet;
noxAlphaWeapon.width = 0;
noxAlphaBullet.lenth = 6;
noxAlphaWeapon.spacing = 54;
noxAlphaWeapon.reload = 80;
noxAlphaWeapon.shots = 2;

noxAlpha.weapon = noxAlphaWeapon
noxAlpha.create(prov(()=>extend(HoverUnit,{
  getPowerCellRegion(){
    return Core.atlas.find(this.type.name+"-cell")
  }
})))