<template>
  <div ref="aniContainer" :style="style">
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import lottie from 'lottie-web'

export default {
  name: 'Lottie',
  props: {
    options: {
      type: Object,
      required: true,
    },
    height: {
      type: String,
      default: '100%',
    },
    width: {
      type: String,
      default: '100%',
    },
  },
  setup(props, context) {
    const style = {
      width: props.width,
      height: props.height,
      overflow: 'hidden',
      margin: '0 auto',
    }
    const aniContainer = ref()

    onMounted(() => {
        const anim = lottie.loadAnimation({
            container: aniContainer.value,
            renderer: 'svg',
            loop: !!props.options.loop,
            autoplay: !!props.options.autoplay,
            animationData: props.options.animationData,
            rendererSettings: props.options.rendererSettings,
        })
        context.emit('animCreated', anim)
        })

    return {
      aniContainer,
      style,
    }
  },
}
</script>