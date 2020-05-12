import EventType = cc.Node.EventType;
import {covertToWorldPos} from "./common";
import PhysicsBoxCollider = cc.PhysicsBoxCollider;

const {ccclass, property} = cc._decorator;
const SPEED = cc.v2(300, -300);
const JUMP_HEIGHT = 600;
@ccclass
export default class Player extends cc.Component {
    @property(cc.Node)
    physicCamera: cc.Node;
    @property(cc.Node)
    caidai: cc.Node;
    jumpState = 0;
    jump() {
        if (this.jumpState++ > 1) return;
        const rigid = this.node.getComponent(cc.RigidBody);
        rigid.linearVelocity = cc.v2(SPEED.x-50, JUMP_HEIGHT);
    }
    onBeginContact(__, {node:player}:PhysicsBoxCollider, {node:road}:PhysicsBoxCollider) {
        if (player.getPosition().sub(road.getPosition()).y<0)return;
        this.jumpState = 0;
    }
    onEndContact() {
        const rigid = this.node.getComponent(cc.RigidBody);
        rigid.gravityScale = 3;
    }
    checkIsLose() {
        const pos = covertToWorldPos(this.node);
        return cc.winSize.height / 2 + pos.y <= 0;
    }
    protected update(dt: number): void {
        if (this.checkIsLose()) return this.fail();
        this.physicCamera.x = this.node.x + cc.winSize.width / 2.6;
        if (this.jumpState) return;
        const rigid = this.node.getComponent(cc.RigidBody);
        rigid.linearVelocity = SPEED;
    }
    private fail() {
        this.node.active = false;
        this.caidai.getComponent(cc.ParticleSystem).resetSystem();
    }
}
