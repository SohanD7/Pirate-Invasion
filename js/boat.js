class Boat
{
    constructor(x,y,w,h,p,boatImages)
    {
        this.width = w;
        this.height = h;
        this.boatPosition = p;
        var options = {restitution: 1, friction: 1, density: 1};
        this.animation = boatImages;
        this.speed = 0.05;
        this.body = Bodies.rectangle(x,y,w,h,options);
        World.add(world,this.body);
        this.boat_Img = loadImage("assets/boat.png");
        this.isBroken = false;
    }

    animate()
    {
        this.speed+=0.05;
    }

    display()
    {
        push();
        //var index = Math.round(random(0,3));
        var index = floor(this.speed%this.animation.length); //floor rounds down
        imageMode(CENTER);
        translate(this.body.position.x,this.body.position.y)
        image(this.animation[index],0,this.boatPosition,this.width,this.height);
        pop();
    }

    remove(index)
    {
        this.animation = brokenBoatImages;
        this.speed = 0.05;
        this.width = 280;
        this.height = 280;
        setTimeout(() => {
            World.remove(world,boats[index].body);
            delete boats[index];
        },2000);
        this.isBroken = true;
    }
}