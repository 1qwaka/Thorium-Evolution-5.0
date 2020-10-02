const radiumFabric = extendContent (GenericSmelter,"radium-fabric",{
  load(){
    this.super$load()
    this.topRegion = Core.atlas.find("clear")
    this.bottomRegion = Core.atlas.find(this.name+"-bottom")
    this.rotatorRegion = Core.atlas.find(this.name+"-rotator")
  },
  draw(tile){
    Draw.rect(this.bottomRegion,tile.drawx(),25,25,tile.drawy())
    Draw.alpha(tile.entity.warmup)
    //Draw.blend(Blending.additive)
    Draw.rect(this.rotatorRegion,tile.drawx(),tile.drawy(),Time.time()*15)
    Draw.alpha(1)
    //Draw.blend()
    this.super$draw(tile)
  },
  generateIcons (){
    return [
      Core.atlas.find(this.name+"-bottom"),
      Core.atlas.find(this.name)
      ]
  }
})