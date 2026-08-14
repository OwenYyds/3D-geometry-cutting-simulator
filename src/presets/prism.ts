import type { CuttingPreset } from '../cutting'
export const prismPresets: CuttingPreset[] = [{id:'prism-rectangle',name:'矩形截面',shape:'prism',plane:{normal:[1,0,0],constant:0}},{id:'prism-oblique',name:'斜切截面',shape:'prism',plane:{normal:[1,1,1],constant:0}}]
