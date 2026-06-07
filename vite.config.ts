import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'

import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { PageProperties } from '@nolebase/vitepress-plugin-page-properties/vite'
import { ThumbnailHashImages } from '@nolebase/vitepress-plugin-thumbnail-hash/vite'

import { githubRepoLink } from './metadata'

function watchNotesPlugin() {
  return {
    name: 'watch-notes',
    configureServer(server: any) {
      const { watcher, ws } = server
      // 监听笔记目录下 md 文件的新增和删除
      watcher.add('笔记/**/*.md')
      watcher.on('add', (file: string) => {
        if (!file.endsWith('.md'))
          return
        execSync('npx tsx scripts/update.ts')
        ws.send({ type: 'full-reload' })
      })
      watcher.on('unlink', (file: string) => {
        if (!file.endsWith('.md'))
          return
        execSync('npx tsx scripts/update.ts')
        ws.send({ type: 'full-reload' })
      })
    },
  }
}

export default defineConfig(async () => {
  return {
    assetsInclude: ['**/*.mov'],
    optimizeDeps: {
      // vitepress is aliased with replacement `join(DIST_CLIENT_PATH, '/index')`
      // This needs to be excluded from optimization
      exclude: [
        'vitepress',
      ],
    },
    plugins: [
      watchNotesPlugin(),
      Inspect(),
      GitChangelog({
        repoURL: () => githubRepoLink,
      }),
      PageProperties(),
      ThumbnailHashImages(),
      Components({
        include: [/\.vue$/],
        dirs: '.vitepress/theme/components',
        dts: '.vitepress/components.d.ts',
      }),
      UnoCSS(),
    ],
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
        '@nolebase/vitepress-plugin-inline-link-preview',
      ],
    },
  }
})
