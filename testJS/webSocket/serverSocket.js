var cons = [];
var ws = require('ws').Server;
var util=require("util");
var server = new ws({host:"localhost",port:3000});
var id=0;
server.on('connection',function(ws){
    id++;
    ws.nid=id;
    console.log('new connection founded successfully'+id);
    //console.log(util.inspect(ws));
    cons.push(ws);//将所有连接的对象存在这里
    ws.on('message',function(data){
        var msg=JSON.parse(data);
        if(msg.req=="setName"){
            for(var i=0;i<cons.length-1;i++){
                if(cons[i].name == msg.name) {
                    ws.send(JSON.stringify({"req":"setName","status":0,"num":cons.length-1}));
                    for(var i=0;i<cons.length;i++){
                        if(cons[i] == ws) cons.splice(i,1);
                    }
                    return;
                }
            }
            ws.name=msg.name;
            ws.send(JSON.stringify({"req":"setName","status":1,"num":cons.length}));
            for(var i=0;i<cons.length;i++){//向所有连接对象发送信息
                console.log("online send:"+cons[i].name);
                cons[i].send(JSON.stringify({"req":"online","name":ws.name,"nid":"n"+ws.nid,"num":cons.length}));
                if(cons[i] != ws) {
                    ws.send(JSON.stringify({"req":"online","name":cons[i].name,"nid":"n"+cons[i].nid,"num":cons.length}));
                }
            }
        }
        else if(msg.req=="chat"){
            for(var i=0;i<cons.length;i++){//向所有连接对象发送信息
                cons[i].send(JSON.stringify({"req":"chat","name":ws.name,"msg":msg.msg}));
            }
        }
    });
    ws.on('close',function(){
        console.log("offline send");
        var len=cons.length;
        var dn=0;
        for(var i=0;i<len;i++){
            if(cons[i] == ws) {
                dn=i;
            }
            else{
                cons[i].send(JSON.stringify({"req":"offline","name":ws.name,"nid":"n"+ws.nid,"num":len-1}));
            }
        }
        cons.splice(dn,1);
    });
});
console.log('websocket-server running...');
