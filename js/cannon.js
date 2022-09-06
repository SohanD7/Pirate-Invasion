class Cannon
{
    constructor(x,y,w,h,a)
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.angle = a;
        this.cannonTopImg = loadImage("assets/canon.png");
        this.cannonBaseImg = loadImage("assets/cannonBase.png");
    }

    display()
    {
        //code to create cannon top
        if (this.angle < 80 && keyIsDown(DOWN_ARROW))
        {
            this.angle+=1;
        }
        if (this.angle > -30 && keyIsDown(UP_ARROW))
        {
            this.angle--;
        }
        push();
        translate(this.x,this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.cannonTopImg,0,0,this.width,this.height);
        pop();
        

        //code to create the cannon base
        image(this.cannonBaseImg,55,9,200,200);
    }
}