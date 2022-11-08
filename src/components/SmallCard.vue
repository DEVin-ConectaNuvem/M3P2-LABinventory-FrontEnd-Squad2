<template>
    <label class="shadow col-sm-2">
        <span>
            <i :class="icon"></i>
            <div class="data">
            <strong>{{ data }}</strong>
            </div>
            <div class="data-footer">
            <strong>{{footer}}</strong>
            </div>
        </span>
    </label>
</template>
<script>
export default {
    props: {
        icon: {
            type: String
        },
        data: {
        },
        footer: {
            type: String
        }
    }
}
</script>
<style scoped>

label {
    background-color: rgb(187, 218, 245);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-width: 154px;
    min-height: 154px;
    border-radius: 10px;
    margin: 15px;
    padding: 20px;
}
i {
    margin-bottom: 5px;
}
.data {
    font-size: 1.5em;
}

</style>