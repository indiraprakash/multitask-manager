<template>
  <transition name="modal">  
    <div
      class="modal"
      @click="clicked"
      >
      <div class="modal-inner">
        <div class="title">
          <slot name="title"></slot>
        </div>
        <br>
        <br>
        <div class="message">
          <slot name="message"></slot>
        </div>
        <button
          @click.stop="clicked"
          >
          Ok
        </button>
      </div>
    </div>
  </transition> 
</template>

<script>
export default {
  props: {
    clicked: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
  .modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000099;
    transition: all .3s ease;
  }
  .modal-inner {
    width: 70%;
    transition: all .3s ease;
    background-color: #eeeeee;
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .title{
    margin: 1rem, 1rem;
  }
  .message{
    margin: 1rem, 1rem;
  }

  .modal-enter {
    opacity: 0;
    transform: translate(-50%, -50%);
  }

  .modal-leave-active {
    opacity: 0;
    transform: translate(-50%, -50%);
  }

  .modal-enter,
  .modal-leave-active {
    transform: scale(1.1);
  }
  button {
    float: right;
    margin: 1rem;
  }
</style>
