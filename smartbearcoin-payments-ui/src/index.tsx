import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

Bugsnag.start({
  apiKey: '6df98fc6f28792399916d74b69cf46a6',
  plugins: [new BugsnagPluginReact()],
  releaseStage: process.env.NODE_ENV
});

const ErrorView = () => (
  <div>
    <p>Inform users of an error in the component tree.</p>
  </div>
);

const ErrorBoundary = Bugsnag.getPlugin('react')?.createErrorBoundary(React);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {ErrorBoundary ? (
      <ErrorBoundary FallbackComponent={ErrorView}>
        <App />
      </ErrorBoundary>
    ) : (
      <App />
    )}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
