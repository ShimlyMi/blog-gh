import type { AppRouteRecordRaw, AppRouteModule } from "@/router/types";
import type { Router, RouteLocationNormalized } from "vue-router";
import { getParentLayout, LAYOUT } from "@/router/constant";
import { cloneDeep, omit } from 'lodash-es'
import { warn } from "@/utils/log";
import { createRouter, createWebHistory } from "vue-router";
import {import} from "@babel/types";

export type LayoutMapKey = 'LAYOUT'
const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()
LayoutMap.set('LAYOUT', LAYOUT)
