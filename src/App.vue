<template>
  <div class="main">
    <div>
      <button @click="print('#print_a')">print [A]</button>
      <button @click="print('#print_b')">print [B]</button>
      <hr>
      <div id="print_a" class="p-4 m-4 bgcolor-eee">
        [A]
        <div id="print_b" class="p-4 m-4 bgcolor-fea border">
          [B]
          <div>
            <canvas id="canvas" ref="canvas" width="400" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  mounted() {
    this.$nextTick(() => {
      this.setChart();
    });
  },
  methods: {
    setChart() {
      this._initData();
      this._initChartOption();
      this._initChart();
    },
    _initData() {
      const labels = [...Array(5)].map((_, i) => `AxisItem ${i + 1}`);
      const datasets = [
        {
          label: "Data",
          data: labels.map(_ => Math.round(Math.random() * 1000) / 10)
        }
      ];
      this._chartData = { labels, datasets };
    },
    _initChartOption() {
      this._options = {
        responsive: false,
        scales: {
          xAxes: [
            {
              // position: 'top',
              offset: true,
              ticks: {
                // padding: 100
              }
            }
          ]
        }
      };
    },
    _initChart() {
      // const ctx = document.querySelector('#canvas').getContext('2d')
      if (this._chart) {
        this._chart.destroy();
        delete this._chart;
      }
      const ctx = this.$refs.canvas.getContext("2d");
      const { labels, datasets } = this._chartData;
      const options = this._options;
      this._chart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets
        },
        options
      });
    },
    print(selector) {
      console.log("print", selector);
      const printEl = this.$el.querySelector(selector);
      const canvasEls = [...printEl.querySelectorAll("canvas")];
      // console.log("canvasEls", canvasEls);
      const printWin = window.open(
        "",
        "",
        "left=0,top=0,width=600,height=400,toolbar=0,scrollbars=0,status=0"
      );
      printWin.document.write(printEl.innerHTML);
      const printWinCanvasList = [
        ...printWin.document.querySelectorAll("canvas")
      ];
      // console.log("printWinCanvasList", printWinCanvasList);
      for (const el of printWinCanvasList) {
        const index = printWinCanvasList.indexOf(el);
        const canvasImgUrl = canvasEls[index].toDataURL();
        el.outerHTML = `<img src="${canvasImgUrl}" width="${
          el.width
        }" height="${el.height}" />`;
      }
      printWin.document.close();
      printWin.focus();
      this.$nextTick(() => {
        printWin.print();
        printWin.close();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  #canvas {
    background-color: #fff;
  }
  & > div {
    flex-grow: 1;
    &:last-of-type {
      border-left: 1px solid #aaa;
    }
  }
  .m-4 {
    margin: 4px;
  }
  .p-4 {
    padding: 4px;
  }
  .bgcolor- {
    &eee {
      background-color: #eee;
    }
    &fea {
      background-color: #fea;
    }
  }
  .border {
    border: 1px solid #444;
  }
}
</style>