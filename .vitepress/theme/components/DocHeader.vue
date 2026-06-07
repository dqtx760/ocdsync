<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, ref, onMounted } from 'vue'

const { frontmatter } = useData()

// 日期格式化: 2026-05-26T00:00:00 → 2026/05/26
function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  // 只要日期部分（前10位），把 - 换成 /
  return dateStr.slice(0, 10).replace(/-/g, '/')
}

// 计算阅读时间
function calcReadingTime(wordCount: number): string {
  const minutes = Math.ceil(wordCount / 300)
  return minutes < 1 ? '少于 1 分钟' : `约 ${minutes} 分钟`
}

const wordCountRef = ref(0)

onMounted(() => {
  // 从页面的 .vp-doc 容器中读取纯文本字数
  const doc = document.querySelector('.vp-doc')
  if (doc) {
    const text = doc.textContent || ''
    wordCountRef.value = text.replace(/\s+/g, '').length
  }
})

const readTime = computed(() => calcReadingTime(wordCountRef.value))
</script>

<template>
  <div v-if="frontmatter.title" class="doc-header">
    <h1 class="doc-title">{{ frontmatter.title }}</h1>
    <div class="doc-meta">
      <span v-if="frontmatter.time" class="meta-item">
        📅 {{ formatDate(frontmatter.time) }}
      </span>
      <span v-if="frontmatter.time" class="meta-item meta-sep">·</span>
      <span class="meta-item">📝 {{ wordCountRef }} 字</span>
      <span class="meta-item meta-sep">·</span>
      <span class="meta-item">⏱ {{ readTime }}</span>
    </div>
  </div>
</template>

<style scoped>
.doc-header {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.doc-title {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.doc-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.meta-sep {
  color: var(--vp-c-divider);
}
</style>
