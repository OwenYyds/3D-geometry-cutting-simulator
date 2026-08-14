import type { CuttingPreset } from '../cutting'
export const cylinderPresets: CuttingPreset[] = [{id:'cylinder-circle',name:'圆形截面',shape:'cylinder',plane:{normal:[0,1,0],constant:0}},{id:'cylinder-ellipse',name:'椭圆截面',shape:'cylinder',plane:{normal:[1,1,0],constant:0}}]
