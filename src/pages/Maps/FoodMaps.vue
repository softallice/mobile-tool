<template>
  <page>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back
          label="Home"
        />
      </template>
      <template #title>채식 지도</template>
    </page-header>
    <page-body>
      <div>
        <naver-maps
            :width="mapSize.width"
            :height="mapSize.height"
            @updateMap="loadMap($event)"
            :mapOptions="mapOptions"
            :initLayers="initLayers"
        >
          <!-- <naver-marker :lat="37" :lng="127" @click="onMarkerClicked" @load="onMarkerLoaded"></naver-marker> -->
          <!-- <naver-marker :options="markerOptions.imageIcon" /> -->
          <naver-marker
            :latitude="mapOptions.latitude"
            :longitude="mapOptions.longitude"
            @onLoad="loadMarker($event)"
            @click="goDetail()"
          >
          </naver-marker>
          <div
            v-for="restaurant in restaurants"
            :key="restaurant.crtfc_upso_mgt_sno"
          >
            <naver-marker
              :latitude="restaurant.y_dnts"
              :longitude="restaurant.x_cnts"
              @onLoad="loadMarker($event)"            >
              
            </naver-marker>
          </div>
        </naver-maps>
      </div>
      <div class="q-gutter-y-md" >
        <q-tabs
          v-model="tab"
          class="bg-grey-1"
          dense
          align="justify"
        >
          <q-tab class="text-orange" name="restaurant" icon="las la-carrot" label="식당" />
          <q-tab class="text-cyan" name="cafe" icon="las la-mug-hot" label="카페&베이커리" />
        </q-tabs>
        
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="restaurant">
            <div>
              <q-scroll-area style="height: 200px">
                <q-list 
                    padding
                  >
                  <q-item clickable v-ripple @click="changeMap(1)">
                    <q-item-section avatar >
                      <q-avatar rounded>
                        <img src="https://lh5.googleusercontent.com/p/AF1QipNsUIavYClA3-9yXQ0VO6rYyqIJdWRv2sS3FpS3=w408-h306-k-no">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>오노마토피</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="changeMap(2)">
                    <q-item-section avatar>
                      <q-avatar rounded>
                        <img src="https://lh5.googleusercontent.com/p/AF1QipO9uwX9dnoKEL3MJ2Ecfk-6kDLKboMN5yCQt1qA=w426-h240-k-no">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>세자매 바른빵</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="changeMap(3)">
                    <q-item-section avatar>
                      <q-avatar rounded>
                        <img src="https://lh5.googleusercontent.com/p/AF1QipOOOQ6lK457m12x0Oc6tRCT_H2rfUtZmD7ptAFR=w426-h240-k-no">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>한과채</q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </div>
          </q-tab-panel>

          <q-tab-panel name="cafe">
            <div>
              <q-scroll-area style="height: 200px">
                <q-list 
                    padding
                  >
                  <div
                    v-for="restaurant in restaurants"
                    :key="restaurant.crtfc_upso_mgt_sno"
                  >
                    <q-item 
                      clickable v-ripple @click="restaurantMap(restaurant.y_dnts , restaurant.x_cnts)">
                      <q-item-section avatar >
                        <q-avatar rounded>
                          <img src="https://lh5.googleusercontent.com/p/AF1QipNsUIavYClA3-9yXQ0VO6rYyqIJdWRv2sS3FpS3=w408-h306-k-no">
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>{{restaurant.upso_nm}}</q-item-section>
                    </q-item>
                  </div>
                </q-list>
              </q-scroll-area>
            </div>
          </q-tab-panel>
        </q-tab-panels>        
      </div>
      
    </page-body>
  </page>
</template>

<script>
import { defineComponent, onActivated, onDeactivated, reactive, ref } from "vue"
import { NaverMaps, NaverMarker } from "vue3-naver-maps"
// import { axios, api } from 'boot/axios'
import foodMap from 'src/use/seoul-food.json';
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: "Foods",
  components: { NaverMaps, NaverMarker },
  setup: () => {
    const $q = useQuasar() 
    const $router = useRouter()

    let restaurants = ref(null)  

    const map = ref(null)
    const mapSize = reactive({
      // width: "360px",
      height: "300px",
    })
    const mapOptions = ref({
      latitude: 37.63769258863893,
      longitude: 126.49058970610766,
      zoom: 16,
      zoomControl: false,
      zoomControlOptions: { position: "TOP_RIGHT" },
      mapTypeControl: false,
    })

    const initLayers = ref([
        "BACKGROUND",
        "BACKGROUND_DETAIL",
        "POI_KOREAN",
        "TRANSIT",
        "ENGLISH",
      ])

    const loadMap = (mapObject) => {
      map.value = mapObject
      // console.log(map.value.getCenter())
      // console.log(`[vue3-naver-maps] map is load!`)
    }
    const loadMarker = (marker) => {
    //   console.log(marker)
    }

    const changeMap = ( no ) => {
      if (no === 1) {
        mapOptions.value.latitude = 35.14200740202341
        mapOptions.value.longitude = 129.11000436590237
      } else if (no === 2) {
        mapOptions.value.latitude = 35.1739305056818
        mapOptions.value.longitude = 129.06596131163738
      } else {
        mapOptions.value.latitude = 37.574364536402385
        mapOptions.value.longitude = 126.98570346284271
      }
    }

    // 채식 음식점 조회
    onActivated(() => {
      getRestaurant()
    })

    onDeactivated(() => {
      restaurants.value = null
    })

    function goDetail() {
    //   $router.push('/foods/foodInfo')
    }

    function restaurantMap (latitude, longitude ) {
      mapOptions.value.latitude = Number(latitude)
      mapOptions.value.longitude = Number(longitude)
    }

    function getRestaurant () {
        
        let foodArry =foodMap.DATA.slice(0, 100).map( (food) => {
           return  {
                crtfc_upso_mgt_sno: food.crtfc_upso_mgt_sno,
                y_dnts: Number(food.y_dnts),
                x_cnts: Number(food.x_cnts),
                upso_nm: food.upso_nm
            }
        } );
        
        restaurants.value = foodArry;
        // console.log('foodArry :', foodArry);
        // restaurants.value = ;
    }
    
    return {
      mapOptions, 
      initLayers, 
      loadMap, 
      loadMarker,
      mapSize ,
      changeMap,
      tab: ref('restaurant'),
      restaurants,
      restaurantMap,
      goDetail
    }
  },
})
</script>

<style></style>