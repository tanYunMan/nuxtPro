import { mapState } from 'vuex'

function runCode(str) {
  !str && (str = '')
  if (~str.indexOf('<script')) {
    try {
      const frag = document.createRange().createContextualFragment(str)
      document.body.appendChild(frag)
    } catch (e) {
      console.log(e)
    }
  } else if (str) {
    /* eslint-disable no-eval */
    eval(str)
  }
}

export default {
  data() {
    return {
      fixupPage: 'home'
    }
  },
  computed: {
    ...mapState({
      fixupCodes: (state) => state.fixupCodes
    })
  },
  mounted() {
    const {
      specialCode,
      leftSpecialCode,
      rightSpecialCode,
      insideSpecialCode
    } = this.fixupCodes
    window.addEventListener('load', () => {
      if (this.fixupPage === 'home') {
        runCode(specialCode)
        runCode(leftSpecialCode)
        runCode(rightSpecialCode)
      } else if (this.fixupPage === 'in') {
        runCode(insideSpecialCode)
      }
    })
  }
}
