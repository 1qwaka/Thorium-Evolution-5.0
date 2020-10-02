
var tmpColor = new Color();
var vec = new Vec2();
const colors = [
                Color.valueOf("ec745855"),
                Color.valueOf("ec7458aa"),
                Color.valueOf("ff9c5a"),
                Color.white
               ];
var tscales = [1,0.7,0.5,0.3];
var strokes = [3.3,2.4,1.7,0.9];
var lenscales = [1,1.12,1.15,1.17];
var length = 280;

const eruptionHit = newEffect(11,e=>{
  Draw.color(Color.valueOf("ec7458"),Color.valueOf("ea421b"),e.fin());
  Lines.stroke(e.fout()*2.5);
  Lines.circle(e.x,e.y,10*e.fin());
});


const eruptionLaser = extend(BasicBulletType, {
	update (b){
	  vec.trns(b.rot()+180,24);
		if(b.timer.get(5)) Damage.collideLine(b, b.getTeam(), Fx.none, b.x+vec.x, b.y+vec.y, b.rot(), length+20, true);
		Effects.shake(3, 3, b.x, b.y);
	},
	draw (b){
	  Draw.color(colors[1],0.7+Mathf.absin(2,0.5));
	  Tmp.v1.trns(b.rot()+180,14);
	  Draw.rect("circle-shadow",b.x+Tmp.v1.x,b.y+Tmp.v1.y,40+Mathf.absin(2,7),40+Mathf.absin(2,7));
		var baseLen = length*b.fout();
		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(0.98 + Mathf.absin(Time.time(), 1, 0.25)));
			for(var i = 0; i < 4; i++){
				//Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
				Tmp.v1.trns(b.rot()+180, 12.3+100*(lenscales[i]-1));
				Lines.stroke((6+Mathf.absin(Time.time(), 1.4, 2))*b.fout()*strokes[s]*tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(),baseLen*lenscales[i], CapStyle.none);
			}
		}
		Draw.reset();
	}
});
eruptionLaser.damage = 200;
eruptionLaser.speed = 0.0001;
eruptionLaser.lifetime = 16;
eruptionLaser.drawSize = 600;
eruptionLaser.despawnEffect = Fx.none;
eruptionLaser.hitEffect = eruptionHit;
eruptionLaser.pierce = true;


const eruption = extendContent (LaserTurret,"eruption",{
  load(){
    this.super$load();
    this.baseRegion = Core.atlas.find(mn+"block-6");
  },
  generateIcons (){
    return [Core.atlas.find(mn+"block-6"),Core.atlas.find(this.name)];
  }
});
eruption.shootType = eruptionLaser;