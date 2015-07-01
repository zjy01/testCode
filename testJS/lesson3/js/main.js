/**
 * Created by Linsist on 12/11.
 */

window.onload = function(){
    myWaterFull.start();

};
window.onresize = function(){
    myWaterFull.start();
};
window.onscroll = function(){
    var flag = false;
    if(flag) return false;
    if(myUtil.myCheckScroll()){
    //var Parent = document.getElementById('container');
    //var oBoxs = myUtil.getElementsByClassName(Parent,'box');
    //if(myUtil.checkScrollSlide(oBoxs)){
        $.ajax({
            type: "get",
            url: "select.json",
            //url: "select.php",
            dataType: "json",
            //data: {choose: choose, content: content},
            beforeSend: function() {
                $("h2").text('加载中...');
            },
            success: function(msg) {
                if (1 == msg.success) {
                    var container = $('#container');
                    var imgList = msg.imgItem;
                    for(var i=0;i<imgList.length;i++){
                        container.append("<div class='box'><a href='"+imgList[i]+"'><img src='"+imgList[i]+"'/></a><h3>图片标题</h3></div>");
                    }
                    //console.log(imgList);
                    myWaterFull.start();
                    $("strong").text('加载完毕');
                    flag = true;
                }
                else {
                    $("strong").text('加载失败');
                }
            }
        });
    }
};
