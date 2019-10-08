<template>
	<div id="mess2">
		<div>{{mess}}</div>
	</div>
</template>

<script>
    export default {
        name: "websocket2",
		data() {
        	return {
        		mess: ''
			}
		},
		created() {
			var mess2 = document.getElementById("mess2");
			if(window.WebSocket){
				let _self = this
				var ws = new WebSocket('ws://127.0.0.1:3001');

				ws.onopen = function(e){
					console.log("连接服务器成功");
					ws.send("game2");
				}
				ws.onclose = function(e){
					console.log("服务器关闭");
				}
				ws.onerror = function(){
					console.log("连接出错");
				}

				ws.onmessage = function(e){
					console.log(e)
					_self.mess = e.data
					var time = new Date();
					// mess2.innerHTML=time+"的消息："+e.data+"<br>"
				}
			}
		}
    }
</script>

<style scoped>
	.kuang{text-align: center;margin-top:200px;}
	#mess{text-align: center}
</style>
