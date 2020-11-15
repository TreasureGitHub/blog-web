import React, {createElement} from 'react'
import Loadable from 'react-loadable'
import {Spin} from "antd";
import {navData} from "./nav";

/**
 * @author ffl.lff
 * @date 2020/2/2
 */

let routerDataCache;

const modelNotExisted = (app, model) =>
  !app._models.some(({modelPath}) => {
    return modelPath === model;
  });

const dynamicWrapper = (app, models = [], component) => {
  models.forEach(modelPath => {
    const modelRequire = require(`../models/${modelPath}`).default;
    if (modelRequire) {
      modelRequire.modelPath = modelPath;
      app.model(modelRequire)
    }
  });

  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app)
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache
      })
    }
  }
  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app)
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache
        })
      })
    },
    loading: () => {
      return <Spin size='large' className='global-spin'/>
    }
  })
}

export const getRouterData = app => {
  const routerConfig = navData.reduce((total, currentValue) => {
    const {path, model, component, name, exact} = currentValue;
    return {
      ...total,
      [path]: {
        name,
        exact,
        component: dynamicWrapper(app, model, component),
      }
    }
  }, {});

  const routerData = {};

  Object.keys(routerConfig).forEach(path => {
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name,
      hideInBreadcrumb: router.hideInBreadcrumb,
    };
    routerData[path] = router
  });
  return routerData;
}
