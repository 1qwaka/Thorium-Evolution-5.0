const draw = require ("tedraw");
const protoStatus = new StatusEffect("protoStatus");
protoStatus.damageMultiplier = 2;



const protoField = newEffect(16,e=>{
  //Draw.color(Pal.remove);
  Draw.color(Pal.remove);
  Lines.stroke(9*e.fout()+1);
  Lines.circle(e.x,e.y,50*e.fin());
});

const protoFragHit = newEffect(16,e=>{
  Draw.color(Pal.remove);
  Lines.stroke(4*e.fout());
  Lines.square(e.x,e.y,15*e.fin(),45);
});

const protoFrag = extend(BasicBulletType,{
  draw(b){
    //Draw.blend(Blending.additive);
    Draw.color(Pal.remove);
    Fill.circle(b.x,b.y,1+3*b.fout());
    Draw.blend();
  }
});
protoFrag.speed = 0;
protoFrag.damage = 90;
protoFrag.lifetime = 120;
protoFrag.keepVelocity = false;
protoFrag.despawnEffect = Fx.none;
protoFrag.hitEffect = protoFragHit;


const protoBullet = extend(BasicBulletType,{
  draw(b){
    //Draw.blend(Blending.additive);
    Draw.color(Pal.remove);
    Draw.rect("circle",b.x,b.y,2+Mathf.clamp(40*b.fin(),0,12),1+b.fout()*3,b.rot());
    Draw.blend();
  },
  update(b){
    if(Mathf.chance(0.07 * Time.delta())){
      Bullet.create(protoFrag,b,b.x,b.y,0);
    }
  }
});
protoBullet.speed = 6;
protoBullet.damage = 50;
protoBullet.lifetime = 40;


const protoEquip = extendContent (Weapon,"proto-blaster",{
  load(){
    this.region = Core.atlas.find(mn+this.name);
  }
});
protoEquip.reload = 15;
protoEquip.bullet = protoBullet;
protoEquip.width = 9;
protoEquip.length = -3;



const proto = extendContent (Mech,"proto",{
  drawStats(player){
    health = player.healthf();
    Draw.color(Color.black, player.getTeam().color, health + Mathf.absin(Time.time(), health * 5, 1 - health));
    Draw.rect(this.cellRegion,
        //player.x + Angles.trnsx(player.rotation, this.cellTrnsY, 0),
       // player.y + Angles.trnsy(player.rotation, this.cellTrnsY, 0),
        player.x,player.y,player.rotation - 90);
    Draw.reset();
    this.super$drawStats(player);
  },
  load(){
    this.super$load();
    this.cellRegion = Core.atlas.find(this.name+"-cell");
  },
  updateAlt(p){
    if(p.timer.get(p.timerAbility,180)){
      Effects.effect(protoField,p);
      Units.nearby(p.getTeam(),p.x,p.y,50,cons(unit=>{
        unit.applyEffect(protoStatus,90);
      }));
    }
  }
});
proto.drawCell = false;
proto.flying = true;
proto.weapon = protoEquip;


const protoPad = extendContent(MechPad,"proto-pad",{});
protoPad.mech = proto;
proto.weaponOffsetX = 9;
proto.weaponOffsetY = -3;
proto.engineOffset = 7;
proto.engineSize = 3;



