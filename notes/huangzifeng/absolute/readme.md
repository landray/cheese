

#css绝对定位absoulte

注：参考文章地址http://www.jianshu.com/p/a3da5e27d22b ，如有版权问题，请联系本人邮箱：673944632@qq.com

###包裹性

一旦给元素加上absolute或float就相当于给元素加上了display:block;比如内联元素的默认宽度是自适应的，如果想给内联元素设定宽度，需要给内联元素设置display:block;但是如果给内联元素加上absolute或者float，内联元素的display属性就自动变成block，就可以设定宽度了。所有，当absolute或者float与display:block同时出现时，display:block是多余的代码。

实例代码：

    <span style="position: absolute;border: 1px solid blue;width: 200px;height: 200px;text-align:center">test1</span>
    <span style="float: left;border: 1px solid yellow;width: 200px;height: 200px;text-align:center">test2</span>
    <span style="border: 1px solid red;width: 200px;height: 200px;text-align:center">test3</span>

###高度欺骗性

absolute和float都具有高度欺骗性，不同的是添加了absolute属性后，元素会脱离正常的文档流，而添加了float是欺骗父元素，让父元素以外高度塌陷了，元素依然处于正常文档流中，文字会环绕添加了float的元素。

实例代码：

    <div style="border:4px solid blue;">
      <img src="http://img.zcool.cn/community/01580956a389086ac7256cb0f3ebe5.gif" />
    </div>
    <div style="border:4px solid red;margin-top:50px">
      <img style="position: absolute;" src="http://img.zcool.cn/community/01580956a389086ac7256cb0f3ebe5.gif" />
      我是一个绝对定位的absolute元素
    </div>
    <div style="border:4px solid red;margin-top:200px">
      <img style="float: left;" src="http://img.zcool.cn/community/01580956a389086ac7256cb0f3ebe5.gif" />
      我是float: left元素
    </div>

###如何确定定位点

如果只指定了absolute，未指定left/right/top/bottom，其在所处层级中的定位点就是正常文档流中该元素的定位点。如果指定了left/right/top/bottom并且没有position:static以外的父元素。此时absolute所处的层是铺满全屏的，即铺满body。会根据用户指定位置的在body上进行定位。

实例代码：

    <div style="border:4px solid red;margin-bottom: 200px">
      没有指定left/right/top/bottom
      <img style="position: absolute" src="http://img.zcool.cn/community/01580956a389086ac7256cb0f3ebe5.gif" />
    </div>
    <div style="border:4px solid red">
      我是一个绝对定位的absolute元素
      <img style="position: absolute;left: 20px" src="http://img.zcool.cn/community/01580956a389086ac7256cb0f3ebe5.gif" />
    </div>

###父relative + 子absolute来实现定位

如果absolute元素没有position:static以外的父元素，那将相对body定位。如果父元素被设置未relative，那么absolute元素将相对于其父元素定位。

实例代码：

    <div style="display: inline-block;position:relative;">
      <img style="width: 100px" src="http://img.zcool.cn/community/01580956a389086ac7256cb0f3ebe5.gif" />
      <span class="icon">6</span>
    </div>
    .icon {
      background-color: #f00;
      color: #fff;
      border-radius:50%;
      text-align: center;
      position: absolute;
      width: 20px;
      height: 20px;
      right:-10px;
      top:0;
    }

上面的实现方式是存在缺陷的，由于absolute和relative耦合在了一起了，如果父元素做任意改变（比如重新设置width值），那么absolute子元素就要重新寻找定位。改善方式是不指定absolute元素的left/right/top/bottom，让其定位点处于正常文档流中的定位点，通过设置margin:top/right/bottom/left来定位。

实例代码：

    <div style="display: inline-block;position:relative;">
      <span class="tipIcon">6</span>
      <img src="http://img.zcool.cn/community/01580956a389086ac7256cb0f3ebe5.gif" />
    </div>
    .icon {
      background-color: #f00;
      color: #fff;
      border-radius:50%;
      text-align: center;
      position: absolute;
      width: 20px;
      height: 20px;
      margin:0 0 0 90px;
    }

###通过设置absolute实现全屏拉伸

设置了absolute的元素如果同时设置left和right会水平拉伸，如果同时设置top和bottom会实现垂直拉伸。所以如果想实现全屏拉伸，可以设置left: 0;right: 0;top: 0;bottom: 0;

实例代码：

    <span style="position: absolute; left: 0;right: 0; top: 0;bottom: 0;background-color: #665b5b;opacity: .5;filter: alpha(opacity=50);">全屏滤镜</span>

###配合z-index使用

如果有多个元素都设置了absolute属性，当absolute元素覆盖另一个absolute元素，且HTML端不方便调整DOM的先后顺序时，可以使用z-index: >1。

实例代码：

    <div style="position:absolute;width:20px;height:20px;background-color: blue;z-index: 1"></div>
    <div style="position:absolute;width:100px;height:100px;background-color: red"></div>
