// Performance testing and monitoring utilities
export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
    this.isMonitoring = false;
  }

  // Start monitoring performance
  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.setupObservers();
    this.recordCoreWebVitals();
    
    console.log('🚀 Performance monitoring started');
  }

  // Setup performance observers
  setupObservers() {
    // Observe paint timing
    if ('PerformanceObserver' in window) {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric(entry.name, entry.startTime);
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(paintObserver);

        // Observe navigation timing
        const navigationObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordNavigationMetrics(entry);
          }
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navigationObserver);

        // Observe resource timing
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordResourceMetrics(entry);
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);

      } catch (error) {
        console.warn('Performance Observer not fully supported:', error);
      }
    }
  }

  // Record Core Web Vitals
  recordCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.recordMetric('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (error) {
        console.warn('LCP observer failed:', error);
      }
    }

    // First Input Delay (FID) - simulated
    this.recordFirstInputDelay();

    // Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          this.recordMetric('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (error) {
        console.warn('CLS observer failed:', error);
      }
    }
  }

  // Record First Input Delay
  recordFirstInputDelay() {
    let firstInputDelay = null;
    
    const recordFID = (event) => {
      if (firstInputDelay === null) {
        firstInputDelay = performance.now() - event.timeStamp;
        this.recordMetric('FID', firstInputDelay);
        
        // Remove listeners after first input
        ['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach(type => {
          document.removeEventListener(type, recordFID, true);
        });
      }
    };

    ['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach(type => {
      document.addEventListener(type, recordFID, true);
    });
  }

  // Record navigation metrics
  recordNavigationMetrics(entry) {
    const metrics = {
      'DNS Lookup': entry.domainLookupEnd - entry.domainLookupStart,
      'TCP Connection': entry.connectEnd - entry.connectStart,
      'TLS Negotiation': entry.secureConnectionStart ? entry.connectEnd - entry.secureConnectionStart : 0,
      'Request': entry.responseStart - entry.requestStart,
      'Response': entry.responseEnd - entry.responseStart,
      'DOM Processing': entry.domContentLoadedEventStart - entry.responseEnd,
      'Resource Loading': entry.loadEventStart - entry.domContentLoadedEventEnd,
      'Total Load Time': entry.loadEventEnd - entry.navigationStart
    };

    Object.entries(metrics).forEach(([name, value]) => {
      this.recordMetric(name, value);
    });
  }

  // Record resource metrics
  recordResourceMetrics(entry) {
    const resourceType = entry.initiatorType || 'unknown';
    const loadTime = entry.responseEnd - entry.startTime;
    
    this.recordMetric(`Resource Load Time (${resourceType})`, loadTime);
    
    // Track large resources
    if (entry.transferSize && entry.transferSize > 100000) { // > 100KB
      this.recordMetric('Large Resource', {
        name: entry.name,
        size: entry.transferSize,
        type: resourceType,
        loadTime
      });
    }
  }

  // Record custom metric
  recordMetric(name, value) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    this.metrics.get(name).push({
      value,
      timestamp: performance.now()
    });
  }

  // Get performance summary
  getSummary() {
    const summary = {};
    
    this.metrics.forEach((values, name) => {
      if (values.length === 0) return;
      
      const numericValues = values
        .map(v => typeof v.value === 'number' ? v.value : null)
        .filter(v => v !== null);
      
      if (numericValues.length > 0) {
        summary[name] = {
          count: numericValues.length,
          average: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
          min: Math.min(...numericValues),
          max: Math.max(...numericValues),
          latest: values[values.length - 1].value
        };
      } else {
        summary[name] = {
          count: values.length,
          latest: values[values.length - 1].value
        };
      }
    });
    
    return summary;
  }

  // Get Core Web Vitals score
  getCoreWebVitalsScore() {
    const summary = this.getSummary();
    const scores = {};
    
    // LCP scoring (Good: < 2.5s, Needs Improvement: 2.5s - 4s, Poor: > 4s)
    if (summary.LCP) {
      const lcp = summary.LCP.latest / 1000; // Convert to seconds
      scores.LCP = {
        value: lcp,
        score: lcp < 2.5 ? 'Good' : lcp < 4 ? 'Needs Improvement' : 'Poor',
        color: lcp < 2.5 ? '#0D8043' : lcp < 4 ? '#FFA400' : '#FF4E42'
      };
    }
    
    // FID scoring (Good: < 100ms, Needs Improvement: 100-300ms, Poor: > 300ms)
    if (summary.FID) {
      const fid = summary.FID.latest;
      scores.FID = {
        value: fid,
        score: fid < 100 ? 'Good' : fid < 300 ? 'Needs Improvement' : 'Poor',
        color: fid < 100 ? '#0D8043' : fid < 300 ? '#FFA400' : '#FF4E42'
      };
    }
    
    // CLS scoring (Good: < 0.1, Needs Improvement: 0.1-0.25, Poor: > 0.25)
    if (summary.CLS) {
      const cls = summary.CLS.latest;
      scores.CLS = {
        value: cls,
        score: cls < 0.1 ? 'Good' : cls < 0.25 ? 'Needs Improvement' : 'Poor',
        color: cls < 0.1 ? '#0D8043' : cls < 0.25 ? '#FFA400' : '#FF4E42'
      };
    }
    
    return scores;
  }

  // Generate performance report
  generateReport() {
    const summary = this.getSummary();
    const cwvScores = this.getCoreWebVitalsScore();
    
    const report = {
      timestamp: new Date().toISOString(),
      coreWebVitals: cwvScores,
      metrics: summary,
      recommendations: this.getRecommendations(summary, cwvScores)
    };
    
    return report;
  }

  // Get performance recommendations
  getRecommendations(summary, cwvScores) {
    const recommendations = [];
    
    // LCP recommendations
    if (cwvScores.LCP && cwvScores.LCP.score !== 'Good') {
      recommendations.push({
        metric: 'LCP',
        issue: 'Largest Contentful Paint is slow',
        suggestions: [
          'Optimize images and use modern formats (WebP, AVIF)',
          'Implement lazy loading for below-the-fold content',
          'Use CDN for faster content delivery',
          'Optimize server response time',
          'Remove render-blocking resources'
        ]
      });
    }
    
    // FID recommendations
    if (cwvScores.FID && cwvScores.FID.score !== 'Good') {
      recommendations.push({
        metric: 'FID',
        issue: 'First Input Delay is high',
        suggestions: [
          'Break up long JavaScript tasks',
          'Use code splitting and lazy loading',
          'Optimize third-party scripts',
          'Use web workers for heavy computations',
          'Minimize main thread work'
        ]
      });
    }
    
    // CLS recommendations
    if (cwvScores.CLS && cwvScores.CLS.score !== 'Good') {
      recommendations.push({
        metric: 'CLS',
        issue: 'Cumulative Layout Shift is high',
        suggestions: [
          'Include size attributes on images and videos',
          'Reserve space for dynamic content',
          'Avoid inserting content above existing content',
          'Use transform animations instead of changing layout properties',
          'Ensure ad slots have reserved space'
        ]
      });
    }
    
    // Bundle size recommendations
    if (summary['Resource Loading'] && summary['Resource Loading'].average > 3000) {
      recommendations.push({
        metric: 'Bundle Size',
        issue: 'Large bundle size affecting load time',
        suggestions: [
          'Implement code splitting',
          'Remove unused dependencies',
          'Use tree shaking',
          'Optimize asset compression',
          'Implement progressive loading'
        ]
      });
    }
    
    return recommendations;
  }

  // Stop monitoring
  stop() {
    this.isMonitoring = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    console.log('🛑 Performance monitoring stopped');
  }

  // Export metrics as JSON
  exportMetrics() {
    return JSON.stringify(this.generateReport(), null, 2);
  }

  // Clear all metrics
  clear() {
    this.metrics.clear();
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Auto-start monitoring in development
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.start();
  
  // Log performance report every 30 seconds
  setInterval(() => {
    const report = performanceMonitor.generateReport();
    console.group('📊 Performance Report');
    console.table(report.coreWebVitals);
    if (report.recommendations.length > 0) {
      console.warn('Recommendations:', report.recommendations);
    }
    console.groupEnd();
  }, 30000);
}

export default PerformanceMonitor;
