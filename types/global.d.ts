declare global {
  declare module 'vue-router' {
    export interface RouteMeta {
      isPublic?: boolean
      layout?: string
      isAdmin?: boolean
    }
  }
}
