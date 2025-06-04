import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    private cardState: CardState = CardState.Cooling; // 卡牌的初始状态为冷却中

    @property(Node)
    public cardLight: Node = null; // 卡牌亮着的节点
    @property(Node)
    public cardGrey: Node = null; // 卡牌暗着的节点
    @property(Sprite)
    public cardMask: Sprite = null; // 卡牌遮罩

    @property(Number)
    public cdTime: number = 2; // 卡牌冷却时间

    private cdTimer: number = 0; // 卡牌冷却计时器

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
            this.transitionToWaitingState();
        }
    }
    private WaitingSunUpdate() {
    }

    private ReadyUpdate() {
    }

    transitionToWaitingState() {
        this.cardState = CardState.WaitingSun;

        this.cardLight.active = false;
        this.cardGrey.active = true;
        this.cardMask.node.active = false;
    }

}

export enum CardState {
    Cooling, // 冷却中
    WaitingSun, // 等待阳光充足
    Ready // 准备种植
}