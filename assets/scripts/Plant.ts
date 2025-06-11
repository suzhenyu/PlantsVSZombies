import { _decorator, Component, Enum, Node } from 'cc';
import { PlantType } from './Card';
const { ccclass, property } = _decorator;

@ccclass('Plant')
export class Plant extends Component {
    private plantState: PlantState = PlantState.Disabled;

    @property({ type: Enum(PlantType) })
    public plantType: PlantType = PlantType.Sunflower;

    start() {

    }

    update(deltaTime: number) {
        switch (this.plantState) {
            case PlantState.Disabled:
                this.disableUpdate();
                break;
            case PlantState.Enable:
                this.enableUpdate();
                break;
        }
    }

    /**
     * 未激活状态更新逻辑
     */
    disableUpdate() {
    }

    /**
     * 激活状态更新逻辑
     */
    enableUpdate() {
    }
}

export enum PlantState {
    Disabled,
    Enable
}