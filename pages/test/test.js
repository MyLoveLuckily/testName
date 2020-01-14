// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: {}, // 保存屏幕的宽高
    hide_good_box: true // 是否隐藏添加购物车时的圆点
  },

  // 添加按钮点击事件
  addClick: function (e) {
    this.finger = {}; var topPoint = {};
    // 点击的位置
    this.finger['x'] = e.touches["0"].clientX;
    this.finger['y'] = e.touches["0"].clientY;

    console.log('点击点的位置:', this.finger);

    // 控制点的y坐标定在低的点的上方150处
    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }

    topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

    // 控制点x控制在点击点和购物车之间
    if (this.finger['x'] > this.busPos['x']) {
      topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
    } else {
      topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
    }

    console.log('控制点的位置', topPoint);

    // 获得曲线的点
    this.linePos = this.bezier([this.busPos, topPoint, this.finger], 100);

    console.log('曲线的点', this.linePos);

    // 执行动画
    this.startAnimation(e);
  },

  // 返回曲线的点
  bezier: function (pots, amount) {
    var pot;
    var lines;
    var ret = [];
    var points;
    for (var i = 0; i <= amount; i++) {
      points = pots.slice(0);
      lines = [];
      while (pot = points.shift()) {
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount));
        } else if (lines.length > 1) {
          points = lines;
          lines = [];
        } else {
          break;
        }
      }
      ret.push(lines[0]);
    }
    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
      var ret = [];
      pointA = points[0];//点击
      pointB = points[1];//中间
      xDistance = pointB.x - pointA.x;
      yDistance = pointB.y - pointA.y;
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
      tan = yDistance / xDistance;
      radian = Math.atan(tan);
      tmpPointDistance = pointDistance * rate;
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      };
      return ret;
    }
    return {
      'bezier_points': ret
    };
  },

  // 执行曲线动画
  startAnimation: function (e) {
    var index = 0, that = this,
      bezier_points = that.linePos['bezier_points'];

    this.setData({
      hide_good_box: false,
      bus_x: that.finger['x'],
      bus_y: that.finger['y']
    })
    var len = bezier_points.length;
    index = len;

    // 计时器
    this.timer = setInterval(function () {
      for (let i = index - 1; i > -1; i--) {
        that.setData({
          bus_x: bezier_points[i]['x'],
          bus_y: bezier_points[i]['y']
        })

        if (i < 1) {
          clearInterval(that.timer);
          that.setData({
            hide_good_box: true
          })
        }
      }
    }, 25);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        // 获取屏幕的大小
        wx.setStorageSync('systemInfo', res)
        var ww = res.windowWidth;
        var hh = res.windowHeight;
        that.data.globalData.ww = ww;
        that.data.globalData.hh = hh;
      }
    });
    console.log('屏幕的宽高', this.data.globalData);

    // 购物车的位置 （根据实际情况做调整）
    this.busPos = {};
    this.busPos['x'] = 25;
    this.busPos['y'] = this.data.globalData.hh - 50;
    console.log('购物车的位置', this.busPos);
  }

})