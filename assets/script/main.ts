const {ccclass, property} = cc._decorator;
@ccclass
export default class Main extends cc.Component {
    protected onLoad() {
        const  physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0,0)
    }
}
