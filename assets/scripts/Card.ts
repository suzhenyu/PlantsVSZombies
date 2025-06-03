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

    start() {

    }

    update(deltaTime: number) {
        switch (this.cardState) {
            case CardState.Cooling:
                this.CoolingUpdate();
                break;
            case CardState.Waiting:
                this.WaitingSunUpdate();
                break;
            case CardState.Ready:
                this.ReadyUpdate();
                break;
            default:
                break;
        }
    }

    private CoolingUpdate() {
    }

    private WaitingSunUpdate() {
    }

    private ReadyUpdate() {
    }
}

export enum CardState {
    Cooling, // 冷却中
    Waiting, // 等待阳光充足
    Ready // 准备种植
}