/**
 * Chessboard
 * @constructor
 * @param scene CGFscene
 * @param du integer - board dimension in squares in the u direction
 * @param dv integer - board dimension in squares in the v direction
 * @param texture string
 * @param su integer - u coordinate of selected position (in squares)
 * @param sv integer - v coordinate of selected position (in squares)
 * @param c1 rgba
 * @param c2 rgba
 * @param cs rgba - color of selected position
 */
function Chessboard(scene, du, dv, texture, su, sv, c1, c2, cs){
    CGFobject.call(this,scene);
    this.scene = scene;

    this.du = du;
    this.dv = dv;

    this.su = -1;
    this.sv = -1;

    if(su !== null)
        this.su = su;

    if(sv !== null)
        this.sv = sv;

    this.c1 = c1;
    this.c2 = c2;
    this.cs = cs;

    this.divLengthU = 1.0/du;
    this.divLengthV = 1.0/dv;


    var planeDivsU = 120;
    var planeDivsV = 120;
    this.plane = new Plane(scene, 1.0, 1.0, planeDivsU, planeDivsV);

    this.appearance = new CGFappearance(this.scene);
    this.appearance.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.appearance.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.appearance.setShininess(100);

    // this.texture = new CGFtexture(scene,"assets/wood.jpg");
    this.texture = texture;
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT','REPEAT');

    this.shader = new CGFshader(this.scene.gl, 'shaders/chessboard.vert', 'shaders/chessboard.frag');

    this.shader.setUniformsValues({sampler : 1});

    this.shader.setUniformsValues({color1r: this.c1[0]});
    this.shader.setUniformsValues({color1g: this.c1[1]});
    this.shader.setUniformsValues({color1b: this.c1[2]});
    this.shader.setUniformsValues({color1a: this.c1[3]});

    this.shader.setUniformsValues({color2r: this.c2[0]});
    this.shader.setUniformsValues({color2g: this.c2[1]});
    this.shader.setUniformsValues({color2b: this.c2[2]});
    this.shader.setUniformsValues({color2a: this.c2[3]});

    this.shader.setUniformsValues({colorsr: this.cs[0]});
    this.shader.setUniformsValues({colorsg: this.cs[1]});
    this.shader.setUniformsValues({colorsb: this.cs[2]});
    this.shader.setUniformsValues({colorsa: this.cs[3]});

    this.shader.setUniformsValues({divU: du});
    this.shader.setUniformsValues({divV: dv});

    this.shader.setUniformsValues({selectedU: su});
    this.shader.setUniformsValues({selectedV: sv});
    }

Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor = Chessboard;

Chessboard.prototype.display = function(){
    this.appearance.apply();
    this.scene.setActiveShader(this.shader);
    this.texture.bind(1);
    this.plane.display();
    this.texture.unbind();
    this.scene.setActiveShader(this.scene.defaultShader);
}
