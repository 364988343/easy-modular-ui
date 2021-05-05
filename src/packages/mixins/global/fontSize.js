import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app/skins', ['fontSize'])
  }
}

