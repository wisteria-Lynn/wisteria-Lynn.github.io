<template>
	<div class="container">
		<div class="row">
			<div class="jumbotron  bg-dark">
				<h1 class="jumbotron-heading">WebSocket chat,欢迎使用:</h1>
			</div>
			<div class="input-group text-left">
				<label>输入用户名：</label>
				<input type="text" id="name" v-model="name" />
				<button id="conn" @click="connSend">连接</button>
				<button id="close">断开</button>
			</div>
			<div class="input-group text-muted">
				<div class="kuang" id="mess" v-html="mess"></div>
			</div>
			<hr class="featurette-divider">
			<div class="input-group text-left">
				<input type="text" class="value" id="value1" v-model="value1"/>
				<button id="send" @click="send">发送</button>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "websocket",
		data() {
			return {
				mess: '',
				name:'',
				value1:'',
				ws:''
			}
		},
		methods: {
			send() {
				this.ws.send(this.name + "说:" + this.value1);
				this.value1 = " ";
			},
			connSend() {
				if (!/^[\u4e00-\u9fa5]{2,10}$/.test(this.name)) {
							console.log("名称不能为空且必须为中文");
							return;
						}
				let _self = this
				var ws = new WebSocket('ws://127.0.0.1:3001');
				this.ws = ws
				// conn.disabled = true;
				// close.disabled = false;
				ws.onopen = function (e) {
					console.log("连接服务器成功");
					ws.send(_self.name);
					// input.setAttribute("readOnly", 'true');
					// _self.value1.setAttribute("readOnly", 'true');
				}
				ws.onmessage = function (e) {
					// value1.removeAttribute("readOnly");
					var time = new Date();
					_self.mess += time.toUTCString() + ":" + e.data + "<br>";
					// document.getElementById("send").onclick = function (e) {
					// 	ws.send(_self.name + "说:" + _self.value1);
					// 	_self.value1 = " ";
					// }
					// document.onkeydown = function (e) {
					// 	e = e || window.event;
					// 	if (e.keyCode == 13) {
					// 		// document.getElementById("send").onclick();
					// 		return false;
					// 	}
					// }
				}
				ws.onclose = function (e) {
					console.log("服务器关闭");
				}
				ws.onerror = function () {
					console.log("连接出错");
				}

				close.onclick = function () {
					ws.onclose();
					ws.send(_self.name + 'close' + "了连接");
					// input.removeAttribute("readOnly");
					// conn.disabled = false;
					// close.disabled = true;
				}
			}
		},
		created() {
			var input = document.getElementById("name");
			var conn = document.getElementById("conn");
			var close = document.getElementById("close");
			var mess = document.getElementById("mess");
			// var value1 = document.getElementById("value1");
			// var pattern = /^[\u4e00-\u9fa5]{2,10}$/;
			// close.disabled = true;
			// if (window.WebSocket) {
			// 	conn.onclick = function () {
			// 		// if (!pattern.test(input.value)) {
			// 		// 	alert("名称不能为空且必须为中文");
			// 		// 	return;
			// 		// }
			//
			// }
		}
    }
</script>

<style scoped>
	.kuang {
		width: 600px;
		min-height: 50px;
		max-height: 296px;
		border: 1px solid;
		float: left;
		display: block;
		position: relative;
		overflow-y: scroll;
	}
</style>
