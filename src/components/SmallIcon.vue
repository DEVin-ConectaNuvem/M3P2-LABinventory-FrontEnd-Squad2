<template>
  <div class="center-icon">
    <div class="onlyIcon" @click="method">
      <i :class="icon"> </i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
    },
    method: {},
  },
};
</script>
<style scoped>
i {
  color: rgb(7, 201, 239);
}

/* Centraliza o icone */
.center-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

/* Configura o icone */
.onlyIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid rgb(7, 201, 239);
  padding: 6px 12px;
  width: 34px;
  height: 34px;
  cursor: pointer;
}

/* Muda o icone quando passa o mouse por cima */
.onlyIcon:hover {
  background-color: rgb(7, 201, 239);
}

.onlyIcon:hover i {
  color: rgb(14, 34, 63);
}
</style>
