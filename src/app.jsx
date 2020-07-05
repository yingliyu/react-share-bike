import React from 'react'
import { BaseLayout, MainLayout } from '@/layouts'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { RouterMain, RouterBase } from '@/routers'

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Switch>
          <Route
            path="/admin"
            render={(routeProps) => (
              <MainLayout {...routeProps}>
                <Switch>
                  {RouterMain.map((router, index) =>
                    !router.children ? (
                      <Route
                        {...routeProps}
                        key={index}
                        path={router.path}
                        component={router.component}
                        exact={!!router.exact}
                      />
                    ) : (
                      router.children.map((item) => (
                        <Route
                          {...routeProps}
                          key={index}
                          path={item.path}
                          component={item.component}
                          exact={!!item.exact}
                        />
                      ))
                    )
                  )}
                  <Redirect to="/admin/dashboard" from="/admin" exact />
                  <Redirect to="/404" />
                </Switch>
              </MainLayout>
            )}
          />
          <Route
            path="/"
            render={(routeProps) => (
              <BaseLayout {...routeProps}>
                <Switch>
                  {RouterBase.map((router, index) =>
                    !router.children ? (
                      <Route
                        key={index}
                        path={router.path}
                        component={router.component}
                        exact={!!router.exact}
                      />
                    ) : (
                      router.children.map((item, index) => (
                        <Route
                          key={index}
                          path={item.path}
                          component={item.component}
                          exact={!!item.exact}
                        />
                      ))
                    )
                  )}
                  <Redirect to="/login" from="/" exact />
                  <Redirect to="/404" />
                </Switch>
              </BaseLayout>
            )}
          />
        </Switch>
      </div>
    </Router>
  )
}
