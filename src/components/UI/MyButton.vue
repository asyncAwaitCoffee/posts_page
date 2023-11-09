<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>
.btn {
    background: none;
    border: 1px solid teal;
    color: teal;
    padding: 5px 10px;
    margin: 5px;
}
</style>