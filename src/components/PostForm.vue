<template>
    <form @submit.prevent>
        <h4>New post</h4>
        <my-input
            v-focus
            v-model.trim="post.title"
            placeholder="Title"/>
        <my-input
            v-model.trim="post.body"
            placeholder="Description"/>
        <my-button
            @click="createPost"
            style="align-self: flex-end;"
            class="btn">Add</my-button>
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