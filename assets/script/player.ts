import EventType = cc.Node.EventType;

const {ccclass, property} = cc._decorator;
@ccclass
export default class Player extends cc.Component {
    protected onLoad() {
        const rigid = this.node.getComponent(cc.RigidBody);
        this.node.on(EventType.TOUCH_START,()=>{
            rigid.linearVelocity =cc.v2(10,10)
        })
    }
}
