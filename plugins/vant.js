import Vue from 'vue'
import {
  Button,
  Icon,
  Tabs,
  Tab,
  Popup,
  List,
  Cell,
  Tag,
  Field,
  CellGroup,
  Sidebar,
  SidebarItem,
  DropdownMenu,
  DropdownItem,
  Swipe,
  SwipeItem,
  Lazyload,
  Picker,
  DatetimePicker,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Notify,
  Stepper,
  Dialog
} from 'vant'

Vue.use(Lazyload)

Vue.use(Button)
  .use(Icon)
  .use(Tabs)
  .use(Tab)
  .use(Popup)
  .use(List)
  .use(Cell)
  .use(Tag)
  .use(Field)
  .use(CellGroup)
  .use(Sidebar)
  .use(SidebarItem)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Picker)
  .use(DatetimePicker)
  .use(RadioGroup)
  .use(Radio)
  .use(CheckboxGroup)
  .use(Checkbox)
  .use(Stepper)
  .use(Dialog)

if (process.browser) {
  window.alertError = (msg) => {
    Notify({ type: 'danger', message: msg })
  }
}
