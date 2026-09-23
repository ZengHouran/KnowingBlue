<script setup>
import { astraArticle } from "../../data/astraArticle.js";
import AstraBenchmark from "./AstraBenchmark.vue";
import "../../styles/astra-article.css";

</script>

<template>
  <article class="astra-article" aria-label="GPT-6 Astra について">
    <template v-for="(block, index) in astraArticle" :key="block.id || index">
      <h2 v-if="block.type === 'heading'" :id="block.id" class="astra-article-heading">{{ block.text }}</h2>
      <h3 v-else-if="block.type === 'subheading'" :id="block.id" class="astra-article-subheading">{{ block.text }}</h3>
      <p v-else-if="block.type === 'paragraph'" class="astra-article-copy" v-html="block.html || block.text"></p>
      <aside v-else-if="block.type === 'callout'" class="astra-article-callout" v-html="block.html || block.text"></aside>
      <figure v-else-if="block.type === 'image'" class="astra-article-media" :class="{ 'astra-article-wide': block.wide }">
        <img :src="block.src" :alt="block.alt || ''" loading="lazy" />
        <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
      </figure>
      <figure v-else-if="block.type === 'video'" class="astra-article-media" :class="{ 'astra-article-wide': block.wide }">
        <video :src="block.src" :poster="block.poster" controls playsinline preload="metadata" :aria-label="block.label"></video>
        <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
      </figure>
      <figure v-else-if="block.type === 'embed'" class="astra-article-media" :class="{ 'astra-article-wide': block.wide }">
        <iframe :src="block.src" :title="block.label" loading="lazy" allow="autoplay; fullscreen; picture-in-picture; gamepad" allowfullscreen></iframe>
        <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
      </figure>
      <AstraBenchmark v-else-if="block.type === 'benchmarks'" :group="block.group" />
      <div v-else-if="block.type === 'table'" class="astra-article-table astra-article-wide">
        <table>
          <caption v-if="block.caption">{{ block.caption }}</caption>
          <thead><tr><th v-for="heading in block.headings" :key="heading" scope="col">{{ heading }}</th></tr></thead>
          <tbody><tr v-for="(row, rowIndex) in block.rows" :key="rowIndex"><td v-for="(value, columnIndex) in row" :key="columnIndex">{{ value }}</td></tr></tbody>
        </table>
      </div>
      <ul v-else-if="block.type === 'list'" class="astra-article-list"><li v-for="item in block.items" :key="item" v-html="item"></li></ul>
      <blockquote v-else-if="block.type === 'quote'" class="astra-article-quote"><p>{{ block.text }}</p><cite v-if="block.author">{{ block.author }}</cite></blockquote>
    </template>
  </article>
</template>
