<template>
  <page>
    <page-header>
      <template #title>질문</template>
    </page-header>
    <page-body>
      <div class="q-pa-lg">

        <div class="text-h5 q-mb-md">Q&A</div>

        <q-list bordered separator>
          <q-item
            to="/questions/answer"
            clickable
            v-ripple
          >
            <q-item-section>여행 지도?</q-item-section>
            <q-item-section avatar>
              <q-icon color="primary" name="chevron_right" />
            </q-item-section>
          </q-item>
          <!-- <q-item
            to="/questions/answer"
            clickable
            v-ripple
          >
            <q-item-section>How do I do that?</q-item-section>
            <q-item-section avatar>
              <q-icon color="primary" name="chevron_right" />
            </q-item-section>
          </q-item> -->
        </q-list>
      </div>
    </page-body>
  </page>
</template>

<script>
export default {
  name: 'Questions'
}
</script>
