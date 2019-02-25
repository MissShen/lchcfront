import {mapGetters} from 'vuex'
import {isNotNull} from "src/utils/validateUtil";

export default {
  computed: {
    ...mapGetters([
      'perms',
      'loginCode',
    ]),
  },
  methods: {
    hasPerm(perm) {
      if ('none' == perm) {
        return true;
      }
      if ('login' == perm) {
        return isNotNull(this.loginCode)
      }
      return !!this.perms[perm];

    },
    hasLogin() {
      return !!this.loginCode;

    }
  }

}
