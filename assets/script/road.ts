import anime = require("animejs");
import * as _ from "lodash";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Road extends cc.Component {
    protected onEnable(): void {
        if (Math.random() > .5) return;
        const road = this.node;
        const mov = _.random(20,100);
        anime({
            targets: road,
            keyframes: [
                {y: road.y-mov},
                {y: road.y},
                {y: road.y+mov},
            ],
            easing:"linear",
            loop:true,
            direction:"alternate"
        })
    }
    protected onDisable(): void {
        anime.remove(this.node)
    }
    init(width) {
        this.node.name = "road";
        this.node.width = width;
        const cmp = this.node.getComponent(cc.PhysicsBoxCollider);
        cmp.size.width = width;
    }
}
