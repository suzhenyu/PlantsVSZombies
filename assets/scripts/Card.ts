import { _decorator, Component, Enum, Node, Sprite } from 'cc';
import { SunManager } from './managers/SunManager';
const { ccclass, property } = _decorator;

export enum CardState {
    Cooling, // 冷却中
    WaitingSun, // 等待阳光充足
    Ready // 准备种植
}

export enum PlantType {
    Sunflower, // 太阳花
    Peashooter // 豌豆射手
}

@ccclass('Card')
export class Card extends Component {
    private cardState: CardState = CardState.Cooling; // 卡牌的初始状态为冷却中

    @property({ type: Enum(PlantType) })
    public plantType: PlantType = PlantType.Sunflower;

    @property(Node)
    public cardLight: Node = null; // 卡牌亮着的节点
    @property(Node)
    public cardGrey: Node = null; // 卡牌暗着的节点
    @property(Sprite)
    public cardMask: Sprite = null; // 卡牌遮罩

    @property(Number)
    public cdTime: number = 2; // 卡牌冷却时间

    private cdTimer: number = 0; // 卡牌冷却计时器

    @property({ type: Number, tooltip: "卡牌需要的阳光点数" })
    private needSunPoint: number = 50; // 卡牌需要的阳光点数

    start() {
        this.cdTimer = this.cdTime; // 初始化冷却计时器
    }

    update(deltaTime: number) {
        switch (this.cardState) {
            case CardState.Cooling:
                this.CoolingUpdate(deltaTime);
                break;
            case CardState.WaitingSun:
                this.WaitingSunUpdate();
                break;
            case CardState.Ready:
                this.ReadyUpdate();
                break;
            default:
                break;
        }
    }

    private CoolingUpdate(dt: number) {
        this.cdTimer -= dt;
        this.cardMask.fillRange = -(this.cdTimer / this.cdTime);
        if (this.cdTimer <= 0) {
            this.transitionToWaitingSun();
        }
    }
    private WaitingSunUpdate() {
        if (this.needSunPoint <= SunManager.instance.SunPoint) {
            this.transitionToReady();
        }
    }

    /**
     * 准备种植刷新
     */
    private ReadyUpdate() {
        if (this.needSunPoint > SunManager.instance.SunPoint) {
            this.transitionToWaitingSun();
        }
    }

    /**
     * 切换到等阳光充足状态
     */
    transitionToWaitingSun() {
        this.cardState = CardState.WaitingSun;

        this.cardLight.active = false;
        this.cardGrey.active = true;
        this.cardMask.node.active = false;
    }

    /**
     * 切换到准备种植状态
     */
    transitionToReady() {
        this.cardState = CardState.Ready;

        this.cardLight.active = true;
        this.cardGrey.active = false;
        this.cardMask.node.active = false;
    }

    /**
     * 切换到冷却状态
     */
    transitionToCooling() {
        this.cardState = CardState.Cooling;

        this.cdTimer = this.cdTime; // 重置冷却计时器

        this.cardLight.active = false;
        this.cardGrey.active = true;
        this.cardMask.node.active = true;
    }


    onClick() {
        if (this.needSunPoint > SunManager.instance.SunPoint) return;

        // TODO: 开始种植
        SunManager.instance.subSun(this.needSunPoint);

        this.transitionToCooling();
    }

}