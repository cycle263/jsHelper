(function(){
    var Pager = function(id, count){
        var self = this;
        this.id = id;
        this.container = null;
        this.currentPage = 1;   //当前页数
        this.size = 10;     //每页显示的记录数
        this.maxBtns = 8;   //显示的最大分页按钮数量
        this.totalItems = count - 0;    //总条数
        this.totalPages = 0;    //总页数        

        this.zh = {
            'pre': '上一页',
            'next': '下一页',
            'start': '首页',
            'end': '末页',
            'go': '跳转'
        };

        /*
         *  内部方法--点击事件           
         */
        this._onclick = function(index){
            self.currentPage = index;
            self.onclick(index);
            self.render();
        };

        /*
         *  内部方法--页码计算
         */
        this._calculate = function(){
            self.totalPages = Math.ceil((self.totalItems - 0) / (self.size - 0));
            self.currentPage = self.currentPage > self.totalPages ? self.totalPages : self.currentPage;
        };

        /*
         *  内部方法--添加样式到head
         *  返回样式sheet
         */
        this._sheet = (function(){
            var style = document.createElement('style');
            document.getElementsByTagName('head')[0].appendChild(style);
            return style.sheet;
        })();

        /*
         *  自定义的click事件
         */
        this.onclick = function(index){};

        /*
         *  渲染分页控件
         */
        this.render = function(){
            if(self.id != undefined){
                var div = document.getElementById(self.id);
                div.pager = self;
                self.container = div;
            }
            self._calculate();  //页码计算

            //页码的开始index和结束index计算
            var start, end, str = '<div class="cycle-page" style="margin:10px;">';
            start = Math.max(1, self.currentPage - parseInt((self.maxBtns - 0) / 2));
            end = Math.min(self.totalPages, start + self.maxBtns - 1);
            start = Math.max(1, end - self.maxBtns + 1);

            //首页和上一页部分
            if(self.totalPages > 1){
                if(self.currentPage != 1){
                    str += '<a href="javascript://1">' + this.zh.start + '</a>';
                    str += '<a href="javascript://' + (self.currentPage - 1) + '" class="pre"><em class="border_t"></em>' + this.zh.pre + '</a>';
                }else{
                    str += '<span>' + this.zh.start + '</span>';
                    str += '<span>' + this.zh.pre + '</span>';
                }
            }

            //数字页码部分
            for(var i = start; i <= end; i++){
                if(i == this.currentPage){
                    str += '<span class="cur" style="background:#4e79ae; color:#fff; border:1px solid #4e79ae;">' + i + '</span>';
                }else{
                    str += '<a href="javascript://' + i + '">' + i + '</a>';
                }
            }

            //下一页和末页部分
            if(self.totalPages > 1){
                if(self.currentPage != self.totalPages){
                    str += '<a href="javascript://' + (self.currentPage + 1) + '" class="next">' + this.zh.next + '<em class="border_t"></em></a>';
                    str += '<a href="javascript://' + self.totalPages + '">' + this.zh.end + '</a>';
                }else{
                    str += '<span class="next">' + this.zh.next + '</span>';
                    str += '<span>' + this.zh.end + '</span>';
                }
                str += '<a href="javascript://go">'+this.zh.go+'</a><input style="width:60px;" type="text" />';
            }
            str += '<div style="float:right;">共计' + self.totalPages + '页, ' + self.totalItems + '条记录</div></div>';
            self.container.innerHTML = str;

            //添加各类样式
            this._sheet.insertRule('.cycle-page,.cycle-page a { color:#333; text-decoration:none;}', 0);
            this._sheet.insertRule('.cycle-page span, .cycle-page a, .cycle-page input{ display:inline; border:1px solid #ccc; margin:0 2px; padding:3px 5px;}', 1);
            this._sheet.insertRule('.cycle-page span { color:#999}', 2);

            //各按钮点击事件绑定
            var a_eles = self.container.getElementsByTagName('a');
            for(var i = 0, l = a_eles.length; i < l; i++){
                a_eles[i].onclick = function(){
                    var index = this.getAttribute('href');
                    if(index != undefined && index != ''){
                        index = index.indexOf('go') >= 0 ? (this.nextSibling.value - 0) : (index.replace('javascript://', '')) - 0;
                        self._onclick(index);
                    }
                };
            }
        };

        this._init = function(){
            if(this.totalItems > this.size){
                this.render();
            }
        };

        //初始化操作
        this._init();
    };

    window.Pager = function(id, count){
        var pager = new Pager(id, count);
        return pager;
    };
})();
