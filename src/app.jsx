import React from 'react'
import { BaseLayout, MainLayout } from '@/layouts'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Switch>
          <Route path="/">
            <MainLayout />
          </Route>
          <Route path="/base">
            <BaseLayout />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
