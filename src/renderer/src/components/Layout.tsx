import { defineComponent, ref } from 'vue'
import {
  QAvatar,
  QBtn,
  QDrawer,
  QFooter,
  QHeader,
  QLayout,
  QPageContainer,
  QRouteTab,
  QTabs,
  QToolbar,
  QToolbarTitle
} from 'quasar'
import { RouterView } from 'vue-router'

export default defineComponent({
  props: {},
  emits: [],
  setup: (props, { slots, emit, expose, attrs }) => {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }
    return () => (
      <QLayout view="hHh lpR fFf">
        <QHeader elevated class="bg-primary text-white" height-hint="98">
          <QToolbar>
            <QBtn dense flat round icon="menu" onClick={toggleLeftDrawer} />

            <QToolbarTitle>
              <QAvatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
              </QAvatar>
              Title
            </QToolbarTitle>

            <QBtn dense flat round icon="menu" onClick={toggleRightDrawer} />
          </QToolbar>

          <QTabs align="left">
            <QRouteTab to="/video_handle" label="Page One" />
            <QRouteTab to="/page2" label="Page Two" />
            <QRouteTab to="/page3" label="Page Three" />
          </QTabs>
        </QHeader>

        <QDrawer show-if-above v-model={leftDrawerOpen.value} side="left" bordered>
          {/*drawer content*/}
        </QDrawer>

        <QDrawer show-if-above v-model={rightDrawerOpen.value} side="right" bordered>
          {/*drawer content*/}
        </QDrawer>

        <QPageContainer>
          <RouterView />
        </QPageContainer>

        <QFooter elevated class={'bg-grey-8 text-white'}>
          <QToolbar>
            <QToolbarTitle>
              <QAvatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
              </QAvatar>
              <div>Title</div>
            </QToolbarTitle>
          </QToolbar>
        </QFooter>
      </QLayout>
    )
  }
})
