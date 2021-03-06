class Animation {
    /**
     * Abstract animation constructor.
     * @param scene Scene to apply the animation to
     * @param id Animation identification string.
     * @param time Animation time span.
     */
    constructor(scene, id, time) {
        this.scene = scene;
        this.id = id;
        this.time = time;
        this.done = false;
    }

    /**
     * Returns whether the animation is done or not.
     * @return {Boolean} True if the animation is done. False otherwise.
     */
    isDone() {
        return this.done;
    }
}
