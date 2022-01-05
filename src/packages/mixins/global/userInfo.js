import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app/user', { user: (s) => s })
  }
}
