
const speedyApply = newEffect(22,e=>{
  Draw.color(Color.valueOf("#36b9ef"))
  Lines.stroke(e.fout()*5)
  Lines.circle(e.x,e.y,73*e.finpow())
})

const speedyEffect = newEffect(16,e=>{
  Draw.color(Color.valueOf("#36b9ef"))
  Angles.randLenVectors(e.id,2,1+3*e.fin(),new Floatc2({get: function (x,y){
    Fill.square(e.x + x, e.y + y, e.fout() * 2.3 + 1,45);
  }}))
})

const acceleratingEffect = newEffect(40,e=>{
  Draw.color(Color.valueOf("#36b9ef"),e.fout())
  Draw.rect(acceleratingProjector.name+"-top",e.x,e.y)
})

const speedy = new StatusEffect("speeeedy")
speedy.speedMultiplier = 1.05;
speedy.effect = speedyEffect;

const acceleratingProjector = extendContent (Block,"accelerating-projector",{
  setStats(){
    this.super$setStats()
    this.stats.add(BlockStat.range, (70/8), StatUnit.blocks);
  },
  update(tile){
    if(!tile.entity.cons.valid()) return
    if(tile.entity.timer.get(180)){
      Units.nearby(tile.drawx()-70,tile.drawy()-70,140,140,cons(unit=>{
        if(Mathf.within(tile.drawx(),tile.drawy(),unit.x,unit.y,50) && unit.getTeam()==tile.getTeam()&&!unit.isDead()){
          unit.applyEffect(speedy,180)
        }
      }))
      Effects.effect(speedyApply,tile)
      Effects.effect(acceleratingEffect,tile)
    }
  },/*
  drawLayer(tile){
    Lines.circle(tile.drawx(),tile.drawy(),50)
  }*/
  drawPlace(x, y, rotation,valid){
     Drawf.dashCircle(x * 8 + this.offset(), y * 8 + this.offset(), 70, Pal.accent);
  },
  drawSelect(tile){
    Drawf.dashCircle(tile.drawx(), tile.drawy(), 70, Pal.accent);
  }
})