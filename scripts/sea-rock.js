


function seaRockBullet(size,color,damage,speed, lifetime){
  var bullet = extend(BasicBulletType,{
    draw(b){
      Draw.color(this.frontColor);
      Fill.circle(b.x,b.y,this.bulletHeight*b.fout());
      Fill.square(b.x,b.y,this.bulletHeight*b.fin(),45);
      Draw.color(Color.gray);
      Fill.circle(b.x,b.y,this.bulletHeight*0.7*b.fout());
      Fill.square(b.x,b.y,this.bulletHeight*0.7*b.fin(),45);
    }
  });
  bullet.frontColor = color;
  bullet.bulletHeight = size;
  bullet.damage = damage;
  bullet.speed = speed;
  bullet.lifetime = lifetime;
  bullet.hitEffect = bullet.despawnEffect = newEffect(13,e=>{
    Draw.color(bullet.frontColor);
    Lines.stroke(e.fout()*1.6);
    Angles.randLenVectors(e.id,5,bullet.bulletHeight*6*e.fin(),floatc2((x,y)=>{
      var angle = Mathf.angle(x,y);
      Lines.lineAngle(e.x+x,e.y+y,angle,1+bullet.bulletHeight*e.fout());
    }));
  });
  bullet.smokeEffect = Fx.none;
  bullet.shootEffect = newEffect(18,e=>{
    Draw.color(bullet.frontColor);
    Angles.randLenVectors(e.id,12,30*e.fin(),e.rotation,35,floatc2((x,y)=>{
      var angle = Mathf.angle(x,y);
      Draw.rect(Core.atlas.white(),e.x+x,e.y+y,1+7*e.fout(),8*e.fout(),angle);
    }));
  });
  return bullet;
}

const titSeaBullet = seaRockBullet(3.5,Color.valueOf("8da1e3"),44,4.2,40);
const leadSeaBullet = seaRockBullet(3.8,Color.valueOf("8c7fa9"),30,4,40);
const surgeSeaBullet = seaRockBullet(3.6,Color.valueOf("f3e979"),65,5.3,30);
surgeSeaBullet.lightining = 1;
surgeSeaBullet.lightningLength = 5;
const thoSeaBullet = seaRockBullet(3.6,Color.valueOf("f9a3c7"),50,4.2,40);
const radSeaBullet = seaRockBullet(3.7,Color.valueOf("6D968EFF"),55,4.4,40);

const seaRock = extendContent (ItemTurret,"sea-rock",{
 init(){
   this.ammo(Items.titanium,titSeaBullet,
   Items.lead,leadSeaBullet,
   Items.surgealloy,surgeSeaBullet,
   Items.thorium,thoSeaBullet,
   itm("radium"), radSeaBullet
   );
   this.super$init();
 },
 shoot(tile,type){
   var ent = tile.ent();
   
   ent.recoil = this.recoil;
   ent.heat = 1;
   
   for(i=0;i<this.shots;i++){
      this.tr.trns(ent.rotation,16, Mathf.range(this.xRand));
      Bullet.create(type,tile.entity,tile.getTeam(),tile.drawx()+this.tr.x,tile.drawy()+this.tr.y,ent.rotation+Mathf.range(this.inaccuracy),Mathf.random(0.8,1.2),Mathf.random(0.8,1.2));
   }
   this.effects(tile);
   this.useAmmo(tile);
 },
 load(){
    this.super$load();
    this.baseRegion = Core.atlas.find(mn+"block-5");
  },
  generateIcons(){
    return [Core.atlas.find(mn+"block-5"),Core.atlas.find(this.name)];
  }
});