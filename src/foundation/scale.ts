export class Scale {

    public vertical(value: number): number {
        return window.innerHeight * value / 1000
    }

    public horizontal(value: number): number {
        return window.innerWidth * value / 1000
    }
    
    // Return in pixel format with comparison to 16px
    public fontSize(value: number): number {
        return value * 16
    }
}