import Vector2 = Phaser.Math.Vector2;

const WANDER_DISTANCE = 10;
const WANDER_RADIUS = 2;
const WANDER_RANGE = Math.PI/8;

const MAX_FORCE = 2.5;
const MAX_SPEED = 2.5;

export default class SteeringEntity {

    entity: Phaser.GameObjects.Components.Transform;

    private velocity = new Vector2();
    private wanderAngle = 2*Math.PI * Math.random();

    private circleCenter = new Vector2();
    private displacement = new Vector2();

    update (time: number, delta: number): void
    {
        const e = this.entity;
        const v = this.velocity;

        // Calculate the circle center
        this.circleCenter
            .copy(v)
            .normalize()
            .scale(WANDER_DISTANCE);
        //
        // Calculate the displacement force
        this.displacement
            .set(0, -1)
            .scale(WANDER_RADIUS)
        // Randomly change the vector direction
        // by making it change its current angle
            .setAngle(this.wanderAngle);
        //
        // Change wanderAngle just a bit, so it
        // won't have the same value in the
        // next game frame.
        this.wanderAngle += (Math.random() - .5) * 2 * WANDER_RANGE;
        //
        // Finally, calculate and return wander force
        const wanderForce = this.circleCenter
            .add(this.displacement);

        wanderForce.setLength(
            Math.min(MAX_FORCE, wanderForce.length())
        );
        wanderForce.scale(delta/1000*60);

        v.add(wanderForce);
        v.setLength(Math.min(v.length(), MAX_SPEED));
        v.scale(delta/1000*60);

        e.x += v.x;
        e.y += v.y;
        e.rotation = v.angle() + Math.PI/2;
    }

}
