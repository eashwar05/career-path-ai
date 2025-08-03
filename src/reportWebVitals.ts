import type { Metric } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then((module) => {
      // Detect if webVitals functions are on module.default or module itself
      const webVitals = 
        (module && typeof (module as any).getCLS === 'function')
          ? module
          : ((module && (module as any).default) || {});

      if (typeof (webVitals as any).getCLS === 'function') (webVitals as any).getCLS(onPerfEntry);
      if (typeof (webVitals as any).getFID === 'function') (webVitals as any).getFID(onPerfEntry);
      if (typeof (webVitals as any).getFCP === 'function') (webVitals as any).getFCP(onPerfEntry);
      if (typeof (webVitals as any).getLCP === 'function') (webVitals as any).getLCP(onPerfEntry);
      if (typeof (webVitals as any).getTTFB === 'function') (webVitals as any).getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
