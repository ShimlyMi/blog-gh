import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType,
} from 'vue'

type global {
  const __APP_INFO__: {
    pkg: {
      name: string,
      version: string,
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }

  type ProType<T> = VuePropType<T>
  type VueMode = VNodeChild | JSX.Element
  type Nullable<T> = T | null


}

