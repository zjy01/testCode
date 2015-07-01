/**
 * Created by zjy on 2015/1/31.
 */
var myUtil={
    getStyle:function(obj,attr){
        /* Notice：
         *	1. 样式表的三种形式
         *	2. style,currentStyle,getComputedStyle的区别和用法
         */
        if(obj.style[attr]){               //内联样式
            return obj.style[attr]
        }
        else if(obj.currentStyle){         //IE
            return obj.currentStyle[attr];
        }
        else{                              //DOM
            return getComputedStyle(obj,false)[attr];
        }
    },
    setStyle:function(obj,attr,value){
        if(attr == 'opacity'){
            obj.style.filter = 'alpha(opacity:' + value + ')';
            obj.style.opacity = value/1000;
        }
        else{
            obj.style[attr] = value + 'px';
        }
    },
    getKey:function(array,value){
        for(var attr in array){
            if(array[attr]==value){
                return attr;
            }
        }
    },
    myCheckScroll:function(){
        var range = 100;//距离底部的长度
        var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)

        //console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());
        //console.log("页面的文档高度 ："+$(document).height());
        //console.log('浏览器的高度：'+$(window).height());
        var flag = false;
        totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
        if(($(document).height()-range) <= totalheight){
            flag = true;
            return flag;
        }

    }
}