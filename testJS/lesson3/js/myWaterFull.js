/**
 * Created by Linsist on 12/11.
 */
var myWaterFull = {

    //初始化
    margin:10,//设置每一块之间的间距
    container:null,//容器
    heightArray:[],//记录高度的数组
    boxWidth:0,//每一区块的宽度
    boxList:0,//区块列表
    colNum:0,//列数


    start:function(){
        var self = this;
        self.container = document.getElementById('container');
        self.boxList = myUtil.getElementsByClassName(container,'box');
        self.boxWidth = self.boxList[0].offsetWidth+self.margin;//取区块的实际宽度,需要加上间距

        //var n = document.documentElement.offsetWidth/self.boxWidth|0;//取整，二B青年写法
        //var n = parseInt(document.documentElement.offsetWidth/li_W);//去掉小数部分//普通青年写法
        var n = Math.floor(document.documentElement.offsetWidth/self.boxWidth);//向下取整//文艺青年写法
        //console.log(self.boxWidth);
        //console.log(document.documentElement.offsetWidth);
        self.colNum = n==0?1:n;//万一每一块的宽度比窗口的宽度大
        self.heightArray.length=0;//补充，清空数组的一步
        var len = self.boxList.length;
        var minKey;
        for(var i =0;i<len;i++){
            var item = self.boxList[i];
            if(i < self.colNum){//self.colNum是列数，所以小于它就是第一行了
                myUtil.setStyle(item,'top',0);//这两行是定位
                myUtil.setStyle(item,'left',i*self.boxWidth);//
                self.heightArray[i] = item.offsetHeight +self.margin;//第i个box的左坐标就是i*box的宽度
                minKey = i;
            }
            else{
                var curCol = Math.min.apply(null,self.heightArray);//取得数组中的最小值，所有列区块中高度值最小的那个区块的高度
                minKey = myUtil.getKey(self.heightArray,curCol);//获取最小高度列的列数
                myUtil.setStyle(item,'top',curCol);//这两行是定位
                myUtil.setStyle(item,'left',minKey*self.boxWidth);
                self.heightArray[minKey] += item.offsetHeight +self.margin;//更新每一列的高度
            }
            var h3 = document.getElementsByTagName('h3')[i];
            //debugger
            //var h3Text = "编号"+i+"，高度:"+item.offsetHeight+",列数:"+minKey;
            h3.innerHTML = "编号"+i+"，高度:"+item.offsetHeight+",列数:"+minKey;
            debugger
        }
      }

};