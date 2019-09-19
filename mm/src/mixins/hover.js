export const hover = {
  data: function () {
    return {
     hover: false
    }
  },
  methods: {
    onMouseLeave() {
      this.hover = false;
    },
    onMouseEnter() {
        this.hover = true;
    }
  }
}