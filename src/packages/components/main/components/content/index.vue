<template>
  <div class="em-main-content">
    <div class="em-main-content-top">
      <em-tabnav>
        <template v-slot:before>
          <div class="em-main-sidebar-toggle-btn">
            <a @click.prevent="sidebarToggle">
              <em-icon :name="sidebarCollapse ? 'indent-left' : 'indent-right'"></em-icon>
            </a>
          </div>
        </template>
      </em-tabnav>
    </div>
    <div class="em-main-content-body">
      <transition name="fade-transverse">
        <keep-alive :include="keepAlive">
          <router-view :key="$route.path" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('app/sidebar', { sidebarCollapse: 'collapse' }),
    ...mapState('app/page', ['keepAlive'])
  },
  methods: {
    ...mapActions('app/sidebar', { sidebarToggle: 'toggle' })
  }
}
</script>
