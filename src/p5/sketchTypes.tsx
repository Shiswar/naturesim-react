import { SketchProps } from "@p5-wrapper/react"
export type CustomSketchProps = SketchProps & {
    canvasWidth?: number;
    canvasHeight?: number;
}