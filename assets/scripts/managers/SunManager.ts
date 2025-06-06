import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SunManager')
export class SunManager extends Component {
    private static _instance: SunManager = null;
    public static get instance(): SunManager {
        if (!this._instance) this._instance = new SunManager();
        return this._instance;
    }

    @property(Number)
    public sunPoint: number = 0;

    @property(Label)
    private sunPointLabel: Label = null; // 用于显示阳光值的标签

    /**
     * 阳光值
     */
    public get SunPoint(): number {
        return this.sunPoint;
    }

    protected start(): void {
        this.updateSunPointLabel();
    }

    update(deltaTime: number) {

    }

    /**
     * 更新阳光值label显示
     */
    private updateSunPointLabel() {
        this.sunPointLabel.string = this.sunPoint.toString();
    }

    /**
     * 减少阳光值的方法
     * @param point 减少的阳光值
     */
    public subSun(point: number) {
        this.sunPoint -= point;
        if (this.sunPoint < 0) {
            this.sunPoint = 0;
        }
        this.updateSunPointLabel();
    }
}