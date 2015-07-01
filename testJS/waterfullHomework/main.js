/**
 * Created by zjy on 2015/2/4.
 */
window.onload= function () {
    waterFull.init();
};
window.onresize=function(){
    waterFull.init();
};
window.onscroll=function(){
    loading();
};

function loading(){

    var flag=false;
    if(flag) return false;
    if(myUtil.myCheckScroll()){
        $.ajax({
            type:"get",
            url:"img.json",
            dataType:"json",
            beforeSend:function(){
                $("h2").html("加载中···");
            },
            success:function(msg){
                if(1==msg.success){
                    var container=$("#container");
                    var imgList=msg.imgItem;
                    for(var i=0;i<imgList.length;i++){
                        container.append("<div class='box'><a href='"+imgList[i]+"'><img src='"+imgList[i]+"'/></a><h3>图片标题</h3></div>");
                        waterFull.init();
                        $("h2").html("加载完成。");
                        flag=true;
                    }
                }
                else{
                    $("h2").html("加载失败。");
                }
            }
        });
    }

}
