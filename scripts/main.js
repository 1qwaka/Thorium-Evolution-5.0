//mod name
const mn = "thorium-evolution-";
const itm = name => Vars.content.getByName(ContentType.item,mn+name);
const liq = name => Vars.content.getByName(ContentType.liquid,mn+name);
//if(typeof(floatc2)===undefined){
  const floatc2 = method => new Floatc2 ({get: method});
//}
const TEscripts = [
  "radium-fabric","nox-alpha","mod-name","accelerating-projector",
  "edge","storm","thorium-breaker","halo","sea-rock","echo","eruption",
  "urek-mazino","tedischarge","proto"
];

for(var i = 0; i < TEscripts.length; i++){
  require(TEscripts[i]);
}

