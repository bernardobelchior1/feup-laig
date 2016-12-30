function Building(scene, component, material, auxBoard, x, z){
    Piece.call(this, scene, component, material);
    this.originBoard = auxBoard;
    this.hexagon = null;
    this.x = x;
    this.z = z;
}

Building.prototype = Object.create(Piece.prototype);
Building.prototype.constructor = Building;

Building.prototype.move = function(selectedHex){
    this.hexagon = selectedHex;
    let xi = this.x;
    let zi = this.z;
    let xf = selectedHex.x;
    let zf = selectedHex.z;

    let animationRoot = new ListNode([0,0,0]);
    let node1 = new ListNode([0, 2.0, 0.0]);
    let node2 = new ListNode([xf - xi, 2.0, zf - zi]);
    let node3 = new ListNode([xf - xi, 1.0, zf - zi]);

    animationRoot.next = node1;
    node1.next = node2;
    node2.next = node3;
    node3.next = animationRoot;

    this.setAnimation(new LinearPieceAnimation(this.scene, "buildingAnimation", 3.0,
        animationRoot, this));

    selectedHex.getShip().liftForBuilding();
};

Building.prototype.onAnimationDone = function(){
    this.component.removeAnimation();
    this.animation = null;
    this.hexagon.placeBuilding(this);
    this.originBoard.component.children.pop();
};
