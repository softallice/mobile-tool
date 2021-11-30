<template>
  <page>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back
          label="Images"
        />
      </template>
      <template #title>Image</template>
    </page-header>
    <page-body>
      <transition
        appear
        enter-active-class="animated fadeIn slower"
        leave-active-class="animated fadeOut slower"
      >
        <div
          v-if="image"
        >
          <q-img
            :src="image.url"
            class="no-pointer-events"
            no-transition
            no-spinner
          />
          <div class="q-pa-lg">
            <div class="text-h5 q-mb-md">{{ image.caption }}</div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo deserunt explicabo illo quidem distinctio sint, consectetur illum non, necessitatibus esse incidunt. Facilis accusantium suscipit enim quod unde quae itaque sit.</p>
          </div>
        </div>
      </transition>
    </page-body>
  </page>
</template>

<script>
import { onActivated, onDeactivated, ref } from 'vue'
import { useRoute } from 'vue-router'
import store from 'src/myStore'

export default {
  name: 'Image',
  setup() {

    let image = ref()

    onActivated(() => {
      let route = useRoute()
      image.value = store.getters.getImage(route.params.id)
    })

    onDeactivated(() => {
      image.value = null
    })

    return {
      store,
      image
    }
  }
}
</script>
