import type { CuttingPreset } from '../cutting'
export const cubePresets: CuttingPreset[] = [
  {id:'equilateral-triangle',name:'等边三角形',shape:'cube',plane:{normal:[1,1,1],constant:1}},{id:'isosceles-triangle',name:'等腰三角形',shape:'cube',plane:{normal:[1,1,2],constant:2.5}},{id:'acute-triangle',name:'锐角三角形',shape:'cube',plane:{normal:[1.25,10/9,1],constant:-85/36}},
  {id:'rhombus',name:'菱形',shape:'cube',plane:{normal:[1,1,2],constant:0}},{id:'isosceles-trapezoid',name:'等腰梯形',shape:'cube',plane:{normal:[1,2,2],constant:-1.5}},{id:'trapezoid',name:'普通梯形',shape:'cube',plane:{normal:[1,3,4],constant:-2.5}},
  {id:'square-horizontal',name:'正方形①',shape:'cube',plane:{normal:[0,0,1],constant:0}},{id:'square-vertical',name:'正方形②',shape:'cube',plane:{normal:[1,0,0],constant:0}},{id:'rectangle-1',name:'矩形①',shape:'cube',plane:{normal:[1,1,0],constant:.5}},{id:'rectangle-2',name:'矩形②',shape:'cube',plane:{normal:[1,0,1],constant:.5}},{id:'rectangle-3',name:'矩形③',shape:'cube',plane:{normal:[0,1,1],constant:.5}},
  {id:'parallelogram',name:'平行四边形',shape:'cube',plane:{normal:[1,2,3],constant:0}},{id:'pentagon',name:'普通五边形',shape:'cube',plane:{normal:[1,1,3],constant:-15/8}},{id:'hexagon',name:'普通六边形',shape:'cube',plane:{normal:[2,3,4],constant:0}},{id:'regular-hexagon',name:'正六边形',shape:'cube',plane:{normal:[1,1,1],constant:0}}
]
