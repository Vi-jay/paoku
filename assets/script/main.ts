import * as _ from "lodash";
import Road from "./road";
import EventType = cc.Node.EventType;
import Player from "./player";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Main extends cc.Component {
    @property(cc.Prefab)
    prefab: cc.Prefab;
    @property(cc.Node)
    physicCamera: cc.Node;

    @property(cc.Node)
    player: cc.Node;
    roadList = new cc.NodePool();
    curList: cc.Node[] = [];
    protected onLoad() {
        const physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        this.initRoads();
        this.node.on(EventType.TOUCH_START, () => {
            this.player.getComponent(Player).jump();
        });
    }
    protected update(dt: number): void {
        this.checkAdd();
        this.checkRelease();
    }
    private initRoads() {
        _.times(10, () => this.roadList.put(cc.instantiate(this.prefab)))
    }
    private addRoads(roadNode: cc.Node) {
        const last = _.last(this.curList);
        const distance = _.random(100, 200);
        const lastDistance = last ? (last.width / 2 + last.x) + distance : 0;
        const width = _.random(3, 5) * 100;
        roadNode.getComponent(Road).init(width);
        roadNode.setPosition(cc.v2(lastDistance + roadNode.width / 2, last ? _.random(-200, 100) : -100))
        this.node.addChild(roadNode);
        this.curList.push(roadNode);
    }
    private checkAdd() {
        const last = _.last(this.curList);
        const {width: WinW} = cc.winSize;
        const needAdd = last ? (last.width / 2 + last.x) - this.physicCamera.x < WinW / 2 : true;
        if (!needAdd) return;
        this.addRoads(this.roadList.get());
    }
    private checkRelease() {
        const first = _.first(this.curList);
        if (!first) return;
        const {width: WinW} = cc.winSize;
        const needRelease = first.width / 2 + first.x < this.physicCamera.x - WinW / 2;
        if (!needRelease) return;
        this.roadList.put(this.curList.shift());
    }
}
