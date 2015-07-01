/**
 * Created by Linsist on 12/11.
 */
var myUtil={

    /**
     * 我的 getElementsByClassName 的方法，主要思路是获取父节点的所有子节点，逐个查找每个子节点的所
     * class列表
     * @param{Node} parentNode
     * @param{string} className
     * @returns {Array}
     */
    getElementsByClassName :function (parentNode, className) {
        var List = [];
        var childList = parentNode.getElementsByTagName("*");
        var childLen = childList.length;
        for (var i = 0; i < childLen; i++) {
            var child = childList[i];
            var classLen = child.classList.length;

            for(var j= 0;j < classLen; j++){
                if(child.classList[j] == className){
                    List.push(child);
                }
            }
        }
        return List;
    },
    /**
     * 另一种getElementsByClassName的方法，仅供参考
     * @param{string} className
     * @param{string} tag
     * @param{Node} elm
     * @returns {Array}
     */
    getElementsByClassName2 : function(className, tag, elm ){
        var regPatten = new RegExp("(^|\s)" + className + "(\s|$)");
        tag = tag || "*";
        elm = elm || document;
        var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
        var returnElements = [];
        var current;
        var length = elements.length;
        for(var i=0; i<length; i++){
            current = elements[i];
            if(regPatten.test(current.className)){
                returnElements.push(current);
            }
        }
        return returnElements;
    },
    /**
     *获得特定元素的在数组中的下标
     * @param{Array} arr
     * @param{string} item
     * @returns {string}
     */
    getKey:function(arr,item){
        for(var count in arr){
            if(arr[count] == item)
            return count;
           // debugger
        }
    },

    /**
     * 设置style属性
     * @param {Node} obj
     * @param {string} attr
     * @param {int/float} value
     */
    setStyle: function(obj, attr, value){
        if(attr == 'opacity'){
            obj.style.filter = 'alpha(opacity:' + value + ')';
            obj.style.opacity = value/1000;
        }
        else{
            obj.style[attr] = value + 'px';
        }
    },

    /**
     * 获取style属性
     * @param {Node} obj
     * @param {string} attr
     * @returns {int/float}
     */
    getStyle: function(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj,false)[attr];
        }
    },
    /**
     * 我的滚动判定：判断是否滚动到距离窗口底部 range长度的 距离
     * @returns {boolean}
     */
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

    },

    /**
     * 另一种滚动判定：判断是否当滚动到最后一个box的中间
     * @param oBoxs
     * @returns {boolean}
     */
    checkScrollSlide:function(oBoxs){
        var oBoxsLength = oBoxs.length;
        var lastBoxH = oBoxs[oBoxsLength-1].offsetTop + Math.floor(oBoxs[oBoxsLength-1].offsetHeight/2);
         //混杂模式下是通过Body元素检测页面滚动走的距离
         //标准模式下是通过Html元素检测...
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var heigth = document.body.clientHeight || document.documentElement.clientHeight;
        return (lastBoxH < scrollTop + heigth) ;
    },

    /**
     *一个用作js模板替换的代码
     *template格式和数组格式如下
     *var template = "<div><h1>{title}</h1><p>{content}</p></div>";
     *var data = [{title:"a",content:"aaaa"},{title:"b",content:"bbb"},{title:"c",content:"ccc"}];
     只需要数据格式对应
     *
     * @param template
     * @param data
     * @returns {string}
     */
    replaceTpl:function(template,data){
    var outPrint="";
    for(var i = 0 ; i < data.length ; i++){
        var matchs = template.match(/\{[a-zA-Z0-9_]+\}/gi);
        var temp="";
        for(var j = 0 ; j < matchs.length ;j++){
            if(temp == "")
                temp = template;
            var re_match = matchs[j].replace(/[\{\}]/gi,"");
            temp = temp.replace(matchs[j],data[i][re_match]);
        }
        outPrint += temp;
    }
    return outPrint;
}


};