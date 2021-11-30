<template>
  <page>
    <page-header>
      <template #title>Home</template>
    </page-header>
    <page-body>
      <div class="q-pa-lg">

        <div class="text-h5 q-mb-md">심플한 도구!</div>

        <q-btn
          to="/home/imagemap"
          label="이미지 지도 바로가기"
          color="primary"
          class="full-width q-mb-md"
          rounded
          unelevated
          no-caps
        />

        <q-btn
          to="/oxgen"
          label="활력 징후 체크 바로가기"
          color="primary"
          class="full-width q-mb-md"
          rounded
          unelevated
          no-caps
        />

        <!-- <p v-for="i in 20" :key="i">Lorems ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate aperiam suscipit blanditiis iusto earum, velit adipisci sequi ex ipsum, aut non. Doloremque iusto eius at quibusdam blanditiis ex vero eaque?</p> -->
      </div>
    </page-body>
  </page>
</template>

<script>
export default {
  name: 'Home'
}
</script>
