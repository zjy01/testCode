/**
 * Created by zjy on 2015/1/29.
 * 图片滑动
 */
var imageSwitch={
    timer:null,
    childList:[],
    container:null,

    direction:-1,
    navWidth:0,
    curIndex:0,

    turnIndex:0,
    firstIndex:0,
    insertAim:0,
    beforeAim:0,
    firstPosition:0,


    isSwitching:false,
    init:function(){
        var self=this;
        self.container=document.getElementById("container");
        self.childList=self.container.children;

        var len = self.childList.length;
        var conWidth=0;
        for(var i=0;i<len;i++){
            var nav=self.childList[i];
            var navW=nav.clientWidth;
            conWidth+=navW;
        }

        //动态初始化
        self.navWidth=self.childList[0].clientWidth;
        self.container.style.width=conWidth+'px';
        self.container.style.left=0+'px';
        self.container.style.top=0+'px';


        self.turnIndex=5;

        self.switch();
    },
    switch:function(){
        var self=this;
        var beforeAim=null;
        self.timer=setInterval(function(){
            if(self.isSwitching){
                return ;
            }

            self.isSwitching=true;

            if(self.curIndex==self.turnIndex){
                for(var i=0;i<4;i++){
                    if(self.beforeAim==0){
                        beforeAim=null;
                    }
                    else{
                        beforeAim=self.childList[0];
                    }
                    self.container.insertBefore(self.childList[self.insertAim],beforeAim);
                }
                self.curIndex=self.firstIndex;
                self.container.style.left=self.firstPosition+'px';
            }

            var left=self.navWidth*self.curIndex*-1;
            var attr={
                left:left
            };
            Util.animate(self.container,attr,function(){
                if(self.direction==-1)
                  self.curIndex++;
                else
                  self.curIndex--;
                self.isSwitching=false;
            });
        },300);
    },
    left:function(){
        var self=this;
        self.direction=-1;
        self.insertAim=0;
        self.beforeAim=0;
        self.turnIndex=5;
        self.firstIndex=0;
        self.firstPosition=0;
    },
    right:function(){
        var self=this;
        self.direction=1;
        self.insertAim=4;
        self.beforeAim=1;
        self.turnIndex=-1;
        self.firstIndex=4;
        self.firstPosition=-2000;
    }
}