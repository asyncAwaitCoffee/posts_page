export default {
    mounted(element, binding) {
        //console.log(element, binding)
        
        let options = {
        rootMargin: "0px",
        threshold: 1.0,
        }

        const callback = (entries) => {
            if (entries[0].isIntersecting /*&& this.page <= this.totalPages*/) {
                binding.value()
            }
        }

        let observer = new IntersectionObserver(callback, options);
        observer.observe(element)

    },
    name: 'intersection'
}