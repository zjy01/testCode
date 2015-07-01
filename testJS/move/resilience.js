/**
 * Created by zjy on 2015/1/29.
 * 弹性流
 */
var relicience={
    obj:null,
    timer:null,
    json:null,
    coefficient:0,
    resil:0,//弹性系数 < 1
    init:function(obj,json,coefficient,resil){
        var self=this;
        self.obj=obj;
        self.json=json;
        self.coefficient=coefficient;
        self.resil=resil;
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
        self.obj.style[attr]=value + 'px';
    },
    move:function(){
        var self=this;
        var current = 0;
        var speed = 0;
        var aim = 0;
        clearInterval(self.timer);
        self.timer=setInterval(function(){
            for(var attr in self.json){
                current =parseInt(self.getStyle(attr));
                aim = self.json[attr];

                speed += (aim - current) / self.coefficient;
                speed = speed * self.resil;

                current += speed;
                if(Math.abs(speed) < 1 && Math.abs(current - aim) < 1){
                    self.setStyle(attr,aim);
                    clearInterval(self.timer);
                }
                else{
                    self.setStyle(attr,current);
                }
            }
        },30);
    },
}