

export default {
    props: ["value"],
    data() {
      return {
        value_: ""
      }
    },
    watch: {
      value: {
        handler(n, o) {
          if (n != o) this.value_ = n
        },
        immediate: true
      }
    },
    methods: {
      onChange(data) {
        this.value_ = data
        this.$emit("input", this.value_)
        this.$emit("change", this.value_)
      }
    }
  }
  
  