function Component(scene, id) {
    /* Temporarily holds the texture id and after updateTextures is called
     * updates the texture to the texture object.
     */
    this.texture;

    this.scene = scene;
    this.id = id;
    this.materials = [];
    this.inheritMaterial = false;
    this.inheritTexture = false;
    this.children = [];
    this.currentMaterial = 0;
    this.transformation = new Transformation(scene);
    this.parent = null;
}

/**
 * Rotates this component.
 */
Component.prototype.rotate = function(angle, x, y, z) {
    this.transformation.rotate(angle, x, y, z);
}

/**
 * Translates this component.
 */
Component.prototype.translate = function(x, y, z) {
    this.transformation.translate(x, y, z);
}

/**
 * Scales the this component
 */
Component.prototype.scale = function(x, y, z) {
    this.transformation.scale(x, y, z);
}

/**
 * Multiples the this component matrix by the given matrix.
 */
Component.prototype.transform = function(transformation) {
    this.transformation.multiply(transformation);
}

/**
 * Adds a material to this component available materials.
 */
Component.prototype.addMaterial = function(material) {
    this.materials.push(material);
}

/**
 * Sets the component texture.
 */
Component.prototype.setTexture = function(texture) {
    this.texture = texture;
}

/**
 * Gets the component id.
 */
Component.prototype.getId = function() {
    return this.id;
}

/**
 * Adds a child to this component and indicates its parent.
 */
Component.prototype.addChild = function(component) {
    this.children.push(component);
    component.parent = this;
}

/**
 * Updates the texture string in this.texture to
 * the texture object it refers to.
 */
Component.prototype.updateTextures = function(textures) {
    switch (this.texture) {
        case 'inherit':
            this.inheritTexture = true;
            break;
        case 'none':
            this.texture = null;
            break;
        default:
            this.texture = textures[this.texture];
            break;
    }

    for (let child of this.children) {
        //FIXME: Better way to do this
        if (child instanceof Component)
            child.updateTextures(textures);
    }
}

/**
 * Depth-first display of components.
 */
Component.prototype.display = function(parent) {
    this.scene.pushMatrix();
    this.scene.multMatrix(this.transformation.getMatrix());

    if (this.inheritTexture)
        this.texture = parent.texture;

    if (this.inheritMaterial)
        this.material = parent.materials[parent.currentMaterial];
    else
        this.material = this.materials[this.currentMaterial];

    if (this.texture)
        this.texture.apply(this.material);

    for (let child of this.children) {
        child.display(this);
    }

    this.scene.popMatrix();
}
