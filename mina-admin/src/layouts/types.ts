
export type routeMetaType = {
  title?: string;
  icon?: string;
  showLink?: boolean;
  savedPosition?: boolean;
  auths?: Array<string>;
};

export type RouteConfigs = {
  path?: string;
  parentPath?: string;
  query?: object;
  params?: object;
  meta?: routeMetaType;
  children?: RouteConfigs[];
  name?: string;
};

export type menuType = {
  // id?: number;
  path?: string;
  noShowingChildren?: boolean;
  children?: menuType[];
  value: unknown;
  meta?: {
    icon?: string;
    title?: string;
    rank?: number;
    showParent?: boolean;
    extraIcon?: { svg?: boolean; name?: string };
  };
  showTooltip?: boolean;
  parentId?: number;
  pathList?: number[];
  redirect?: string;
};
