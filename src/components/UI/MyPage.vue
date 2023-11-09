<template>
    <div class="page">

    </div>
</template>
<script>
export default {
    name: 'my-page',
    props: {
        page: {
            type: Number,
            required: true
        }
    }
}
</script>
<style>
.page {
    color: black;
}
</style>