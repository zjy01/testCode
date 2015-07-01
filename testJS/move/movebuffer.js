/**
 * Created by zjy on 2015/1/29.
 * 缓冲流
 */
var movebuffer= {
    obj:null,
    timer:null,
    json:null,
    coefficient:10,
    init:function(obj,json){
        var self=this;
        self.obj=obj;
        self.json=json;
        self.move();
    },
    getStyle:function(attr){
        var self=this;
        if(self.obj.style[attr]){
            return self.obj.style[attr];
        }
        else if(self.obj.currentStyle){
            return self.obj.currentStyle[attr];
        }
        else{
            return getComputedStyle(self.obj,false)[attr];
        }
    },
    setStyle:function(attr,value){
        var self=this;
        self.obj.style[attr]=value+'px';
    },
    move:function(){
        var self=this;
        var speed=0;

        clearInterval(self.timer);
        self.timer=setInterval(function(){
            for(var attr in self.json){
                var current = parseInt(self.getStyle(attr));//当前style,取整，否则无法执行
                var aim = self.json[attr];
                speed=(aim-current)/self.coefficient;
                speed=speed > 0 ?Math.ceil(speed):Math.floor(speed);

                if(current != aim){
                    current = current + speed;
                    self.setStyle(attr,current);
                }
                else{
                    clearInterval(self.timer);
                }

            }
        },30);
    }

}