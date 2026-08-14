import type { CuttingPreset } from '../cutting'
export const triangularPresets: CuttingPreset[] = [{id:'triangular-triangle',name:'三角形截面',shape:'triangular',plane:{normal:[0,0,1],constant:0}},{id:'triangular-oblique',name:'斜切截面',shape:'triangular',plane:{normal:[1,1,1],constant:0}}]
