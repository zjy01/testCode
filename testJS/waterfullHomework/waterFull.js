/**
 * Created by zjy on 2015/1/31.
 * 瀑布流
 */
var waterFull={
    boxWidth:0,
    margin:10,
    heightArray:[],
    colNum:0,
    container:null,
    childList:[],

    init:function(){//初始化
        var self=this;
        self.container=document.getElementById('container');
        self.childList=self.container.children;//获取所有图片

        self.boxWidth=self.childList[0].offsetWidth+self.margin;//图片框的宽度

        self.colNum=Math.floor(document.documentElement.offsetWidth/self.boxWidth);

        self.colNum=self.colNum>0?self.colNum:1;//获取列数，最少一列

        self.heightArray.length=0;//数组清零

        self.start();//图片位置调整开始
    },
    start:function(){
        var self=this;
        var len=self.childList.length;
        var minKey=0;
        var curCol=0;
        for(var i=0;i<len;i++){
            var item=self.childList[i];
            if(i<self.colNum){
                myUtil.setStyle(item,'top',0);
                myUtil.setStyle(item,'left',i*self.boxWidth);
                self.heightArray[i]=item.offsetHeight+self.margin;
                minKey=i;
            }
            else{
                curCol=Math.min.apply(null,self.heightArray);//数组中最小的高度
                minKey=myUtil.getKey(self.heightArray,curCol);
                myUtil.setStyle(item,'left',self.boxWidth*minKey);
                myUtil.setStyle(item,'top',self.heightArray[minKey]);
                self.heightArray[minKey] += item.offsetHeight+self.margin;
                debugger
            }


            var title=document.getElementsByTagName('h3')[i];
            title.innerHTML="序号"+i+"，高度"+item.offsetHeight+"，列号"+minKey;
        }
        var conWidth=0;
        conWidth=self.colNum*(self.boxWidth);
        self.container.style.width=conWidth+'px';
        self.container.style.margin="0 auto";
    }
}