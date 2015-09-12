/**
 * Created by zjy on 2015/9/10.
 */
var setName=document.getElementById("setName");
setName.onclick=function(){
    var userName=document.getElementById("userName").value;
    var sMsg=null;
    if(userName==''){
        alert("用户名不能为空");
        return;
    }
    var socket=new WebSocket('ws://localhost:3000');
    var setW=document.getElementById("setW");
    var useW=document.getElementById("useW");
    var show=document.getElementById("show");
    var sendText=document.getElementById("send");
    var sendBt=document.getElementById("sendBt");
    var onlineN=document.getElementById("online-num");
    var onBox=document.getElementById("on-num");
    sMsg= {"req":"chat","name":userName,"msg":null};
    socket.onopen = function (event) {
        socket.send(JSON.stringify({"req":"setName","name":userName}));

        sendBt.onclick= function () {
            sMsg.msg=sendText.value;
            sendText.value='';
            socket.send(JSON.stringify(sMsg));
        };

        socket.onmessage = function(event){
            var msg=JSON.parse(event.data);
            if(msg.req=="setName"){
                if(msg.status==0){
                    alert("用户名已存在");
                    socket.close();
                }
                else{
                    onlineN.innerText=msg.num;
                    setW.style.display="none";
                    useW.style.display="block";
                }
            }
            else if(msg.req=="chat"){
                show.innerText+=msg.name+":"+msg.msg+"\n";
            }
            else if(msg.req=="online"){
                onlineN.innerText=msg.num;
                onBox.innerHTML+="<li id='"+msg.nid+"'>"+msg.name+"</li>";
            }
            else if(msg.req=="offline"){
                onlineN.innerText=msg.num;
                var nig=document.getElementById(msg.nid);
                nig.remove();
            }
        };

        socket.onclose= function (event) {
            setW.style.display="block";
            useW.style.display="none";
            console.log("Client notified socket has closed",event);
        }
    };
};