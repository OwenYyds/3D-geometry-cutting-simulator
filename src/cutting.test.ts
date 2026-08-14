import { describe, expect, it } from 'vitest'
import { calculatePlaneCubeIntersections, cuttingPresets } from './cutting'

const lengths = (points: ReturnType<typeof calculatePlaneCubeIntersections>) => points.map((point, index) => point.distanceTo(points[(index + 1) % points.length]))
describe('cube cutting presets', () => {
  it('calculates the expected number of real edge intersections', () => {
    const expected: Record<string, number> = { 'equilateral-triangle': 3, 'isosceles-triangle': 3, 'acute-triangle': 3, rhombus: 4, 'isosceles-trapezoid': 4, trapezoid: 4, 'square-horizontal': 4, 'square-vertical': 4, 'rectangle-1': 4, 'rectangle-2': 4, 'rectangle-3': 4, parallelogram: 4, pentagon: 5, hexagon: 6, 'regular-hexagon': 6 }
    for (const preset of cuttingPresets.filter(item => item.shape === 'cube')) expect(calculatePlaneCubeIntersections(preset.plane.normal, preset.plane.constant)).toHaveLength(expected[preset.id])
  })
  it('makes equilateral triangle and regular hexagon with equal sides', () => {
    for (const id of ['equilateral-triangle', 'regular-hexagon']) { const preset = cuttingPresets.find(item => item.id === id)!; const values = lengths(calculatePlaneCubeIntersections(preset.plane.normal, preset.plane.constant)); values.forEach(value => expect(value).toBeCloseTo(values[0], 6)) }
  })
  it('makes an isosceles triangle with two equal sides', () => { const p = cuttingPresets.find(item => item.id === 'isosceles-triangle')!; const values = lengths(calculatePlaneCubeIntersections(p.plane.normal, p.plane.constant)).sort((a,b)=>a-b); expect(values[0]).toBeCloseTo(values[1], 6) })
})
