"use client";

import { getErrorMessage } from "@/lib/data/utils";
import { track } from "@/lib/tracking";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(
    error: Error & { digest?: string },
    errorInfo: ErrorInfo,
  ) {
    console.error("Caught error:", error, errorInfo);
    track("Caught error", {
      componentStack: errorInfo.componentStack ?? "",
      // Server errors carry their digest on the error, not on errorInfo
      digest: error.digest ?? "",
    });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
