import type { CuttingPreset } from '../cutting'
export const conePresets: CuttingPreset[] = [{id:'cone-circle',name:'圆形截面',shape:'cone',plane:{normal:[0,1,0],constant:0}},{id:'cone-ellipse',name:'椭圆截面',shape:'cone',plane:{normal:[1,1,0],constant:0}}]
