import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ECONOS Runtime Caught Exception:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[360px] p-6 flex flex-col items-center justify-center text-center font-mono bg-white border border-rose-200 rounded-2xl shadow-xs m-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {this.props.fallbackTitle || 'Workspace Render Shield Activated'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mt-1.5 leading-relaxed">
            A state or telemetry anomaly was intercepted safely before causing application instability.
          </p>
          {this.state.error && (
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-rose-700 max-w-lg text-left overflow-auto max-h-24 font-mono w-full">
              {this.state.error.message || 'Unknown runtime anomaly'}
            </div>
          )}
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Component</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
