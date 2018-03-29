<template>
  <div class="main">
    <div>
      a
      <button @click="print('#print_a')">print A</button>
      <button @click="print('#print_b')">print B</button>
      <hr>
      <div id="print_a" class="p-4 m-4 bgcolor-eee">
        [A]
        <div id="print_b" class="p-4 m-4 bgcolor-fea border">
          [B]
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    print(selector) {
      console.log("print", selector);
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