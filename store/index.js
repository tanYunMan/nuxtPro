export const state = () => ({
  platform: 'web',
  user: {},
  backUrl: '',
  updateEnable: false,
  hasTradePwd: false,
  site: {},
  wapHeader: {
    logo: false,
    back: true
  },
  fixupCodes: {},
  browser: '',
  systemStyle: {},
  isSupply: false,
  searchGoodsTxt: '',
  isMobile: false,
  isMobileShow: 1
})

export const getters = {
  user: (state) => state.user,
  site: (state) => state.site
}

export const mutations = {
  updateUser(state, user) {
    state.user = user
  },
  updatePlatform: (state, platform) => {
    state.platform = platform
  },
  updateBackUrl: (state, url) => {
    state.backUrl = url
  },
  updateEnableUpdate: (state, enable) => {
    state.updateEnable = enable
  },
  updateHasTradePwd: (state, isPwd) => {
    state.hasTradePwd = isPwd
  },
  updateSite(state, site) {
    state.site = site
  },
  updateWapHeader(state, { isLogo, isBack }) {
    if (isLogo) {
      state.wapHeader.logo = true
    }
    if (isBack === false) {
      state.wapHeader.back = false
    }
  },
  updateFixup(state, codes) {
    state.fixupCodes = codes
  },
  updateBorswer(state, browser) {
    state.browser = browser
  },
  updateSystemStyle(state, style) {
    //console.log(22222222, style)
    state.systemStyle = style
  },
  updateIsSupply(state, supply) {
    state.isSupply = supply
  },
  setSearchFeach (state, str) {
    state.searchGoodsTxt = str
  },
  setMobileShow (state, str) {
    state.isMobileShow = str
  },
  setIsMobile (state, str) {
    state.isMobile = str
  }
}

export const actions = {
  async getUserExtend({commit}) {
    const res = await this.$axios.get('/user/userExtend/get')
    if (res.code === 1001 && res.body) {
      const data = res.body;
      commit('updateIsSupply',data.isSupply === 1)
    } else {
      commit('updateIsSupply',false)
    }
  },
}
