<template>
<!-- SIDEBAR BUTTONS -->
  <div class="sb-btns">
    <label>{{ title }}</label>
    <button type="button" class="btn btn-outline-info" @click="method1">
      <i :class="icon1"></i>
      {{ btn1 }}
    </button>
    <button type="button" class="btn btn-outline-info" @click="method2">
      <i :class="icon2"></i>
      {{ btn2 }}
    </button>
  </div>
</template>
<script>

export default {
    props: {
        title: {
            type: String
        },
        method1: {

        },
        method2: {

        },
        icon1: {
            type: String
        },
        icon2: {
            type: String
        },
        btn1: {
            type: String
        },
        btn2: {
            type: String
        }
    }
}

</script>
<style scoped>
/*Div dos botões no sidebar*/
.sb-btns {
    display: grid;
    text-align: left;
    padding-left: 10%;
    padding-right: 10%;
    gap:5px;
    margin-bottom: 30px;
}
label {
    color: rgb(7, 201, 239);
}

button {
    text-align: left;
    font-size: 11pt;
}
i {
    margin-right: 10px;
}
</style>
