
<template>
  少时诵诗书少时诵诗书是撒是撒是撒是撒是撒是撒是撒
</template>
<script setup>

import {
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watch
} from 'vue'
import { useFormItem } from 'naive-ui/es/_mixins'
import { call } from 'naive-ui/es/_utils'
import { useThemeStore } from '@/store/theme/theme'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

const props = {
  value: {
    type: String,
    default: ''
  },
  defaultValue: {
    type: String
  },
  'onUpdate:value': String,
  onUpdateValue:Function,
  options: {
    type: Object ,
    default: () => ({
      readOnly: false,
      language: 'shell'
    })
  }
}

// @ts-ignore
window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (['css', 'scss', 'less'].includes(label)) {
      return new cssWorker()
    }
    if (['html', 'handlebars', 'razor'].includes(label)) {
      return new htmlWorker()
    }
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker()
    }
    return new editorWorker()
  }
}
</script>

