<script lang="ts" setup>
import { isArray } from 'onepiece-utils';

function childrenLength(children: unknown): number | '' {
  if (isArray(children)) {
    return children.length;
  }
  return '';
}
</script>

<template>
  <a-directory-tree
    v-bind="$attrs"
    selectable
  >
    <template #title="{ title, children }">
      <span>{{ title }} - {{ childrenLength(children) }}</span>
    </template>
  </a-directory-tree>
</template>

<style></style>
