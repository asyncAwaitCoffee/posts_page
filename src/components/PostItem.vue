<template>
    <div class="post">
        <div>
            <div><strong>{{ post.title }}</strong> {{ post.body }}</div>
        </div>  
        <div class="post__btns">
            <my-button
                @click="$router.push(`/posts/${post.id}`)"
            >Open</my-button>
            <my-button
                @click="$emit('remove', post)"
            >Delete</my-button>
        </div>    
    </div>
</template>
<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.post {
    margin-top: 5px;
    padding: 5px;
    border: 4px solid teal;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.post__btns {
    display: flex;
}
</style>