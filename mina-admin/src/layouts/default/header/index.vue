<template>
  <Header :class="getHeaderClass">
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      <!-- logo -->
      <AppLogo
        v-if="getShowHeaderLogo || getIsMobile"
        :class="`${prefixCls}-logo`"
        :theme="getHeaderTheme"
        :style="getLogoWidth"
      />
      <LayoutTrigger
        v-if="
          (getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || getIsMobile
        "
        :theme="getHeaderTheme"
        :sider="false"
      />
      <LayoutBreadcrumb v-if="getShowContent && getShowBread" :theme="getHeaderTheme" />
    </div>
    <!-- left end -->

    <!-- menu start -->
    <div :class="`${prefixCls}-menu`" v-if="getShowTopMenu && !getIsMobile">
      <LayoutMenu
        :isHorizontal="true"
        :theme="getHeaderTheme"
        :splitType="getSplitType"
        :menuMode="getMenuMode"
      />
    </div>
    <!-- menu-end -->

    <!-- action  -->
    <div :class="`${prefixCls}-action`">
      <AppSearch :class="`${prefixCls}-action__item `" v-if="getShowSearch" />

      <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item notify-item`" />

      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`" />

      <AppLocalePicker
        v-if="getShowLocalePicker"
        :reload="true"
        :showText="false"
        :class="`${prefixCls}-action__item`"
      />
      <AppDarkModeToggle :class="`${prefixCls}-action__mode`" />
      <UserDropDown :class="`${prefixCls}-action__item `" :theme="getHeaderTheme" />
    </div>
  </Header>
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue'

  import { propTypes } from '/@/utils/propTypes'

  import { Layout } from 'ant-design-vue'
  import { AppLogo } from '/@/components/Application'
  import LayoutMenu from '../menu/index.vue'
  import LayoutTrigger from '../trigger/index.vue'

  import { AppSearch } from '/@/components/Application'

  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'

  import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum'
  import { AppLocalePicker } from '/@/components/Application'

  import { UserDropDown, LayoutBreadcrumb, FullScreen, Notify } from './components'
  import { useAppInject } from '/@/hooks/web/useAppInject'
  import { useDesign } from '/@/hooks/web/useDesign'

  // import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent'
  import { useLocale } from '/@/locales/useLocale'
  import AppDarkModeToggle from '/@/components/Application/src/AppDarkModeToggle.vue'

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      AppDarkModeToggle,
      Header: Layout.Header,
      AppLogo,
      LayoutTrigger,
      LayoutBreadcrumb,
      LayoutMenu,
      UserDropDown,
      AppLocalePicker,
      FullScreen,
      Notify,
      AppSearch,
    },
    props: {
      fixed: propTypes.bool,
    },
    setup(props) {
      const { prefixCls } = useDesign('layout-header')
      const {
        getShowTopMenu,
        getShowHeaderTrigger,
        getSplit,
        getIsMixMode,
        getMenuWidth,
        getIsMixSidebar,
      } = useMenuSetting()
      const { getUseErrorHandle, getShowSettingButton } = useRootSetting()

      const {
        getHeaderTheme,
        getShowFullScreen,
        getShowNotice,
        getShowContent,
        getShowBread,
        getShowHeaderLogo,
        getShowSearch,
      } = useHeaderSetting()

      const { getShowLocalePicker } = useLocale()

      const { getIsMobile } = useAppInject()

      const getHeaderClass = computed(() => {
        const theme = unref(getHeaderTheme)
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed,
            [`${prefixCls}--mobile`]: unref(getIsMobile),
            [`${prefixCls}--${theme}`]: theme,
          },
        ]
      })

      const getLogoWidth = computed(() => {
        if (!unref(getIsMixMode) || unref(getIsMobile)) {
          return {}
        }
        const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth)
        return { width: `${width}px` }
      })

      const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE
      })

      const getMenuMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null
      })

      return {
        prefixCls,
        getHeaderClass,
        getShowHeaderLogo,
        getHeaderTheme,
        getShowHeaderTrigger,
        getIsMobile,
        getShowBread,
        getShowContent,
        getSplitType,
        getSplit,
        getMenuMode,
        getShowTopMenu,
        getShowLocalePicker,
        getShowFullScreen,
        getShowNotice,
        getUseErrorHandle,
        getLogoWidth,
        getIsMixSidebar,
        getShowSettingButton,
        getShowSearch,
      }
    },
  })
</script>
<style lang="less">
  @import './index.less';
</style>
