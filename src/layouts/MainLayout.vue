<template>
  <q-layout
    view="lHh Lpr lFf"
    :class="{ 'ios-browser-swiping-back' : store.state.iosBrowserSwipingBack }"
  >
    <!-- <q-footer bordered class="bg-white text-primary">
      <q-tabs
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
        no-caps
      >
        <q-route-tab
          v-for="navItem in store.state.navItems"
          :key="navItem.root"
          :to="navItem.to"
          :label="navItem.label"
          :icon="navItem.icon"
        />
        

      </q-tabs>
    </q-footer> -->
    <!-- add bottom menu -->
    <BottomMenu
      :options="options"
      :badge-color="badgeColor"
      :foreground-color="foregroundColor"
      v-model="selected"
    />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import store from 'src/myStore'
import BottomMenu from 'src/components/Menu/BottomMenu.vue';

export default {
  name: 'MainLayout',
  components: { BottomMenu },
  setup () {
    const selected = ref(1);
    const options = ref([
      {
        id: 1,
        icon: "fas fa-home",
        title: "Home",
        path:"/"
      },
      // {
      //   id: 1,
      //   icon: "fas fa-home",
      //   title: "Home",
      //   childs: [
      //     { id: 101, icon: "fas fa-tshirt", title: "Products" },
      //     { id: 102, icon: "fas fa-tag", title: "Discount" },
      //     { id: 103, icon: "fas fa-gifts", title: "Gifts", badge: 7 },
      //   ],
      // },
      { id: 2, icon: "fas fa-wallet", title: "Wallet" , path:"/home/imagemap"},
      {
        id: 3,
        icon: "fas fa-plus",
        title: "Setting",
        childs: [
          { id: 301, icon: "fas fa-bookmark", title: "Bookmarks" },
          { id: 302, icon: "fas fa-tasks", title: "Tasks" },
          { id: 303, icon: "fas fa-tachometer-alt", title: "Dashboard" },
          { id: 304, icon: "fas fa-ticket-alt", title: "Tickets" },
          { id: 305, icon: "fas fa-file-signature", title: "Contract" },
        ],
      },
      { id: 4, icon: "fas fa-bell", title: "Notifcation", badge: 15 },
      { id: 5, icon: "fas fa-user-cog", title: "Setting", path:"/settings" },
    ]);

    const foregroundColor = ref("#42A5F5");
    const badgeColor =  ref("#FBC02D");

    return {
      selected,
      options,
      foregroundColor,
      badgeColor,
      store
    }
  }
}
</script>


  