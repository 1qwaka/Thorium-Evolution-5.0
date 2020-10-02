
var color1 = Color.valueOf("7A7CAFFF");
var color2 = Color.valueOf("A3A5D5FF");

const haloTrail = newEffect(16,e=>{
  Draw.color(color1,color2,e.fin())
  Lines.stroke(e.fout())
  Lines.circle(e.x,e.y,10*e.fout())
})

/*
const haloTrail = newEffect(12 ,e=>{
  Draw.color(color1,color2,e.fin())
  if(e.fin()<0.4){
    e.data.x = e.data.owner.x
    e.data.y = e.data.owner.y
  }
  Lines.stroke(e.fout()*3)
  Lines.line(e.x,e.y,e.data.x,e.data.y)
})
*/

const haloDespawn = newEffect(22,e=>{
  Draw.color(color1,color2,e.fin())
  Lines.stroke(e.fout())
  Lines.circle(e.x,e.y,10+10*e.fout())
})

const haloHit = newEffect(13,e=>{
  Draw.color(color1,color2,e.fin())
  Fill.circle(e.x,e.y,10*e.fout())
})

const haloDeath = newEffect(26,e=>{
  Draw.color(color1,color2,e.fin())
  Angles.randLenVectors(e.id,12,36*e.fin(),new Floatc2({get: function (x,y){
    Fill.circle(e.x+x,e.y+y,5*e.fout())
  }}))
})

const haloShot = newEffect(22,e=>{
  Draw.color(color1,color2,e.fin())
  Angles.randLenVectors(e.id,6,24*e.fin(),e.rotation,15,new Floatc2({get: function (x,y){
    Fill.circle(e.x+x,e.y+y,3*e.fout())
  }}))
})

const halo = extendContent (UnitType,"halo",{
  
})

const haloBullet = extend(BasicBulletType,{
  update(b){
    this.super$update(b)
    if(b.timer.get(5)) Effects.effect(haloTrail,b.x,b.y,0,{owner:b})
  },
  draw(b){
    Draw.color(color1,color2,b.fin())
    Lines.circle(b.x,b.y,10)
  }
})
haloBullet.damage = 50
haloBullet.homingPower = 0.001;
haloBullet.homingRange = 80;
haloBullet.splashDamage = 50;
haloBullet.splashDamageRadius = 36
haloBullet.lifetime = 50;
haloBullet.speed = 3.7;
haloBullet.shootEffect = haloShot;
haloBullet.smokeEffect = Fx.none;
haloBullet.hitSize = 8
haloBullet.hitEffect = haloHit;
haloBullet.despawnEffect = haloDespawn;

const haloWeapon = extendContent(Weapon,"halo-equip",{
  
})
haloWeapon.bullet = haloBullet;
haloWeapon.width = 0;
haloBullet.lenth = 6;
haloWeapon.spacing = 0;
haloWeapon.reload = 80;
haloWeapon.shots = 1;
haloWeapon.alternate = true

halo.weapon = haloWeapon
halo.create(prov(()=>extend(HoverUnit,{
  getPowerCellRegion(){
    return Core.atlas.find(this.type.name+"-cell")
  },
  wobble(){
    if(Vars.net.client()) return;
    this.x += Mathf.sin(Time.time() + this.id * 999, 25, 0.05)*5 * Time.delta();
    this.y += Mathf.cos(Time.time() + this.id * 999, 25, 0.05)*5 * Time.delta();                          
  },
  onDeath(){
    this.super$onDeath()
    Effects.effect(haloDeath,this)
    for(i=0;i<4;i++){
      Call.createBullet(haloBullet,this.getTeam(),this.x,this.y,(this.id%2)*45+i*90,1,1.5)
    }
  }
})))