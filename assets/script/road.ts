const {ccclass, property} = cc._decorator;
@ccclass
export default class Road extends cc.Component {
    init(width) {
        this.node.name = "road";
        this.node.width = width;
        const cmp = this.node.getComponent(cc.PhysicsBoxCollider);
        cmp.size.width = width;
    }
}
