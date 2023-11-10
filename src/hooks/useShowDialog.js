import { ref } from 'vue'

export default function useShowDialog() {
    
    const dialogVisible = ref(false)

    const showDialog = (show) => dialogVisible.value = show

    return {
        dialogVisible,
        showDialog
    }
}