<template>
  <button v-on:click="csv2json">csvをjsonに変換</button>
  <p>{{ message }}</p>
  <div id="container">
    <div id="csv-area">
      <h3>CSV</h3>
      <textarea v-model="csv" rows="50" cols="50"></textarea>
    </div>
    <div id="json-area">
      <h3>JSON</h3>
      <textarea v-model="json" rows="50" cols="50"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      json: "",
      csv: "test1,test2,test3\n\
val1,val2,val3\n\
val1,val2,val3\n\
val1,val2,val3",
      message: "",
    };
  },
  methods: {
    csv2json: function () {
      const lines = this.csv.split("\n");
      console.log(lines);
      const separator = ["\t", ","];

      // ヘッダー取得
      const header = lines[0].split(separator);

      // csvをjsonに変換
      let retJsonStr = "[";
      for (let i = 1; i < lines.length; ++i) {
        const row = lines[i].split(separator);
        retJsonStr += "{";

        for (let j = 0; j < row.length; ++j) {
          retJsonStr += '"' + header[j] + '":"' + row[j] + '",';
        }
        retJsonStr = retJsonStr.substring(0, retJsonStr.length - 1); // 最後尾のカンマを削除

        retJsonStr += "},";
      }

      retJsonStr = retJsonStr.substring(0, retJsonStr.length - 1); // 最後尾のカンマを削除
      retJsonStr += "]";

      try {
        const jsonObj = JSON.parse(retJsonStr); // jsonに変換可能か試す
        this.json = JSON.stringify(jsonObj);
        this.message = "変換に成功";
      } catch (error) {
        this.message = "変換に失敗 : " + error;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#container {
  width: 500px;
  margin: auto;
  display: flex;
  justify-content: center;
}
#json-area {
  margin-left: 30px;
}
</style>
