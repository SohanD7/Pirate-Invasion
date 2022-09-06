class Cannonball
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.body = Bodies.circle(x,y,this.radius,{isStatic: true});
        World.add(world,this.body);
        this.cannonball_img = loadImage("assets/cannonball.png");
        this.coordinates = [];
        this.animation = [this.cannonball_img];
        this.speed = 0.05;
    }        

    animate()
    {
        this.speed+=0.05;
    }

    display()
    {
        var index = floor(this.speed%this.animation.length);
        push();
        translate (this.x)
        imageMode(CENTER);
        image(this.animation[index],this.body.position.x,this.body.position.y,this.radius,this.radius);
        pop();
        //getting the x y positionf of the cannonball and storing them in a temp array and further pushing this array in the coordinates array
        if (this.body.velocity.x > 0 && this.body.position.x > 50 )
        {
            var position = [this.body.position.x,this.body.position.y];
            this.coordinates.push(position);
            //this.coordinates = [[1,2],[3,4],[5,6],[7,8]]; this.coordinates[1][0]
        }
        //extracting the x and y coordinates of the cannonball one by one and displaying the image of a tiny cannonball at all those spots
        for (var i = 0; i < this.coordinates.length; i++)
        {
            image(this.cannonball_img,this.coordinates[i][0],this.coordinates[i][1],5,5);
        }
    }

    shoot()
    {
        
        var newAngle = cannon.angle-30;
        newAngle =  newAngle*(3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Body.setStatic(this.body,false);
        Body.setVelocity(this.body,{x:velocity.x*(180/3.14),y:velocity.y*(180/3.14)});
    }

    remove(index)
    {
        this.animation = splashImages;
        this.speed = 0.05;
        this.radius = 100;
        Body.setVelocity(this.body,{x:0,y:0});
        setTimeout(() => {
            World.remove(world,this.body);
            delete balls[index];
        },1000);
    }
}