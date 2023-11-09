<template>
    <form @submit.prevent>
        <h4>Добавление поста</h4>
        <my-input
            v-focus
            v-model.trim="post.title"
            placeholder="Название"/>
        <my-input
            v-model.trim="post.body"
            placeholder="Описание"/>
        <my-button
            @click="createPost"
            style="align-self: flex-end;"
            class="btn">Добавить пост</my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = new Date()
            this.$emit('create', this.post)
            this.post = {
                title: '',
                body: ''
            }
        }
    },
    /*
    watch: {
        post: { //для слежки за вложенными полями нужна глубокая слежка
            handler(newValue) {
                console.log(newValue)
            },
            deep: true
        }
    }
    */
}

</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

</style>