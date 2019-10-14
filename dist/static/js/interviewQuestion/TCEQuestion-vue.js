export const qustion = [{
	"title": "MVVM模式的理解？",
	"txt": ["Model、View、ViewModel", "M是模型，定义数据和业务逻辑", "V是视图，负责渲染", "VM处理交互，负责监听数据的改变、视图的更新,是一个双向绑定的关系。", "这种模式实现了自动同步数据，开发者只需要专注对数据的操作，而不需要自己操作dom。"]
}, {"title": "Vue指令有哪些？", "txt": ["v-if/v-show/v-for/v-html"]}, {
	"title": "v-if和v-show的区别？",
	"txt": ["v-show：通过display：block,none，控制元素的显示。", "v-if：控制该元素dom节点的存在与否。", "（当需要频繁切换的时候，v-show更加节省性能，当只需要显示一次或隐藏时，用v-if更加合理）"]
}, {"title": "Vue双向绑定、响应式原理？", "txt": []}, {
	"title": "Vue中如何监控某个属性值的变化？",
	"txt": ["1）使用watch监听属性，深入监听使用deep:true,立即监听使用immality:true"]
}, {"title": "用computed计算新值。", "txt": []}]
