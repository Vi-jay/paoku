import PhysicsBoxCollider = cc.PhysicsBoxCollider;
import PhysicsContact = cc.PhysicsContact;
import AnimationClip = cc.AnimationClip;
import WrapMode = cc.WrapMode;
import {covertToWorldPos} from "./common";
import * as _ from "lodash";
import EventType = cc.Animation.EventType;

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
        this.node.scaleX = -2;
        this.node.getComponent(cc.Animation).play("jump")
        const rigid = this.node.getComponent(cc.RigidBody);
        rigid.linearVelocity = cc.v2(SPEED.x - 50, JUMP_HEIGHT);
    }
    onBeginContact(contact: PhysicsContact, {node: player}: PhysicsBoxCollider, {node: road}: PhysicsBoxCollider) {
        const manifold = contact.getManifold();
        if (manifold.localPoint.y <= -8 || manifold.localPoint.y === 11.5) {
            if ( this.node.scaleX > 0 )return;
            const animation = this.node.getComponent(cc.Animation);
            this.jumpState = 0;
            if (animation.getAnimationState("idle").isPlaying) return;
            this.node.getComponent(cc.Animation).play("idle")
        }
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
        setTimeout(() => {
            cc.director.loadScene("game")
        }, 3000)
    }
}
