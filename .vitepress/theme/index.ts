import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import { toRefs } from "vue";
import { h } from 'vue'

import {
  InjectionKey as NolebaseEnhancedReadabilitiesInjectionKey,
  LayoutMode as NolebaseEnhancedReadabilitiesLayoutMode,
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import {
  NolebaseInlineLinkPreviewPlugin,
} from '@nolebase/vitepress-plugin-inline-link-preview/client'

import {
  NolebaseHighlightTargetedHeading,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'

import {
  InjectionKey as NolebaseGitChangelogInjectionKey,
  NolebaseGitChangelogPlugin,
} from '@nolebase/vitepress-plugin-git-changelog/client'

import {
  NolebasePagePropertiesPlugin,
} from '@nolebase/vitepress-plugin-page-properties/client'

import {
  NolebaseUnlazyImg,
} from '@nolebase/vitepress-plugin-thumbnail-hash/client'

import { creators } from '../creators'

import AppContainer from './components/AppContainer.vue'
import DocHeader from './components/DocHeader.vue'
import DocFooter from './components/DocFooter.vue'
import HomePage from './components/HomePage.vue'
import Share from './components/Share.vue'
import TocList from './components/TocList.vue'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'
import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@nolebase/vitepress-plugin-page-properties/client/style.css'
import '@nolebase/vitepress-plugin-thumbnail-hash/client/style.css'
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css'

import 'virtual:uno.css'

import '../styles/main.css'
import '../styles/vars.css'

import('@nolebase/vitepress-plugin-inline-link-preview/client')

const ExtendedTheme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-top': () => [
        h(NolebaseHighlightTargetedHeading),
      ],
      'doc-before': () => [
        h(DocHeader),
      ],
      'nav-bar-content-after': () => [
        h(NolebaseEnhancedReadabilitiesMenu),
      ],
      'nav-screen-content-after': () => [
        h(NolebaseEnhancedReadabilitiesScreenMenu),
      ],
    })
  },
  enhanceApp({ app }) {
    /**
     * Have to manually import and register the essential components that needed during build globally.
     *
     * Learn more at: Warn `Hydration completed but contains mismatches.` and Custom components are not rendered · Issue #1918 · vuejs/vitepress
     * https://github.com/vuejs/vitepress/issues/1918
     */

    app.component('HomePage', HomePage)
    app.component('DocHeader', DocHeader)
    app.component('DocFooter', DocFooter)
    app.component('Share', Share)
    app.component('TocList', TocList)
    app.component('AppContainer', AppContainer)
    app.component('NolebaseUnlazyImg', NolebaseUnlazyImg)

    app.provide(NolebaseEnhancedReadabilitiesInjectionKey, {
      layoutSwitch: {
        defaultMode: NolebaseEnhancedReadabilitiesLayoutMode.SidebarWidthAdjustableOnly,
      },
      spotlight: {
        defaultToggle: true,
        hoverBlockColor: 'rgba(200, 215, 240, 0.12)',
      },
    })

    app.provide(NolebaseGitChangelogInjectionKey, {
      mapContributors: creators,
    })

    app.use(NolebaseInlineLinkPreviewPlugin)
    app.use(NolebaseGitChangelogPlugin)
    app.use(NolebasePagePropertiesPlugin<{
      tags: string[]
      progress: number
    }>(), {
      properties: {
        'zh-CN': [
          {
            key: 'time',
            type: 'datetime',
            title: '发布时间',
            dateFnsLocaleName: 'zhCN',
          },
          {
            key: 'wordCount',
            type: 'dynamic',
            title: '字数',
            options: {
              type: 'wordsCount',
            },
          },
          {
            key: 'readingTime',
            type: 'dynamic',
            title: '阅读时间',
            options: {
              type: 'readingTime',
              dateFnsLocaleName: 'zhCN',
            },
          },
        ],
      },
    })
  },
  setup() {
    // giscus 评论暂不配置，避免显示错误
    // 如需启用请参考 https://giscus.app/ 配置并取消下方注释
    //
    // const { frontmatter } = toRefs(useData());
    // const route = useRoute();
    // giscusTalk({
    //   repo: 'Jackiexiao/nolebase-template',
    //   repoId: 'R_kgDOL5WHsg',
    //   category: 'Announcements',
    //   categoryId: 'DIC_kwDOL5WHss4CfTYs',
    //   mapping: 'pathname',
    //   inputPosition: 'top',
    //   lang: 'zh-CN',
    //   locales: {
    //       'zh-Hans': 'zh-CN',
    //       'en-US': 'en'
    //   },
    //   homePageShowComment: false,
    //   lightTheme: 'light',
    //   darkTheme: 'transparent_dark',
    // }, {
    //   frontmatter, route
    // }, true);
  }
}

export default ExtendedTheme
