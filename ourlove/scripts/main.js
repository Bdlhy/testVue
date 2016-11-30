(function(originWidth){
	var currClientWidth, fontValue;
    __resize();

    //注册 resize事件
    window.addEventListener('resize', __resize, false);

    function __resize() {
        currClientWidth = document.documentElement.clientWidth;
        //这里是设置屏幕的最大和最小值时候给一个默认值
        if (currClientWidth > 640) currClientWidth = 640;
        if (currClientWidth < 320) currClientWidth = 320;
        //
        fontValue = ((62.5 * currClientWidth) /originWidth).toFixed(2);
        document.documentElement.style.fontSize = fontValue + '%';
    }
})(375);  //originWidth用来设置设计稿原型的屏幕宽度（这里是以 Iphone 6为原型的设计稿）

var main = new Vue({
	el: '#main',
	data: {
		tempTime: (new Date()).getTime(),
		importentDays: [
			{name: '三个月纪念', date: '2016/12/03'},
			{name: '100天纪念', date: '2016/12/12'},
			{name: '平安夜', date: '2016/12/24'},
			{name: '圣诞节', date: '2016/12/25'},
			{name: '跨年夜', date: '2016/12/31'}
		]
	},
	computed: {
		totalTime: function(){
			var temp = this.tempTime - new Date("2016/09/03 21:58:00").getTime();
            return this.getStayTime(temp, true);
		},
		timeList: function(){
			var list = [], days = this.importentDays;
			for(var i = 0, len = days.length; i < len; i++){
				var temp = (new Date(days[i].date)).getTime() - this.tempTime;
				if(temp > 0){
					var o = {};
					o.name = days[i].name;
					o.date = this.getDayTime(days[i].date);
					o.next = this.getStayTime(temp, false);
					list.push(o);
				}
			}
			return list;
		}
	},
	methods: {
		getStayTime: function(temp, ifTotal){
			var days = Math.floor(temp/(24*3600*1000));
			days < 10 ? days = '0' + days : null;
			temp = temp%(24*3600*1000);

			var hours = Math.floor(temp/(3600*1000));
			hours < 10 ? hours = '0' + hours : null;
			temp = temp%(3600*1000);

			var minutes = Math.floor(temp/(60*1000));
			minutes < 10 ? minutes = '0' + minutes : null;
			temp = temp%(60*1000);

			var seconds = Math.floor(temp/1000);
			seconds < 10 ? seconds = '0' + seconds : null;

            return ifTotal ? '' + days + '天' + hours + '时' + minutes + '分' + seconds + '秒' : '还有' + days + '天';
		},
		getDayTime: function(date){
			var time = new Date(date);
			var month = time.getMonth() + 1;
			var day = time.getDate();
			return month + '月' + day + '日';
		}
	},
	"created": function(){
        var self = this;
        setInterval(function(){
            self.tempTime = (new Date()).getTime();
        },1000)
    }
});