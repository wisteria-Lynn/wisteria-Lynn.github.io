// 拷贝数组

let obj = [
	{
		number1:null,
		number2:undefined,
		number3:function(){return 1},
		number: 1,
		second: {
			name: '333'
		}
	},
	function(){return 2},
	[3, 4],
	false,
	true,
	45,
	null,
	undefined,
	{data:new Date()},
	{reg:/\w/g},
	Number('sdgd34')
]

// 方法一
function copy_1(obj) {
	console.log(JSON.stringify(obj))
	return JSON.parse(JSON.stringify(obj))
}

// 方法二 自己写？
function copy_2(obj) {

}

function test_1(){
	let copyObj = copy_1(obj)
	copyObj[0].second.name = 'yang'
	console.log(obj)
	console.log(copyObj)
}

test_1()
